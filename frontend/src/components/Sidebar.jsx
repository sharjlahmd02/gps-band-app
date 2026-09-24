import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Shield, 
  LayoutGrid, 
  Smile, 
  MapPin, 
  Bell, 
  ShieldCheck, 
  Cpu, 
  AlertTriangle, 
  FileText,
  BarChart3,
  Settings,
  LogOut,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Sidebar({ isOpen, onClose }) {
  const { 
    activeAlertCount, 
    currentUser, 
    mobileMenuOpen, 
    setMobileMenuOpen, 
    addToast,
    openModal
  } = useApp();

  const isSidebarOpen = isOpen !== undefined ? isOpen : mobileMenuOpen;
  const handleClose = onClose || (() => setMobileMenuOpen(false));

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutGrid },
    { name: 'Children', path: '/children', icon: Smile },
    { name: 'Live Location', path: '/live-location', icon: MapPin },
    { name: 'Alerts', path: '/alerts', icon: Bell, badge: activeAlertCount },
    { name: 'Safe Zones', path: '/safe-zones', icon: ShieldCheck },
    { name: 'Devices', path: '/devices', icon: Cpu },
    { name: 'Emergency / SOS', path: '/emergency', icon: AlertTriangle, isEmergency: true },
    // Police Station explicitly skipped per requirement
    { name: 'Reports', path: '/reports', icon: FileText },
    { name: 'Safety Analytics', path: '/safety-analytics', icon: BarChart3 },
    { name: 'Settings', path: '/settings', icon: Settings }
  ];

  const handleSignOut = () => {
    openModal({
      title: 'Confirm Sign Out',
      body: (
        <p>Are you sure you want to sign out of <strong>SafeWatch Parent Dashboard</strong>? Active band telemetry continues in the cloud.</p>
      ),
      confirmText: 'Sign Out',
      confirmDanger: true,
      onConfirm: () => {
        addToast('Signed out successfully (Demo session reset)', 'info');
      }
    });
  };

  const handleProfileClick = () => {
    openModal({
      title: 'Parent Profile Settings',
      body: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img 
              src={currentUser.avatar} 
              alt={currentUser.name} 
              style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover' }} 
            />
            <div>
              <h4 style={{ margin: 0, fontSize: '16px', color: '#0F172A' }}>{currentUser.name}</h4>
              <p style={{ margin: 0, fontSize: '13px', color: '#64748B' }}>{currentUser.email}</p>
              <span style={{ fontSize: '11px', background: '#F1F5F9', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>{currentUser.role}</span>
            </div>
          </div>
          <p style={{ fontSize: '13px', color: '#475569', margin: 0 }}>Two-Factor Guardian Authentication is <strong>Active</strong>. Emergency SMS notifications linked to primary contact.</p>
        </div>
      ),
      confirmText: 'Close',
      onConfirm: () => {}
    });
  };

  return (
    <>
      {/* Mobile Backdrop */}
      <div 
        className={`backdrop ${isSidebarOpen ? 'open' : ''}`}
        onClick={handleClose}
      />

      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        {/* SafeWatch Header */}
        <div className="sidebar-header">
          <div className="sidebar-logo-icon">
            <Shield size={20} strokeWidth={2.2} />
          </div>
          <div className="sidebar-brand-text">
            <span className="sidebar-brand-name">SafeWatch</span>
            <span className="sidebar-brand-subtitle">Parent Dashboard</span>
          </div>
          {isSidebarOpen && (
            <button 
              onClick={handleClose} 
              style={{ marginLeft: 'auto', padding: '4px', color: '#64748B' }}
              aria-label="Close sidebar"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Navigation list with SPA routing */}
        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.path === '/'}
                onClick={handleClose}
                className={({ isActive }) => 
                  `sidebar-nav-item ${isActive ? 'active' : ''} ${item.isEmergency ? 'emergency' : ''}`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="sidebar-nav-left">
                      <Icon size={18} className="sidebar-icon" strokeWidth={isActive ? 2.2 : 1.8} />
                      <span>{item.name}</span>
                    </div>
                    {item.badge !== undefined && item.badge > 0 && (
                      <span className="sidebar-badge">{item.badge}</span>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* User Profile Footer */}
        <div className="sidebar-footer">
          <div className="sidebar-user" onClick={handleProfileClick} title="View Account Settings">
            <img 
              src={currentUser.avatar} 
              alt={currentUser.name} 
              className="sidebar-user-avatar"
            />
            <div className="sidebar-user-info">
              <span className="sidebar-user-name">{currentUser.name}</span>
              <span className="sidebar-user-email">{currentUser.email}</span>
            </div>
          </div>

          <button 
            type="button"
            className="sidebar-signout-btn" 
            onClick={handleSignOut}
            id="btn-sign-out"
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
export { Sidebar };
