import React, { useState } from 'react';
import { Bell, Shield, Smartphone, Lock, Save, UserCheck, Phone, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SettingsPage = () => {
  const { addToast } = useApp();

  const [geofenceAlerts, setGeofenceAlerts] = useState(true);
  const [batteryAlerts, setBatteryAlerts] = useState(true);
  const [sosSms, setSosSms] = useState(true);
  const [tamperAlerts, setTamperAlerts] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState('15s');

  const handleSave = () => {
    addToast('Preferences & Guardian Settings successfully saved!', 'success');
  };

  return (
    <div className="page-container" style={{ maxWidth: '960px' }}>
      {/* Header */}
      <div className="page-header-row">
        <div className="page-title-group">
          <h1 className="page-title">Guardian & System Settings</h1>
          <p className="page-description">Manage telemetry thresholds, notification channels, and guardian contacts.</p>
        </div>

        <button 
          className="page-action-btn"
          onClick={handleSave}
          id="btn-save-settings"
        >
          <Save size={16} />
          <span>Save Changes</span>
        </button>
      </div>

      {/* Notifications Section */}
      <div className="subpage-card">
        <div className="section-card-header">
          <h3 className="section-card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Bell size={18} color="#2563EB" />
            <span>Telemetry & Alert Notifications</span>
          </h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '12px' }}>
          {/* Geofence */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '14px', borderBottom: '1px solid #F1F5F9' }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: '13.5px', color: '#0F172A' }}>Geofence Boundary Exit Alerts</div>
              <div style={{ fontSize: '12px', color: '#64748B' }}>Receive instant push notifications when a child leaves designated zones</div>
            </div>
            <label style={{ position: 'relative', display: 'inline-block', width: '44px', height: '24px', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                checked={geofenceAlerts} 
                onChange={(e) => setGeofenceAlerts(e.target.checked)} 
                style={{ opacity: 0, width: 0, height: 0 }}
              />
              <span 
                style={{ 
                  position: 'absolute', 
                  inset: 0, 
                  backgroundColor: geofenceAlerts ? '#0F172A' : '#CBD5E1', 
                  borderRadius: '9999px', 
                  transition: '0.2s' 
                }}
              >
                <span 
                  style={{ 
                    position: 'absolute', 
                    height: '18px', 
                    width: '18px', 
                    left: geofenceAlerts ? '23px' : '3px', 
                    bottom: '3px', 
                    backgroundColor: 'white', 
                    borderRadius: '50%', 
                    transition: '0.2s' 
                  }} 
                />
              </span>
            </label>
          </div>

          {/* Low Battery */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '14px', borderBottom: '1px solid #F1F5F9' }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: '13.5px', color: '#0F172A' }}>Critical Low Battery Warnings</div>
              <div style={{ fontSize: '12px', color: '#64748B' }}>Alert parent when GPS band charge drops below 15%</div>
            </div>
            <label style={{ position: 'relative', display: 'inline-block', width: '44px', height: '24px', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                checked={batteryAlerts} 
                onChange={(e) => setBatteryAlerts(e.target.checked)} 
                style={{ opacity: 0, width: 0, height: 0 }}
              />
              <span 
                style={{ 
                  position: 'absolute', 
                  inset: 0, 
                  backgroundColor: batteryAlerts ? '#0F172A' : '#CBD5E1', 
                  borderRadius: '9999px', 
                  transition: '0.2s' 
                }}
              >
                <span 
                  style={{ 
                    position: 'absolute', 
                    height: '18px', 
                    width: '18px', 
                    left: batteryAlerts ? '23px' : '3px', 
                    bottom: '3px', 
                    backgroundColor: 'white', 
                    borderRadius: '50%', 
                    transition: '0.2s' 
                  }} 
                />
              </span>
            </label>
          </div>

          {/* Tamper Clasp */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '14px', borderBottom: '1px solid #F1F5F9' }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: '13.5px', color: '#0F172A' }}>Tamper Sensor Clasp Tripping</div>
              <div style={{ fontSize: '12px', color: '#64748B' }}>Trigger high-priority chime if the band wrist clasp is unfastened</div>
            </div>
            <label style={{ position: 'relative', display: 'inline-block', width: '44px', height: '24px', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                checked={tamperAlerts} 
                onChange={(e) => setTamperAlerts(e.target.checked)} 
                style={{ opacity: 0, width: 0, height: 0 }}
              />
              <span 
                style={{ 
                  position: 'absolute', 
                  inset: 0, 
                  backgroundColor: tamperAlerts ? '#0F172A' : '#CBD5E1', 
                  borderRadius: '9999px', 
                  transition: '0.2s' 
                }}
              >
                <span 
                  style={{ 
                    position: 'absolute', 
                    height: '18px', 
                    width: '18px', 
                    left: tamperAlerts ? '23px' : '3px', 
                    bottom: '3px', 
                    backgroundColor: 'white', 
                    borderRadius: '50%', 
                    transition: '0.2s' 
                  }} 
                />
              </span>
            </label>
          </div>

          {/* SOS SMS */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: '13.5px', color: '#0F172A' }}>Automated SOS SMS Broadcast</div>
              <div style={{ fontSize: '12px', color: '#64748B' }}>Send instant emergency coordinates via SMS to all emergency contacts</div>
            </div>
            <label style={{ position: 'relative', display: 'inline-block', width: '44px', height: '24px', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                checked={sosSms} 
                onChange={(e) => setSosSms(e.target.checked)} 
                style={{ opacity: 0, width: 0, height: 0 }}
              />
              <span 
                style={{ 
                  position: 'absolute', 
                  inset: 0, 
                  backgroundColor: sosSms ? '#0F172A' : '#CBD5E1', 
                  borderRadius: '9999px', 
                  transition: '0.2s' 
                }}
              >
                <span 
                  style={{ 
                    position: 'absolute', 
                    height: '18px', 
                    width: '18px', 
                    left: sosSms ? '23px' : '3px', 
                    bottom: '3px', 
                    backgroundColor: 'white', 
                    borderRadius: '50%', 
                    transition: '0.2s' 
                  }} 
                />
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* GPS Telemetry Hardware Preferences */}
      <div className="subpage-card">
        <div className="section-card-header">
          <h3 className="section-card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Shield size={18} color="#16A34A" />
            <span>GPS Tracking Interval & Precision</span>
          </h3>
        </div>

        <div style={{ marginTop: '12px' }}>
          <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, marginBottom: '8px' }}>
            Broadcasting Interval
          </label>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {['10s (High Precision)', '15s (Optimal / Default)', '30s (Battery Saver)', '60s (Ultra Eco)'].map((opt) => {
              const val = opt.split(' ')[0];
              const isSelected = refreshInterval === val;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setRefreshInterval(val)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '8px',
                    fontSize: '12.5px',
                    fontWeight: 600,
                    border: isSelected ? '1px solid #0F172A' : '1px solid #CBD5E1',
                    backgroundColor: isSelected ? '#0F172A' : '#FFFFFF',
                    color: isSelected ? '#FFFFFF' : '#475569'
                  }}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Guardian Emergency Contacts */}
      <div className="subpage-card">
        <div className="section-card-header">
          <h3 className="section-card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Phone size={18} color="#DC2626" />
            <span>Registered Guardians & Emergency Contacts</span>
          </h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', background: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: '13.5px', color: '#0F172A' }}>Sarah Chen (You)</div>
              <div style={{ fontSize: '12px', color: '#64748B' }}>Primary Guardian • sarah@example.com • +1 (555) 019-2830</div>
            </div>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#16A34A', background: '#DCFCE7', padding: '2px 8px', borderRadius: '4px' }}>
              Primary Verified
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', background: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: '13.5px', color: '#0F172A' }}>Mark Chen</div>
              <div style={{ fontSize: '12px', color: '#64748B' }}>Secondary Guardian • mark.chen@example.com • +1 (555) 019-2831</div>
            </div>
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#475569', background: '#F1F5F9', padding: '2px 8px', borderRadius: '4px' }}>
              Secondary Contact
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
