'use client';
import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, 
  MapPin, 
  AlertTriangle, 
  Navigation, 
  Phone, 
  Radio, 
  Activity, 
  Zap, 
  Clock, 
  CheckCircle, 
  XCircle, 
  FileText, 
  Printer, 
  Plus, 
  AlertCircle,
  Layers
} from 'lucide-react';

export default function SurakshaPage() {
  const [analyzing, setAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [liveTracking, setLiveTracking] = useState(false);
  const [coords, setCoords] = useState("25.1745°N, 80.8322°E");
  const [mapLayer, setMapLayer] = useState("Standard");
  const [logs, setLogs] = useState<string[]>([]);
  const [showCert, setShowCert] = useState(false);
  const [certDate, setCertDate] = useState("");
  const logRef = useRef<HTMLDivElement>(null);

  // Initial load date
  useEffect(() => {
    setCertDate(new Date().toLocaleString());
  }, []);

  const handleAnalyze = () => {
    setAnalyzing(true);
    setShowResults(false);
    setLogs([]);
    setTimeout(() => {
      setAnalyzing(false);
      setShowResults(true);
    }, 2500);
  };

  // Coordinate jitter
  useEffect(() => {
    if (!showResults) return;
    const interval = setInterval(() => {
      const lat = (25.1745 + (Math.random() - 0.5) * 0.001).toFixed(4);
      const lng = (80.8322 + (Math.random() - 0.5) * 0.001).toFixed(4);
      setCoords(`${lat}°N, ${lng}°E`);
    }, 2000);
    return () => clearInterval(interval);
  }, [showResults]);

  // Terminal logs sequence
  useEffect(() => {
    if (!showResults) return;
    const sequence = [
      '[14:32:11] Route analyzed: 4.2km via NH86',
      '[14:32:14] KAVACH check: 3 threat zones identified',
      '[14:32:17] PCR Unit #14 assigned to route corridor',
      '[14:32:20] Live tracking enabled — Operator CO-04 monitoring',
      '[14:32:23] ETA to destination: 8 minutes'
    ];
    let i = 0;
    const interval = setInterval(() => {
      if (i < sequence.length) {
        setLogs(prev => [...prev, sequence[i]]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [showResults]);

  // Auto-scroll logs
  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="min-h-screen font-sans bg-[#fff8f6] text-[#000666]">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pulse-ring {
          0% { transform: scale(0.8); opacity: 0.5; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes dash {
          to { stroke-dashoffset: 0; }
        }
        @keyframes glow {
          0% { filter: drop-shadow(0 0 2px #00ff00); }
          50% { filter: drop-shadow(0 0 10px #00ff00); }
          100% { filter: drop-shadow(0 0 2px #00ff00); }
        }
        .animate-dash {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: dash 3s linear forwards;
        }
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
        .pulse-circle {
          animation: pulse-ring 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
        }
      `}} />

      {/* SECTION 1: Top Hero/Intro Strip */}
      <section className="w-full bg-gradient-to-r from-[#000666] to-[#000444] py-12 px-6 flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#fff8f6] mb-4">
          Suraksha Path — AI-Powered Safe Route Navigation
        </h1>
        <p className="text-[#fff8f6]/80 text-lg md:text-xl max-w-3xl mb-8">
          Adapted from RakshaMarg. Atrocity-aware routing that avoids KAVACH threat zones.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <div className="px-4 py-2 bg-[#ba1a1a]/20 border border-[#ba1a1a] rounded-full text-[#fff8f6] font-semibold flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            8,412 Safe Routes Generated
          </div>
          <div className="px-4 py-2 bg-[#944b00]/20 border border-[#944b00] rounded-full text-[#fff8f6] font-semibold flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-[#944b00]" />
            3 Active Threat Zones
          </div>
          <div className="px-4 py-2 bg-[#000666]/50 border border-blue-400/50 rounded-full text-[#fff8f6] font-semibold flex items-center gap-2">
            <Shield className="w-4 h-4 text-blue-400" />
            PCR Coverage: 94%
          </div>
        </div>
      </section>

      {/* SECTION 2: Main Route Checker */}
      <section className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 flex flex-col lg:flex-row gap-6 -mt-6">
        
        {/* LEFT COLUMN */}
        <div className="w-full lg:w-[40%] bg-[#000666] text-[#fff8f6] rounded-2xl p-6 shadow-2xl relative z-10">
          <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Shield className="w-6 h-6 text-[#ba1a1a]" />
              Suraksha Path Analyzer
            </h2>
            <div className="flex items-center gap-2 px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-bold tracking-wider">
              <Activity className="w-3 h-3 animate-pulse" />
              SYSTEM ONLINE
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-xs uppercase text-white/50 mb-1">From</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
                <input type="text" defaultValue="Village Premnagar, Chitrakoot, UP" className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-[#ba1a1a] transition-colors" />
              </div>
            </div>
            <div>
              <label className="block text-xs uppercase text-white/50 mb-1">To</label>
              <div className="relative">
                <Navigation className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
                <input type="text" defaultValue="District Police Station, Chitrakoot" className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-[#ba1a1a] transition-colors" />
              </div>
            </div>
            <button 
              onClick={handleAnalyze}
              disabled={analyzing}
              className="w-full bg-[#ba1a1a] hover:bg-[#a01616] text-white font-bold py-4 rounded-lg shadow-lg flex justify-center items-center gap-2 transition-all disabled:opacity-70"
            >
              {analyzing ? (
                <>
                  <Zap className="w-5 h-5 animate-pulse" />
                  ANALYZING ROUTE...
                </>
              ) : (
                <>
                  <Shield className="w-5 h-5" />
                  ANALYZE ROUTE SAFETY
                </>
              )}
            </button>
          </div>

          {analyzing && (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="w-12 h-12 border-4 border-[#ba1a1a]/30 border-t-[#ba1a1a] rounded-full animate-spin mb-4" />
              <p className="text-white/70 animate-pulse text-sm">Querying KAVACH Intelligence...</p>
            </div>
          )}

          {showResults && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              {/* Score & Badge */}
              <div className="flex items-center justify-between bg-white/5 p-4 rounded-xl border border-white/10">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 flex items-center justify-center rounded-full bg-green-500/20 border-2 border-green-500">
                    <span className="text-xl font-bold text-green-400">87</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Overall Safety</h3>
                    <p className="text-green-400 text-sm font-semibold">SAFE FOR TRAVEL</p>
                  </div>
                </div>
                <div className="bg-[#944b00]/20 text-[#944b00] px-3 py-1 rounded-md text-xs font-bold border border-[#944b00]/50 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  3 zones avoided
                </div>
              </div>

              {/* Progress Bars */}
              <div className="space-y-3 bg-white/5 p-4 rounded-xl border border-white/10">
                {[
                  { label: "Street Lighting", score: 82, color: "bg-yellow-400" },
                  { label: "Police Presence", score: 91, color: "bg-blue-400" },
                  { label: "KAVACH Hotspot Avoidance", score: 96, color: "bg-green-400" },
                  { label: "Crowd Density", score: 74, color: "bg-orange-400" },
                  { label: "Historical Incident Rate", score: 88, color: "bg-green-400" },
                  { label: "Emergency Response Time", score: 79, color: "bg-blue-300" },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col gap-1">
                    <div className="flex justify-between text-xs text-white/70">
                      <span>{item.label}</span>
                      <span>{item.score}%</span>
                    </div>
                    <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                      <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.score}%`, transition: "width 1s ease-out" }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Route Details */}
              <div className="flex items-center justify-between text-sm bg-white/5 p-3 rounded-lg text-white/80">
                <div className="flex items-center gap-1"><Navigation className="w-4 h-4"/> 4.2km</div>
                <div className="flex items-center gap-1"><Clock className="w-4 h-4"/> 8 min</div>
                <div className="flex items-center gap-1"><MapPin className="w-4 h-4"/> Via: NH86</div>
              </div>

              {/* Trusted Contacts */}
              <div>
                <h4 className="text-sm font-bold uppercase text-white/50 mb-3 flex justify-between items-center">
                  Trusted Contacts
                  <button className="text-[#ba1a1a] hover:text-[#fff8f6] flex items-center gap-1 text-xs"><Plus className="w-3 h-3"/> Add Contact</button>
                </h4>
                <div className="space-y-2">
                  {["Anil Kumar (+91 9876543210)", "Meera Devi (+91 8765432109)", "Village Pradhan (+91 7654321098)"].map((contact, i) => (
                    <div key={i} className="flex justify-between items-center bg-white/5 p-2 rounded-lg text-sm border border-white/5">
                      <span className="text-white/80">{contact}</span>
                      <CheckCircle className="w-4 h-4 text-green-500/70" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Live Tracking */}
              <div className={`p-4 rounded-xl border ${liveTracking ? 'bg-blue-500/10 border-blue-500/30' : 'bg-white/5 border-white/10'} transition-colors`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Radio className={`w-5 h-5 ${liveTracking ? 'text-blue-400 animate-pulse' : 'text-white/50'}`} />
                    <span className="font-bold">Live Tracking</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={liveTracking} onChange={() => setLiveTracking(!liveTracking)} />
                    <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                  </label>
                </div>
                {liveTracking && (
                  <p className="text-xs text-blue-300">Your route is being monitored by NHAA Crisis Console. Operator: CO-04</p>
                )}
              </div>

              {/* Emergency Strip */}
              <div className="grid grid-cols-3 gap-2">
                <button className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-lg font-bold text-xs flex flex-col items-center justify-center gap-1 shadow-lg shadow-red-900/50">
                  <AlertTriangle className="w-5 h-5" /> SILENT SOS
                </button>
                <button className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-lg font-bold text-xs flex flex-col items-center justify-center gap-1">
                  <MapPin className="w-5 h-5" /> Share Location
                </button>
                <button className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg font-bold text-xs flex flex-col items-center justify-center gap-1">
                  <Phone className="w-5 h-5" /> Call 14566
                </button>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN (MAP) */}
        <div className="w-full lg:w-[60%] flex flex-col gap-4">
          <div className="flex-1 bg-[#0d1117] rounded-2xl overflow-hidden relative border-2 border-[#000666]/20 shadow-xl min-h-[400px] lg:min-h-0">
            {/* Ola Maps Badge */}
            <div className="absolute bottom-4 left-4 z-20 pointer-events-none">
              <div className="bg-white text-black text-xs font-bold px-3 py-1.5 rounded-md shadow-lg border border-gray-200">
                Powered by Ola Maps API 🇮🇳
              </div>
            </div>

            {/* Layer Toggle */}
            <div className="absolute top-4 left-4 z-20 flex bg-black/70 backdrop-blur-md rounded-lg p-1 border border-white/10 shadow-lg">
              {['Standard', 'Satellite', 'NCRB Heatmap'].map(layer => (
                <button
                  key={layer}
                  onClick={() => setMapLayer(layer)}
                  className={`px-3 py-1.5 text-[10px] uppercase font-bold rounded-md transition-all ${
                    mapLayer === layer ? 'bg-[#ba1a1a] text-white shadow-md' : 'text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {layer}
                </button>
              ))}
            </div>

            {/* Floating Panel for NCRB Heatmap */}
            {mapLayer === 'NCRB Heatmap' && (
              <div className="absolute top-16 left-4 z-20 bg-black/80 backdrop-blur-md border border-red-500/30 p-3 rounded-lg shadow-2xl max-w-[200px] animate-in fade-in slide-in-from-left-4">
                <div className="flex items-center gap-2 mb-1">
                  <Layers className="text-red-400 w-4 h-4" />
                  <span className="text-xs font-bold text-white uppercase">KAVACH Threat Intel</span>
                </div>
                <p className="text-[10px] text-white/70">
                  Data sourced from NCRB 2025 dataset. Displaying historical crime density and active atrocity hotspots.
                </p>
              </div>
            )}

            {/* Live Badge & Coords */}
            <div className="absolute top-4 right-4 z-20 flex flex-col items-end gap-2">
              {showResults && liveTracking && (
                <div className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-2 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.6)]">
                  <div className="w-2 h-2 bg-white rounded-full" />
                  LIVE
                </div>
              )}
              {showResults && (
                <div className="bg-black/80 backdrop-blur-sm text-green-400 text-xs font-mono px-3 py-1.5 rounded border border-green-500/30 shadow-lg">
                  {coords}
                </div>
              )}
            </div>
            
            {/* SVG Map Visualization */}
            <svg viewBox="0 0 800 600" className={`w-full h-full absolute inset-0 transition-all duration-700 ${mapLayer === 'Satellite' ? 'brightness-75 contrast-125' : ''}`}>
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                </pattern>
                
                {/* Map Filter & Gradients */}
                <linearGradient id="safeRouteGlow" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#00ff00" stopOpacity="0.8"/>
                  <stop offset="100%" stopColor="#00aa00" stopOpacity="0.8"/>
                </linearGradient>
                
                <radialGradient id="heatmap1" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ff0000" stopOpacity="0.7"/>
                  <stop offset="50%" stopColor="#ff7b00" stopOpacity="0.4"/>
                  <stop offset="100%" stopColor="#ffea00" stopOpacity="0"/>
                </radialGradient>
              </defs>
              
              <rect width="800" height="600" fill={mapLayer === 'Satellite' ? '#070a0f' : 'url(#grid)'} />
              
              {/* Abstract Base Map Shapes (UP region approximation) */}
              <path d="M 50,150 Q 200,100 400,200 T 750,150 L 700,500 Q 500,550 300,450 Z" fill={mapLayer === 'Satellite' ? '#0f141a' : '#161b22'} stroke="#30363d" strokeWidth="2" />
              <path d="M 100,200 Q 300,150 450,250 T 650,250 L 600,400 Q 400,450 200,350 Z" fill={mapLayer === 'Satellite' ? '#1a222c' : '#21262d'} stroke="#30363d" strokeWidth="1" />

              {/* Heatmap Overlay */}
              {mapLayer === 'NCRB Heatmap' && (
                <g className="animate-in fade-in duration-1000" style={{ mixBlendMode: 'screen' }}>
                  <circle cx="350" cy="280" r="150" fill="url(#heatmap1)" />
                  <circle cx="520" cy="380" r="120" fill="url(#heatmap1)" />
                  <circle cx="220" cy="400" r="140" fill="url(#heatmap1)" />
                  <circle cx="600" cy="200" r="100" fill="url(#heatmap1)" />
                  <circle cx="450" cy="450" r="130" fill="url(#heatmap1)" />
                </g>
              )}

              {/* Threat Zones */}
              {showResults && (
                <g className="animate-in fade-in duration-1000 delay-500">
                  {/* Zone A */}
                  <circle cx="350" cy="280" r="60" fill="rgba(186, 26, 26, 0.15)" stroke="#ba1a1a" strokeWidth="2" strokeDasharray="4 4" />
                  <circle cx="350" cy="280" r="60" className="pulse-circle" fill="none" stroke="#ba1a1a" strokeWidth="4" />
                  <text x="350" y="275" fill="#ff6b6b" fontSize="12" textAnchor="middle" fontWeight="bold">Zone A</text>
                  <text x="350" y="290" fill="#ff6b6b" fontSize="10" textAnchor="middle">Caste Violence</text>

                  {/* Zone B */}
                  <circle cx="520" cy="380" r="45" fill="rgba(186, 26, 26, 0.15)" stroke="#ba1a1a" strokeWidth="2" strokeDasharray="4 4" />
                  <circle cx="520" cy="380" r="45" className="pulse-circle" fill="none" stroke="#ba1a1a" strokeWidth="4" />
                  <text x="520" y="375" fill="#ff6b6b" fontSize="12" textAnchor="middle" fontWeight="bold">Zone B</text>
                  <text x="520" y="390" fill="#ff6b6b" fontSize="10" textAnchor="middle">Mob Alert</text>

                  {/* Zone C */}
                  <circle cx="220" cy="400" r="50" fill="rgba(186, 26, 26, 0.15)" stroke="#ba1a1a" strokeWidth="2" strokeDasharray="4 4" />
                  <circle cx="220" cy="400" r="50" className="pulse-circle" fill="none" stroke="#ba1a1a" strokeWidth="4" />
                  <text x="220" y="395" fill="#ff6b6b" fontSize="12" textAnchor="middle" fontWeight="bold">Zone C</text>
                  <text x="220" y="410" fill="#ff6b6b" fontSize="10" textAnchor="middle">Prior Incidents</text>
                </g>
              )}

              {/* Paths */}
              {showResults && (
                <g>
                  {/* Danger Route (Dashed Red) */}
                  <path 
                    d="M 150,250 L 250,280 L 350,300 L 450,350 L 550,380 L 650,420" 
                    fill="none" 
                    stroke="#ba1a1a" 
                    strokeWidth="4" 
                    strokeDasharray="10 10" 
                    className="opacity-50"
                  />
                  
                  {/* Safe Route (Solid Green Glowing) */}
                  <path 
                    d="M 150,250 Q 200,180 300,200 T 450,220 Q 550,250 600,320 T 650,420" 
                    fill="none" 
                    stroke="url(#safeRouteGlow)" 
                    strokeWidth="6" 
                    className="animate-dash animate-glow"
                    strokeLinecap="round"
                  />
                </g>
              )}

              {/* Markers */}
              {showResults && (
                <g className="animate-in zoom-in duration-500">
                  {/* Hospitals / Police */}
                  <g transform="translate(300, 220)">
                    <rect x="-10" y="-10" width="20" height="20" fill="#fff" rx="4" />
                    <path d="M 0,-6 L 0,6 M -6,0 L 6,0" stroke="#ba1a1a" strokeWidth="3" />
                  </g>
                  
                  <g transform="translate(480, 250)">
                    <path d="M 0,10 L -8,0 L 0,-10 L 8,0 Z" fill="#3b82f6" />
                    <circle cx="0" cy="0" r="4" fill="#fff" />
                  </g>
                  
                  {/* Point A (Start) */}
                  <circle cx="150" cy="250" r="8" fill="#3b82f6" className="animate-pulse" />
                  <circle cx="150" cy="250" r="16" fill="rgba(59, 130, 246, 0.3)" className="pulse-circle" />
                  <rect x="110" y="220" width="40" height="20" rx="4" fill="#3b82f6" />
                  <text x="130" y="234" fill="#fff" fontSize="12" fontWeight="bold" textAnchor="middle">YOU</text>

                  {/* Point B (End) */}
                  <polygon points="650,405 658,425 642,425" fill="#22c55e" />
                  <rect x="610" y="380" width="80" height="20" rx="4" fill="#22c55e" />
                  <text x="650" y="394" fill="#fff" fontSize="12" fontWeight="bold" textAnchor="middle">POLICE STN</text>
                </g>
              )}
              
              {/* Distance Scale */}
              <g transform="translate(20, 560)">
                <line x1="0" y1="0" x2="100" y2="0" stroke="#fff" strokeWidth="2" opacity="0.5" />
                <line x1="0" y1="-5" x2="0" y2="5" stroke="#fff" strokeWidth="2" opacity="0.5" />
                <line x1="100" y1="-5" x2="100" y2="5" stroke="#fff" strokeWidth="2" opacity="0.5" />
                <text x="50" y="-10" fill="#fff" fontSize="10" opacity="0.7" textAnchor="middle">1 km</text>
              </g>
            </svg>
          </div>

          {/* Terminal Log Panel */}
          <div className="bg-[#000666] border border-[#000666]/50 rounded-xl p-4 shadow-inner h-32 flex flex-col">
            <div className="flex items-center gap-2 mb-2 text-[#fff8f6]/50 border-b border-white/10 pb-2 text-xs font-mono">
              <Radio className="w-4 h-4" />
              SYSTEM LOGS // OPERATOR CONSOLE
            </div>
            <div 
              ref={logRef}
              className="flex-1 overflow-y-auto font-mono text-xs text-green-400 space-y-1 scroll-smooth pr-2"
            >
              {!showResults && <div className="text-white/30 italic">Awaiting route analysis...</div>}
              {logs.map((log, idx) => (
                <div key={idx} className="animate-in fade-in slide-in-from-left-2">{log}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Safety Analysis Report */}
      <section className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 mt-8">
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl border border-gray-100 relative">
          <h2 className="text-2xl font-bold text-[#000666] mb-6 border-b pb-4 flex justify-between items-center flex-wrap gap-4">
            Route Safety Intelligence Report
            <button 
              onClick={() => setShowCert(true)}
              className="bg-[#000666] hover:bg-[#000444] text-[#fff8f6] px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors"
            >
              <FileText className="w-4 h-4" /> Generate Safety Certificate
            </button>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 text-[#ba1a1a] mb-2">
                <AlertCircle className="w-5 h-5" />
                <h3 className="font-bold">Incident History</h3>
              </div>
              <p className="text-sm text-gray-700">2 incidents in last 6 months in this corridor | Low severity</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 text-[#944b00] mb-2">
                <Clock className="w-5 h-5" />
                <h3 className="font-bold">Time-of-Day Risk</h3>
              </div>
              <p className="text-sm text-gray-700">Current time (daytime) — Low Risk. Night risk: <strong>MODERATE</strong></p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 text-blue-600 mb-2">
                <Shield className="w-5 h-5" />
                <h3 className="font-bold">Nearest Safe Zones</h3>
              </div>
              <p className="text-sm text-gray-700">Police STN: 0.8km | Hospital: 1.2km | NGO Prerna: 2.1km</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 text-green-600 mb-2">
                <Zap className="w-5 h-5" />
                <h3 className="font-bold">AI Recommendation</h3>
              </div>
              <p className="text-sm text-gray-700">Take NH86 via Market Road. Avoid bypass after 7pm.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: Why Suraksha Path Wins */}
      <section className="bg-[#0d1117] text-white py-16 mt-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Suraksha Path Saves Lives</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col items-center text-center hover:bg-white/10 transition-colors">
              <div className="w-16 h-16 bg-[#ba1a1a]/20 rounded-full flex items-center justify-center mb-4 border border-[#ba1a1a]">
                <span className="text-2xl">🧠</span>
              </div>
              <h3 className="text-xl font-bold mb-2">KAVACH Integration</h3>
              <p className="text-white/60">Routes computed avoiding AI-identified atrocity hotspots, built on real-time and historical intelligence.</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col items-center text-center hover:bg-white/10 transition-colors">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-4 border border-blue-500">
                <span className="text-2xl">📡</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Crisis Console Sync</h3>
              <p className="text-white/60">Every active route is visible to NHAA operators in real-time, ensuring proactive intervention when needed.</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col items-center text-center hover:bg-white/10 transition-colors">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4 border border-green-500">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Zero-Touch SOS</h3>
              <p className="text-white/60">If user deviates from route, automatic SOS sent to PCR and 14566 without needing to press a button.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Certificate Modal */}
      {showCert && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-8 relative shadow-2xl">
            <button 
              onClick={() => setShowCert(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-black"
            >
              <XCircle className="w-6 h-6" />
            </button>
            
            <div className="text-center mb-6 border-b pb-6">
              <Shield className="w-16 h-16 text-[#000666] mx-auto mb-4" />
              <h2 className="text-2xl font-black text-[#000666]">SAHAYAK-AI</h2>
              <p className="text-lg font-bold text-[#ba1a1a] tracking-widest mt-1 uppercase">Route Safety Certificate</p>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500">Route</span>
                <span className="font-semibold text-right max-w-[200px]">Village Premnagar → District Police Station</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500">Safety Score</span>
                <span className="font-bold text-green-600">87/100</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500">Issued</span>
                <span className="font-semibold">{certDate}</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500">Zones Avoided</span>
                <span className="font-semibold">3</span>
              </div>
            </div>
            
            <div className="bg-green-50 text-green-800 p-4 rounded-lg text-center text-sm font-medium border border-green-200 flex flex-col items-center gap-2">
              <CheckCircle className="w-8 h-8 text-green-600" />
              This route has been analyzed by SAHAYAK-AI and determined SAFE for travel at the current time.
            </div>
            
            <button 
              onClick={() => window.print()}
              className="w-full mt-6 bg-[#000666] text-white py-3 rounded-lg font-bold flex justify-center items-center gap-2 hover:bg-[#000444] transition-colors"
            >
              <Printer className="w-5 h-5" /> Print Certificate
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
