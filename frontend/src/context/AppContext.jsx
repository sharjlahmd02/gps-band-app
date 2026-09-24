import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { INITIAL_CHILDREN, INITIAL_ALERTS, INITIAL_SAFE_ZONES, CURRENT_USER } from '../data/mockData';

const AppContext = createContext();

// Simple Web Audio API sound generator for interactive feedback (SOS Siren & Buzzer Beep)
const playSoundEffect = (type) => {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (type === 'beep') {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, audioCtx.currentTime); // A5 note
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.3);
    } else if (type === 'siren') {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(600, audioCtx.currentTime);
      osc.frequency.linearRampToValueAtTime(1200, audioCtx.currentTime + 0.4);
      osc.frequency.linearRampToValueAtTime(600, audioCtx.currentTime + 0.8);
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 1.2);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 1.2);
    }
  } catch (e) {
    console.log('AudioContext not supported or blocked:', e);
  }
};

export const AppProvider = ({ children: appChildren }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState('dashboard');
  const [children, setChildren] = useState(INITIAL_CHILDREN);
  const [alerts, setAlerts] = useState(INITIAL_ALERTS);
  const [safeZones, setSafeZones] = useState(INITIAL_SAFE_ZONES);
  const [currentUser] = useState(CURRENT_USER);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [activeModal, setActiveModal] = useState(null);
  const [isDemoPlaying, setIsDemoPlaying] = useState(false);

  // Sync activeTab with current router location
  useEffect(() => {
    const path = location.pathname.replace(/^\//, '') || 'dashboard';
    setActiveTab(path);
  }, [location.pathname]);

  // Add toast notification
  const addToast = (message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  // Switch navigation page and update URL
  const navigateTo = (tabName) => {
    setActiveTab(tabName);
    setMobileMenuOpen(false);
    const target = tabName === 'dashboard' ? '/' : `/${tabName}`;
    navigate(target);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Resolve an alert
  const resolveAlert = (alertId) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === alertId ? { ...a, status: 'resolved', isResolved: true } : a))
    );
    addToast('Alert marked as resolved!', 'success');
    closeModal();
  };

  // Toggle safe zone active status
  const toggleSafeZone = (zoneId) => {
    setSafeZones((prev) =>
      prev.map((zone) => {
        if (zone.id === zoneId) {
          const newStatus = zone.status === 'active' ? 'inactive' : 'active';
          addToast(`"${zone.name}" is now ${newStatus}`, newStatus === 'active' ? 'success' : 'warning');
          return { ...zone, status: newStatus };
        }
        return zone;
      })
    );
  };

  // Ping child band
  const pingBand = (childName, deviceId) => {
    playSoundEffect('beep');
    addToast(`Pinging ${childName}'s band (${deviceId})... Signal received!`, 'success');
  };

  // Trigger SOS alarm
  const triggerSOSAlarm = () => {
    playSoundEffect('siren');
    addToast('CRITICAL: Emergency Alert Dispatched & Siren Sounded!', 'danger');
  };

  // Open & Close modal
  const openModal = (modalConfig) => setActiveModal(modalConfig);
  const closeModal = () => setActiveModal(null);

  // Demo Movement Simulation
  useEffect(() => {
    let interval;
    if (isDemoPlaying) {
      interval = setInterval(() => {
        setChildren((prev) =>
          prev.map((c) => ({
            ...c,
            coords: {
              lat: c.coords.lat + (Math.random() - 0.5) * 0.0006,
              lng: c.coords.lng + (Math.random() - 0.5) * 0.0006
            }
          }))
        );
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [isDemoPlaying]);

  const toggleDemoMode = () => {
    setIsDemoPlaying((prev) => {
      const next = !prev;
      addToast(next ? 'Live GPS Simulation activated!' : 'Live GPS Simulation paused.', 'info');
      return next;
    });
  };

  const activeAlertCount = alerts.filter((a) => a.status === 'active').length;

  return (
    <AppContext.Provider
      value={{
        activeTab,
        navigateTo,
        children,
        alerts,
        activeAlertCount,
        safeZones,
        currentUser,
        mobileMenuOpen,
        setMobileMenuOpen,
        toasts,
        addToast,
        activeModal,
        openModal,
        closeModal,
        resolveAlert,
        toggleSafeZone,
        pingBand,
        triggerSOSAlarm,
        isDemoPlaying,
        toggleDemoMode,
        playSoundEffect
      }}
    >
      {appChildren}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
