import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import { DashboardPage } from './pages/DashboardPage';
import { ChildrenPage } from './pages/ChildrenPage';
import { LiveLocationPage } from './pages/LiveLocationPage';
import { AlertsPage } from './pages/AlertsPage';
import { SafeZonesPage } from './pages/SafeZonesPage';
import { DevicesPage } from './pages/DevicesPage';
import { EmergencySOSPage } from './pages/EmergencySOSPage';
import { ReportsPage } from './pages/ReportsPage';
import { SafetyAnalyticsPage } from './pages/SafetyAnalyticsPage';
import { SettingsPage } from './pages/SettingsPage';
import { Modal } from './components/Modal';
import { ToastNotification } from './components/ToastNotification';
import './styles/layout.css';
import './styles/dashboard.css';
import './styles/pages.css';

export default function App() {
  return (
    <div className="app-layout">
      {/* 1. Sidebar with 1:1 Figma design and SPA navigation */}
      <Sidebar />

      {/* 2. Main Content Area */}
      <div className="main-wrapper">
        <main className="main-content">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/dashboard" element={<Navigate to="/" replace />} />
            <Route path="/children" element={<ChildrenPage />} />
            <Route path="/live-location" element={<LiveLocationPage />} />
            <Route path="/alerts" element={<AlertsPage />} />
            <Route path="/safe-zones" element={<SafeZonesPage />} />
            <Route path="/devices" element={<DevicesPage />} />
            <Route path="/emergency" element={<EmergencySOSPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/safety-analytics" element={<SafetyAnalyticsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            {/* Fallback to Dashboard */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>

      {/* 3. Global Interactive Modals & Toast Notifications */}
      <Modal />
      <ToastNotification />
    </div>
  );
}
