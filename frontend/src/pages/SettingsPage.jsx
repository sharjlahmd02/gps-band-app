import React, { useState } from 'react';
import { 
  User, 
  Bell, 
  Phone, 
  Lock, 
  MapPin, 
  AlertTriangle, 
  Globe, 
  Palette, 
  LogOut, 
  Save, 
  Eye, 
  EyeOff, 
  Plus, 
  ChevronRight,
  Shield,
  CheckCircle2,
  Trash2,
  Sparkles,
  Sun,
  Moon,
  Heart
} from 'lucide-react';
import { Header } from '../components/Header';
import { useApp } from '../context/AppContext';

export const SettingsPage = () => {
  const { currentUser, addToast, openModal } = useApp();

  const [activeSubTab, setActiveSubTab] = useState('account');
  const [showPassword, setShowPassword] = useState(false);

  // Form State (Account)
  const [firstName, setFirstName] = useState('Sarah');
  const [lastName, setLastName] = useState('Chen');
  const [email, setEmail] = useState('sarah@example.com');
  const [phone, setPhone] = useState('+1 (415) 555-0182');
  const [password, setPassword] = useState('SuperSecretPass123!');

  // Notification Settings State (Figma 100%)
  const [emergencyAlerts, setEmergencyAlerts] = useState(true);
  const [zoneBreachAlerts, setZoneBreachAlerts] = useState(true);
  const [lowBatteryWarnings, setLowBatteryWarnings] = useState(true);
  const [tamperDetection, setTamperDetection] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState(false);

  // Emergency Contacts State (Figma 100%)
  const [contacts, setContacts] = useState([
    { id: 1, name: 'Dr. Lin Chen (Grandmother)', phone: '+1 (415) 555-1000' },
    { id: 2, name: 'Uncle Marco Chen', phone: '+1 (415) 555-1111' }
  ]);

  // Privacy Settings State (Figma 100%)
  const [locationDataStorage, setLocationDataStorage] = useState(true);
  const [shareDataCaregivers, setShareDataCaregivers] = useState(false);
  const [encryptedTransmission, setEncryptedTransmission] = useState(true);

  // Location Permissions State (Figma 100%)
  const [realtimeTracking, setRealtimeTracking] = useState(true);
  const [backgroundLocation, setBackgroundLocation] = useState(true);
  const [highAccuracyMode, setHighAccuracyMode] = useState(false);

  // Alert Preferences State (Figma 100%)
  const [alertSound, setAlertSound] = useState('Loud alarm');
  const [violationThreshold, setViolationThreshold] = useState('Immediately (0m)');
  const [escalatingAlerts, setEscalatingAlerts] = useState(true);

  // Language & Theme State
  const [selectedLanguage, setSelectedLanguage] = useState('English (United States)');
  const [selectedTheme, setSelectedTheme] = useState('light'); // 'light' | 'dark' | 'girl' | 'boy'

  const handleSaveAccount = (e) => {
    if (e) e.preventDefault();
    addToast('Account profile & security changes saved successfully!', 'success');
  };

  const handleAvatarChange = () => {
    openModal({
      title: 'Update Guardian Profile Picture',
      body: (
        <div>
          <p style={{ fontSize: '13.5px', color: '#475569', marginBottom: '12px' }}>
            Choose an image to represent your guardian account across SafeWatch child bands and notifications.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <img 
              src={currentUser.avatar} 
              alt="Current Avatar" 
              style={{ width: '64px', height: '64px', borderRadius: '16px', objectFit: 'cover' }} 
            />
            <button 
              type="button"
              className="page-action-btn"
              onClick={() => addToast('File upload browser opened (Demo simulated)', 'info')}
            >
              Upload New Photo
            </button>
          </div>
        </div>
      ),
      confirmText: 'Done',
      onConfirm: () => addToast('Avatar updated!', 'success')
    });
  };

  const handleEditContact = (contact) => {
    openModal({
      title: `Edit ${contact.name}`,
      body: (
        <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>Contact Name & Relation</label>
            <input 
              type="text" 
              defaultValue={contact.name} 
              style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>Phone Number</label>
            <input 
              type="tel" 
              defaultValue={contact.phone} 
              style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
            />
          </div>
        </form>
      ),
      confirmText: 'Save Contact',
      onConfirm: () => addToast(`Contact "${contact.name}" updated successfully!`, 'success')
    });
  };

  const handleAddEmergencyContact = () => {
    openModal({
      title: 'Add New Emergency Contact',
      body: (
        <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>Full Name (Relation)</label>
            <input 
              type="text" 
              placeholder="e.g. Aunt Rachel (Godmother)"
              style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>Emergency Phone</label>
            <input 
              type="tel" 
              placeholder="+1 (415) 555-2222"
              style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
            />
          </div>
        </form>
      ),
      confirmText: 'Add Contact',
      onConfirm: () => {
        setContacts(prev => [...prev, { id: Date.now(), name: 'Aunt Rachel (Godmother)', phone: '+1 (415) 555-2222' }]);
        addToast('New emergency contact added!', 'success');
      }
    });
  };

  const handleDeleteHistory = () => {
    openModal({
      title: 'Delete All Location History?',
      body: (
        <p style={{ margin: 0, fontSize: '13.5px', color: '#475569' }}>
          Are you sure you want to delete all historical telemetry and location trails for both Sophia and Liam? This action is permanent and cannot be undone.
        </p>
      ),
      confirmText: 'Delete All History',
      confirmDanger: true,
      onConfirm: () => {
        addToast('All historical location logs purged securely.', 'danger');
      }
    });
  };

  const handleSignOutClick = () => {
    openModal({
      title: 'Confirm Sign Out',
      body: (
        <p style={{ margin: 0, fontSize: '13.5px', color: '#475569' }}>
          Are you sure you want to sign out of <strong>SafeWatch Parent Dashboard</strong>? Active band telemetry and emergency dispatch will continue uninterrupted in the cloud.
        </p>
      ),
      confirmText: 'Sign Out',
      confirmDanger: true,
      onConfirm: () => {
        addToast('Signed out successfully (Demo session reset)', 'info');
      }
    });
  };

  const handleThemeChange = (themeKey) => {
    setSelectedTheme(themeKey);
    const themeNames = {
      light: 'Light Theme',
      dark: 'Dark Theme',
      girl: 'Girl Theme (Pink)',
      boy: 'Boy Theme (Blue)'
    };
    addToast(`${themeNames[themeKey]} applied!`, 'success');
  };

  const navMenuItems = [
    { id: 'account', label: 'Account', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'emergency', label: 'Emergency Contacts', icon: Phone },
    { id: 'privacy', label: 'Privacy', icon: Lock },
    { id: 'location', label: 'Location Permissions', icon: MapPin },
    { id: 'alerts', label: 'Alert Preferences', icon: AlertTriangle },
    { id: 'language', label: 'Language', icon: Globe },
    { id: 'theme', label: 'Theme Preferences', icon: Palette }
  ];

  return (
    <div className="page-container">
      {/* 1. Header: Settings with 2 Active Alerts pill */}
      <Header title="Settings" />

      {/* 2. Settings Columns Layout matching Figma */}
      <div className="settings-columns-layout">
        {/* Left Navigation Card */}
        <div className="settings-nav-card">
          {navMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSubTab === item.id;

            return (
              <button
                key={item.id}
                type="button"
                className={`settings-nav-btn ${isActive ? 'active' : ''}`}
                onClick={() => setActiveSubTab(item.id)}
                id={`settings-tab-${item.id}`}
              >
                <div className="settings-nav-btn-left">
                  <Icon size={17} strokeWidth={isActive ? 2.2 : 1.8} />
                  <span>{item.label}</span>
                </div>
                {isActive && <ChevronRight size={16} strokeWidth={2.2} />}
              </button>
            );
          })}

          {/* Sign Out Button in Red */}
          <button
            type="button"
            className="settings-nav-btn sign-out"
            onClick={handleSignOutClick}
            id="settings-tab-signout"
          >
            <div className="settings-nav-btn-left">
              <LogOut size={17} color="#DC2626" />
              <span>Sign Out</span>
            </div>
          </button>
        </div>

        {/* Right Content Card */}
        <div className="settings-content-card">
          {/* TAB 1: ACCOUNT SETTINGS (Figma 100%) */}
          {activeSubTab === 'account' && (
            <div>
              <h2 className="settings-section-title">Account Settings</h2>

              {/* Profile Avatar & Name */}
              <div className="settings-profile-row">
                <div className="settings-avatar-wrap">
                  <img 
                    src={currentUser.avatar} 
                    alt={currentUser.name} 
                    className="settings-avatar-img" 
                  />
                  <button 
                    type="button" 
                    className="settings-avatar-badge" 
                    onClick={handleAvatarChange}
                    title="Change Profile Photo"
                    aria-label="Change photo"
                  >
                    <Plus size={13} strokeWidth={3} />
                  </button>
                </div>

                <div className="settings-profile-info">
                  <span className="settings-profile-name">{currentUser.name}</span>
                  <span className="settings-profile-role">Parent Account</span>
                </div>
              </div>

              {/* Form Fields matching Figma */}
              <form className="settings-form" onSubmit={handleSaveAccount}>
                {/* Row 1: First Name & Last Name */}
                <div className="settings-form-row">
                  <div className="settings-form-group">
                    <label className="settings-label" htmlFor="first-name">First Name</label>
                    <input
                      id="first-name"
                      type="text"
                      className="settings-input"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>

                  <div className="settings-form-group">
                    <label className="settings-label" htmlFor="last-name">Last Name</label>
                    <input
                      id="last-name"
                      type="text"
                      className="settings-input"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>

                {/* Row 2: Email Address */}
                <div className="settings-form-group">
                  <label className="settings-label" htmlFor="email-address">Email Address</label>
                  <input
                    id="email-address"
                    type="email"
                    className="settings-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                {/* Row 3: Phone Number */}
                <div className="settings-form-group">
                  <label className="settings-label" htmlFor="phone-number">Phone Number</label>
                  <input
                    id="phone-number"
                    type="tel"
                    className="settings-input"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                {/* Row 4: Password */}
                <div className="settings-form-group">
                  <label className="settings-label" htmlFor="password-field">Password</label>
                  <div className="settings-password-input-wrap">
                    <input
                      id="password-field"
                      type={showPassword ? 'text' : 'password'}
                      className="settings-input"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="password-toggle-btn"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      title={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* Row 5: Action Button */}
                <button
                  type="submit"
                  className="settings-save-btn"
                  id="btn-save-account-changes"
                >
                  <Save size={15} />
                  <span>Save Changes</span>
                </button>
              </form>
            </div>
          )}

          {/* TAB 2: NOTIFICATION SETTINGS (Figma Screenshot 1 100%) */}
          {activeSubTab === 'notifications' && (
            <div>
              <h2 className="settings-section-title">Notification Settings</h2>

              <div>
                {/* 1. Emergency Alerts */}
                <div className="settings-setting-item">
                  <div>
                    <div className="settings-item-title">Emergency Alerts</div>
                    <div className="settings-item-sub">Immediate SOS and emergency notifications</div>
                  </div>
                  <label className="figma-toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={emergencyAlerts} 
                      onChange={(e) => {
                        setEmergencyAlerts(e.target.checked);
                        addToast(`Emergency Alerts ${e.target.checked ? 'Enabled' : 'Disabled'}`, 'info');
                      }} 
                    />
                    <span className={`figma-toggle-track ${emergencyAlerts ? 'checked' : ''}`}>
                      <span className="figma-toggle-thumb" />
                    </span>
                  </label>
                </div>

                {/* 2. Zone Breach Alerts */}
                <div className="settings-setting-item">
                  <div>
                    <div className="settings-item-title">Zone Breach Alerts</div>
                    <div className="settings-item-sub">When child leaves safe zone</div>
                  </div>
                  <label className="figma-toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={zoneBreachAlerts} 
                      onChange={(e) => {
                        setZoneBreachAlerts(e.target.checked);
                        addToast(`Zone Breach Alerts ${e.target.checked ? 'Enabled' : 'Disabled'}`, 'info');
                      }} 
                    />
                    <span className={`figma-toggle-track ${zoneBreachAlerts ? 'checked' : ''}`}>
                      <span className="figma-toggle-thumb" />
                    </span>
                  </label>
                </div>

                {/* 3. Low Battery Warnings */}
                <div className="settings-setting-item">
                  <div>
                    <div className="settings-item-title">Low Battery Warnings</div>
                    <div className="settings-item-sub">When band battery below 20%</div>
                  </div>
                  <label className="figma-toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={lowBatteryWarnings} 
                      onChange={(e) => {
                        setLowBatteryWarnings(e.target.checked);
                        addToast(`Low Battery Warnings ${e.target.checked ? 'Enabled' : 'Disabled'}`, 'info');
                      }} 
                    />
                    <span className={`figma-toggle-track ${lowBatteryWarnings ? 'checked' : ''}`}>
                      <span className="figma-toggle-thumb" />
                    </span>
                  </label>
                </div>

                {/* 4. Tamper Detection */}
                <div className="settings-setting-item">
                  <div>
                    <div className="settings-item-title">Tamper Detection</div>
                    <div className="settings-item-sub">When band removal is detected</div>
                  </div>
                  <label className="figma-toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={tamperDetection} 
                      onChange={(e) => {
                        setTamperDetection(e.target.checked);
                        addToast(`Tamper Detection ${e.target.checked ? 'Enabled' : 'Disabled'}`, 'info');
                      }} 
                    />
                    <span className={`figma-toggle-track ${tamperDetection ? 'checked' : ''}`}>
                      <span className="figma-toggle-thumb" />
                    </span>
                  </label>
                </div>

                {/* 5. Connection Status */}
                <div className="settings-setting-item">
                  <div>
                    <div className="settings-item-title">Connection Status</div>
                    <div className="settings-item-sub">Band connect/disconnect events</div>
                  </div>
                  <label className="figma-toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={connectionStatus} 
                      onChange={(e) => {
                        setConnectionStatus(e.target.checked);
                        addToast(`Connection Status ${e.target.checked ? 'Enabled' : 'Disabled'}`, 'info');
                      }} 
                    />
                    <span className={`figma-toggle-track ${connectionStatus ? 'checked' : ''}`}>
                      <span className="figma-toggle-thumb" />
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: EMERGENCY CONTACTS (Figma Screenshot 2 100%) */}
          {activeSubTab === 'emergency' && (
            <div>
              <h2 className="settings-section-title">Emergency Contacts</h2>

              <div>
                {contacts.map((c) => (
                  <div key={c.id} className="emergency-contact-card">
                    <div className="emergency-contact-left">
                      <div className="contact-avatar-box">
                        <User size={18} />
                      </div>
                      <div>
                        <div className="contact-name-title">{c.name}</div>
                        <div className="contact-phone-sub">{c.phone}</div>
                      </div>
                    </div>

                    <button 
                      type="button" 
                      className="contact-edit-btn"
                      onClick={() => handleEditContact(c)}
                    >
                      Edit
                    </button>
                  </div>
                ))}

                <button 
                  type="button" 
                  className="add-contact-outline-btn"
                  onClick={handleAddEmergencyContact}
                  id="btn-add-emergency-contact"
                >
                  + Add Emergency Contact
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: PRIVACY SETTINGS (Figma Screenshot 3 100%) */}
          {activeSubTab === 'privacy' && (
            <div>
              <h2 className="settings-section-title">Privacy Settings</h2>

              <div>
                {/* 1. Location Data Storage */}
                <div className="settings-setting-item">
                  <div>
                    <div className="settings-item-title">Location Data Storage</div>
                    <div className="settings-item-sub">Store location history for 30 days</div>
                  </div>
                  <label className="figma-toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={locationDataStorage} 
                      onChange={(e) => setLocationDataStorage(e.target.checked)} 
                    />
                    <span className={`figma-toggle-track ${locationDataStorage ? 'checked' : ''}`}>
                      <span className="figma-toggle-thumb" />
                    </span>
                  </label>
                </div>

                {/* 2. Share Data with Caregivers */}
                <div className="settings-setting-item">
                  <div>
                    <div className="settings-item-title">Share Data with Caregivers</div>
                    <div className="settings-item-sub">Allow secondary caregivers to view location</div>
                  </div>
                  <label className="figma-toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={shareDataCaregivers} 
                      onChange={(e) => setShareDataCaregivers(e.target.checked)} 
                    />
                    <span className={`figma-toggle-track ${shareDataCaregivers ? 'checked' : ''}`}>
                      <span className="figma-toggle-thumb" />
                    </span>
                  </label>
                </div>

                {/* 3. Encrypted Transmission */}
                <div className="settings-setting-item">
                  <div>
                    <div className="settings-item-title">Encrypted Transmission</div>
                    <div className="settings-item-sub">End-to-end encryption for all data</div>
                  </div>
                  <label className="figma-toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={encryptedTransmission} 
                      onChange={(e) => setEncryptedTransmission(e.target.checked)} 
                    />
                    <span className={`figma-toggle-track ${encryptedTransmission ? 'checked' : ''}`}>
                      <span className="figma-toggle-thumb" />
                    </span>
                  </label>
                </div>

                {/* Delete Action Button matching Figma */}
                <button 
                  type="button" 
                  className="delete-history-btn"
                  onClick={handleDeleteHistory}
                  id="btn-delete-all-location-history"
                >
                  Delete All Location History
                </button>
              </div>
            </div>
          )}

          {/* TAB 5: LOCATION PERMISSIONS (Figma Screenshot 4 100%) */}
          {activeSubTab === 'location' && (
            <div>
              <h2 className="settings-section-title">Location Permissions</h2>

              <div>
                {/* 1. Real-time Tracking */}
                <div className="settings-setting-item">
                  <div>
                    <div className="settings-item-title">Real-time Tracking</div>
                    <div className="settings-item-sub">Continuous location updates</div>
                  </div>
                  <label className="figma-toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={realtimeTracking} 
                      onChange={(e) => setRealtimeTracking(e.target.checked)} 
                    />
                    <span className={`figma-toggle-track ${realtimeTracking ? 'checked' : ''}`}>
                      <span className="figma-toggle-thumb" />
                    </span>
                  </label>
                </div>

                {/* 2. Background Location */}
                <div className="settings-setting-item">
                  <div>
                    <div className="settings-item-title">Background Location</div>
                    <div className="settings-item-sub">Track location when app is closed</div>
                  </div>
                  <label className="figma-toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={backgroundLocation} 
                      onChange={(e) => setBackgroundLocation(e.target.checked)} 
                    />
                    <span className={`figma-toggle-track ${backgroundLocation ? 'checked' : ''}`}>
                      <span className="figma-toggle-thumb" />
                    </span>
                  </label>
                </div>

                {/* 3. High Accuracy Mode */}
                <div className="settings-setting-item">
                  <div>
                    <div className="settings-item-title">High Accuracy Mode</div>
                    <div className="settings-item-sub">Uses more battery for precise GPS</div>
                  </div>
                  <label className="figma-toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={highAccuracyMode} 
                      onChange={(e) => setHighAccuracyMode(e.target.checked)} 
                    />
                    <span className={`figma-toggle-track ${highAccuracyMode ? 'checked' : ''}`}>
                      <span className="figma-toggle-thumb" />
                    </span>
                  </label>
                </div>

                {/* Location Permissions Callout matching Figma */}
                <div className="location-info-callout">
                  Location permissions are critical for child safety monitoring. Disabling tracking may prevent alerts.
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: ALERT PREFERENCES (Figma Screenshot 5 100%) */}
          {activeSubTab === 'alerts' && (
            <div>
              <h2 className="settings-section-title">Alert Preferences</h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                {/* 1. Alert Sound */}
                <div className="settings-form-group">
                  <label className="settings-label" htmlFor="alert-sound-select">Alert Sound</label>
                  <select 
                    id="alert-sound-select"
                    className="settings-select"
                    value={alertSound}
                    onChange={(e) => {
                      setAlertSound(e.target.value);
                      addToast(`Alert sound set to "${e.target.value}"`, 'info');
                    }}
                  >
                    <option>Loud alarm</option>
                    <option>Urgent siren</option>
                    <option>Subtle chime</option>
                    <option>Continuous buzzer</option>
                  </select>
                </div>

                {/* 2. Default Zone Violation Threshold */}
                <div className="settings-form-group">
                  <label className="settings-label" htmlFor="threshold-select">Default Zone Violation Threshold</label>
                  <select 
                    id="threshold-select"
                    className="settings-select"
                    value={violationThreshold}
                    onChange={(e) => {
                      setViolationThreshold(e.target.value);
                      addToast(`Zone threshold updated to ${e.target.value}`, 'info');
                    }}
                  >
                    <option>Immediately (0m)</option>
                    <option>25 meters buffer</option>
                    <option>50 meters buffer</option>
                    <option>100 meters buffer</option>
                  </select>
                </div>

                {/* 3. Escalating Alerts */}
                <div className="settings-setting-item" style={{ paddingTop: '8px' }}>
                  <div>
                    <div className="settings-item-title">Escalating Alerts</div>
                    <div className="settings-item-sub">Alert escalates if unacknowledged after 2 min</div>
                  </div>
                  <label className="figma-toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={escalatingAlerts} 
                      onChange={(e) => setEscalatingAlerts(e.target.checked)} 
                    />
                    <span className={`figma-toggle-track ${escalatingAlerts ? 'checked' : ''}`}>
                      <span className="figma-toggle-thumb" />
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: LANGUAGE SETTINGS */}
          {activeSubTab === 'language' && (
            <div>
              <h2 className="settings-section-title">Language & Regional Preferences</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: '440px' }}>
                <label className="settings-label" htmlFor="dashboard-lang-select">Default Display Language</label>
                <select 
                  id="dashboard-lang-select"
                  className="settings-select"
                  value={selectedLanguage}
                  onChange={(e) => {
                    setSelectedLanguage(e.target.value);
                    addToast(`Language updated to ${e.target.value}`, 'success');
                  }}
                >
                  <option>English (United States)</option>
                  <option>Urdu (اردو)</option>
                  <option>Spanish (Español)</option>
                  <option>French (Français)</option>
                  <option>German (Deutsch)</option>
                  <option>Arabic (العربية)</option>
                </select>
                <p style={{ fontSize: '12.5px', color: '#64748B', margin: 0 }}>
                  Telemetry units, timestamps, and emergency notifications will adapt to this regional locale.
                </p>
              </div>
            </div>
          )}

          {/* TAB 8: THEME PREFERENCES (Light, Dark, Girl [Pink], Boy [Blue] per user requirement!) */}
          {activeSubTab === 'theme' && (
            <div>
              <h2 className="settings-section-title">Theme Preferences</h2>
              <p style={{ fontSize: '13px', color: '#64748B', marginTop: '-14px', marginBottom: '20px' }}>
                Personalize your SafeWatch dashboard look & feel. Choose Light, Dark, or kid-friendly color palettes.
              </p>

              <div className="theme-options-grid">
                {/* 1. Light Theme */}
                <div 
                  className={`theme-option-card ${selectedTheme === 'light' ? 'selected' : ''}`}
                  onClick={() => handleThemeChange('light')}
                  id="theme-light"
                >
                  <div className="theme-preview-box" style={{ background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                    <div style={{ width: '22px', height: '22px', borderRadius: '6px', background: '#0F172A' }} />
                    <div style={{ width: '40px', height: '10px', borderRadius: '4px', background: '#CBD5E1' }} />
                    <Sun size={18} color="#0F172A" />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '14px', color: '#0F172A' }}>Light Theme</div>
                    <div style={{ fontSize: '12px', color: '#64748B' }}>Clean white & crisp slate (Default)</div>
                  </div>
                </div>

                {/* 2. Dark Theme */}
                <div 
                  className={`theme-option-card ${selectedTheme === 'dark' ? 'selected' : ''}`}
                  onClick={() => handleThemeChange('dark')}
                  id="theme-dark"
                >
                  <div className="theme-preview-box" style={{ background: '#0F172A', border: '1px solid #1E293B' }}>
                    <div style={{ width: '22px', height: '22px', borderRadius: '6px', background: '#38BDF8' }} />
                    <div style={{ width: '40px', height: '10px', borderRadius: '4px', background: '#475569' }} />
                    <Moon size={18} color="#38BDF8" />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '14px', color: '#0F172A' }}>Dark Theme</div>
                    <div style={{ fontSize: '12px', color: '#64748B' }}>Midnight navy for night monitoring</div>
                  </div>
                </div>

                {/* 3. Girl Theme (Pink Color) */}
                <div 
                  className={`theme-option-card ${selectedTheme === 'girl' ? 'selected' : ''}`}
                  onClick={() => handleThemeChange('girl')}
                  id="theme-girl"
                >
                  <div className="theme-preview-box" style={{ background: '#FFF1F2', border: '1px solid #FECDD3' }}>
                    <div style={{ width: '22px', height: '22px', borderRadius: '6px', background: '#E11D48' }} />
                    <div style={{ width: '40px', height: '10px', borderRadius: '4px', background: '#FB7185' }} />
                    <Heart size={18} color="#E11D48" />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '14px', color: '#E11D48', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span>Girl Theme (Pink)</span>
                      <span style={{ fontSize: '11px', background: '#FFE4E6', padding: '1px 6px', borderRadius: '4px' }}>Sophia</span>
                    </div>
                    <div style={{ fontSize: '12px', color: '#64748B' }}>Sweet rose pink & pastel accents</div>
                  </div>
                </div>

                {/* 4. Boy Theme (Blue Color) */}
                <div 
                  className={`theme-option-card ${selectedTheme === 'boy' ? 'selected' : ''}`}
                  onClick={() => handleThemeChange('boy')}
                  id="theme-boy"
                >
                  <div className="theme-preview-box" style={{ background: '#EFF6FF', border: '1px solid #BFDBFE' }}>
                    <div style={{ width: '22px', height: '22px', borderRadius: '6px', background: '#2563EB' }} />
                    <div style={{ width: '40px', height: '10px', borderRadius: '4px', background: '#60A5FA' }} />
                    <Sparkles size={18} color="#2563EB" />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '14px', color: '#2563EB', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span>Boy Theme (Blue)</span>
                      <span style={{ fontSize: '11px', background: '#DBEAFE', padding: '1px 6px', borderRadius: '4px' }}>Liam</span>
                    </div>
                    <div style={{ fontSize: '12px', color: '#64748B' }}>Dynamic ocean blue & hero accents</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
