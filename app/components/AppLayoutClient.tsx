"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard,
  Activity,
  Map,
  Shield,
  Smartphone,
  Menu,
  X,
  Bell,
  Search,
  Settings,
  ChevronRight,
  LifeBuoy
} from 'lucide-react';

const APP_LINKS = [
  { name: 'Crisis Console', href: '/', icon: LayoutDashboard },
  { name: 'SVI Telemetry', href: '/telemetry', icon: Activity },
  { name: 'KAVACH Hotspots', href: '/hotspots', icon: Map },
  { name: 'Victim Sanctuary', href: '/sanctuary', icon: Shield },
  { name: 'Mobile Panic', href: '/mobile', icon: Smartphone },
];

export default function AppLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const pageTitle = APP_LINKS.find(l => l.href === pathname)?.name || 'SAHAYAK-AI';

  return (
    <div className="flex h-screen overflow-hidden text-[#201a19] bg-[#fff8f6] font-sans">
      
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:flex flex-col w-64 shrink-0 bg-gradient-to-b from-[#00044d] via-[#000666] to-[#000333] shadow-xl z-20">
        
        {/* Brand */}
        <div className="px-6 py-5 flex flex-col gap-1 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="bg-[#ffead6]/10 p-1.5 rounded-lg border border-[#ffead6]/20">
              <LifeBuoy size={20} className="text-[#ffead6]" />
            </div>
            <div className="font-extrabold text-xl text-white tracking-tight">SAHAYAK-AI</div>
          </div>
          <div className="text-[10px] text-white/50 uppercase tracking-widest font-semibold mt-1">
            NHAA 14566 Triage Grid
          </div>
        </div>

        {/* Live status pill */}
        <div className="mx-4 mt-4 mb-2 bg-[#ffead6]/10 border border-[#ffead6]/20 rounded-lg p-2.5 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_#4ade80] animate-pulse" />
          <span className="text-xs text-green-300 font-semibold uppercase tracking-wider">Secure Channel Active</span>
        </div>
        
        <nav className="flex-1 px-3 py-4 overflow-y-auto flex flex-col gap-1 scrollbar-hide">
          {APP_LINKS.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link 
                key={link.name} 
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm font-medium ${
                  isActive 
                    ? 'bg-[#944b00] text-white shadow-md' 
                    : 'text-white/60 hover:bg-white/10 hover:text-white/90'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-white' : 'text-white/50'} />
                <span className="flex-1">{link.name}</span>
                {isActive && <ChevronRight size={14} className="text-white/70" />}
              </Link>
            );
          })}
        </nav>

        {/* Bottom User Area */}
        <div className="p-4 border-t border-white/10 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
            <span className="text-white font-bold text-sm">CO</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-white font-semibold text-sm truncate">Counselor 04</div>
            <div className="text-white/40 text-xs">Shift: Active</div>
          </div>
          <button className="text-white/40 hover:text-white transition-colors">
            <Settings size={18} />
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        
        {/* TOP HEADER */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-[#f0e6e4] flex items-center justify-between px-4 lg:px-8 z-10 shrink-0">
          <div className="flex items-center gap-4">
            <button className="md:hidden p-2 text-[#534341]" onClick={() => setMobileMenuOpen(true)}>
              <Menu size={24} />
            </button>
            <div className="hidden md:flex items-center gap-2">
              <span className="text-xs text-[#857371] font-semibold uppercase tracking-wider">Dashboard</span>
              <ChevronRight size={14} className="text-[#857371]" />
              <span className="text-sm font-bold text-[#000666]">{pageTitle}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-[#f9f0ee] px-3 py-1.5 rounded-full border border-[#f0e6e4]">
              <Search size={14} className="text-[#857371]" />
              <input 
                type="text" 
                placeholder="Search case ID..." 
                className="bg-transparent border-none outline-none text-sm text-[#201a19] placeholder:text-[#857371] w-32 focus:w-48 transition-all"
              />
            </div>
            
            <div className="relative">
              <button 
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className={`p-2 rounded-full transition-colors relative ${notificationsOpen ? 'bg-[#f0e6e4]' : 'hover:bg-[#f9f0ee]'}`}
              >
                <Bell size={20} className="text-[#534341]" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#ba1a1a] border-2 border-white" />
              </button>

              {notificationsOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setNotificationsOpen(false)} />
                  <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-[#f0e6e4] z-50 overflow-hidden">
                    <div className="px-4 py-3 border-b border-[#f0e6e4] flex items-center justify-between bg-[#f9f0ee]">
                      <h3 className="font-bold text-[#000666] text-sm">Critical Alerts</h3>
                      <span className="bg-[#ba1a1a] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">1 New</span>
                    </div>
                    <div className="p-2">
                      <div className="p-3 rounded-xl bg-[#ffdad6]/30 border border-[#ffdad6] flex gap-3 cursor-pointer hover:bg-[#ffdad6]/50 transition-colors">
                        <div className="w-8 h-8 rounded-full bg-[#ba1a1a] flex items-center justify-center shrink-0">
                          <LifeBuoy size={16} className="text-white" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-[#ba1a1a]">Suicidal Ideation Detected</div>
                          <div className="text-xs text-[#534341] mt-0.5">Caller #4821 (Hindi/Bundelkhandi). SVI: 89.</div>
                          <div className="text-[10px] text-[#857371] mt-1 font-semibold">Just now</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8 bg-gradient-to-br from-[#fff8f6] to-[#f9f0ee]">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-[#000666]/40 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="relative w-72 bg-gradient-to-b from-[#00044d] to-[#000666] h-full shadow-2xl flex flex-col">
            <div className="p-4 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-2">
                <LifeBuoy size={20} className="text-[#ffead6]" />
                <span className="font-bold text-lg text-white">SAHAYAK-AI</span>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="p-1 text-white/70 hover:text-white">
                <X size={24} />
              </button>
            </div>
            <nav className="p-4 flex flex-col gap-2">
              {APP_LINKS.map(link => {
                const isActive = pathname === link.href;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium ${isActive ? 'bg-[#944b00] text-white' : 'text-white/70 hover:bg-white/10'}`}
                  >
                    <Icon size={20} className={isActive ? 'text-white' : 'text-white/50'} />
                    {link.name}
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
