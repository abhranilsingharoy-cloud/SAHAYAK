"use client"

import React, { useState, useEffect } from 'react'
import { Shield, MapPin, Navigation, Phone, Share2, AlertOctagon, Activity, LocateFixed, Crosshair, Eye } from 'lucide-react'

export default function SurakshaPath() {
  const [calculating, setCalculating] = useState(false)
  const [calculated, setCalculated] = useState(false)
  const [tracking, setTracking] = useState(false)
  const [coords, setCoords] = useState({ lat: 28.5355, lng: 77.3910 })
  const [origin, setOrigin] = useState('Current Location (GPS)')
  const [destination, setDestination] = useState('Nearest Police Station (112)')

  const handleCalculate = () => {
    setCalculating(true)
    setCalculated(false)
    setTimeout(() => {
      setCalculating(false)
      setCalculated(true)
    }, 1500)
  }

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (tracking) {
      interval = setInterval(() => {
        setCoords(prev => ({
          lat: prev.lat + (Math.random() - 0.5) * 0.001,
          lng: prev.lng + (Math.random() - 0.5) * 0.001
        }))
      }, 2000)
    }
    return () => clearInterval(interval)
  }, [tracking])

  return (
    <div className="flex flex-col h-screen font-sans bg-[#fff8f6] text-[#000666] overflow-hidden">
      <style>{`
        @keyframes pulse-ring {
          0% { transform: scale(0.8); opacity: 0.5; }
          50% { transform: scale(1.2); opacity: 0.8; }
          100% { transform: scale(0.8); opacity: 0.5; }
        }
        .threat-zone {
          animation: pulse-ring 2s infinite ease-in-out;
          transform-origin: center;
        }
        @keyframes dash {
          to { stroke-dashoffset: 0; }
        }
        .path-line {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: dash 3s linear forwards;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        .pcr-blink {
          animation: blink 1.5s infinite;
        }
      `}</style>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel */}
        <div className="w-[40%] bg-[#000666] text-white p-6 overflow-y-auto flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <Shield className="w-10 h-10 text-[#ba1a1a]" />
            <div>
              <h1 className="text-2xl font-bold tracking-wider text-[#fff8f6]">SURAKSHA PATH</h1>
              <p className="text-sm text-blue-200">AI-Safe Routing Away From Threat Zones</p>
            </div>
          </div>
          
          <div className="inline-flex items-center gap-2 bg-blue-900/40 text-green-400 px-3 py-1.5 rounded-full text-xs font-semibold w-fit border border-green-500/30">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Routing Engine Active
          </div>

          <div className="space-y-4 mt-2">
            <div className="space-y-1">
              <label className="text-xs text-blue-300 font-semibold uppercase">From</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400" />
                <select 
                  className="w-full bg-[#000666] border border-blue-800 text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 appearance-none"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                >
                  <option>Current Location (GPS)</option>
                  <option>Village Premnagar, UP</option>
                  <option>Sector 14, Noida</option>
                  <option>Bundelkhand District, MP</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-blue-300 font-semibold uppercase">To</label>
              <div className="relative">
                <Navigation className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400" />
                <select 
                  className="w-full bg-[#000666] border border-blue-800 text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 appearance-none"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                >
                  <option>Nearest Police Station (112)</option>
                  <option>NALSA Legal Aid Office</option>
                  <option>District Hospital</option>
                  <option>NGO Safe House - Prerna</option>
                </select>
              </div>
            </div>

            <button 
              onClick={handleCalculate}
              className="w-full bg-[#ba1a1a] hover:bg-red-800 text-white font-bold py-4 rounded-lg transition-all flex items-center justify-center gap-2"
            >
              {calculating ? (
                <Activity className="w-5 h-5 animate-spin" />
              ) : (
                <Shield className="w-5 h-5" />
              )}
              {calculating ? 'CALCULATING SAFE CORRIDOR...' : 'CALCULATE SAFE ROUTE'}
            </button>
          </div>

          {calculated && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
              <div className="bg-blue-900/30 border border-blue-800 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-blue-200 mb-4 uppercase">Route Statistics</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-blue-400">Distance</div>
                    <div className="text-xl font-bold text-white">4.2 km</div>
                  </div>
                  <div>
                    <div className="text-xs text-blue-400">ETA</div>
                    <div className="text-xl font-bold text-white">8 min</div>
                  </div>
                  <div>
                    <div className="text-xs text-blue-400">Threat Zones Avoided</div>
                    <div className="text-xl font-bold text-green-400">3</div>
                  </div>
                  <div>
                    <div className="text-xs text-blue-400">Route Safety Score</div>
                    <div className="text-xl font-bold text-blue-300">94/100</div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-blue-200 uppercase">Route Safety Breakdown</h3>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Illumination Coverage</span>
                    <span className="text-green-400">87%</span>
                  </div>
                  <div className="h-1.5 bg-blue-950 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 w-[87%]"></div>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>PCR Van Proximity</span>
                    <span className="text-green-400">91%</span>
                  </div>
                  <div className="h-1.5 bg-blue-950 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 w-[91%]"></div>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Hotspot Avoidance</span>
                    <span className="text-green-400">96%</span>
                  </div>
                  <div className="h-1.5 bg-blue-950 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 w-[96%]"></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-auto pt-6 border-t border-blue-900/50">
            <h3 className="text-xs font-semibold text-blue-300 uppercase mb-3">Emergency Action</h3>
            <div className="grid grid-cols-3 gap-2">
              <button className="bg-blue-900/50 hover:bg-blue-800 text-white p-3 rounded-lg flex flex-col items-center justify-center gap-1 transition-colors border border-blue-800 text-center">
                <Phone className="w-5 h-5 text-red-400" />
                <span className="text-[10px] font-semibold">Alert Police (112)</span>
              </button>
              <button className="bg-blue-900/50 hover:bg-blue-800 text-white p-3 rounded-lg flex flex-col items-center justify-center gap-1 transition-colors border border-blue-800 text-center">
                <Share2 className="w-5 h-5 text-blue-400" />
                <span className="text-[10px] font-semibold">Share Live Location</span>
              </button>
              <button className="bg-[#ba1a1a]/20 hover:bg-[#ba1a1a]/40 text-white p-3 rounded-lg flex flex-col items-center justify-center gap-1 transition-colors border border-[#ba1a1a]/50 text-center">
                <AlertOctagon className="w-5 h-5 text-[#ba1a1a]" />
                <span className="text-[10px] font-semibold">Silent SOS</span>
              </button>
            </div>

            <div className="mt-6 flex items-center justify-between bg-blue-950 p-4 rounded-xl border border-blue-900">
              <div className="flex flex-col">
                <span className="font-semibold text-sm">Track on Crisis Console</span>
                <span className="text-xs text-blue-400">
                  {tracking ? 'Live tracking active — Operator monitoring your route' : 'Enable central monitoring'}
                </span>
              </div>
              <button 
                onClick={() => setTracking(!tracking)}
                className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${tracking ? 'bg-green-500' : 'bg-gray-600'}`}
              >
                <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 ${tracking ? 'translate-x-6' : ''}`}></div>
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel - Map */}
        <div className="w-[60%] bg-[#0d1117] relative flex flex-col">
          {/* Top Info */}
          <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-10">
            <div className="bg-black/50 backdrop-blur border border-white/10 text-white px-4 py-2 rounded-lg flex gap-4 text-xs font-mono">
              <div className="flex items-center gap-2">
                <LocateFixed className="w-4 h-4 text-blue-400" />
                GPS LINK: SECURE
              </div>
              <div className="flex items-center gap-2 border-l border-white/10 pl-4">
                <Activity className="w-4 h-4 text-green-400" />
                NETWORK: STABLE
              </div>
            </div>
            
            <div className="bg-red-500/20 border border-red-500/50 text-red-500 px-3 py-1.5 rounded-full flex items-center gap-2 text-xs font-bold tracking-widest shadow-[0_0_15px_rgba(239,68,68,0.3)]">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              LIVE
            </div>
          </div>

          {/* SVG Map Area */}
          <div className="flex-1 relative w-full h-full overflow-hidden flex items-center justify-center p-12">
            <svg 
              className="w-full h-full" 
              viewBox="0 0 1000 800" 
              preserveAspectRatio="xMidYMid meet"
              style={{ filter: 'drop-shadow(0 0 20px rgba(0,10,50,0.5))' }}
            >
              {/* Grid background */}
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1"/>
                </pattern>
                
                <radialGradient id="threatGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(186,26,26,0.6)" />
                  <stop offset="100%" stopColor="rgba(186,26,26,0)" />
                </radialGradient>
                
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              <rect width="100%" height="100%" fill="url(#grid)" />
              
              {/* Fake Roads */}
              <path d="M 100 700 L 300 500 L 500 550 L 800 200" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" strokeLinecap="round"/>
              <path d="M 200 100 L 300 300 L 600 300 L 900 600" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="12" strokeLinecap="round"/>
              <path d="M 400 800 L 500 400 L 800 100" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" strokeLinecap="round"/>
              <path d="M 50 300 L 400 400 L 900 350" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10" strokeLinecap="round"/>

              {/* Threat Zones */}
              <g className="threat-zone" style={{ transform: 'translate(450px, 450px)' }}>
                <circle cx="0" cy="0" r="120" fill="url(#threatGrad)" />
                <circle cx="0" cy="0" r="40" fill="rgba(186,26,26,0.3)" stroke="#ba1a1a" strokeWidth="2" strokeDasharray="4 4" />
              </g>
              <g className="threat-zone" style={{ transform: 'translate(650px, 300px)', animationDelay: '0.5s' }}>
                <circle cx="0" cy="0" r="90" fill="url(#threatGrad)" />
                <circle cx="0" cy="0" r="30" fill="rgba(186,26,26,0.3)" stroke="#ba1a1a" strokeWidth="2" strokeDasharray="4 4" />
              </g>
              <g className="threat-zone" style={{ transform: 'translate(250px, 200px)', animationDelay: '1s' }}>
                <circle cx="0" cy="0" r="150" fill="url(#threatGrad)" />
                <circle cx="0" cy="0" r="50" fill="rgba(186,26,26,0.3)" stroke="#ba1a1a" strokeWidth="2" strokeDasharray="4 4" />
              </g>

              {/* Path */}
              {calculated && (
                <path 
                  d="M 150 650 Q 250 450 400 600 T 700 450 T 850 150" 
                  fill="none" 
                  stroke="#4ade80" 
                  strokeWidth="6" 
                  strokeLinecap="round" 
                  filter="url(#glow)"
                  className="path-line"
                />
              )}

              {/* Point A */}
              <g transform="translate(150, 650)">
                <circle cx="0" cy="0" r="25" fill="rgba(59,130,246,0.2)" className="animate-pulse"/>
                <circle cx="0" cy="0" r="10" fill="#3b82f6" stroke="white" strokeWidth="3"/>
                <rect x="-20" y="20" width="40" height="20" rx="4" fill="#3b82f6"/>
                <text x="0" y="34" fill="white" fontSize="10" fontWeight="bold" textAnchor="middle">YOU</text>
              </g>

              {/* Point B */}
              {calculated && (
                <g transform="translate(850, 150)">
                  <circle cx="0" cy="0" r="30" fill="rgba(34,197,94,0.2)" className="animate-pulse"/>
                  <path d="M0 -15 L12 -5 L12 8 Q0 15 0 15 Q-12 8 -12 8 L-12 -5 Z" fill="#22c55e" stroke="white" strokeWidth="2"/>
                  <rect x="-25" y="25" width="50" height="20" rx="4" fill="#22c55e"/>
                  <text x="0" y="39" fill="white" fontSize="10" fontWeight="bold" textAnchor="middle">SAFE</text>
                </g>
              )}

              {/* PCR Icons along route */}
              {calculated && (
                <>
                  <g transform="translate(350, 550)" className="pcr-blink">
                    <circle cx="0" cy="0" r="14" fill="#1e40af" stroke="#60a5fa" strokeWidth="2"/>
                    <text x="0" y="4" fill="white" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">P</text>
                  </g>
                  <g transform="translate(600, 500)" className="pcr-blink" style={{animationDelay: '0.7s'}}>
                    <circle cx="0" cy="0" r="14" fill="#1e40af" stroke="#60a5fa" strokeWidth="2"/>
                    <text x="0" y="4" fill="white" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">P</text>
                  </g>
                  <g transform="translate(750, 300)" className="pcr-blink" style={{animationDelay: '0.3s'}}>
                    <circle cx="0" cy="0" r="14" fill="#1e40af" stroke="#60a5fa" strokeWidth="2"/>
                    <text x="0" y="4" fill="white" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">P</text>
                  </g>
                </>
              )}
            </svg>
          </div>

          {/* Bottom Coordinates & Legend */}
          <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end z-10 pointer-events-none">
            {/* Legend */}
            <div className="bg-black/60 backdrop-blur border border-white/10 p-4 rounded-xl flex flex-col gap-3 pointer-events-auto">
              <h4 className="text-white text-xs font-bold tracking-wider mb-1">MAP LEGEND</h4>
              <div className="flex items-center gap-3 text-xs text-gray-300">
                <span className="w-3 h-3 rounded-full bg-red-500/50 border border-red-500"></span>
                Threat Zone
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-300">
                <span className="w-3 h-1 bg-green-400 rounded-full shadow-[0_0_5px_#4ade80]"></span>
                Safe Corridor
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-300">
                <span className="w-3 h-3 rounded-full bg-blue-500 border-2 border-white"></span>
                Current Location
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-300">
                <Shield className="w-3 h-3 text-green-500 fill-green-500" />
                Destination
              </div>
            </div>

            {/* Coordinates */}
            <div className="text-right pointer-events-auto">
              <div className="bg-black/60 backdrop-blur border border-white/10 px-4 py-3 rounded-xl font-mono text-xs text-blue-300 text-right space-y-1">
                <div className="flex items-center gap-2 justify-end text-white">
                  <Crosshair className="w-4 h-4 text-blue-400" />
                  LAT: {coords.lat.toFixed(6)}° N
                </div>
                <div>LNG: {coords.lng.toFixed(6)}° E</div>
                <div className="text-gray-500 pt-1">ALT: 214.5m | ACC: ±3m</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Tracking Strip */}
      <div className={`h-12 flex items-center justify-center transition-all duration-500 ${tracking ? 'bg-[#ba1a1a] text-white' : 'bg-[#000666] text-transparent h-0 overflow-hidden'}`}>
        <div className="flex items-center gap-4 text-sm font-bold tracking-wide">
          <Eye className="w-5 h-5 animate-pulse" />
          SOS ACTIVATED: ROUTE SHARED WITH PCR #14, PCR #22 <span className="opacity-50">|</span> ETA POLICE: 3 MIN 20 SEC
        </div>
      </div>
    </div>
  )
}
