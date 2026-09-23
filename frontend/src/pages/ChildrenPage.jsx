import React from 'react';
import { UserPlus, Bell, MapPin, Battery, Wifi, Shield, PhoneCall } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ChildrenPage = () => {
  const { children, pingBand, navigateTo, openModal, addToast } = useApp();

  const handleAddChild = () => {
    openModal({
      title: 'Pair New GPS Band & Child Profile',
      body: (
        <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>Child Full Name</label>
            <input 
              type="text" 
              placeholder="e.g. Noah Chen" 
              style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #CBD5E1' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>Band Serial Number (QR Code)</label>
            <input 
              type="text" 
              placeholder="e.g. SW-7719-X" 
              style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #CBD5E1' }}
            />
          </div>
          <p style={{ fontSize: '12px', color: '#64748B', margin: 0 }}>
            Hold the power button on the SafeWatch band for 3 seconds until the sync LED flashes blue.
          </p>
        </form>
      ),
      confirmText: 'Pair Device',
      onConfirm: () => {
        addToast('New SafeWatch Band paired successfully! (Demo)', 'success');
      }
    });
  };

  const handleEmergencyCall = (childName) => {
    addToast(`Calling emergency contact for ${childName}...`, 'warning');
  };

  return (
    <div className="page-container">
      <div className="page-header-row">
        <div className="page-title-group">
          <h1 className="page-title">Children Monitored Profiles</h1>
          <p className="page-description">Manage real-time tracking, safety limits, and GPS bands for your family.</p>
        </div>
        <button 
          className="page-action-btn"
          onClick={handleAddChild}
          id="btn-add-child"
        >
          <UserPlus size={16} />
          <span>Add Child Profile</span>
        </button>
      </div>

      <div className="children-grid">
        {children.map((child) => (
          <div key={child.id} className="child-profile-card">
            <div className="child-profile-top">
              <img src={child.avatar} alt={child.name} className="child-profile-avatar" />
              <div className="child-profile-meta">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h2 className="child-profile-name">{child.name}</h2>
                  <span 
                    className="child-age-pill"
                    style={{ backgroundColor: child.ageBg, color: child.ageColor }}
                  >
                    Age {child.age}
                  </span>
                </div>
                <span style={{ fontSize: '13px', color: '#64748B' }}>Band ID: {child.device.id}</span>
                {child.alertActive && (
                  <span className="child-alert-pill" style={{ alignSelf: 'flex-start', marginTop: '2px' }}>
                    <span className="badge-dot" style={{ backgroundColor: '#DC2626' }} />
                    <span>{child.alertText}</span>
                  </span>
                )}
              </div>
            </div>

            <div className="child-stats-row">
              <div className="child-stat-box">
                <span className="child-stat-label">BATTERY</span>
                <span className="child-stat-value" style={{ color: child.battery < 20 ? '#DC2626' : '#16A34A' }}>
                  {child.battery}%
                </span>
              </div>
              <div className="child-stat-box">
                <span className="child-stat-label">BAND STATUS</span>
                <span className="child-stat-value" style={{ color: '#16A34A' }}>
                  Connected
                </span>
              </div>
              <div className="child-stat-box">
                <span className="child-stat-label">SAFE ZONE</span>
                <span className="child-stat-value" style={{ color: child.inSafeZone ? '#16A34A' : '#DC2626' }}>
                  {child.inSafeZone ? 'Inside' : 'Outside'}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: '#475569' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={16} color="#64748B" />
                <span><strong>Current:</strong> {child.location}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Shield size={16} color="#64748B" />
                <span><strong>Assigned Zone:</strong> {child.safeZone}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Wifi size={16} color="#16A34A" />
                <span><strong>Telemetry:</strong> {child.device.signal}</span>
              </div>
            </div>

            <div className="child-action-buttons">
              <button 
                className="child-btn-secondary"
                onClick={() => pingBand(child.name, child.device.id)}
                title="Send audio beep to band"
              >
                <Bell size={14} />
                <span>Ping Buzzer</span>
              </button>

              <button 
                className="child-btn-secondary"
                onClick={() => handleEmergencyCall(child.name)}
                title="Call linked guardian phone"
              >
                <PhoneCall size={14} />
                <span>Call Device</span>
              </button>

              <button 
                className="child-btn-primary"
                onClick={() => navigateTo('live-location')}
                title="Open live GPS tracking"
              >
                <MapPin size={14} />
                <span>Track Live</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
