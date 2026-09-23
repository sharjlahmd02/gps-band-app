import React from 'react';
import { Menu } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Header = ({ title = 'Dashboard' }) => {
  const { activeAlertCount, navigateTo, setMobileMenuOpen } = useApp();

  return (
    <>
      {/* Mobile top bar */}
      <div className="mobile-header">
        <button 
          className="mobile-menu-btn" 
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>
        <span style={{ fontWeight: 700, fontSize: '16px' }}>SafeWatch</span>
        <button 
          onClick={() => navigateTo('alerts')}
          style={{ 
            background: '#FEF2F2', 
            color: '#DC2626', 
            borderRadius: '9999px', 
            padding: '4px 10px', 
            fontSize: '11px', 
            fontWeight: 700 
          }}
        >
          {activeAlertCount} Alerts
        </button>
      </div>

      {/* Main dashboard title row */}
      <div className="dashboard-header-row">
        <h1 className="dashboard-title">{title}</h1>
        {activeAlertCount > 0 && (
          <button 
            className="header-alert-pill"
            onClick={() => navigateTo('alerts')}
            id="header-alert-badge"
            title="Click to view all active alerts"
          >
            <span className="alert-dot" />
            <span>{activeAlertCount} Active Alerts</span>
          </button>
        )}
      </div>
    </>
  );
};
