import React, { useState, useEffect } from 'react';
import './HistoryLog.css';

const HistoryLog = ({ itemId, onClose }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, split, transfer, movement

  useEffect(() => {
    fetchHistory();
  }, [itemId]);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/history/${itemId}`);
      if (!response.ok) throw new Error('Failed to fetch history');
      const data = await response.json();
      setHistory(data);
    } catch (error) {
      console.error('Error fetching history:', error);
    } finally {
      setLoading(false);
    }
  };

  const getFilteredHistory = () => {
    if (filter === 'all') return history;
    return history.filter(item => item.type === filter);
  };

  const getActionIcon = (type) => {
    switch (type) {
      case 'split':
        return '✂️';
      case 'transfer':
        return '➡️';
      case 'movement':
        return '📍';
      case 'merge':
        return '🔗';
      case 'create':
        return '✨';
      case 'delete':
        return '🗑️';
      default:
        return '📝';
    }
  };

  const getActionLabel = (type) => {
    switch (type) {
      case 'split':
        return 'Split/Perpindahan';
      case 'transfer':
        return 'Transfer';
      case 'movement':
        return 'Pergerakan';
      case 'merge':
        return 'Merge';
      case 'create':
        return 'Dibuat';
      case 'delete':
        return 'Dihapus';
      default:
        return 'Aktivitas';
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const filteredHistory = getFilteredHistory();

  return (
    <div className="history-log-modal">
      <div className="history-log-container">
        <div className="history-log-header">
          <h2>📜 Riwayat Pergerakan</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="history-filters">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            Semua
          </button>
          <button 
            className={`filter-btn ${filter === 'split' ? 'active' : ''}`}
            onClick={() => setFilter('split')}
          >
            Split
          </button>
          <button 
            className={`filter-btn ${filter === 'transfer' ? 'active' : ''}`}
            onClick={() => setFilter('transfer')}
          >
            Transfer
          </button>
          <button 
            className={`filter-btn ${filter === 'movement' ? 'active' : ''}`}
            onClick={() => setFilter('movement')}
          >
            Pergerakan
          </button>
        </div>

        <div className="history-content">
          {loading ? (
            <div className="loading">Loading history...</div>
          ) : filteredHistory.length === 0 ? (
            <div className="empty-state">
              <p>Tidak ada riwayat untuk ditampilkan</p>
            </div>
          ) : (
            <div className="timeline">
              {filteredHistory.map((item, index) => (
                <div key={item.id || index} className="timeline-item">
                  <div className="timeline-marker">
                    <div className="timeline-icon">{getActionIcon(item.type)}</div>
                  </div>
                  
                  <div className="timeline-content">
                    <div className="timeline-header">
                      <span className="action-label">{getActionLabel(item.type)}</span>
                      <span className="timestamp">{formatDate(item.timestamp)}</span>
                    </div>

                    <div className="timeline-details">
                      {/* Split Information */}
                      {item.type === 'split' && (
                        <div className="detail-section split-section">
                          <div className="detail-row">
                            <span className="label">Dari Lokasi:</span>
                            <span className="value">{item.fromLocation}</span>
                          </div>
                          <div className="detail-row">
                            <span className="label">Jumlah Original:</span>
                            <span className="value">{item.originalQuantity} unit</span>
                          </div>
                          <div className="split-details">
                            <h4>Hasil Split:</h4>
                            {item.splitResults && item.splitResults.map((split, idx) => (
                              <div key={idx} className="split-item">
                                <span className="split-qty">{split.quantity} unit</span>
                                <span className="split-arrow">→</span>
                                <span className="split-location">{split.location}</span>
                                <span className="split-code">({split.code})</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Transfer Information */}
                      {item.type === 'transfer' && (
                        <div className="detail-section transfer-section">
                          <div className="detail-row">
                            <span className="label">Dari:</span>
                            <span className="value">{item.fromLocation}</span>
                          </div>
                          <div className="detail-row">
                            <span className="label">Ke:</span>
                            <span className="value">{item.toLocation}</span>
                          </div>
                          <div className="detail-row">
                            <span className="label">Jumlah:</span>
                            <span className="value">{item.quantity} unit</span>
                          </div>
                          {item.reason && (
                            <div className="detail-row">
                              <span className="label">Alasan:</span>
                              <span className="value">{item.reason}</span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Movement Information */}
                      {item.type === 'movement' && (
                        <div className="detail-section movement-section">
                          <div className="detail-row">
                            <span className="label">Lokasi:</span>
                            <span className="value">{item.location}</span>
                          </div>
                          <div className="detail-row">
                            <span className="label">Status:</span>
                            <span className={`status-badge status-${item.status?.toLowerCase()}`}>
                              {item.status}
                            </span>
                          </div>
                          {item.notes && (
                            <div className="detail-row">
                              <span className="label">Catatan:</span>
                              <span className="value">{item.notes}</span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Other types */}
                      {!['split', 'transfer', 'movement'].includes(item.type) && (
                        <div className="detail-section">
                          <p>{item.description}</p>
                          {item.details && (
                            <div className="detail-row">
                              <span className="label">Detail:</span>
                              <span className="value">{JSON.stringify(item.details)}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {item.userId && (
                      <div className="timeline-footer">
                        <span className="user-info">📝 {item.userId}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="history-footer">
          <span className="total-records">Total: {filteredHistory.length} catatan</span>
          <button className="refresh-btn" onClick={fetchHistory}>
            🔄 Refresh
          </button>
        </div>
      </div>
    </div>
  );
};

export default HistoryLog;
