import React from 'react';
import { Menu } from 'lucide-react';

export default function Header({ title = "Live Location", onOpenSidebar }) {
  return (
    <header className="flex items-center justify-between py-5 px-6 md:px-8 border-b border-transparent">
      <div className="flex items-center gap-3">
        {/* Mobile menu trigger */}
        <button
          onClick={onOpenSidebar}
          className="lg:hidden p-2 -ml-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          aria-label="Open navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-3">
        {/* Active Alerts Pill Badge matching Figma */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-rose-50 border border-rose-200/80 text-rose-600 text-xs font-semibold shadow-xs">
          <span className="w-2 h-2 rounded-sm bg-rose-500 inline-block animate-pulse"></span>
          <span>2 Active Alerts</span>
        </div>
      </div>
    </header>
  );
}

