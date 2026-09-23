import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import LiveLocation from './pages/LiveLocation';
import Dashboard from './pages/Dashboard';
import Children from './pages/Children';
import Alerts from './pages/Alerts';
import SafeZones from './pages/SafeZones';
import Devices from './pages/Devices';
import Emergency from './pages/Emergency';
import PoliceStation from './pages/PoliceStation';
import Reports from './pages/Reports';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const getPageTitle = (pathname) => {
    switch (pathname) {
      case '/':
        return 'Dashboard';
      case '/live-location':
        return 'Live Location';
      case '/children':
        return 'Children';
      case '/alerts':
        return 'Alerts';
      case '/safe-zones':
        return 'Safe Zones';
      case '/devices':
        return 'Devices';
      case '/emergency':
        return 'Emergency / SOS';
      case '/police-station':
        return 'Police Station';
      case '/reports':
        return 'Reports';
      case '/safety-analytics':
        return 'Safety Analytics';
      case '/settings':
        return 'Settings';
      default:
        return 'Live Location';
    }
  };

  const currentTitle = getPageTitle(location.pathname);

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      {/* Sidebar with seamless SPA navigation links */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <Header
          title={currentTitle}
          onOpenSidebar={() => setSidebarOpen(true)}
        />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/live-location" element={<LiveLocation />} />
            <Route path="/children" element={<Children />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/safe-zones" element={<SafeZones />} />
            <Route path="/devices" element={<Devices />} />
            <Route path="/emergency" element={<Emergency />} />
            <Route path="/police-station" element={<PoliceStation />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/safety-analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
            {/* Fallback to live location */}
            <Route path="*" element={<LiveLocation />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

