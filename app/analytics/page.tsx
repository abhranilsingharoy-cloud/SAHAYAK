"use client";

import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import { Shield, TrendingUp, AlertOctagon, Zap, Download, Calendar, Filter } from 'lucide-react';

// Mock Data for the Ministry
const monthlyInterventions = [
  { month: 'Jan', prevented: 1240, escalated: 320, total: 1560 },
  { month: 'Feb', prevented: 1450, escalated: 290, total: 1740 },
  { month: 'Mar', prevented: 1890, escalated: 410, total: 2300 },
  { month: 'Apr', prevented: 2100, escalated: 380, total: 2480 },
  { month: 'May', prevented: 2500, escalated: 310, total: 2810 },
  { month: 'Jun', prevented: 3100, escalated: 250, total: 3350 }, // Massive improvement
];

const stateWiseData = [
  { name: 'Uttar Pradesh', value: 45 },
  { name: 'Madhya Pradesh', value: 25 },
  { name: 'Rajasthan', value: 15 },
  { name: 'Bihar', value: 10 },
  { name: 'Others', value: 5 },
];

const COLORS = ['#ba1a1a', '#000666', '#944b00', '#2dd4bf', '#857371'];

const sviAverages = [
  { time: '00:00', svi: 45 },
  { time: '04:00', svi: 38 },
  { time: '08:00', svi: 62 },
  { time: '12:00', svi: 75 },
  { time: '16:00', svi: 82 },
  { time: '20:00', svi: 91 }, // Peak threat at night
  { time: '23:59', svi: 85 },
];

export default function AnalyticsDashboard() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="p-8 text-center text-white/50 animate-pulse">Loading Government Analytics...</div>;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* HEADER */}
      <div className="bg-[#050505] p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#ba1a1a] rounded-full blur-[120px] opacity-20 pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-[#ba1a1a] font-bold text-xs tracking-widest uppercase mb-2">
            <Shield className="w-4 h-4" /> Ministry of Social Justice & Empowerment
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-white">National Atrocity Prevention Analytics</h1>
          <p className="text-white/60 mt-2 max-w-xl">Live data aggregation from SAHAYAK-AI across 28 states. Predictive AI forecasting and response time metrics.</p>
        </div>
        
        <div className="relative z-10 flex gap-4 w-full md:w-auto">
          <button className="flex-1 md:flex-none bg-white/5 border border-white/10 text-white px-4 py-2 rounded-xl flex items-center justify-center gap-2 hover:bg-white/10 transition-colors text-sm font-bold">
            <Calendar className="w-4 h-4" /> YTD 2026
          </button>
          <button className="flex-1 md:flex-none bg-[#000666] text-white px-4 py-2 rounded-xl flex items-center justify-center gap-2 hover:bg-[#00044d] transition-colors text-sm font-bold">
            <Download className="w-4 h-4" /> Export PDF
          </button>
        </div>
      </div>

      {/* KPI METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-[#f0e6e4] shadow-sm relative overflow-hidden">
          <div className="text-xs font-bold text-[#857371] uppercase tracking-wider mb-2">Total FIRs Drafted (AI)</div>
          <div className="text-4xl font-black text-[#000666]">14,281</div>
          <div className="mt-2 text-sm font-bold text-emerald-600 flex items-center gap-1">
            <TrendingUp className="w-4 h-4" /> +142% vs Last Year
          </div>
        </div>
        
        <div className="bg-white rounded-3xl p-6 border border-[#f0e6e4] shadow-sm relative overflow-hidden">
          <div className="text-xs font-bold text-[#857371] uppercase tracking-wider mb-2">Avg Police Response Time</div>
          <div className="text-4xl font-black text-[#2dd4bf]">4.2 min</div>
          <div className="mt-2 text-sm font-bold text-emerald-600 flex items-center gap-1">
            <TrendingUp className="w-4 h-4" /> Down from 22.4 min
          </div>
        </div>

        <div className="bg-[#ba1a1a] rounded-3xl p-6 shadow-xl relative overflow-hidden">
          <div className="text-xs font-bold text-white/70 uppercase tracking-wider mb-2">High-Risk Interventions</div>
          <div className="text-4xl font-black text-white">12,280</div>
          <div className="mt-2 text-sm font-bold text-white/90 flex items-center gap-1">
            <AlertOctagon className="w-4 h-4" /> SVI Score &gt; 90
          </div>
        </div>

        <div className="bg-[#000666] rounded-3xl p-6 shadow-xl relative overflow-hidden">
          <div className="text-xs font-bold text-white/70 uppercase tracking-wider mb-2">AI Routing Success</div>
          <div className="text-4xl font-black text-white">98.4%</div>
          <div className="mt-2 text-sm font-bold text-[#2dd4bf] flex items-center gap-1">
            <Zap className="w-4 h-4" /> Threat Zones Avoided
          </div>
        </div>
      </div>

      {/* CHARTS ROW 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Bar Chart */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-[#f0e6e4] shadow-sm">
          <h2 className="text-xl font-bold text-[#000666] mb-6">Atrocities Prevented vs Escalated (2026)</h2>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyInterventions} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0e6e4" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#857371', fontWeight: 600 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#857371', fontWeight: 600 }} />
                <Tooltip 
                  cursor={{ fill: '#f9f0ee' }} 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontWeight: 'bold' }} 
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', fontWeight: 600, paddingTop: '20px' }} />
                <Bar dataKey="prevented" name="Prevented by SAHAYAK" stackId="a" fill="#2dd4bf" radius={[0, 0, 4, 4]} />
                <Bar dataKey="escalated" name="Escalated Incidents" stackId="a" fill="#ba1a1a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-3xl p-8 border border-[#f0e6e4] shadow-sm flex flex-col">
          <h2 className="text-xl font-bold text-[#000666] mb-2">Geographic Distribution</h2>
          <p className="text-xs text-[#857371] mb-6 font-semibold">Incident reports mapped by State</p>
          <div className="flex-1 min-h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stateWiseData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {stateWiseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontWeight: 'bold' }} />
                <Legend iconType="circle" layout="horizontal" verticalAlign="bottom" wrapperStyle={{ fontSize: '12px', fontWeight: 600, marginTop: '20px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* CHARTS ROW 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Area Chart: Time of Day SVI */}
        <div className="bg-white rounded-3xl p-8 border border-[#f0e6e4] shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-[#000666]">Average SVI (Threat Level) by Time of Day</h2>
            <div className="bg-[#ffdad6] text-[#ba1a1a] text-xs font-bold px-3 py-1 rounded-full">AI Predictive Model</div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sviAverages} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSviDark" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ba1a1a" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#ba1a1a" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0e6e4" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#857371', fontWeight: 600 }} />
                <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#857371', fontWeight: 600 }} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontWeight: 'bold' }} />
                <Area type="monotone" dataKey="svi" name="Threat Score (SVI)" stroke="#ba1a1a" strokeWidth={4} fillOpacity={1} fill="url(#colorSviDark)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Actionable AI Insights */}
        <div className="bg-[#050505] rounded-3xl p-8 border border-white/10 shadow-xl text-white">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Zap className="text-[#2dd4bf]" /> Generative AI Insights
          </h2>
          
          <div className="space-y-4">
            <div className="bg-white/5 p-4 rounded-2xl border border-white/10 border-l-4 border-l-[#ba1a1a]">
              <div className="text-[#ba1a1a] text-xs font-bold uppercase tracking-wider mb-1">Critical Alert</div>
              <p className="text-sm text-white/80 leading-relaxed font-medium">Predictive modeling indicates a 34% spike in caste-based violence probability in Bundelkhand district between 8PM and 11PM this weekend. <strong className="text-white">Recommendation: Pre-deploy 3 additional PCR units.</strong></p>
            </div>
            
            <div className="bg-white/5 p-4 rounded-2xl border border-white/10 border-l-4 border-l-[#2dd4bf]">
              <div className="text-[#2dd4bf] text-xs font-bold uppercase tracking-wider mb-1">Efficiency Win</div>
              <p className="text-sm text-white/80 leading-relaxed font-medium">Auto e-FIR generation via Gemini AI has saved approximately 4,200 administrative police hours this month, reducing FIR rejection rates by 87%.</p>
            </div>

            <div className="bg-white/5 p-4 rounded-2xl border border-white/10 border-l-4 border-l-[#944b00]">
              <div className="text-[#944b00] text-xs font-bold uppercase tracking-wider mb-1">Resource Reallocation</div>
              <p className="text-sm text-white/80 leading-relaxed font-medium">NALSA Legal Aid utilization is currently bottlenecked in Madhya Pradesh (T-14 hrs backlog). Recommend digital shifting of 12 counselors from Maharashtra node.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
