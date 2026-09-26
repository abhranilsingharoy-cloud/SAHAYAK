"use client";

import React, { useState, useEffect } from 'react';
import { 
  Activity, AlertTriangle, PhoneIncoming, 
  MapPin, Clock, Brain, FileText, CheckCircle2, Siren,
  Scale, Stethoscope, AudioLines, Fingerprint, ChevronRight
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

const initialSessions = [
  { id: '#4821', time: '02:14', svi: 89, caller: 'Anonymous', lang: 'Hindi (Bundelkhandi)', location: 'Aligarh, UP', status: 'CRITICAL', tags: ['Suicidal Ideation', 'Immediate Threat'], emotion: [{subject: 'Fear', A: 90}, {subject: 'Anger', A: 30}, {subject: 'Despair', A: 85}, {subject: 'Stress', A: 95}, {subject: 'Calm', A: 10}] },
  { id: '#4822', time: '04:30', svi: 64, caller: 'Pramod K.', lang: 'Telugu', location: 'Guntur, AP', status: 'HIGH', tags: ['Verbal Abuse', 'Land Dispute'], emotion: [{subject: 'Fear', A: 40}, {subject: 'Anger', A: 85}, {subject: 'Despair', A: 30}, {subject: 'Stress', A: 70}, {subject: 'Calm', A: 20}] },
  { id: '#4819', time: '12:05', svi: 42, caller: 'Rajesh D.', lang: 'Hindi', location: 'Patna, BR', status: 'MODERATE', tags: ['Social Boycott'], emotion: [{subject: 'Fear', A: 50}, {subject: 'Anger', A: 40}, {subject: 'Despair', A: 60}, {subject: 'Stress', A: 55}, {subject: 'Calm', A: 40}] },
];

const shapData = [
  { name: 'Voice Stress', value: 35, fill: '#ba1a1a' },
  { name: 'Semantics', value: 30, fill: '#944b00' },
  { name: 'Context (SC/ST)', value: 20, fill: '#000666' },
  { name: 'Historical', value: 15, fill: '#857371' },
];

export default function DrishtiBoard() {
  const [sessions, setSessions] = useState(initialSessions);
  const [selectedSession, setSelectedSession] = useState(initialSessions[0]);
  const [callDuration, setCallDuration] = useState(134); // seconds
  const [waveformData, setWaveformData] = useState<number[]>(Array(40).fill(10));

  // Simulate live call timer & waveform
  useEffect(() => {
    const timer = setInterval(() => setCallDuration(p => p + 1), 1000);
    const wave = setInterval(() => {
      setWaveformData(prev => prev.map(() => Math.max(10, Math.random() * (selectedSession.svi >= 75 ? 100 : 50))));
    }, 150);
    return () => {
      clearInterval(timer);
      clearInterval(wave);
    };
  }, [selectedSession]);

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (<>
    <div className="flex flex-col xl:flex-row gap-6">
      
      {/* LEFT COLUMN: Feed & KPIs */}
      <div className="flex-1 flex flex-col gap-6">
        
        {/* Advanced KPI Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-3xl p-6 border border-[#f0e6e4] shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#e0e5ff] to-transparent rounded-full -mr-10 -mt-10 opacity-50 group-hover:scale-110 transition-transform duration-700" />
            <div className="flex justify-between items-start">
              <div>
                <div className="text-xs font-bold text-[#857371] uppercase tracking-widest">Active Triages</div>
                <div className="text-4xl font-black text-[#000666] mt-2 tracking-tight">124</div>
                <div className="text-xs font-semibold text-green-600 mt-2 flex items-center gap-1.5 bg-green-50 w-max px-2 py-1 rounded-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#4ade80]" /> 12 operators live
                </div>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#e0e5ff] to-white border border-[#e0e5ff] flex items-center justify-center shadow-inner">
                <PhoneIncoming size={24} className="text-[#000666]" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#ba1a1a] to-[#7a0d0d] rounded-3xl p-6 shadow-[0_8px_30px_rgba(186,26,26,0.3)] text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 group-hover:scale-110 transition-transform duration-700" />
            <div className="flex justify-between items-start">
              <div>
                <div className="text-xs font-bold text-white/70 uppercase tracking-widest">Critical Alerts</div>
                <div className="text-4xl font-black mt-2 tracking-tight flex items-baseline gap-2">
                  14 <span className="text-sm font-bold text-[#ffdad6] bg-white/10 px-2 py-0.5 rounded-full">+3 spike</span>
                </div>
                <div className="text-xs font-semibold text-[#ffdad6] mt-2 flex items-center gap-1">
                  <AlertTriangle size={12} /> Requiring instant dispatch
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-[#f0e6e4] shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#ffead6] to-transparent rounded-full -mr-10 -mt-10 opacity-50 group-hover:scale-110 transition-transform duration-700" />
            <div className="flex justify-between items-start">
              <div>
                <div className="text-xs font-bold text-[#857371] uppercase tracking-widest">AI Triage Latency</div>
                <div className="text-4xl font-black text-[#944b00] mt-2 tracking-tight">1.4<span className="text-xl font-bold text-[#944b00]/60">s</span></div>
                <div className="text-xs font-semibold text-[#944b00] mt-2 bg-[#ffead6]/50 w-max px-2 py-1 rounded-md">
                  Powered by Llama-3 70B
                </div>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#ffead6] to-white border border-[#ffead6] flex items-center justify-center shadow-inner">
                <Activity size={24} className="text-[#944b00]" />
              </div>
            </div>
          </div>
        </div>

        {/* Live Call Feed */}
        <div className="bg-white rounded-3xl border border-[#f0e6e4] shadow-sm flex flex-col flex-1 min-h-[400px] overflow-hidden">
          <div className="p-5 border-b border-[#f0e6e4] bg-gray-50/50 flex items-center justify-between">
            <h2 className="font-bold text-lg text-[#000666] flex items-center gap-2">
              <AudioLines size={20} className="text-[#000666]" />
              Live Interception Queue
            </h2>
            <div className="flex gap-1.5 p-1 bg-[#f0e6e4]/50 rounded-xl">
              {['ALL', 'CRITICAL', 'HIGH'].map((filter, i) => (
                <button key={filter} className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${i === 0 ? 'bg-white shadow-sm text-[#000666]' : 'text-[#857371] hover:text-[#201a19]'}`}>
                  {filter}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex-1 p-3 flex flex-col gap-2 overflow-y-auto">
            {sessions.map(session => {
              const isSelected = selectedSession.id === session.id;
              return (
                <button 
                  key={session.id}
                  onClick={() => setSelectedSession(session)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center gap-5 ${
                    isSelected 
                      ? 'bg-gradient-to-r from-[#f9f0ee] to-white border-[#000666]/30 shadow-md scale-[1.01]' 
                      : 'bg-white border-[#f0e6e4] hover:bg-[#f9f0ee]/50'
                  }`}
                >
                  {/* Gauge Avatar */}
                  <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90 absolute inset-0" viewBox="0 0 36 36">
                      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#f0e6e4" strokeWidth="2.5" />
                      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke={session.svi >= 75 ? '#ba1a1a' : session.svi >= 50 ? '#944b00' : '#000666'} strokeWidth="2.5" strokeLinecap="round" strokeDasharray={`${session.svi}, 100`} />
                    </svg>
                    <div className="flex flex-col items-center">
                      <span className="font-black text-lg leading-none" style={{ color: session.svi >= 75 ? '#ba1a1a' : session.svi >= 50 ? '#944b00' : '#000666' }}>
                        {session.svi}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="font-extrabold text-[#201a19] text-base">{session.id} <span className="font-medium text-[#857371]">· {session.caller}</span></div>
                      <div className="text-xs font-bold text-[#000666] bg-[#e0e5ff] px-2 py-1 rounded-md flex items-center gap-1.5">
                        <Clock size={12} /> {isSelected ? formatTime(callDuration) : session.time}
                      </div>
                    </div>
                    <div className="text-xs text-[#534341] mt-1 font-medium flex items-center gap-2">
                      <span className="flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded"><MapPin size={12} className="text-[#944b00]" /> {session.location}</span>
                      <span className="bg-gray-100 px-2 py-0.5 rounded">{session.lang}</span>
                    </div>
                    <div className="flex gap-2 mt-2.5">
                      <span className={`text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider ${
                        session.status === 'CRITICAL' ? 'bg-[#ba1a1a] text-white shadow-[0_2px_10px_rgba(186,26,26,0.2)]' : 
                        session.status === 'HIGH' ? 'bg-[#ffead6] text-[#944b00]' : 'bg-[#e0e5ff] text-[#000666]'
                      }`}>
                        {session.status} RISK
                      </span>
                      {session.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-[#f0e6e4]/50 text-[#534341] border border-[#f0e6e4]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  {isSelected && <ChevronRight size={24} className="text-[#000666] shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Action Dossier */}
      <div className="xl:w-[480px] shrink-0 flex flex-col gap-6">
        
        {/* Advanced Dossier Panel */}
        <div className="bg-white rounded-3xl border border-[#f0e6e4] shadow-xl overflow-hidden flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-br from-[#00044d] via-[#000666] to-[#000333] p-6 text-white relative">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-50" />
            
            <div className="relative z-10 flex justify-between items-start">
              <div>
                <div className="text-[10px] font-bold text-[#86efac] uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#86efac] animate-pulse" /> Live Telemetry
                </div>
                <h2 className="text-2xl font-black tracking-tight">Session {selectedSession.id}</h2>
                <div className="text-sm text-white/70 mt-1 font-medium">{selectedSession.location} • Identity Protected</div>
              </div>
              
              <div className={`relative w-20 h-20 rounded-2xl flex items-center justify-center border-2 ${selectedSession.svi >= 75 ? 'border-[#ffdad6]/30 bg-[#ba1a1a] shadow-[0_0_20px_rgba(186,26,26,0.6)]' : 'border-white/10 bg-white/5'}`}>
                <div className="text-center">
                  <div className="text-3xl font-black leading-none">{selectedSession.svi}</div>
                  <div className="text-[9px] font-bold uppercase tracking-widest mt-1 opacity-80">SVI SCORE</div>
                </div>
              </div>
            </div>

            {/* Live Audio Waveform Simulation */}
            <div className="relative z-10 mt-6 h-12 flex items-end gap-1 overflow-hidden opacity-80">
              {waveformData.map((height, i) => (
                <div 
                  key={i} 
                  className="w-full bg-[#ffead6] rounded-t-sm transition-all duration-150"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
            <div className="relative z-10 flex justify-between mt-1 text-[9px] font-bold text-white/50 uppercase tracking-widest">
              <span>RNNoise Active</span>
              <span>Whisper ASR Streaming</span>
            </div>
          </div>

          <div className="p-6 flex flex-col gap-6">
            
            {/* Emotion Radar & Transcript Split */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#f9f0ee] rounded-2xl p-3 border border-[#f0e6e4] flex flex-col">
                <div className="text-[10px] font-bold text-[#857371] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Fingerprint size={12} /> Emotion Profile
                </div>
                <div className="flex-1 -mx-4 -my-2">
                  <ResponsiveContainer width="100%" height={120}>
                    <RadarChart data={selectedSession.emotion} margin={{top:5, right:5, bottom:5, left:5}}>
                      <PolarGrid stroke="#f0e6e4" />
                      <PolarAngleAxis dataKey="subject" tick={{fontSize: 9, fill: '#534341', fontWeight: 'bold'}} />
                      <Radar name="Emotion" dataKey="A" stroke={selectedSession.svi >= 75 ? '#ba1a1a' : '#944b00'} fill={selectedSession.svi >= 75 ? '#ba1a1a' : '#944b00'} fillOpacity={0.4} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="text-[10px] font-bold text-[#857371] uppercase tracking-wider flex items-center gap-1.5">
                  <FileText size={12} /> Live Transcript
                </div>
                <div className="flex-1 bg-gray-50 rounded-2xl border border-[#f0e6e4] p-3 text-xs text-[#201a19] leading-relaxed font-medium shadow-inner overflow-y-auto">
                  "...he took the land and now he says <span className="bg-[#ffdad6] text-[#ba1a1a] font-bold px-1 rounded animate-pulse">he will kill my son</span> if I go to the police... I have no hope left."
                </div>
              </div>
            </div>

            {/* SHAP Explainability */}
            <div>
              <div className="text-xs font-bold text-[#857371] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Brain size={14} /> AI Decision Factors (SHAP)
              </div>
              <div className="h-28">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={shapData} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <XAxis type="number" hide />
                    <YAxis type="category" dataKey="name" width={110} axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#534341', fontWeight: 700 }} />
                    <Tooltip cursor={{fill: '#f9f0ee'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }} />
                    <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={14}>
                      {shapData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Statutory Checklist */}
            <div className="bg-[#f0e6e4]/30 p-4 rounded-2xl border border-[#f0e6e4]">
              <div className="text-xs font-bold text-[#857371] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <CheckCircle2 size={14} /> SRRP Protocol Tasks
              </div>
              <div className="flex flex-col gap-2.5">
                {['Verify GPS Location via Cell Tower', 'Assess immediate physical threat', 'Inform District SP / PCR'].map((task, i) => (
                  <label key={i} className="flex items-start gap-3 p-2 bg-white rounded-xl cursor-pointer border border-[#f0e6e4] shadow-sm hover:border-[#000666]/30 transition-colors">
                    <input type="checkbox" className="mt-0.5 w-4 h-4 rounded border-[#857371] text-[#000666] focus:ring-[#000666]" />
                    <span className="text-xs font-bold text-[#201a19]">{task}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Dispatch Buttons */}
            <div className="flex flex-col gap-2 pt-2">
              <div className="grid grid-cols-2 gap-3">
                <button className="bg-[#ba1a1a] hover:bg-[#93000a] text-white py-3.5 rounded-2xl font-black text-sm transition-all shadow-[0_4px_14px_rgba(186,26,26,0.3)] hover:shadow-[0_6px_20px_rgba(186,26,26,0.4)] hover:-translate-y-0.5 flex items-center justify-center gap-2">
                  <Siren size={18} /> PCR 112
                </button>
                <button className="bg-[#ffead6] hover:bg-[#ffd1aa] text-[#944b00] py-3.5 rounded-2xl font-black text-sm transition-all shadow-sm flex items-center justify-center gap-2">
                  <Stethoscope size={18} /> Ambulance
                </button>
                <button className="col-span-2 bg-[#000666] hover:bg-[#00044d] text-white py-3.5 rounded-2xl font-black text-sm transition-all shadow-[0_4px_14px_rgba(0,6,102,0.3)] hover:-translate-y-0.5 flex items-center justify-center gap-2">
                  <Scale size={18} /> Dispatch NALSA Legal Aid
                </button>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>

    {/* Multi-Agency Dispatch Console */}
    <div className="mt-6 bg-white rounded-3xl border border-[#f0e6e4] shadow-xl overflow-hidden p-6 relative">
      <h2 className="text-xl font-bold text-[#000666] mb-6 flex items-center gap-2">
        <Activity size={24} className="text-[#ba1a1a]" />
        Zero-Touch Multi-Agency Dispatch
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#f9f0ee] rounded-2xl p-5 border border-[#ba1a1a]/30 relative z-10 shadow-sm">
          <div className="text-xs font-bold text-[#ba1a1a] uppercase tracking-wider flex items-center justify-between mb-3">
            <span className="flex items-center gap-1.5"><Siren size={16} /> Police (PCR #14)</span>
          </div>
          <div className="text-3xl font-black text-[#ba1a1a] mb-1">EN ROUTE</div>
          <div className="text-sm font-bold text-[#857371] flex items-center gap-2">
            ETA: 3m 20s
          </div>
        </div>
        
        <div className="bg-[#f0fdf4] rounded-2xl p-5 border border-green-500/30 relative z-10 shadow-sm">
          <div className="text-xs font-bold text-green-700 uppercase tracking-wider flex items-center justify-between mb-3">
            <span className="flex items-center gap-1.5"><Stethoscope size={16} /> Medical (AMB-07)</span>
          </div>
          <div className="text-3xl font-black text-green-700 mb-1">DISPATCHED</div>
          <div className="text-sm font-bold text-[#857371] flex items-center gap-2">
            ETA: 6m 10s
          </div>
        </div>
        
        <div className="bg-[#e0e5ff] rounded-2xl p-5 border border-[#000666]/30 relative z-10 shadow-sm">
          <div className="text-xs font-bold text-[#000666] uppercase tracking-wider flex items-center justify-between mb-3">
            <span className="flex items-center gap-1.5"><Scale size={16} /> Legal (NALSA)</span>
          </div>
          <div className="text-3xl font-black text-[#000666] mb-1">NOTIFIED</div>
          <div className="text-sm font-bold text-[#857371]">
            ETA: On arrival
          </div>
        </div>
      </div>

      <div className="relative h-32 mb-6 bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden flex items-end justify-center pb-4">
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
           <line x1="16%" y1="0" x2="50%" y2="80%" stroke="#ba1a1a" strokeWidth="2.5" strokeDasharray="6" className="animate-pulse opacity-60"/>
           <line x1="50%" y1="0" x2="50%" y2="80%" stroke="#15803d" strokeWidth="2.5" strokeDasharray="6" className="animate-pulse opacity-60"/>
           <line x1="84%" y1="0" x2="50%" y2="80%" stroke="#000666" strokeWidth="2.5" strokeDasharray="6" className="animate-pulse opacity-60"/>
        </svg>
        <div className="relative z-10 bg-white px-5 py-2.5 rounded-full shadow-lg border-2 border-[#ba1a1a]/50 text-sm font-black text-[#ba1a1a] flex items-center gap-2">
          <MapPin size={16} /> VICTIM LOCATION
        </div>
      </div>

      <div className="bg-[#ffead6]/30 rounded-xl p-4 text-xs font-mono text-[#534341] border border-[#ffead6] flex items-start gap-3">
        <Activity size={16} className="text-[#944b00] shrink-0 mt-0.5" />
        <div>
          <span className="text-[#944b00] font-bold">Auto-dispatch trigger log:</span> 
          <span className="opacity-80"> SVI crossed 90 threshold at 14:32:11 &rarr; Auto-dispatch triggered &rarr; 3 agencies notified in 420ms</span>
        </div>
      </div>
    </div>
  </>);
}

