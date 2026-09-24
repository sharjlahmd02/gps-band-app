import React from 'react';
import { Plus, MapPin, Watch, User, AlertTriangle } from 'lucide-react';
import { Header } from '../components/Header';
import { useApp } from '../context/AppContext';

export const ChildrenPage = () => {
  const { children, navigateTo, openModal, addToast, pingBand } = useApp();

  const handleAddChild = () => {
    openModal({
      title: 'Pair New GPS Band & Child Profile',
      body: (
        <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>Child Full Name</label>
            <input 
              type="text" 
              placeholder="e.g. Noah Chen" 
              style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>Band Serial Number (QR Code)</label>
            <input 
              type="text" 
              placeholder="e.g. SW-7719-X" 
              style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>Assigned Primary Safe Zone</label>
            <select style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}>
              <option>Lincoln Elementary School</option>
              <option>Riverside Park</option>
              <option>Home Sanctuary</option>
            </select>
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

  const handleProfileClick = (child) => {
    openModal({
      title: `${child.name} - Profile & Band Diagnostics`,
      body: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <img 
              src={child.avatar} 
              alt={child.name} 
              style={{ width: '56px', height: '56px', borderRadius: '14px', objectFit: 'cover' }} 
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ margin: 0, fontSize: '17px', color: '#0F172A' }}>{child.name}</h3>
                <span 
                  style={{ 
                    fontSize: '11px', 
                    padding: '2px 8px', 
                    borderRadius: '9999px',
                    backgroundColor: child.gender === 'boy' ? '#E0F2FE' : '#FCE7F3',
                    color: child.gender === 'boy' ? '#0284C7' : '#BE185D',
                    fontWeight: 600
                  }}
                >
                  Age {child.age}
                </span>
              </div>
              <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#64748B' }}>{child.location}</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', fontSize: '13px' }}>
            <div style={{ background: '#F8FAFC', padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <span style={{ color: '#64748B', display: 'block', fontSize: '11px' }}>GPS Band Model</span>
              <strong>{child.device.name}</strong>
            </div>
            <div style={{ background: '#F8FAFC', padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <span style={{ color: '#64748B', display: 'block', fontSize: '11px' }}>Signal Strength</span>
              <strong style={{ color: '#16A34A' }}>{child.device.signal}</strong>
            </div>
            <div style={{ background: '#F8FAFC', padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <span style={{ color: '#64748B', display: 'block', fontSize: '11px' }}>Battery Charge</span>
              <strong style={{ color: child.battery < 20 ? '#DC2626' : '#2563EB' }}>
                {child.battery}% {child.battery < 20 ? '(Low Battery Alert)' : ''}
              </strong>
            </div>
            <div style={{ background: '#F8FAFC', padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <span style={{ color: '#64748B', display: 'block', fontSize: '11px' }}>Sensor Clasp</span>
              <strong style={{ color: '#16A34A' }}>{child.device.tamperStatus}</strong>
            </div>
          </div>
        </div>
      ),
      confirmText: 'Ping Band Buzzer',
      onConfirm: () => pingBand(child.name, child.device.id),
      secondaryText: 'Track on Live Map',
      onSecondary: () => navigateTo('live-location')
    });
  };

  const handleLocationClick = (child) => {
    addToast(`Locating ${child.name} on Live Map...`, 'info');
    navigateTo('live-location');
  };

  const sophia = children[0] || {
    id: 'sophia',
    name: 'Sophia Chen',
    age: 8,
    avatar: 'https://images.unsplash.com/photo-1517456793572-1d8efd6dc135?auto=format&fit=crop&w=200&h=200&q=80',
    location: 'Lincoln Elementary School, 123 Oak...',
    battery: 12
  };

  const liam = children[1] || {
    id: 'liam',
    name: 'Liam Torres',
    age: 10,
    avatar: 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?auto=format&fit=crop&w=200&h=200&q=80',
    location: 'Riverside Park, near fountain',
    battery: 74
  };

  return (
    <div className="page-container">
      {/* 1. Top Header: Children Title & 2 Active Alerts badge */}
      <Header title="Children" />

      {/* 2. Subheader row: Count & + Add Child button */}
      <div className="children-header-subrow">
        <span className="children-count-badge">2 children registered</span>
        <button 
          className="add-child-action-btn"
          onClick={handleAddChild}
          id="btn-add-child"
        >
          <Plus size={16} strokeWidth={2.2} />
          <span>Add Child</span>
        </button>
      </div>

      {/* 3. 2-Column Children Cards Grid matching Figma */}
      <div className="figma-children-grid">
        {/* Card 1: Sophia Chen */}
        <div className="figma-child-card" id="card-sophia">
          <div className="card-top-accent accent-pink" />
          
          <div className="figma-child-card-body">
            <div className="figma-child-top">
              <div className="figma-child-avatar-wrap border-pink">
                <img src={sophia.avatar} alt={sophia.name} className="figma-child-avatar" />
              </div>

              <div className="figma-child-info">
                <h2 className="figma-child-name">{sophia.name}</h2>
                <span className="figma-child-age">Age {sophia.age}</span>

                <div className="figma-child-pills">
                  <span className="figma-gender-pill girl">
                    <span>👧</span>
                    <span>Girl</span>
                  </span>

                  <span className="figma-alert-badge">
                    <AlertTriangle size={12} strokeWidth={2.5} />
                    <span>Alert</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="figma-child-details">
              <div className="figma-detail-row">
                <MapPin size={16} className="figma-detail-icon" />
                <span>Lincoln Elementary School, 123 Oak...</span>
              </div>

              <div className="figma-detail-row">
                <Watch size={16} className="figma-detail-icon" />
                <span>
                  Sophia's Band <strong style={{ color: '#DC2626', fontWeight: 700 }}>12%</strong>
                </span>
              </div>
            </div>

            <div className="figma-card-actions">
              <button 
                className="figma-btn-profile"
                onClick={() => handleProfileClick(sophia)}
                id="btn-profile-sophia"
              >
                <User size={15} />
                <span>Profile</span>
              </button>

              <button 
                className="figma-btn-location btn-pink"
                onClick={() => handleLocationClick(sophia)}
                id="btn-location-sophia"
              >
                <MapPin size={15} />
                <span>Location</span>
              </button>
            </div>
          </div>
        </div>

        {/* Card 2: Liam Torres */}
        <div className="figma-child-card" id="card-liam">
          <div className="card-top-accent accent-blue" />

          <div className="figma-child-card-body">
            <div className="figma-child-top">
              <div className="figma-child-avatar-wrap border-blue">
                <img src={liam.avatar} alt={liam.name} className="figma-child-avatar" />
              </div>

              <div className="figma-child-info">
                <h2 className="figma-child-name">{liam.name}</h2>
                <span className="figma-child-age">Age {liam.age}</span>

                <div className="figma-child-pills">
                  <span className="figma-gender-pill boy">
                    <span>👦</span>
                    <span>Boy</span>
                  </span>

                  <span className="figma-alert-badge">
                    <AlertTriangle size={12} strokeWidth={2.5} />
                    <span>Alert</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="figma-child-details">
              <div className="figma-detail-row">
                <MapPin size={16} className="figma-detail-icon" />
                <span>Riverside Park, near fountain</span>
              </div>

              <div className="figma-detail-row">
                <Watch size={16} className="figma-detail-icon" />
                <span>
                  Liam's Band <strong style={{ color: '#475569', fontWeight: 600 }}>74%</strong>
                </span>
              </div>
            </div>

            <div className="figma-card-actions">
              <button 
                className="figma-btn-profile"
                onClick={() => handleProfileClick(liam)}
                id="btn-profile-liam"
              >
                <User size={15} />
                <span>Profile</span>
              </button>

              <button 
                className="figma-btn-location btn-blue"
                onClick={() => handleLocationClick(liam)}
                id="btn-location-liam"
              >
                <MapPin size={15} />
                <span>Location</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
