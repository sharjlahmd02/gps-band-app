import React from 'react';
import { Sidebar } from './components/Sidebar';
import { DashboardPage } from './pages/DashboardPage';
import { ChildrenPage } from './pages/ChildrenPage';
import { LiveLocationPage } from './pages/LiveLocationPage';
import { AlertsPage } from './pages/AlertsPage';
import { SafeZonesPage } from './pages/SafeZonesPage';
import { DevicesPage } from './pages/DevicesPage';
import { EmergencySOSPage } from './pages/EmergencySOSPage';
import { Modal } from './components/Modal';
import { ToastNotification } from './components/ToastNotification';
import { useApp } from './context/AppContext';
import './styles/layout.css';
import './styles/dashboard.css';
import './styles/pages.css';

export const App = () => {
  const { activeTab } = useApp();

  const renderActivePage = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardPage />;
      case 'children':
        return <ChildrenPage />;
      case 'live-location':
        return <LiveLocationPage />;
      case 'alerts':
        return <AlertsPage />;
      case 'safe-zones':
        return <SafeZonesPage />;
      case 'devices':
        return <DevicesPage />;
      case 'emergency':
        return <EmergencySOSPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="app-layout">
      {/* 1. Sidebar matching Figma */}
      <Sidebar />

      {/* 2. Main content view */}
      <div className="main-wrapper">
        <main className="main-content">
          {renderActivePage()}
        </main>
      </div>

      {/* 3. Global Interactive Modals & Toast Feedback */}
      <Modal />
      <ToastNotification />
    </div>
  );
};

export default App;
