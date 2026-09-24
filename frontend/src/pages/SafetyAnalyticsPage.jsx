import React from 'react';
import { Activity, TrendingUp, ShieldCheck, Zap, Clock, AlertCircle, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SafetyAnalyticsPage = () => {
  const { addToast } = useApp();

  const handleExportInsights = () => {
    addToast('Exporting Safety Analytics Report (PDF)...', 'success');
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header-row">
        <div className="page-title-group">
          <h1 className="page-title">Safety Analytics & Intelligence</h1>
          <p className="page-description">Real-time risk evaluation, geofence compliance statistics, and telemetry trends.</p>
        </div>

        <button 
          className="page-action-btn"
          onClick={handleExportInsights}
        >
          <TrendingUp size={16} />
          <span>Export Analytics</span>
        </button>
      </div>

      {/* Top 3 KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '18px' }}>
        {/* Safety Index */}
        <div className="metric-card card-green" style={{ minHeight: '120px' }}>
          <div className="metric-top">
            <span className="metric-label">SAFETY INDEX</span>
            <div className="metric-icon-circle icon-green">
              <ShieldCheck size={16} strokeWidth={2} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span className="metric-value val-green">98.4%</span>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#16A34A', display: 'flex', alignItems: 'center' }}>
              <TrendingUp size={14} /> +1.2%
            </span>
          </div>
          <div className="metric-subtitle">High compliance across school and home zones</div>
        </div>

        {/* Avg Time in Safe Zones */}
        <div className="metric-card card-blue" style={{ minHeight: '120px' }}>
          <div className="metric-top">
            <span className="metric-label">AVG TIME IN SAFE ZONES</span>
            <div className="metric-icon-circle icon-blue">
              <Clock size={16} strokeWidth={2} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
            <span className="metric-value val-dark">7.8 hrs</span>
            <span style={{ fontSize: '13px', color: '#64748B' }}>/ day</span>
          </div>
          <div className="metric-subtitle">Typical weekday schedule adhered to</div>
        </div>

        {/* SOS Incident Count */}
        <div className="metric-card card-blue" style={{ minHeight: '120px' }}>
          <div className="metric-top">
            <span className="metric-label">SOS INCIDENT COUNT</span>
            <div className="metric-icon-circle icon-blue">
              <Activity size={16} strokeWidth={2} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span className="metric-value val-dark">0</span>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#16A34A', background: '#DCFCE7', padding: '1px 8px', borderRadius: '9999px' }}>
              Zero incidents
            </span>
          </div>
          <div className="metric-subtitle">Past 30 days active incident record</div>
        </div>
      </div>

      {/* Analytics Breakdown Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
        {/* Zone Adherence Breakdown */}
        <div className="subpage-card">
          <div className="section-card-header">
            <h3 className="section-card-title">Weekly Zone Adherence</h3>
            <span style={{ fontSize: '12px', color: '#16A34A', fontWeight: 600 }}>99.1% on target</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '10px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                <span style={{ fontWeight: 600 }}>Lincoln Elementary School</span>
                <span style={{ color: '#16A34A', fontWeight: 700 }}>99.4%</span>
              </div>
              <div className="battery-bar-track">
                <div className="battery-bar-fill" style={{ width: '99.4%', backgroundColor: '#16A34A' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                <span style={{ fontWeight: 600 }}>Home Sanctuary</span>
                <span style={{ color: '#16A34A', fontWeight: 700 }}>98.9%</span>
              </div>
              <div className="battery-bar-track">
                <div className="battery-bar-fill" style={{ width: '98.9%', backgroundColor: '#16A34A' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                <span style={{ fontWeight: 600 }}>Riverside Park</span>
                <span style={{ color: '#EAB308', fontWeight: 700 }}>92.1%</span>
              </div>
              <div className="battery-bar-track">
                <div className="battery-bar-fill" style={{ width: '92.1%', backgroundColor: '#EAB308' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Telemetry Response Metrics */}
        <div className="subpage-card">
          <div className="section-card-header">
            <h3 className="section-card-title">Band Telemetry Health</h3>
            <span style={{ fontSize: '12px', color: '#2563EB', fontWeight: 600 }}>Real-time Link</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '13px' }}>Average GPS Sync Latency</div>
                <div style={{ fontSize: '11.5px', color: '#64748B' }}>Band to Cloud Gateway</div>
              </div>
              <span style={{ fontWeight: 700, color: '#16A34A', fontSize: '14px' }}>1.2s</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '13px' }}>Guardian Alert Response Time</div>
                <div style={{ fontSize: '11.5px', color: '#64748B' }}>Average time to acknowledge alert</div>
              </div>
              <span style={{ fontWeight: 700, color: '#0F172A', fontSize: '14px' }}>3.8 min</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '13px' }}>Satellite Fix Quality</div>
                <div style={{ fontSize: '11.5px', color: '#64748B' }}>Average 14 lock-on satellites</div>
              </div>
              <span style={{ fontWeight: 700, color: '#16A34A', fontSize: '14px' }}>Optimal</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
