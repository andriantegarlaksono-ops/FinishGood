/**
 * History UI Controller
 * Handles rendering and interaction with the history panel
 */

class HistoryUI {
  constructor(historyLogger) {
    this.logger = historyLogger;
    this.currentFilter = {
      search: '',
      action: '',
      date: '',
      user: '',
    };
    this.filteredHistory = [];
    this.init();
  }

  /**
   * Initialize the UI
   */
  init() {
    this.cacheElements();
    this.attachEventListeners();
    this.updateStats();
    this.render();

    // Listen to history changes
    this.logger.addListener(() => {
      this.updateStats();
      this.render();
    });
  }

  /**
   * Cache DOM elements
   */
  cacheElements() {
    this.elements = {
      panel: document.getElementById('history-panel'),
      timeline: document.getElementById('history-timeline'),
      empty: document.getElementById('history-empty'),
      loading: document.getElementById('history-loading'),
      template: document.getElementById('timeline-entry-template'),
      modal: document.getElementById('history-detail-modal'),
      modalClose: document.getElementById('modal-close'),
      modalCloseBtn: document.getElementById('modal-close-btn'),

      // Filters
      searchInput: document.getElementById('filter-search'),
      actionSelect: document.getElementById('filter-action'),
      dateInput: document.getElementById('filter-date'),
      userSelect: document.getElementById('filter-user'),
      resetBtn: document.getElementById('filter-reset'),

      // Stats
      statTotal: document.getElementById('stat-total'),
      statToday: document.getElementById('stat-today'),
      statUsers: document.getElementById('stat-users'),

      // Controls
      refreshBtn: document.getElementById('history-refresh'),
      exportJsonBtn: document.getElementById('history-export-json'),
      exportCsvBtn: document.getElementById('history-export-csv'),
      clearBtn: document.getElementById('history-clear'),
    };
  }

  /**
   * Attach event listeners
   */
  attachEventListeners() {
    // Filter events
    this.elements.searchInput?.addEventListener('input', (e) =>
      this.onFilterChange('search', e.target.value)
    );
    this.elements.actionSelect?.addEventListener('change', (e) =>
      this.onFilterChange('action', e.target.value)
    );
    this.elements.dateInput?.addEventListener('change', (e) =>
      this.onFilterChange('date', e.target.value)
    );
    this.elements.userSelect?.addEventListener('change', (e) =>
      this.onFilterChange('user', e.target.value)
    );
    this.elements.resetBtn?.addEventListener('click', () => this.resetFilters());

    // Control events
    this.elements.refreshBtn?.addEventListener('click', () => this.render());
    this.elements.exportJsonBtn?.addEventListener('click', () =>
      this.exportData('json')
    );
    this.elements.exportCsvBtn?.addEventListener('click', () =>
      this.exportData('csv')
    );
    this.elements.clearBtn?.addEventListener('click', () =>
      this.confirmClearHistory()
    );

    // Modal events
    this.elements.modalClose?.addEventListener('click', () =>
      this.closeModal()
    );
    this.elements.modalCloseBtn?.addEventListener('click', () =>
      this.closeModal()
    );
    this.elements.modal?.addEventListener('click', (e) => {
      if (e.target === this.elements.modal) this.closeModal();
    });
  }

  /**
   * Handle filter changes
   */
  onFilterChange(key, value) {
    this.currentFilter[key] = value;
    this.applyFilters();
  }

  /**
   * Apply filters to history
   */
  applyFilters() {
    let filtered = this.logger.getHistory();

    // Search filter
    if (this.currentFilter.search) {
      filtered = filtered.filter(entry =>
        entry.itemName
          ?.toLowerCase()
          .includes(this.currentFilter.search.toLowerCase()) ||
        entry.notes
          ?.toLowerCase()
          .includes(this.currentFilter.search.toLowerCase()) ||
        entry.itemId
          ?.toLowerCase()
          .includes(this.currentFilter.search.toLowerCase())
      );
    }

    // Action filter
    if (this.currentFilter.action) {
      filtered = filtered.filter(
        entry => entry.action === this.currentFilter.action
      );
    }

    // Date filter
    if (this.currentFilter.date) {
      const selectedDate = new Date(this.currentFilter.date);
      const nextDay = new Date(selectedDate);
      nextDay.setDate(nextDay.getDate() + 1);

      filtered = filtered.filter(entry => {
        const entryDate = new Date(entry.timestamp);
        return entryDate >= selectedDate && entryDate < nextDay;
      });
    }

    // User filter
    if (this.currentFilter.user) {
      filtered = filtered.filter(
        entry => entry.userId === this.currentFilter.user
      );
    }

    this.filteredHistory = filtered;
    this.render();
  }

  /**
   * Reset all filters
   */
  resetFilters() {
    this.currentFilter = {
      search: '',
      action: '',
      date: '',
      user: '',
    };

    if (this.elements.searchInput) this.elements.searchInput.value = '';
    if (this.elements.actionSelect) this.elements.actionSelect.value = '';
    if (this.elements.dateInput) this.elements.dateInput.value = '';
    if (this.elements.userSelect) this.elements.userSelect.value = '';

    this.applyFilters();
  }

  /**
   * Render history timeline
   */
  render() {
    const history = this.filteredHistory.length
      ? this.filteredHistory
      : this.logger.getHistory();

    if (!this.elements.timeline) return;

    // Clear existing entries
    this.elements.timeline.innerHTML = '';

    if (history.length === 0) {
      this.elements.empty.style.display = 'block';
      return;
    }

    this.elements.empty.style.display = 'none';

    // Render entries in reverse order (newest first)
    history.reverse().forEach(entry => {
      const element = this.createTimelineEntry(entry);
      this.elements.timeline.appendChild(element);
    });
  }

  /**
   * Create timeline entry element
   */
  createTimelineEntry(entry) {
    const template = this.elements.template;
    if (!template) return document.createElement('div');

    const clone = template.content.cloneNode(true);
    const entryEl = clone.querySelector('.timeline-entry');

    // Set data attribute
    entryEl.setAttribute('data-id', entry.id);

    // Fill in the content
    const actionLabel = HistoryLogger.getActionLabel(entry.action);
    clone.querySelector('.timeline-action').textContent = actionLabel;
    clone.querySelector('.timeline-timestamp').textContent =
      HistoryLogger.formatTimestamp(entry.timestamp);
    clone.querySelector('.timeline-item-name').textContent =
      entry.itemName || 'N/A';
    clone.querySelector('.timeline-from').textContent =
      entry.fromState || '-';
    clone.querySelector('.timeline-to').textContent = entry.toState || '-';
    clone.querySelector('.timeline-user').textContent =
      `${entry.userId}`;

    // Handle notes
    const notesEl = clone.querySelector('.timeline-notes');
    if (entry.notes) {
      notesEl.style.display = 'block';
      clone.querySelector('.timeline-note-text').textContent = entry.notes;
    }

    // Add event listeners
    const contentEl = clone.querySelector('.timeline-content');
    contentEl.addEventListener('click', () => this.showDetail(entry));

    const detailsBtn = clone.querySelector('.details-btn');
    detailsBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.showDetail(entry);
    });

    return clone;
  }

  /**
   * Show detail modal
   */
  showDetail(entry) {
    document.getElementById('detail-id').textContent = entry.id;
    document.getElementById('detail-timestamp').textContent =
      HistoryLogger.formatTimestamp(entry.timestamp);
    document.getElementById('detail-action').textContent =
      HistoryLogger.getActionLabel(entry.action);
    document.getElementById('detail-from').textContent =
      entry.fromState || '-';
    document.getElementById('detail-to').textContent = entry.toState || '-';
    document.getElementById('detail-item-id').textContent =
      entry.itemId || '-';
    document.getElementById('detail-item-name').textContent =
      entry.itemName || '-';
    document.getElementById('detail-user').textContent = entry.userId || '-';
    document.getElementById('detail-notes').textContent = entry.notes || '-';

    // Show metadata if exists
    const metadataContainer = document.getElementById(
      'detail-metadata-container'
    );
    if (Object.keys(entry.metadata).length > 0) {
      metadataContainer.style.display = 'flex';
      document.getElementById('detail-metadata').textContent =
        JSON.stringify(entry.metadata, null, 2);
    } else {
      metadataContainer.style.display = 'none';
    }

    this.elements.modal.style.display = 'flex';
  }

  /**
   * Close detail modal
   */
  closeModal() {
    this.elements.modal.style.display = 'none';
  }

  /**
   * Update statistics
   */
  updateStats() {
    const history = this.logger.getHistory();

    // Total
    this.elements.statTotal.textContent = history.length;

    // Today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayCount = history.filter(entry => {
      const entryDate = new Date(entry.timestamp);
      entryDate.setHours(0, 0, 0, 0);
      return entryDate.getTime() === today.getTime();
    }).length;
    this.elements.statToday.textContent = todayCount;

    // Unique users
    const users = new Set(history.map(entry => entry.userId));
    this.elements.statUsers.textContent = users.size;

    // Update user filter options
    this.updateUserOptions([...users]);
  }

  /**
   * Update user filter options
   */
  updateUserOptions(users) {
    const select = this.elements.userSelect;
    if (!select) return;

    const currentValue = select.value;

    // Keep the first option (Semua User)
    while (select.options.length > 1) {
      select.remove(1);
    }

    users.forEach(user => {
      const option = document.createElement('option');
      option.value = user;
      option.textContent = user;
      select.appendChild(option);
    });

    select.value = currentValue;
  }

  /**
   * Export data
   */
  exportData(format) {
    let content, filename;

    if (format === 'json') {
      content = this.logger.exportAsJSON();
      filename = `history_${new Date().toISOString().split('T')[0]}.json`;
    } else if (format === 'csv') {
      content = this.logger.exportAsCSV();
      filename = `history_${new Date().toISOString().split('T')[0]}.csv`;
    }

    if (!content) return;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  /**
   * Confirm and clear history
   */
  confirmClearHistory() {
    const confirmed = confirm(
      '⚠️ Apakah Anda yakin ingin menghapus semua riwayat? Tindakan ini tidak dapat dibatalkan.'
    );
    if (confirmed) {
      this.logger.clearHistory(true);
      this.render();
    }
  }

  /**
   * Get movement timeline for an item
   */
  showMovementTimeline(itemId) {
    const path = this.logger.getMovementPath(itemId);
    console.table(path);
    alert(
      `Movement path untuk item ${itemId}:\n\n` +
      path
        .map(
          (p, i) =>
            `${i + 1}. ${HistoryLogger.formatTimestamp(p.timestamp)}\n   ${p.from} → ${p.to}`
        )
        .join('\n\n')
    );
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = HistoryUI;
}