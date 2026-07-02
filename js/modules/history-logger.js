/**
 * History Logger Module
 * Tracks and logs all state changes, splits, and movements in the application
 */

class HistoryLogger {
  constructor(storageKey = 'finishgood_history_log') {
    this.storageKey = storageKey;
    this.history = this.loadHistory();
    this.listeners = [];
  }

  loadHistory() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading history:', error);
      return [];
    }
  }

  saveHistory() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.history));
      this.notifyListeners();
    } catch (error) {
      console.error('Error saving history:', error);
    }
  }

  logMovement(entry) {
    const historyEntry = {
      id: this.generateId(),
      timestamp: new Date().toISOString(),
      action: entry.action || 'unknown',
      fromState: entry.fromState || null,
      toState: entry.toState || null,
      itemId: entry.itemId || null,
      itemName: entry.itemName || null,
      metadata: entry.metadata || {},
      userId: entry.userId || 'system',
      notes: entry.notes || '',
    };

    this.history.push(historyEntry);
    this.saveHistory();
    return historyEntry;
  }

  logSplit(entry) {
    return this.logMovement({
      action: 'split',
      fromState: entry.sourceContainer || entry.fromState,
      toState: entry.targetContainer || entry.toState,
      itemId: entry.itemId,
      itemName: entry.itemName,
      metadata: {
        sourceQuantity: entry.sourceQuantity,
        splitQuantity: entry.splitQuantity,
        remainingQuantity: entry.remainingQuantity,
        ...entry.metadata,
      },
      userId: entry.userId,
      notes: entry.notes,
    });
  }

  logTransfer(entry) {
    return this.logMovement({
      action: 'transfer',
      fromState: entry.fromState,
      toState: entry.toState,
      itemId: entry.itemId,
      itemName: entry.itemName,
      metadata: entry.metadata || {},
      userId: entry.userId,
      notes: entry.notes,
    });
  }

  getHistory() {
    return this.history;
  }

  getItemHistory(itemId) {
    return this.history.filter(entry => entry.itemId === itemId);
  }

  getHistoryByDateRange(startDate, endDate) {
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    return this.history.filter(entry => {
      const entryTime = new Date(entry.timestamp).getTime();
      return entryTime >= start && entryTime <= end;
    });
  }

  getHistoryByAction(actionType) {
    return this.history.filter(entry => entry.action === actionType);
  }

  getHistoryByUser(userId) {
    return this.history.filter(entry => entry.userId === userId);
  }

  getRecentHistory(limit = 10) {
    return this.history.slice(-limit).reverse();
  }

  searchHistory(searchTerm) {
    const term = searchTerm.toLowerCase();
    return this.history.filter(entry =>
      entry.itemName?.toLowerCase().includes(term) ||
      entry.notes?.toLowerCase().includes(term) ||
      entry.itemId?.toLowerCase().includes(term)
    );
  }

  getMovementPath(itemId) {
    const itemHistory = this.getItemHistory(itemId);
    return itemHistory.map(entry => ({
      timestamp: entry.timestamp,
      from: entry.fromState,
      to: entry.toState,
      action: entry.action,
      notes: entry.notes,
    }));
  }

  clearHistory(confirm = false) {
    if (confirm) {
      this.history = [];
      localStorage.removeItem(this.storageKey);
      this.notifyListeners();
    }
  }

  exportAsJSON() {
    return JSON.stringify(this.history, null, 2);
  }

  exportAsCSV() {
    if (this.history.length === 0) return '';
    const headers = ['ID', 'Timestamp', 'Action', 'From State', 'To State', 'Item ID', 'Item Name', 'User ID', 'Notes'];
    const rows = this.history.map(entry => [
      entry.id,
      entry.timestamp,
      entry.action,
      entry.fromState,
      entry.toState,
      entry.itemId,
      entry.itemName,
      entry.userId,
      `"${entry.notes}"`,
    ]);
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    return csv;
  }

  addListener(callback) {
    this.listeners.push(callback);
  }

  removeListener(callback) {
    this.listeners = this.listeners.filter(listener => listener !== callback);
  }

  notifyListeners() {
    this.listeners.forEach(callback => callback(this.history));
  }

  generateId() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  static formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString('id-ID', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  }

  static getActionLabel(action) {
    const labels = {
      split: 'Split / Perpindahan',
      move: 'Perpindahan',
      transfer: 'Transfer',
      status_change: 'Perubahan Status',
      create: 'Dibuat',
      delete: 'Dihapus',
      update: 'Diperbarui',
    };
    return labels[action] || action;
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = HistoryLogger;
}