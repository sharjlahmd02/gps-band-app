import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  MapPin,
  Bell,
  Map,
  Cpu,
  AlertTriangle,
  Shield,
  BarChart2,
  Activity,
  Settings,
  LogOut,
  X
} from 'lucide-react';

export default function Sidebar({ isOpen, onClose }) {
  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Children', path: '/children', icon: Users },
    { name: 'Live Location', path: '/live-location', icon: MapPin },
    { name: 'Alerts', path: '/alerts', icon: Bell, badge: '2' },
    { name: 'Safe Zones', path: '/safe-zones', icon: Map },
    { name: 'Devices', path: '/devices', icon: Cpu },
    { name: 'Emergency / SOS', path: '/emergency', icon: AlertTriangle, isEmergency: true },
    { name: 'Reports', path: '/reports', icon: BarChart2 },
    { name: 'Safety Analytics', path: '/safety-analytics', icon: Activity },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:static top-0 left-0 z-50 h-screen w-64 bg-white border-r border-slate-100 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Top Header & Navigation */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* Logo & App Title */}
          <div className="flex items-center justify-between px-6 pt-6 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-950 flex items-center justify-center text-white shadow-sm">
                <Shield className="w-5 h-5 fill-slate-950 text-white" />
              </div>
              <div>
                <h1 className="font-extrabold text-base text-slate-900 leading-tight">SafeWatch</h1>
                <p className="text-[11px] font-semibold text-sky-400 leading-tight">Parent Dashboard</p>
              </div>
            </div>

            {/* Mobile close button */}
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => {
                    if (onClose) onClose();
                  }}
                  className={({ isActive }) =>
                    `group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                      isActive
                        ? 'bg-slate-950 text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div className="flex items-center gap-3">
                        <IconComponent
                          className={`w-4 h-4 transition-colors ${
                            item.isEmergency
                              ? 'text-rose-500'
                              : isActive
                              ? 'text-white'
                              : 'text-slate-400 group-hover:text-slate-700'
                          }`}
                        />
                        <span className={item.isEmergency && !isActive ? 'text-slate-700' : ''}>
                          {item.name}
                        </span>
                      </div>

                      {/* Badge if present */}
                      {item.badge && (
                        <span className="w-5 h-5 flex items-center justify-center text-[11px] font-bold text-white bg-rose-500 rounded-full shadow-xs">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* User Profile & Sign Out Footer */}
        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center gap-3 px-2 py-2">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80"
              alt="Sarah Chen"
              className="w-9 h-9 rounded-full object-cover ring-1 ring-slate-200"
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-slate-800 truncate">Sarah Chen</p>
              <p className="text-[11px] text-slate-400 truncate">sarah@example.com</p>
            </div>
          </div>

          <button
            type="button"
            className="w-full mt-2 flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}

