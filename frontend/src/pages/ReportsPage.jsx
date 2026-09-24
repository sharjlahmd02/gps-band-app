import React, { useState } from 'react';
import { BarChart2, Calendar, Download, FileText, Filter, CheckCircle2, FileDown } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ReportsPage = () => {
  const { addToast, openModal } = useApp();

  const [reports] = useState([
    {
      id: 1,
      title: 'Weekly Movement & SafeZone Compliance',
      description: 'Comprehensive geofence boundary audits for Sophia and Liam.',
      period: 'Sep 16 - Sep 22, 2026',
      size: '1.2 MB',
      type: 'Compliance Audit',
      generatedDate: 'Sep 23, 2026'
    },
    {
      id: 2,
      title: 'Battery Health & Signal Diagnostics',
      description: 'Radio telemetry, charging cycles, and hardware uptime logs.',
      period: 'Sep 01 - Sep 15, 2026',
      size: '850 KB',
      type: 'Hardware Diagnostics',
      generatedDate: 'Sep 16, 2026'
    },
    {
      id: 3,
      title: 'SOS & Geofence Incident Log',
      description: 'Historical archive of all triggered alarms, contact pings, and resolution timestamps.',
      period: 'August 2026',
      size: '2.4 MB',
      type: 'Incident Report',
      generatedDate: 'Sep 01, 2026'
    },
    {
      id: 4,
      title: 'School Hours Attendance & Sanctuary Logs',
      description: 'Lincoln Elementary arrival and departure timestamps matching safe zone enter/exit.',
      period: 'Sep 09 - Sep 20, 2026',
      size: '980 KB',
      type: 'Safe Zone Telemetry',
      generatedDate: 'Sep 21, 2026'
    }
  ]);

  const handleDownload = (rep) => {
    addToast(`Downloading "${rep.title}" (${rep.size})...`, 'success');
  };

  const handleGenerateReport = () => {
    openModal({
      title: 'Generate Custom Telemetry Report',
      body: (
        <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>Select Child Profile</label>
            <select style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}>
              <option>All Monitored Children (Sophia & Liam)</option>
              <option>Sophia Chen</option>
              <option>Liam Torres</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>Report Type</label>
            <select style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}>
              <option>Full Comprehensive Safety Audit</option>
              <option>Geofence Enter / Exit Compliance</option>
              <option>Battery Health & GPS Signal Diagnostic</option>
              <option>Emergency SOS Dispatch Records</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>Date Range</label>
            <input 
              type="text" 
              defaultValue="Last 7 Days (Sep 17 - Sep 24, 2026)"
              style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
            />
          </div>
        </form>
      ),
      confirmText: 'Generate & Export PDF',
      onConfirm: () => {
        addToast('Custom Telemetry PDF Report generated and ready for export!', 'success');
      }
    });
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header-row">
        <div className="page-title-group">
          <h1 className="page-title">Reports & Data Exports</h1>
          <p className="page-description">Download telemetry summaries, geofence compliance audits, and route histories.</p>
        </div>

        <button 
          className="page-action-btn"
          onClick={handleGenerateReport}
          id="btn-generate-report"
        >
          <FileDown size={16} />
          <span>Generate Report</span>
        </button>
      </div>

      {/* Reports List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {reports.map((rep) => (
          <div 
            key={rep.id} 
            className="subpage-card" 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              padding: '20px 24px',
              gap: '16px',
              flexWrap: 'wrap'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', minWidth: '280px' }}>
              <div 
                style={{ 
                  width: '44px', 
                  height: '44px', 
                  borderRadius: '12px', 
                  backgroundColor: '#F1F5F9', 
                  color: '#0F172A',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <BarChart2 size={22} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0F172A' }}>{rep.title}</h3>
                  <span style={{ fontSize: '11px', fontWeight: 600, background: '#F1F5F9', color: '#475569', padding: '2px 8px', borderRadius: '9999px' }}>
                    {rep.type}
                  </span>
                </div>
                <p style={{ margin: '4px 0 0', fontSize: '12.5px', color: '#64748B' }}>{rep.description}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '6px', fontSize: '12px', color: '#94A3B8' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={13} />
                    <span>{rep.period}</span>
                  </span>
                  <span>•</span>
                  <span>{rep.size}</span>
                  <span>•</span>
                  <span>Generated {rep.generatedDate}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleDownload(rep)}
              className="page-action-btn"
              style={{ background: '#FFFFFF', color: '#0F172A', border: '1px solid #CBD5E1' }}
              title={`Download ${rep.title}`}
            >
              <Download size={15} />
              <span>Download PDF</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
