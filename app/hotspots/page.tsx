"use client";

import React, { useState, useMemo } from 'react';
import { 
  Map, TrendingUp, AlertTriangle, ShieldAlert,
  Users, Briefcase, Filter, ChevronDown, Download, Clock
} from 'lucide-react';

const baseHotspots = [
  { id: 1, name: 'Aligarh, UP', svi: 82, trend: '+12%', cases: 47, category: 'CRITICAL', color: '#ba1a1a', cx: 30, cy: 30 },
  { id: 2, name: 'Jhansi, UP', svi: 78, trend: '+8%', cases: 31, category: 'CRITICAL', color: '#ba1a1a', cx: 45, cy: 50 },
  { id: 3, name: 'Muzaffarpur, BR', svi: 71, trend: '+5%', cases: 28, category: 'HIGH', color: '#944b00', cx: 70, cy: 40 },
  { id: 4, name: 'Bhilwara, RJ', svi: 68, trend: '-2%', cases: 22, category: 'HIGH', color: '#944b00', cx: 20, cy: 60 },
  { id: 5, name: 'Guntur, AP', svi: 54, trend: '+1%', cases: 18, category: 'MODERATE', color: '#000666', cx: 50, cy: 80 },
];

export default function KavachHotspots() {
  const [selectedZone, setSelectedZone] = useState(baseHotspots[0]);
  const [forecastDays, setForecastDays] = useState(0);

  // Dynamically calculate hotspots based on forecast
  const hotspots = useMemo(() => {
    return baseHotspots.map(h => {
      // Simulate predictive risk increase based on days in future
      const multiplier = h.trend.includes('+') ? 1 : -0.5;
      const valToAdd = (parseFloat(h.trend.replace(/[^0-9.]/g, '')) * multiplier * forecastDays) / 7;
      let newSvi = Math.min(100, Math.max(0, Math.round(h.svi + valToAdd)));
      
      let category = 'MODERATE';
      let color = '#000666';
      if (newSvi >= 75) { category = 'CRITICAL'; color = '#ba1a1a'; }
      else if (newSvi >= 65) { category = 'HIGH'; color = '#944b00'; }

      return { ...h, svi: newSvi, category, color };
    });
  }, [forecastDays]);

  const activeZone = hotspots.find(h => h.id === selectedZone.id) || hotspots[0];

  return (
    <div className="flex flex-col gap-6">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 bg-white p-6 rounded-3xl border border-[#f0e6e4] shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#e0e5ff] rounded-full text-xs font-bold text-[#000666] uppercase tracking-wider mb-3">
            <Map size={14} /> Geospatial Intelligence
          </div>
          <h1 className="text-3xl font-extrabold text-[#201a19] tracking-tight">KAVACH Risk Topology</h1>
          <p className="text-[#534341] mt-1 font-medium">Predictive spatial analytics across 187 active districts.</p>
        </div>
        
        {/* Forecast Slider */}
        <div className="bg-[#f9f0ee] border border-[#f0e6e4] rounded-2xl p-4 flex-1 max-w-md">
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-bold text-[#000666] uppercase tracking-wider flex items-center gap-1.5">
              <Clock size={14} /> AI Forecast Horizon
            </label>
            <span className="text-sm font-black text-[#000666]">
              {forecastDays === 0 ? 'Live (Today)' : `+${forecastDays} Days`}
            </span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="30" 
            step="1"
            value={forecastDays}
            onChange={(e) => setForecastDays(parseInt(e.target.value))}
            className="w-full h-2 bg-[#e0e5ff] rounded-lg appearance-none cursor-pointer accent-[#000666]"
          />
        </div>

        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-[#000666] text-white rounded-xl text-sm font-bold hover:bg-[#00044d] transition-colors shadow-md flex items-center gap-2">
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      {/* KPI STRIP */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Active Zones', value: '187', sub: 'monitored', icon: Map, color: 'text-[#000666]', bg: 'bg-[#e0e5ff]' },
          { label: 'Critical Zones', value: hotspots.filter(h => h.category==='CRITICAL').length.toString(), sub: 'requiring dispatch', icon: AlertTriangle, color: 'text-[#ba1a1a]', bg: 'bg-[#ffdad6]' },
          { label: 'Forecast Avg', value: Math.round(hotspots.reduce((acc, h) => acc + h.svi, 0) / hotspots.length).toString(), sub: 'mean SVI index', icon: TrendingUp, color: 'text-[#944b00]', bg: 'bg-[#ffead6]' },
          { label: 'AI Confidence', value: forecastDays > 14 ? '78.4%' : '94.2%', sub: 'model accuracy', icon: ShieldAlert, color: 'text-[#000666]', bg: 'bg-[#f0e6e4]' },
        ].map((kpi, i) => (
          <div key={i} className="bg-white rounded-3xl p-5 border border-[#f0e6e4] shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="text-[10px] font-bold text-[#857371] uppercase tracking-widest">{kpi.label}</div>
              <div className={`text-3xl font-black mt-1 tracking-tight ${kpi.color}`}>{kpi.value}</div>
              <div className="text-xs font-medium text-[#534341] mt-1">{kpi.sub}</div>
            </div>
            <div className={`w-12 h-12 rounded-2xl ${kpi.bg} flex items-center justify-center`}>
              <kpi.icon size={24} className={kpi.color} />
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-6 h-[600px]">
        {/* DISTRICT LIST */}
        <div className="w-full lg:w-96 bg-white rounded-3xl border border-[#f0e6e4] shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col overflow-hidden shrink-0">
          <div className="p-5 border-b border-[#f0e6e4] bg-[#f9f0ee]">
            <h3 className="font-bold text-[#201a19] flex items-center gap-2">
              <ShieldAlert size={18} className="text-[#000666]" /> Risk Zones
            </h3>
          </div>
          <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2">
            {hotspots.map(zone => (
              <button
                key={zone.id}
                onClick={() => setSelectedZone(baseHotspots.find(b => b.id === zone.id)!)}
                className={`w-full text-left p-4 rounded-2xl transition-all border ${
                  activeZone.id === zone.id 
                    ? 'border-[#000666]/30 bg-gradient-to-r from-[#f9f0ee] to-white shadow-md scale-[1.02]' 
                    : 'border-transparent hover:bg-[#f9f0ee]'
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="font-extrabold text-[#201a19] text-base">{zone.name}</div>
                  <div className="text-2xl font-black" style={{ color: zone.color }}>{zone.svi}</div>
                </div>
                <div className="flex items-center gap-3 text-xs font-bold">
                  <span className="text-white px-2 py-0.5 rounded shadow-sm uppercase" style={{ backgroundColor: zone.color }}>
                    {zone.category}
                  </span>
                  <span className="flex items-center gap-1 text-[#534341]">
                    <Briefcase size={12} /> {zone.cases} cases
                  </span>
                  <span className="flex items-center gap-1" style={{ color: zone.color }}>
                    <TrendingUp size={12} /> {zone.trend}
                  </span>
                </div>
                
                {/* Mini progress bar */}
                <div className="w-full h-1.5 bg-[#f0e6e4] rounded-full mt-3 overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-500" style={{ width: `${zone.svi}%`, backgroundColor: zone.color }} />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* MAP & DETAIL AREA */}
        <div className="flex-1 flex flex-col gap-6">
          
          {/* Interactive SVG Map */}
          <div className="flex-1 bg-white rounded-3xl border border-[#f0e6e4] shadow-sm p-3 relative overflow-hidden flex flex-col">
            <div className="absolute top-6 left-6 z-10 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border border-white shadow-md">
              <div className="text-xs font-bold text-[#000666] uppercase tracking-wider flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#ba1a1a] animate-pulse shadow-[0_0_8px_#ba1a1a]" /> Interactive Topology
              </div>
            </div>
            
            <div className="flex-1 rounded-2xl bg-[#00044d] relative flex items-center justify-center overflow-hidden border border-[#000666]">
              {/* Grid Background */}
              <div className="absolute inset-0 opacity-20 bg-[linear-gradient(#ffffff33_1px,transparent_1px),linear-gradient(90deg,#ffffff33_1px,transparent_1px)] bg-[size:40px_40px]" />
              
              {/* SVG Topology */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M10,20 Q40,5 70,20 T95,50 T70,90 T20,80 Z" fill="#000666" stroke="#4f8ff7" strokeWidth="0.5" opacity="0.6" />
                {hotspots.map((h, i) => (
                  <g key={h.id} style={{ transform: `translate(${h.cx}%, ${h.cy}%)`, transition: 'all 0.5s' }}>
                    <circle r={h.svi / 5} fill={h.color} opacity="0.2" className="animate-ping" />
                    <circle r={h.svi / 8} fill={h.color} opacity="0.4" />
                    <circle r="2" fill="#fff" />
                    {activeZone.id === h.id && (
                      <circle r={h.svi / 4} fill="none" stroke="#fff" strokeWidth="0.5" strokeDasharray="1,1" className="animate-[spin_4s_linear_infinite]" />
                    )}
                  </g>
                ))}
              </svg>

              {/* Tooltip for Active Zone on Map */}
              <div 
                className="absolute bg-white/90 backdrop-blur-md p-3 rounded-xl border border-white shadow-xl pointer-events-none transition-all duration-500 z-20"
                style={{ left: `${activeZone.cx}%`, top: `${activeZone.cy}%`, transform: 'translate(15px, -50%)' }}
              >
                <div className="font-bold text-sm text-[#000666] whitespace-nowrap">{activeZone.name}</div>
                <div className="text-2xl font-black" style={{ color: activeZone.color }}>{activeZone.svi}</div>
              </div>
            </div>
          </div>

          {/* Deep Insight Panel */}
          <div className="h-48 bg-gradient-to-br from-[#000666] to-[#00044d] rounded-3xl shadow-xl p-6 text-white flex items-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-700" />
            <div className="relative z-10 flex-1 flex justify-between items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-3 border border-white/10 backdrop-blur-sm">
                  <Users size={14} className="text-[#ffead6]" /> AI Policy Insight
                </div>
                <h3 className="text-2xl font-black tracking-tight mb-2">Intervention Required: {activeZone.name}</h3>
                <p className="text-white/80 max-w-lg font-medium text-sm leading-relaxed">
                  {activeZone.category === 'CRITICAL' 
                    ? `Critical ${activeZone.svi} SVI score detected. High probability of violent escalation within ${forecastDays > 0 ? forecastDays : '24'} hours. Immediate PCR deployment required.`
                    : `Elevated risk detected. Recommend monitoring local channels and deploying NALSA mediation units.`}
                </p>
              </div>
              <button className="bg-[#ffead6] text-[#944b00] px-6 py-4 rounded-2xl font-black text-sm shadow-[0_4px_20px_rgba(255,234,214,0.2)] hover:scale-105 transition-transform">
                Generate Directive
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

