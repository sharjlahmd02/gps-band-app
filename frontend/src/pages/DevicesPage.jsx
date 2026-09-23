import React from 'react';
import { Cpu, RefreshCw, Volume2, ShieldCheck, BatteryCharging, Wifi, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const DevicesPage = () => {
  const { children, pingBand, addToast } = useApp();

  const handleSyncDiagnostics = (bandId) => {
    addToast(`Syncing telemetry diagnostics for Band ${bandId}... Everything nominal!`, 'success');
  };

  return (
    <div className="page-container">
      <div className="page-header-row">
        <div className="page-title-group">
          <h1 className="page-title">Paired GPS Bands & Hardware</h1>
          <p className="page-description">Hardware diagnostics, biometric sensors, tamper clasps, and telemetry links.</p>
        </div>
      </div>

      <div className="devices-grid">
        {children.map((child) => (
          <div key={child.device.id} className="device-card">
            <div className="device-header">
              <div className="device-icon-box">
                <Cpu size={24} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <h3 style={{ margin: 0, fontSize: '16px', color: '#0F172A' }}>{child.device.name}</h3>
                  <span style={{ fontSize: '12px', background: '#DCFCE7', color: '#16A34A', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>
                    Online
                  </span>
                </div>
                <span style={{ fontSize: '12.5px', color: '#64748B' }}>Serial: {child.device.id} • Assigned to {child.name}</span>
              </div>
            </div>

            <div className="device-spec-list">
              <div className="device-spec-item">
                <span className="spec-label">Battery Level:</span>
                <span className="spec-val" style={{ color: child.battery < 20 ? '#DC2626' : '#16A34A' }}>
                  {child.battery}% {child.battery < 20 ? '⚠️ Low' : '✓ Normal'}
                </span>
              </div>
              <div className="device-spec-item">
                <span className="spec-label">Signal Telemetry:</span>
                <span className="spec-val">{child.device.signal}</span>
              </div>
              <div className="device-spec-item">
                <span className="spec-label">Clasp Sensor:</span>
                <span className="spec-val">{child.device.tamperStatus}</span>
              </div>
              <div className="device-spec-item">
                <span className="spec-label">Firmware Build:</span>
                <span className="spec-val">{child.device.firmware} (Latest)</span>
              </div>
              <div className="device-spec-item">
                <span className="spec-label">Water Resistance:</span>
                <span className="spec-val">{child.device.waterproof}</span>
              </div>
              <div className="device-spec-item">
                <span className="spec-label">Last Synchronization:</span>
                <span className="spec-val">{child.device.lastSync}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                className="child-btn-secondary"
                onClick={() => pingBand(child.name, child.device.id)}
                title="Play acoustic buzzer tone on child band"
              >
                <Volume2 size={16} />
                <span>Test Buzzer Alarm</span>
              </button>

              <button 
                className="child-btn-primary"
                onClick={() => handleSyncDiagnostics(child.device.id)}
                title="Force refresh device telemetry"
              >
                <RefreshCw size={16} />
                <span>Sync Now</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
