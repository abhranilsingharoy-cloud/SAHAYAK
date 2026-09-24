"use client";

import React, { useState, useEffect } from 'react';
import { 
  Smartphone, Radio, Shield, MapPin, 
  Phone, ServerCog, Mic, Activity, Clock
} from 'lucide-react';

const mobileScreens = [
  { id: 0, label: 'Home - Safe Session', bg: 'bg-gradient-to-b from-[#00044d] to-[#000666]', text: 'text-white' },
  { id: 1, label: 'SOS Panic Trigger', bg: 'bg-gradient-to-b from-[#ba1a1a] to-[#93000a]', text: 'text-white' },
  { id: 2, label: '14566 IVRS Active', bg: 'bg-[#fff8f6]', text: 'text-[#201a19]' },
];

export default function MobilePanic() {
  const [activeScreen, setActiveScreen] = useState(0);
  const [sosActive, setSosActive] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [pipelineStep, setPipelineStep] = useState(0);

  // Auto-advance IVRS pipeline when on Screen 2
  useEffect(() => {
    let interval: any;
    if (activeScreen === 2) {
      interval = setInterval(() => {
        setPipelineStep(prev => (prev < 4 ? prev + 1 : prev));
      }, 2500);
    } else {
      setPipelineStep(0);
    }
    return () => clearInterval(interval);
  }, [activeScreen]);

  const triggerSOS = () => {
    setSosActive(true);
    setActiveScreen(1);
    let c = 5;
    const t = setInterval(() => {
      c--; setCountdown(c);
      if (c <= 0) {
        clearInterval(t);
        setActiveScreen(2); // Auto transition to call
      }
    }, 1000);
  };

  const pipelineItems = [
    { step: 'Language Identification', detail: 'Hindi (Bundelkhandi dialect)', icon: Mic },
    { step: 'Acoustic Processing', detail: 'RNNoise + WebRTC VAD', icon: Activity },
    { step: 'ASR Transcription', detail: 'Whisper Large-v3', icon: ServerCog },
    { step: 'SVI Computation', detail: 'Risk assessment active', icon: Shield },
    { step: 'Routing & Dispatch', detail: 'Queue analysis active', icon: MapPin },
  ];

  return (
    <div className="flex flex-col xl:flex-row gap-8 max-w-7xl mx-auto">
      
      {/* LEFT COL: Mobile Simulator */}
      <div className="flex-1 flex flex-col items-center">
        <div className="w-full mb-6">
          <div className="inline-flex items-center gap-2 bg-[#000666] text-white px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 shadow-md">
            <Smartphone size={14} /> Mobile App Emulator
          </div>
          <h2 className="text-3xl font-extrabold text-[#201a19]">Citizen Interface</h2>
          <p className="text-[#534341] font-medium mt-1">Biometric panic triggers and zero-touch IVRS handoff.</p>
        </div>

        <div className="flex gap-2 w-full max-w-sm mb-8 p-1 bg-white rounded-2xl border border-[#f0e6e4] shadow-sm">
          {mobileScreens.map(s => (
            <button
              key={s.id}
              onClick={() => setActiveScreen(s.id)}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeScreen === s.id 
                  ? 'bg-[#000666] text-white shadow-md' 
                  : 'text-[#534341] hover:bg-[#f9f0ee]'
              }`}
            >
              {s.label.split(' - ')[0]}
            </button>
          ))}
        </div>

        {/* PHONE FRAME */}
        <div className="relative w-[320px] h-[650px] bg-[#201a19] rounded-[3rem] p-3 shadow-2xl border-4 border-[#e0e5ff]/20">
          <div className="absolute top-0 inset-x-0 h-7 flex justify-center z-20">
            <div className="w-32 h-6 bg-[#201a19] rounded-b-3xl"></div>
          </div>
          
          <div className={`w-full h-full rounded-[2.25rem] overflow-hidden relative flex flex-col transition-colors duration-500 ${mobileScreens[activeScreen].bg} ${mobileScreens[activeScreen].text}`}>
            
            {/* Status Bar */}
            <div className="h-12 w-full px-6 flex justify-between items-center text-[10px] font-bold pt-2 opacity-90 z-10">
              <span>09:41</span>
              <div className="flex gap-2 items-center">
                <Radio size={12} />
                <div className="flex gap-0.5">
                  <div className="w-1 h-2 bg-current rounded-sm"></div>
                  <div className="w-1 h-2.5 bg-current rounded-sm"></div>
                  <div className="w-1 h-3 bg-current rounded-sm"></div>
                  <div className="w-1 h-3.5 bg-current/30 rounded-sm"></div>
                </div>
              </div>
            </div>

            {/* SCREEN CONTENTS */}
            <div className="flex-1 flex flex-col relative z-10 px-5 pb-8">
              
              {activeScreen === 0 && (
                <div className="flex flex-col h-full animate-in fade-in zoom-in duration-300">
                  <div className="mt-4 flex justify-between items-start">
                    <div>
                      <div className="text-xs text-white/70">नमस्ते, सुमित्रा जी</div>
                      <div className="text-xl font-bold mt-1">सुरक्षित सत्र चालू है</div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
                      <Shield size={20} />
                    </div>
                  </div>

                  <div className="mt-8 bg-white/10 rounded-2xl p-5 border border-white/20 backdrop-blur-sm">
                    <div className="text-xs uppercase tracking-widest text-white/70 font-bold mb-2">Live SVI Status</div>
                    <div className="flex items-end justify-between">
                      <div className="text-5xl font-black text-[#ffead6]">42</div>
                      <div className="text-xs font-bold text-[#ffead6] bg-white/10 px-2 py-1 rounded-md">MODERATE</div>
                    </div>
                  </div>

                  <div className="mt-auto grid grid-cols-2 gap-3 mb-6">
                    {['E-FIR', 'Track Case', 'Legal Aid', 'Support'].map(item => (
                      <div key={item} className="bg-white/10 rounded-xl p-4 text-center border border-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors cursor-pointer">
                        <div className="font-bold text-sm">{item}</div>
                      </div>
                    ))}
                  </div>

                  <button onClick={triggerSOS} className="w-full bg-[#ba1a1a] text-white py-4 rounded-2xl font-black text-lg shadow-lg flex items-center justify-center gap-2 hover:scale-105 transition-transform">
                    <Phone size={20} fill="currentColor" /> SOS 14566
                  </button>
                </div>
              )}

              {activeScreen === 1 && (
                <div className="flex flex-col items-center justify-center h-full animate-in fade-in duration-300">
                  <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center crisis-pulse shadow-2xl mb-8">
                    <Phone size={48} className="text-[#ba1a1a]" fill="currentColor" />
                  </div>
                  <h3 className="text-2xl font-black mb-2 text-center">EMERGENCY<br/>ACTIVATED</h3>
                  <div className="text-center text-white/80 font-medium mb-8">
                    GPS Lock Acquired<br/>Relaying to Control Room
                  </div>
                  
                  <div className="w-full bg-black/20 rounded-2xl p-4 backdrop-blur-md text-sm border border-white/10">
                    <div className="flex items-center gap-2 font-bold mb-1">
                      <MapPin size={16} className="text-[#ffdad6]" /> Lat: 28.6139, Lng: 77.2090
                    </div>
                    <div className="text-[#ffdad6] font-medium">PCR Van ETA: 4 mins</div>
                  </div>

                  {countdown > 0 && (
                    <div className="mt-8 text-sm font-bold text-white/70 bg-black/20 px-4 py-2 rounded-full backdrop-blur-md animate-pulse">
                      Auto-dispatch in {countdown}s
                    </div>
                  )}
                </div>
              )}

              {activeScreen === 2 && (
                <div className="flex flex-col h-full animate-in fade-in duration-300">
                  <div className="mt-6 flex flex-col items-center justify-center gap-4">
                    <div className="w-20 h-20 rounded-full bg-[#e0e5ff] flex items-center justify-center shadow-inner relative">
                      <div className="absolute inset-0 rounded-full border-2 border-[#000666] animate-ping opacity-20" />
                      <Mic size={32} className="text-[#000666]" />
                    </div>
                    <div className="text-center">
                      <h3 className="font-bold text-xl text-[#000666]">14566 Live Call</h3>
                      <div className="text-sm text-[#534341] font-medium mt-1">04:32 • Hindi/Bundelkhandi</div>
                    </div>
                  </div>

                  <div className="mt-8 bg-white rounded-2xl p-5 border border-[#f0e6e4] shadow-sm relative">
                    <div className="absolute -top-3 left-4 bg-[#000666] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                      Live Transcript
                    </div>
                    <p className="text-[#201a19] text-sm leading-relaxed italic mt-2 font-medium">
                      "साहब... उन्होंने पानी के कुएं पर घेर लिया है... मुझे डर लग रहा है।"
                    </p>
                    <div className="flex gap-2 mt-4">
                      <span className="bg-[#ffdad6] text-[#ba1a1a] text-xs font-bold px-2 py-1 rounded-md">Fear: 87%</span>
                      <span className="bg-[#ffead6] text-[#944b00] text-xs font-bold px-2 py-1 rounded-md">SVI: 64</span>
                    </div>
                  </div>

                  {/* Added Keypad for interactivity */}
                  <div className="mt-auto mb-2">
                    <div className="grid grid-cols-3 gap-3 w-full">
                      {['1','2','3','4','5','6','7','8','9','*','0','#'].map((num) => (
                        <button 
                          key={num} 
                          className="w-14 h-14 mx-auto rounded-full bg-white border border-[#f0e6e4] flex items-center justify-center text-xl font-light text-[#201a19] shadow-sm hover:bg-[#e0e5ff] transition-colors active:scale-95"
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                    <div className="flex justify-center mt-6">
                      <button onClick={() => setActiveScreen(0)} className="w-14 h-14 rounded-full bg-[#ba1a1a] shadow-[0_4px_14px_rgba(186,26,26,0.4)] flex items-center justify-center text-white hover:scale-105 transition-transform">
                        <Phone size={24} className="rotate-[135deg]" fill="currentColor" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Home indicator */}
            <div className="absolute bottom-2 inset-x-0 flex justify-center z-20">
              <div className="w-1/3 h-1 bg-current opacity-20 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT COL: IVRS Pipeline */}
      <div className="flex-1 flex flex-col gap-6">
        <div className="bg-white rounded-3xl border border-[#f0e6e4] shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col overflow-hidden h-full">
          <div className="p-6 bg-[#f9f0ee] border-b border-[#f0e6e4] flex items-center justify-between">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#ffead6] px-3 py-1 rounded-full text-[10px] font-bold text-[#944b00] uppercase tracking-wider mb-2 border border-[#f0e6e4]">
                <ServerCog size={14} /> Backend Telemetry
              </div>
              <h2 className="text-2xl font-black text-[#000666]">Autonomous IVRS Pipeline</h2>
            </div>
            {activeScreen === 2 && <div className="w-3 h-3 rounded-full bg-[#ba1a1a] animate-pulse shadow-[0_0_8px_#ba1a1a]" />}
          </div>

          <div className="p-8 flex-1 flex flex-col justify-center">
            <div className="relative">
              {/* Pipeline Line */}
              <div className="absolute left-6 top-0 bottom-0 w-1 bg-[#f0e6e4] rounded-full" />
              
              {pipelineItems.map((item, i) => {
                const status = activeScreen !== 2 ? 'pending' : (i < pipelineStep ? 'done' : i === pipelineStep ? 'active' : 'pending');
                
                return (
                  <div key={i} className="relative flex items-center gap-6 mb-8 last:mb-0 pl-14">
                    <div className={`absolute left-3.5 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center border-4 border-white transition-colors duration-500 ${
                      status === 'done' ? 'bg-[#000666] text-white' :
                      status === 'active' ? 'bg-[#ba1a1a] text-white shadow-[0_0_12px_#ba1a1a] animate-pulse' :
                      'bg-[#f0e6e4] text-[#857371]'
                    }`}>
                      <item.icon size={14} />
                    </div>
                    
                    <div className={`flex-1 p-4 rounded-2xl border transition-all duration-500 ${
                      status === 'active' ? 'bg-[#ffdad6]/20 border-[#ba1a1a]/50 shadow-md scale-[1.02]' :
                      status === 'done' ? 'bg-[#f9f0ee] border-[#f0e6e4]' :
                      'bg-white border-[#f0e6e4] opacity-60'
                    }`}>
                      <div className="flex justify-between items-center mb-1">
                        <span className={`font-bold text-sm ${status === 'active' ? 'text-[#ba1a1a]' : 'text-[#201a19]'}`}>
                          {item.step}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase transition-colors duration-500 ${
                          status === 'done' ? 'bg-[#e0e5ff] text-[#000666]' :
                          status === 'active' ? 'bg-[#ba1a1a] text-white' :
                          'bg-[#f0e6e4] text-[#857371]'
                        }`}>
                          {status}
                        </span>
                      </div>
                      <p className="text-xs text-[#534341] font-medium">{item.detail}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="p-6 bg-gradient-to-r from-[#000666] to-[#00044d] text-white flex justify-between items-center shadow-inner">
            <div className="flex items-center gap-3">
              <Clock size={20} className="text-[#ffead6]" />
              <div>
                <div className="text-[10px] text-white/70 font-bold uppercase tracking-widest">Pipeline Latency</div>
                <div className="font-black text-lg">420ms <span className="text-xs font-normal opacity-70">Sub-second</span></div>
              </div>
            </div>
            <div className="h-10 w-px bg-white/20" />
            <div className="flex items-center gap-3">
              <Activity size={20} className="text-[#ffead6]" />
              <div>
                <div className="text-[10px] text-white/70 font-bold uppercase tracking-widest">ASR Accuracy</div>
                <div className="font-black text-lg">94.3% <span className="text-xs font-normal opacity-70">Hindi</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
