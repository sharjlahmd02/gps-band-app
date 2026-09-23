// Mock data for SafeWatch Parent Dashboard
// Strictly aligned with Figma design screenshots

export const INITIAL_CHILDREN = [
  {
    id: 'sophia',
    name: 'Sophia Chen',
    age: 8,
    ageColor: '#9D174D',
    ageBg: '#FCE7F3',
    alertActive: true,
    alertText: 'Alert Active',
    location: 'Lincoln Elementary School, 123 Oak St',
    lastUpdated: 'Updated 2 min ago',
    bandStatus: 'Band connected',
    bandConnected: true,
    battery: 12,
    batteryColor: '#DC2626',
    avatar: 'https://images.unsplash.com/photo-1517456793572-1d8efd6dc135?auto=format&fit=crop&w=200&h=200&q=80',
    device: {
      id: 'SW-9021',
      name: 'SafeWatch Band v3 Pro',
      firmware: 'v2.4.1',
      signal: '-64 dBm (Excellent)',
      tamperStatus: 'Active & Secured',
      waterproof: 'IP68 (Safe for swimming)',
      lastSync: 'Just now'
    },
    safeZone: 'Lincoln Elementary School',
    inSafeZone: false,
    coords: { lat: 37.7749, lng: -122.4194 }
  },
  {
    id: 'liam',
    name: 'Liam Torres',
    age: 10,
    ageColor: '#0369A1',
    ageBg: '#E0F2FE',
    alertActive: true,
    alertText: 'Alert Active',
    location: 'Riverside Park, near fountain',
    lastUpdated: 'Updated 5 min ago',
    bandStatus: 'Band connected',
    bandConnected: true,
    battery: 74,
    batteryColor: '#2563EB',
    avatar: 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?auto=format&fit=crop&w=200&h=200&q=80',
    device: {
      id: 'SW-8842',
      name: 'SafeWatch Band v3 Lite',
      firmware: 'v2.4.0',
      signal: '-71 dBm (Good)',
      tamperStatus: 'Tamper Alert Tripped',
      waterproof: 'IP68 (Safe for swimming)',
      lastSync: '1 min ago'
    },
    safeZone: 'Riverside Park',
    inSafeZone: true,
    coords: { lat: 37.7785, lng: -122.4150 }
  }
];

export const INITIAL_ALERTS = [
  {
    id: 1,
    childId: 'liam',
    childName: 'Liam Torres',
    avatar: 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?auto=format&fit=crop&w=200&h=200&q=80',
    type: 'Zone Exceeded',
    typeColor: '#B45309',
    typeBg: '#FEF3C7',
    location: 'Elm Street & 5th Ave',
    timestamp: 'Today, 3:42 PM',
    status: 'active',
    severity: 'high',
    details: 'Liam has stepped 140 meters outside the defined Riverside Park geofence boundary.'
  },
  {
    id: 2,
    childId: 'sophia',
    childName: 'Sophia Chen',
    avatar: 'https://images.unsplash.com/photo-1517456793572-1d8efd6dc135?auto=format&fit=crop&w=200&h=200&q=80',
    type: 'Low Battery',
    typeColor: '#475569',
    typeBg: '#F1F5F9',
    location: 'Lincoln Elementary School',
    timestamp: 'Today, 2:15 PM',
    status: 'active',
    severity: 'medium',
    details: 'Band battery dropped to 12%. Immediate charging recommended upon return home.'
  },
  {
    id: 3,
    childId: 'sophia',
    childName: 'Sophia Chen',
    avatar: 'https://images.unsplash.com/photo-1517456793572-1d8efd6dc135?auto=format&fit=crop&w=200&h=200&q=80',
    type: 'Suspicious Contact',
    typeColor: '#C2410C',
    typeBg: '#FFEDD5',
    isResolved: true,
    location: 'Oak Street Playground',
    timestamp: 'Yesterday, 4:30 PM',
    status: 'resolved',
    severity: 'high',
    details: 'Unpaired Bluetooth device attempted beacon broadcast. Verified by parent.'
  },
  {
    id: 4,
    childId: 'liam',
    childName: 'Liam Torres',
    avatar: 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?auto=format&fit=crop&w=200&h=200&q=80',
    type: 'Tamper Detected',
    typeColor: '#EA580C',
    typeBg: '#FFEDD5',
    location: 'Riverside Park',
    timestamp: 'Yesterday, 1:10 PM',
    status: 'resolved',
    severity: 'high',
    details: 'Band clasp sensor opened momentarily. Liam confirmed adjusting band tightness.'
  }
];

export const INITIAL_SAFE_ZONES = [
  {
    id: 'sz-1',
    name: 'Lincoln Elementary School',
    address: '123 Oak St, San Francisco, CA',
    radiusMeters: 300,
    status: 'active',
    assignedTo: ['Sophia Chen'],
    color: '#3B82F6',
    icon: 'school'
  },
  {
    id: 'sz-2',
    name: 'Riverside Park',
    address: 'Riverside Park, near fountain',
    radiusMeters: 450,
    status: 'active',
    assignedTo: ['Liam Torres'],
    color: '#10B981',
    icon: 'park'
  },
  {
    id: 'sz-3',
    name: 'Home Sanctuary',
    address: '742 Evergreen Terrace',
    radiusMeters: 150,
    status: 'active',
    assignedTo: ['Sophia Chen', 'Liam Torres'],
    color: '#8B5CF6',
    icon: 'home'
  },
  {
    id: 'sz-4',
    name: 'Oak Street Playground',
    address: '88 Oak Street',
    radiusMeters: 200,
    status: 'inactive',
    assignedTo: ['Sophia Chen'],
    color: '#F59E0B',
    icon: 'play'
  }
];

export const CURRENT_USER = {
  name: 'Sarah Chen',
  email: 'sarah@example.com',
  avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&h=200&q=80',
  role: 'Primary Guardian'
};
