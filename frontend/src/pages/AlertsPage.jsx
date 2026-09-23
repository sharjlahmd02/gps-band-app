import React, { useState } from 'react';
import { Bell, CheckCircle2, MapPin, AlertCircle, Filter, Trash2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AlertsPage = () => {
  const { alerts, resolveAlert, navigateTo, addToast, openModal } = useApp();
  const [filter, setFilter] = useState('all');

  const filteredAlerts = alerts.filter((alert) => {
    if (filter === 'active') return alert.status === 'active';
    if (filter === 'resolved') return alert.status === 'resolved';
    return true;
  });

  const activeCount = alerts.filter((a) => a.status === 'active').length;
  const resolvedCount = alerts.filter((a) => a.status === 'resolved').length;

  const handleResolveAll = () => {
    openModal({
      title: 'Resolve All Active Alerts?',
      body: (
        <p>This will mark all {activeCount} active alerts as acknowledged and resolved. Both children will remain under standard continuous monitoring.</p>
      ),
      confirmText: 'Resolve All',
      onConfirm: () => {
        alerts.forEach((a) => {
          if (a.status === 'active') resolveAlert(a.id);
        });
        addToast('All alerts successfully resolved!', 'success');
      }
    });
  };

  return (
    <div className="page-container">
      <div className="page-header-row">
        <div className="page-title-group">
          <h1 className="page-title">Safety & Incident Alerts</h1>
          <p className="page-description">Automated geofence exits, battery thresholds, and sensor tamper detections.</p>
        </div>

        {activeCount > 0 && (
          <button 
            className="page-action-btn"
            onClick={handleResolveAll}
            id="btn-resolve-all"
          >
            <CheckCircle2 size={16} />
            <span>Resolve All ({activeCount})</span>
          </button>
        )}
      </div>

      <div className="subpage-card">
        {/* Filter bar */}
        <div className="alert-filter-bar">
          <button 
            className={`filter-tab-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Alerts ({alerts.length})
          </button>
          <button 
            className={`filter-tab-btn ${filter === 'active' ? 'active' : ''}`}
            onClick={() => setFilter('active')}
          >
            Active ({activeCount})
          </button>
          <button 
            className={`filter-tab-btn ${filter === 'resolved' ? 'active' : ''}`}
            onClick={() => setFilter('resolved')}
          >
            Resolved ({resolvedCount})
          </button>
        </div>

        {/* Alerts list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filteredAlerts.length === 0 ? (
            <div style={{ padding: '36px', textAlign: 'center', color: '#64748B' }}>
              <CheckCircle2 size={40} color="#16A34A" style={{ margin: '0 auto 12px' }} />
              <h3 style={{ margin: 0, color: '#0F172A' }}>No alerts in this view</h3>
              <p style={{ margin: '4px 0 0', fontSize: '13px' }}>All children are safe and within assigned parameters.</p>
            </div>
          ) : (
            filteredAlerts.map((alert) => (
              <div 
                key={alert.id} 
                style={{ 
                  display: 'flex', 
                  alignItems: 'flex-start', 
                  justifyContent: 'space-between',
                  padding: '16px',
                  borderRadius: '12px',
                  background: alert.status === 'active' ? '#FFF5F5' : '#F8FAFC',
                  border: `1px solid ${alert.status === 'active' ? '#FEE2E2' : '#E2E8F0'}`,
                  gap: '16px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <img 
                    src={alert.avatar} 
                    alt={alert.childName} 
                    style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }} 
                  />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <span style={{ fontWeight: 700, fontSize: '15px', color: '#0F172A' }}>{alert.childName}</span>
                      
                      <span 
                        style={{ 
                          backgroundColor: alert.typeBg, 
                          color: alert.typeColor,
                          fontSize: '11px',
                          fontWeight: 600,
                          padding: '2px 8px',
                          borderRadius: '9999px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <span className="badge-dot" style={{ backgroundColor: alert.typeColor }} />
                        {alert.type}
                      </span>

                      {alert.status === 'resolved' && (
                        <span style={{ fontSize: '11px', background: '#F1F5F9', color: '#64748B', padding: '2px 8px', borderRadius: '9999px' }}>
                          Resolved
                        </span>
                      )}
                    </div>

                    <p style={{ margin: '6px 0 4px', fontSize: '13.5px', color: '#334155' }}>
                      {alert.details}
                    </p>

                    <div style={{ fontSize: '12px', color: '#64748B' }}>
                      📍 {alert.location} • 🕒 {alert.timestamp}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                  <button 
                    className="child-btn-secondary"
                    onClick={() => navigateTo('live-location')}
                    title="View exact position on map"
                  >
                    <MapPin size={14} />
                    <span>View Map</span>
                  </button>

                  {alert.status === 'active' && (
                    <button 
                      className="page-action-btn"
                      style={{ background: '#16A34A', padding: '6px 12px', fontSize: '12px' }}
                      onClick={() => resolveAlert(alert.id)}
                    >
                      <CheckCircle2 size={14} />
                      <span>Resolve</span>
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
