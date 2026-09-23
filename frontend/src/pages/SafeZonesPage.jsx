import React, { useState } from 'react';
import { ShieldCheck, Plus, School, Trees, Home, Dumbbell, MapPin } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SafeZonesPage = () => {
  const { safeZones, toggleSafeZone, addToast, openModal } = useApp();
  const [radii, setRadii] = useState({
    'sz-1': 300,
    'sz-2': 450,
    'sz-3': 150,
    'sz-4': 200
  });

  const handleRadiusChange = (zoneId, newRadius) => {
    setRadii((prev) => ({ ...prev, [zoneId]: newRadius }));
  };

  const handleAddZone = () => {
    openModal({
      title: 'Define New Geofence Safe Zone',
      body: (
        <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>Zone Title</label>
            <input 
              type="text" 
              placeholder="e.g. Grandparents House" 
              style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #CBD5E1' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>Center Address</label>
            <input 
              type="text" 
              placeholder="e.g. 500 Market St, San Francisco" 
              style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #CBD5E1' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>Default Radius (Meters)</label>
            <input 
              type="range" 
              min="50" 
              max="1000" 
              defaultValue="250" 
              style={{ width: '100%' }}
            />
          </div>
        </form>
      ),
      confirmText: 'Create Geofence',
      onConfirm: () => {
        addToast('Safe Zone geofence created and synced to cloud!', 'success');
      }
    });
  };

  const getZoneIcon = (icon) => {
    switch (icon) {
      case 'school': return School;
      case 'park': return Trees;
      case 'home': return Home;
      default: return Dumbbell;
    }
  };

  return (
    <div className="page-container">
      <div className="page-header-row">
        <div className="page-title-group">
          <h1 className="page-title">Safe Zones & Geofencing</h1>
          <p className="page-description">Virtual GPS perimeters. SafeWatch alerts you instantly when children enter or leave these zones.</p>
        </div>
        <button 
          className="page-action-btn"
          onClick={handleAddZone}
          id="btn-add-zone"
        >
          <Plus size={16} />
          <span>Add Safe Zone</span>
        </button>
      </div>

      <div className="safe-zones-grid">
        {safeZones.map((zone) => {
          const Icon = getZoneIcon(zone.icon);
          const currentRadius = radii[zone.id] || zone.radiusMeters;
          return (
            <div key={zone.id} className="zone-card">
              <div className="zone-header">
                <div className="zone-name-row">
                  <div className="zone-icon-box" style={{ color: zone.color }}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="zone-title">{zone.name}</h3>
                    <span style={{ fontSize: '12px', color: '#64748B' }}>{zone.address}</span>
                  </div>
                </div>

                <div 
                  className="zone-status-switch" 
                  onClick={() => toggleSafeZone(zone.id)}
                  title={`Toggle ${zone.name} ${zone.status === 'active' ? 'Off' : 'On'}`}
                >
                  <div className={`switch-track ${zone.status === 'active' ? 'active' : ''}`}>
                    <div className="switch-thumb" />
                  </div>
                </div>
              </div>

              {/* Radius slider */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px' }}>
                  <span style={{ color: '#64748B' }}>Perimeter Radius</span>
                  <strong>{currentRadius} meters</strong>
                </div>
                <input 
                  type="range"
                  min="50"
                  max="1000"
                  step="25"
                  value={currentRadius}
                  onChange={(e) => handleRadiusChange(zone.id, Number(e.target.value))}
                  style={{ width: '100%', accentColor: zone.color, cursor: 'pointer' }}
                />
              </div>

              {/* Assigned children */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '10px', borderTop: '1px solid #F1F5F9' }}>
                <span style={{ fontSize: '12px', color: '#64748B' }}>Assigned Profiles:</span>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {zone.assignedTo.map((name) => (
                    <span 
                      key={name} 
                      style={{ 
                        fontSize: '11px', 
                        background: '#F1F5F9', 
                        padding: '2px 8px', 
                        borderRadius: '9999px',
                        color: '#0F172A',
                        fontWeight: 500
                      }}
                    >
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
