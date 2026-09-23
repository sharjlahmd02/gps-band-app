import React from 'react';
import { AlertTriangle, Siren, PhoneCall, Users, ShieldAlert, CheckSquare } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const EmergencySOSPage = () => {
  const { triggerSOSAlarm, addToast, openModal, children } = useApp();

  const handleCall911 = () => {
    openModal({
      title: 'Call Emergency Dispatch (911)',
      body: (
        <div>
          <p style={{ color: '#DC2626', fontWeight: 600 }}>Emergency Services Confirmation</p>
          <p style={{ fontSize: '13.5px' }}>
            Are you sure you want to dial Emergency Services (911)? Your child's real-time GPS coordinates and band telemetry will be sent to the local emergency dispatch center.
          </p>
        </div>
      ),
      confirmText: 'Confirm Emergency Call',
      confirmDanger: true,
      onConfirm: () => {
        addToast('Calling 911 Emergency Dispatch... Transmitting child GPS fixes.', 'danger');
      }
    });
  };

  const handleBroadcastFamily = () => {
    openModal({
      title: 'Broadcast Alert to All Contacts',
      body: (
        <p style={{ fontSize: '13.5px' }}>
          This sends high-priority SMS and Push Alerts to:
          <br />• <strong>David Chen (Father)</strong>: +1 (555) 019-2831
          <br />• <strong>Elena Torres (Aunt)</strong>: +1 (555) 441-9920
          <br />• <strong>Grandma Rose</strong>: +1 (555) 882-3114
        </p>
      ),
      confirmText: 'Send Broadcast Alert',
      confirmDanger: true,
      onConfirm: () => {
        addToast('Emergency SMS broadcast dispatched to 3 contacts!', 'warning');
      }
    });
  };

  return (
    <div className="page-container">
      {/* Red Emergency Hero Banner */}
      <div className="emergency-hero-banner">
        <div className="emergency-left">
          <div className="emergency-title">
            <AlertTriangle size={28} />
            <span>Emergency & SOS Response Console</span>
          </div>
          <p className="emergency-desc">
            Use these controls if your child is lost, unreachable, or in immediate danger. Actions trigger instant high-volume sound alarms, beacon broadcasts, and emergency dispatch.
          </p>
        </div>
        <button 
          className="page-action-btn"
          style={{ background: '#FFFFFF', color: '#DC2626', padding: '12px 20px', fontSize: '14px' }}
          onClick={triggerSOSAlarm}
          id="btn-trigger-siren-hero"
        >
          <Siren size={18} />
          <span>Sound Loud Siren Alarm</span>
        </button>
      </div>

      {/* Emergency Action Cards */}
      <div className="emergency-action-buttons">
        <div className="sos-action-card" onClick={triggerSOSAlarm} id="card-sos-siren">
          <div className="sos-card-top">
            <div className="sos-icon-box">
              <Siren size={20} />
            </div>
            <span className="sos-title">Sound Child Band Siren</span>
          </div>
          <p className="sos-desc">
            Triggers a 105 dB piercing siren alarm directly on the band speaker so bystanders can locate the child immediately.
          </p>
        </div>

        <div className="sos-action-card" onClick={handleCall911} id="card-call-911">
          <div className="sos-card-top">
            <div className="sos-icon-box" style={{ background: '#FEE2E2', color: '#DC2626' }}>
              <PhoneCall size={20} />
            </div>
            <span className="sos-title">Dial 911 Dispatch</span>
          </div>
          <p className="sos-desc">
            One-touch emergency call that automatically conveys live latitude and longitude fixes to emergency services.
          </p>
        </div>

        <div className="sos-action-card" onClick={handleBroadcastFamily} id="card-broadcast-family">
          <div className="sos-card-top">
            <div className="sos-icon-box" style={{ background: '#FFEDD5', color: '#EA580C' }}>
              <Users size={20} />
            </div>
            <span className="sos-title">Broadcast to Family Circle</span>
          </div>
          <p className="sos-desc">
            Send high-urgency SMS alerts and live tracking links to all designated emergency guardians at once.
          </p>
        </div>
      </div>

      {/* Emergency Checklist */}
      <div className="subpage-card">
        <h3 style={{ margin: '0 0 14px', fontSize: '16px', color: '#0F172A', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ShieldAlert size={18} color="#DC2626" />
          <span>Active Child Status Check</span>
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
          {children.map((child) => (
            <div 
              key={child.id} 
              style={{ 
                padding: '14px', 
                border: '1px solid #E2E8F0', 
                borderRadius: '10px', 
                background: '#F8FAFC',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img src={child.avatar} alt={child.name} style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                <div>
                  <h4 style={{ margin: 0, fontSize: '14px' }}>{child.name}</h4>
                  <span style={{ fontSize: '12px', color: '#64748B' }}>{child.location}</span>
                </div>
              </div>
              <button 
                className="page-action-btn danger" 
                style={{ padding: '6px 12px', fontSize: '12px' }}
                onClick={triggerSOSAlarm}
              >
                Alarm
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
