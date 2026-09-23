import React, { useState } from 'react';
import { 
  Navigation, 
  Layers, 
  ZoomIn, 
  ZoomOut, 
  Home, 
  Crosshair, 
  ShieldCheck, 
  Activity 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const LiveLocationPage = () => {
  const { 
    children, 
    safeZones, 
    toggleDemoMode, 
    isDemoPlaying, 
    pingBand, 
    openModal, 
    addToast 
  } = useApp();

  const [selectedChild, setSelectedChild] = useState('all');
  const [showGeofences, setShowGeofences] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);

  const handleZoom = (delta) => {
    setZoomLevel((prev) => Math.min(Math.max(prev + delta, 0.8), 1.6));
    addToast(`Map Zoom: ${Math.round((zoomLevel + delta) * 100)}%`, 'info');
  };

  const handleInspectLocation = (child) => {
    openModal({
      title: `GPS Telemetry: ${child.name}`,
      body: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div><strong>Location:</strong> {child.location}</div>
          <div><strong>Coordinates:</strong> {child.coords.lat.toFixed(5)}° N, {child.coords.lng.toFixed(5)}° W</div>
          <div><strong>Speed:</strong> {isDemoPlaying ? '1.8 km/h (Walking)' : '0.0 km/h (Stationary)'}</div>
          <div><strong>Satellite Fix:</strong> 9 Satellites (GLONASS + GPS L1/L5)</div>
          <div><strong>Safe Zone Status:</strong> {child.inSafeZone ? 'Inside Safe Boundary' : '⚠️ Outside Boundary'}</div>
        </div>
      ),
      confirmText: 'Ping Band Buzzer',
      onConfirm: () => pingBand(child.name, child.device.id)
    });
  };

  return (
    <div className="page-container">
      <div className="page-header-row">
        <div className="page-title-group">
          <h1 className="page-title">Live Location Map</h1>
          <p className="page-description">Real-time GPS satellite positioning, geofence perimeters, and breadcrumb trails.</p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            className="page-action-btn"
            style={{ background: isDemoPlaying ? '#16A34A' : '#0F172A' }}
            onClick={toggleDemoMode}
            id="btn-live-gps-simulation"
          >
            <Activity size={16} />
            <span>{isDemoPlaying ? 'Simulation Running' : 'Start GPS Simulation'}</span>
          </button>
        </div>
      </div>

      <div className="full-map-card">
        {/* Floating Controls Left */}
        <div className="map-floating-panel">
          <div className="map-filter-toggle">
            <button 
              className={`map-toggle-btn ${selectedChild === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedChild('all')}
            >
              All Children
            </button>
            <button 
              className={`map-toggle-btn ${selectedChild === 'sophia' ? 'active' : ''}`}
              onClick={() => setSelectedChild('sophia')}
            >
              Sophia (Age 8)
            </button>
            <button 
              className={`map-toggle-btn ${selectedChild === 'liam' ? 'active' : ''}`}
              onClick={() => setSelectedChild('liam')}
            >
              Liam (Age 10)
            </button>
          </div>

          <button 
            onClick={() => {
              setShowGeofences(!showGeofences);
              addToast(showGeofences ? 'Geofences hidden' : 'Geofences visible', 'info');
            }}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px', 
              fontSize: '12px', 
              padding: '6px 10px',
              borderRadius: '6px',
              background: showGeofences ? '#DCFCE7' : '#F1F5F9',
              color: showGeofences ? '#16A34A' : '#64748B',
              fontWeight: 600
            }}
          >
            <ShieldCheck size={14} />
            <span>{showGeofences ? 'Geofences ON' : 'Geofences OFF'}</span>
          </button>
        </div>

        {/* Floating Zoom & Center Controls Right */}
        <div className="map-controls-floating">
          <button className="map-ctrl-btn" onClick={() => handleZoom(0.2)} title="Zoom In">
            <ZoomIn size={18} />
          </button>
          <button className="map-ctrl-btn" onClick={() => handleZoom(-0.2)} title="Zoom Out">
            <ZoomOut size={18} />
          </button>
          <button 
            className="map-ctrl-btn" 
            onClick={() => {
              setZoomLevel(1);
              addToast('Map re-centered to Home', 'info');
            }} 
            title="Center on Home"
          >
            <Crosshair size={18} />
          </button>
        </div>

        {/* Map Canvas Background SVG */}
        <svg 
          className="map-bg-grid" 
          viewBox="0 0 1000 600" 
          preserveAspectRatio="none"
          style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center', transition: 'transform 0.2s ease-out' }}
        >
          {/* Base terrain */}
          <rect width="1000" height="600" fill="#E8EFE9" />
          
          {/* Riverside Park green zone */}
          <rect x="520" y="320" width="380" height="220" rx="16" fill="#D5E8D4" opacity="0.85" />
          {/* Lincoln Elementary Campus zone */}
          <rect x="80" y="60" width="340" height="240" rx="16" fill="#D5E8D4" opacity="0.85" />

          {/* Broad Highways */}
          <path d="M 0 180 L 1000 180" stroke="#FFFFFF" strokeWidth="24" />
          <path d="M 0 380 L 1000 380" stroke="#FFFFFF" strokeWidth="26" />
          <path d="M 280 0 L 280 600" stroke="#FFFFFF" strokeWidth="24" />
          <path d="M 680 0 L 680 600" stroke="#FFFFFF" strokeWidth="26" />

          {/* Secondary streets */}
          <path d="M 0 90 L 1000 90" stroke="#F8FAFC" strokeWidth="10" />
          <path d="M 0 280 L 1000 280" stroke="#F8FAFC" strokeWidth="12" />
          <path d="M 0 490 L 1000 490" stroke="#F8FAFC" strokeWidth="10" />
          <path d="M 140 0 L 140 600" stroke="#F8FAFC" strokeWidth="10" />
          <path d="M 480 0 L 480 600" stroke="#F8FAFC" strokeWidth="14" />
          <path d="M 850 0 L 850 600" stroke="#F8FAFC" strokeWidth="10" />

          {/* River / Marina */}
          <path d="M 0 540 Q 300 480 550 550 T 1000 510" fill="none" stroke="#BFDBFE" strokeWidth="22" opacity="0.75" />

          {/* Geofence Perimeter Circles */}
          {showGeofences && (
            <>
              {/* Home Zone */}
              <circle cx="480" cy="280" r="70" fill="rgba(139, 92, 246, 0.12)" stroke="#8B5CF6" strokeWidth="2" strokeDasharray="6,4" />
              {/* Lincoln Elementary Zone */}
              <circle cx="220" cy="180" r="110" fill="rgba(59, 130, 246, 0.12)" stroke="#3B82F6" strokeWidth="2" strokeDasharray="6,4" />
              {/* Riverside Park Zone */}
              <circle cx="700" cy="420" r="130" fill="rgba(16, 185, 129, 0.12)" stroke="#10B981" strokeWidth="2" strokeDasharray="6,4" />
            </>
          )}

          {/* Breadcrumb Path History */}
          <polyline 
            points="220,240 240,210 220,180" 
            fill="none" 
            stroke="#EC4899" 
            strokeWidth="3" 
            strokeDasharray="4,4" 
            opacity="0.8" 
          />
          <polyline 
            points="620,380 660,400 700,420" 
            fill="none" 
            stroke="#3B82F6" 
            strokeWidth="3" 
            strokeDasharray="4,4" 
            opacity="0.8" 
          />
        </svg>

        {/* Center Marker: YOU (Home) */}
        <div 
          className="map-pin-you" 
          style={{ top: '48%', left: '48%' }}
          title="Home Sanctuary (742 Evergreen Terrace)"
        >
          <div className="you-ring-outer">
            <div className="you-circle-inner">
              <Home size={15} strokeWidth={2.5} />
            </div>
          </div>
          <span className="you-pill-label">Home Sanctuary</span>
        </div>

        {/* Sophia Chen Marker */}
        {(selectedChild === 'all' || selectedChild === 'sophia') && children[0] && (
          <div 
            className="map-pin-child"
            style={{ 
              top: isDemoPlaying ? '32%' : '30%', 
              left: isDemoPlaying ? '24%' : '22%' 
            }}
            onClick={() => handleInspectLocation(children[0])}
            title={`${children[0].name} - Click for telemetry`}
          >
            <div className="child-marker-badge" style={{ borderColor: '#EC4899', width: '36px', height: '36px' }}>
              <img src={children[0].avatar} alt={children[0].name} />
            </div>
            <span className="child-pin-tag" style={{ background: '#EC4899' }}>
              Sophia ({children[0].battery}%)
            </span>
          </div>
        )}

        {/* Liam Torres Marker */}
        {(selectedChild === 'all' || selectedChild === 'liam') && children[1] && (
          <div 
            className="map-pin-child"
            style={{ 
              top: isDemoPlaying ? '72%' : '70%', 
              left: isDemoPlaying ? '72%' : '70%' 
            }}
            onClick={() => handleInspectLocation(children[1])}
            title={`${children[1].name} - Click for telemetry`}
          >
            <div className="child-marker-badge" style={{ borderColor: '#3B82F6', width: '36px', height: '36px' }}>
              <img src={children[1].avatar} alt={children[1].name} />
            </div>
            <span className="child-pin-tag" style={{ background: '#3B82F6' }}>
              Liam ({children[1].battery}%)
            </span>
          </div>
        )}
      </div>

      {/* Bottom Telemetry summary cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        {children.map((child) => (
          <div 
            key={child.id} 
            className="subpage-card" 
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <img src={child.avatar} alt={child.name} style={{ width: '42px', height: '42px', borderRadius: '10px' }} />
              <div>
                <h4 style={{ margin: 0, fontSize: '14px' }}>{child.name}</h4>
                <p style={{ margin: 0, fontSize: '12px', color: '#64748B' }}>{child.location}</p>
              </div>
            </div>
            <button 
              className="page-action-btn"
              style={{ padding: '6px 12px', fontSize: '12px' }}
              onClick={() => handleInspectLocation(child)}
            >
              Inspect
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
