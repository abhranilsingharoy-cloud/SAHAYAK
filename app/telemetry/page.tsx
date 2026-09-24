"use client";

import React, { useState, useEffect } from 'react';
import { 
  Activity, ShieldAlert, Zap, Brain, Mic, 
  MessageSquare, History, PhoneCall, AlertOctagon, HeartPulse, Terminal
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, AreaChart, Area } from 'recharts';

const initialTrajectory = [
  { time: 'T-0', svi: 45 },
  { time: 'T+2', svi: 52 },
  { time: 'T+5', svi: 68 },
  { time: 'T+8', svi: 75 },
  { time: 'T+12', svi: 82 },
  { time: 'T+15', svi: 89 },
];

export default function SVITelemetry() {
  const [trajectoryData, setTrajectoryData] = useState(initialTrajectory);
  const [logs, setLogs] = useState<string[]>([
    "> INITIALIZING SAFETEXT NLP MODULE...",
    "> CONNECTED TO STREAM: CALLER #4821",
    "> AUDIO STRESS DETECTED (CONF: 0.94)"
  ]);
  
  // Simulate live telemetry and NLP logs
  useEffect(() => {
    let tick = 15;
    const interval = setInterval(() => {
      tick += 2;
      
      // Update chart
      setTrajectoryData(prev => {
        const newData = [...prev.slice(1), { time: `T+${tick}`, svi: Math.min(100, prev[prev.length - 1].svi + Math.floor(Math.random() * 4 - 1)) }];
        return newData;
      });

      // Update terminal logs
      setLogs(prev => {
        const possibleLogs = [
          "> EXTRACTING ENTITIES...",
          "> KEYWORD MATCH: 'kill', 'son', 'police'",
          "> UPDATING PO A ACT RISK VECTOR",
          "> SVI CALCULATION REFRESH...",
          "> WARNING: HOSTILITY MARKER DETECTED"
        ];
        const newLog = possibleLogs[Math.floor(Math.random() * possibleLogs.length)];
        return [...prev.slice(Math.max(prev.length - 4, 0)), newLog];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const currentSvi = trajectoryData[trajectoryData.length - 1].svi;

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto">
      
      {/* CRISIS BANNER */}
      <div className="bg-[#ba1a1a] rounded-3xl p-8 text-white shadow-[0_8px_30px_rgba(186,26,26,0.3)] flex flex-col md:flex-row md:items-center justify-between border border-[#ffdad6]/20 relative overflow-hidden gap-6">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxwYXRoIGQ9Ik0wIDIwaDQwTTIwIDB2NDAiIHN0cm9rZT0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA1KSIgc3Ryb2tlLXdpZHRoPSIyIiBmaWxsPSJub25lIi8+Cjwvc3ZnPg==')] opacity-30" />
        
        <div className="relative z-10 flex items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center crisis-pulse shrink-0 shadow-lg">
            <AlertOctagon size={40} className="text-[#ba1a1a]" />
          </div>
          <div>
            <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-3 backdrop-blur-sm shadow-sm border border-white/20">
              <Zap size={14} className="text-[#ffdad6]" /> Priority Override Active
            </div>
            <h1 className="text-4xl font-black tracking-tight">Suicidal Ideation Detected</h1>
            <p className="text-[#ffdad6] font-medium mt-2">AI Intercepted: Caller #4821 • Counselor 04 currently engaged.</p>
          </div>
        </div>

        <div className="relative z-10 md:text-right shrink-0">
          <div className="text-[10px] font-bold text-[#ffdad6] uppercase tracking-widest mb-1">Live SVI Metric</div>
          <div className="text-7xl font-black tracking-tighter flex items-baseline justify-end gap-1">
            {currentSvi}<span className="text-3xl text-white/70">.2</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COL: Trajectory & SHAP */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Chart */}
          <div className="bg-white rounded-3xl p-6 border border-[#f0e6e4] shadow-sm flex flex-col h-[400px]">
            <div className="flex items-center justify-between mb-6 shrink-0">
              <h2 className="font-bold text-lg text-[#201a19] flex items-center gap-2">
                <Activity size={20} className="text-[#000666]" /> SVI Escalation Trajectory
              </h2>
              <span className="bg-[#ffdad6] text-[#ba1a1a] text-xs font-bold px-3 py-1.5 rounded-full shadow-inner flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#ba1a1a] animate-pulse" /> Live Feed
              </span>
            </div>
            <div className="flex-1 w-full min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trajectoryData}>
                  <defs>
                    <linearGradient id="colorSvi" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ba1a1a" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#ba1a1a" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0e6e4" />
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#857371', fontWeight: 600 }} />
                  <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#857371', fontWeight: 600 }} width={30} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontWeight: 'bold' }} />
                  <Area type="monotone" dataKey="svi" stroke="#ba1a1a" strokeWidth={4} fillOpacity={1} fill="url(#colorSvi)" isAnimationActive={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Component Scores */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Acoustic Stress', val: '92%', icon: Mic, color: 'text-[#ba1a1a]', bg: 'bg-[#ffdad6]' },
              { label: 'Semantic Risk', val: '88%', icon: MessageSquare, color: 'text-[#ba1a1a]', bg: 'bg-[#ffdad6]' },
              { label: 'Historical Flag', val: '45%', icon: History, color: 'text-[#944b00]', bg: 'bg-[#ffead6]' },
              { label: 'Vitals/Behavior', val: 'N/A', icon: HeartPulse, color: 'text-[#857371]', bg: 'bg-[#f0e6e4]' },
            ].map((score, i) => (
              <div key={i} className="bg-white rounded-3xl p-5 border border-[#f0e6e4] shadow-sm text-center transform transition-transform hover:scale-[1.02]">
                <div className={`w-12 h-12 mx-auto rounded-full ${score.bg} flex items-center justify-center mb-3`}>
                  <score.icon size={20} className={score.color} />
                </div>
                <div className={`text-2xl font-black tracking-tight ${score.color}`}>{score.val}</div>
                <div className="text-[10px] font-bold text-[#534341] mt-1.5 uppercase tracking-wider">{score.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COL: NLP Transcript & Entities */}
        <div className="flex flex-col gap-6">
          
          <div className="bg-white rounded-3xl border border-[#f0e6e4] shadow-sm flex flex-col overflow-hidden h-full">
            <div className="p-5 border-b border-[#f0e6e4] bg-[#f9f0ee]">
              <h3 className="font-bold text-[#000666] flex items-center gap-2">
                <Brain size={18} className="text-[#000666]" /> SafeText™ NLP Engine
              </h3>
            </div>
            
            <div className="p-5 flex flex-col gap-5 flex-1">
              <div>
                <div className="text-xs font-bold text-[#857371] uppercase tracking-wider mb-2 flex items-center justify-between">
                  Live Transcript Analysis
                  <div className="w-1.5 h-1.5 rounded-full bg-[#000666] animate-ping" />
                </div>
                <div className="bg-[#f9f0ee] p-4 rounded-2xl border border-[#f0e6e4] text-sm text-[#201a19] leading-loose font-medium shadow-inner">
                  "It's been three months. <span className="bg-[#ffead6] text-[#944b00] px-1 rounded font-bold">They took everything</span> from the shop. Now they are threatening my family. 
                  <span className="bg-[#ffdad6] text-[#ba1a1a] px-1 rounded font-bold mx-1 border border-[#ba1a1a]/30">I can't take this anymore, it's better if I just end it.</span> 
                  No one is helping us."
                </div>
              </div>

              {/* Live Terminal Block */}
              <div className="flex-1 bg-[#201a19] rounded-2xl p-4 font-mono text-[10px] text-[#86efac] leading-relaxed shadow-inner flex flex-col justify-end overflow-hidden border border-[#534341]">
                <div className="text-[#857371] mb-2 flex items-center gap-1"><Terminal size={12}/> NER PROCESSOR V3</div>
                {logs.map((l, idx) => (
                  <div key={idx} className="opacity-80">{l}</div>
                ))}
                <div className="mt-1 flex items-center gap-1 text-white">_ <span className="w-1.5 h-3 bg-white animate-pulse" /></div>
              </div>

              <div>
                <div className="text-xs font-bold text-[#857371] uppercase tracking-wider mb-3">Detected Entities (PoA Act)</div>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-[#000666] text-white text-[10px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-sm">
                    <ShieldAlert size={12} /> Economic Boycott
                  </span>
                  <span className="bg-[#944b00] text-white text-[10px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-sm">
                    <ShieldAlert size={12} /> Intimidation
                  </span>
                  <span className="bg-[#ba1a1a] text-white text-[10px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 animate-pulse shadow-sm">
                    <AlertOctagon size={12} /> Self-Harm Risk
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-[#f0e6e4] bg-[#f9f0ee]">
              <button className="w-full bg-[#000666] hover:bg-[#00044d] text-white py-4 rounded-xl font-black shadow-[0_4px_14px_rgba(0,6,102,0.3)] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2">
                <PhoneCall size={20} /> Patch Supervisor Line
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

