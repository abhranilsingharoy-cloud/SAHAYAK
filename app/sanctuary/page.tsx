"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldCheck, Globe, Mic, Send, Bot, FileText, 
  MapPin, Clock, Phone, HeartHandshake, ChevronRight, Gavel, Play, Square
} from 'lucide-react';

export default function VictimSanctuary() {
  const [activeTab, setActiveTab] = useState('report');
  
  // Interactive Chat State
  const [chatMessages, setChatMessages] = useState([
    { role: 'bot', text: 'नमस्ते। मैं SAATHI हूँ, आपका सुरक्षित डिजिटल सहायक। मैं आपकी क्या मदद कर सकता हूँ? आप यहाँ पूरी तरह सुरक्षित हैं।' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Voice Recording State
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isTyping]);

  useEffect(() => {
    let interval: any;
    if (isRecording) {
      interval = setInterval(() => setRecordingTime(t => t + 1), 1000);
    } else {
      setRecordingTime(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    setChatMessages(prev => [...prev, { role: 'user', text: chatInput }]);
    setChatInput('');
    setIsTyping(true);
    
    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false);
      setChatMessages(prev => [...prev, { 
        role: 'bot', 
        text: 'मुझे यह सुनकर बहुत अफ़सोस है। SC/ST (PoA) Act के तहत यह एक गंभीर अपराध है। मैं आपको नज़दीकी NALSA (मुफ़्त कानूनी सहायता) अधिकारी से जोड़ रहा हूँ।' 
      }]);
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto">
      
      {/* HEADER SECTION */}
      <div className="bg-white rounded-3xl p-8 border border-[#f0e6e4] shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#ffead6] to-transparent rounded-full -mr-20 -mt-20 opacity-60"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-[#e0e5ff] to-transparent rounded-full -ml-16 -mb-16 opacity-60"></div>
        
        <div className="relative z-10 flex-1">
          <div className="inline-flex items-center gap-2 bg-[#f9f0ee] px-3 py-1.5 rounded-full border border-[#f0e6e4] text-xs font-bold text-[#857371] uppercase tracking-wider mb-4">
            <ShieldCheck size={14} className="text-[#000666]" /> Official Gov Portal
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#000666] tracking-tight leading-tight">
            Safe Citizen <br />Sanctuary Hub
          </h1>
          <p className="mt-4 text-[#534341] max-w-lg text-lg">
            A secure, anonymous, and trauma-informed space to report atrocities, find support, and access immediate relief schemes.
          </p>
        </div>

        <div className="relative z-10 bg-white p-2 rounded-2xl shadow-xl border border-[#f0e6e4] shrink-0 transform transition-transform hover:scale-105 duration-300">
          <div className="bg-gradient-to-b from-[#00044d] to-[#000666] rounded-xl p-5 text-white w-64 text-center">
            <Globe size={24} className="mx-auto mb-2 text-[#ffead6]" />
            <div className="font-bold">Select Language</div>
            <div className="text-xs text-white/70 mb-4">आपकी भाषा चुनें</div>
            
            <div className="grid grid-cols-2 gap-2">
              <button className="bg-[#ffead6] text-[#000666] py-2 rounded-lg text-sm font-bold border border-[#ffead6] shadow-sm">हिंदी</button>
              <button className="bg-white/10 hover:bg-white/20 text-white py-2 rounded-lg text-sm font-bold border border-white/20 transition-colors">English</button>
              <button className="bg-white/10 hover:bg-white/20 text-white py-2 rounded-lg text-sm font-bold border border-white/20 transition-colors">मराठी</button>
              <button className="bg-white/10 hover:bg-white/20 text-white py-2 rounded-lg text-sm font-bold border border-white/20 transition-colors">తెలుగు</button>
            </div>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="flex gap-2 bg-white p-2 rounded-2xl border border-[#f0e6e4] shadow-sm overflow-x-auto scrollbar-hide">
        {[
          { id: 'report', label: 'Report Incident', icon: FileText },
          { id: 'chat', label: 'SAATHI Support Chat', icon: Bot },
          { id: 'schemes', label: 'Relief Schemes', icon: HeartHandshake },
          { id: 'legal', label: 'Legal Aid', icon: Gavel },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all whitespace-nowrap ${
              activeTab === tab.id 
                ? 'bg-[#000666] text-white shadow-md scale-[1.02]' 
                : 'text-[#534341] hover:bg-[#f9f0ee] hover:text-[#000666]'
            }`}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* CONTENT AREA */}
      {activeTab === 'report' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-white rounded-3xl p-8 border border-[#f0e6e4] shadow-sm">
            <h2 className="text-2xl font-bold text-[#201a19] mb-6">File a Secure e-FIR</h2>
            <div className="flex flex-col gap-5">
              
              <div>
                <label className="block text-sm font-bold text-[#534341] mb-2">Voice Describe (Optional)</label>
                
                {!isRecording ? (
                  <div onClick={() => setIsRecording(true)} className="border-2 border-dashed border-[#e0e5ff] bg-[#f9f0ee] rounded-2xl p-6 text-center hover:border-[#000666]/30 transition-colors cursor-pointer group">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm group-hover:scale-110 transition-transform">
                      <Mic size={24} className="text-[#ba1a1a]" />
                    </div>
                    <div className="mt-3 font-bold text-[#000666]">Tap to record in your language</div>
                    <div className="text-xs text-[#857371] mt-1">AI will transcribe and translate automatically</div>
                  </div>
                ) : (
                  <div className="border-2 border-[#ba1a1a]/30 bg-[#ffdad6]/20 rounded-2xl p-6 text-center shadow-inner relative overflow-hidden">
                    <div className="absolute inset-0 bg-[#ba1a1a]/5 animate-pulse"></div>
                    <div className="relative z-10 flex flex-col items-center gap-3">
                      <div className="text-[#ba1a1a] font-black text-2xl tracking-widest">{formatTime(recordingTime)}</div>
                      <div className="flex gap-1 h-6 items-end justify-center w-full">
                        {Array.from({length: 20}).map((_, i) => (
                          <div key={i} className="w-1.5 bg-[#ba1a1a] rounded-t-sm animate-pulse" style={{ height: `${Math.random() * 100}%`, animationDuration: `${0.1 + Math.random() * 0.4}s` }}></div>
                        ))}
                      </div>
                      <button onClick={() => setIsRecording(false)} className="mt-2 bg-[#ba1a1a] text-white px-4 py-2 rounded-xl text-sm font-bold shadow-md flex items-center gap-2 hover:bg-[#93000a] transition-colors">
                        <Square size={14} fill="currentColor" /> Stop Recording
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-[#534341] mb-2">Location of Incident</label>
                <div className="flex items-center gap-3 bg-[#f9f0ee] p-3 rounded-xl border border-[#f0e6e4] focus-within:border-[#000666]/30 focus-within:ring-2 focus-within:ring-[#000666]/10 transition-all">
                  <MapPin size={18} className="text-[#944b00]" />
                  <input type="text" placeholder="Village / District" className="bg-transparent border-none outline-none flex-1 font-medium text-[#201a19]" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#534341] mb-2">What Happened?</label>
                <textarea rows={4} className="w-full bg-[#f9f0ee] p-4 rounded-xl border border-[#f0e6e4] outline-none focus:border-[#000666]/30 focus:ring-2 focus:ring-[#000666]/10 transition-all resize-none font-medium text-[#201a19]" placeholder="Describe the incident securely..."></textarea>
              </div>

              <button className="bg-[#000666] hover:bg-[#00044d] text-white py-4 rounded-xl font-bold text-lg transition-all shadow-[0_4px_14px_rgba(0,6,102,0.3)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(0,6,102,0.4)] mt-2 flex items-center justify-center gap-2">
                Submit Securely <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="bg-gradient-to-br from-[#ba1a1a] to-[#93000a] rounded-3xl p-8 text-white shadow-[0_8px_30px_rgba(186,26,26,0.3)] relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300 cursor-pointer">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 group-hover:scale-110 transition-transform duration-700"></div>
              <ShieldCheck size={32} className="mb-4 text-[#ffdad6]" />
              <h3 className="text-2xl font-black mb-2">In Immediate Danger?</h3>
              <p className="text-white/80 mb-6 font-medium text-sm leading-relaxed">Use the panic button to instantly dispatch local PCR and notify safe-contacts.</p>
              <button className="w-full bg-white text-[#ba1a1a] py-4 rounded-xl font-black text-lg shadow-xl flex items-center justify-center gap-2 group-hover:bg-[#f9f0ee] transition-colors">
                <Phone size={20} fill="currentColor" /> TRIGGER SOS
              </button>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-[#f0e6e4] shadow-sm flex-1">
              <h3 className="font-bold text-[#201a19] mb-4 text-lg">Your Privacy is Guaranteed</h3>
              <ul className="flex flex-col gap-4">
                {[
                  'Zero IP Logging or Device Tracking',
                  'Encrypted End-to-End Database',
                  'Identity Masked from Local Precincts initially'
                ].map((text, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#e0e5ff] flex items-center justify-center shrink-0 mt-0.5">
                      <ShieldCheck size={12} className="text-[#000666]" />
                    </div>
                    <span className="text-sm font-medium text-[#534341]">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'chat' && (
        <div className="bg-white rounded-3xl border border-[#f0e6e4] shadow-sm overflow-hidden h-[600px] flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-gradient-to-r from-[#000666] to-[#00044d] p-6 text-white flex items-center gap-4 shrink-0 shadow-md z-10 relative">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center border-2 border-[#ffead6]">
              <Bot size={24} className="text-[#ffead6]" />
            </div>
            <div>
              <h2 className="text-xl font-black">SAATHI Support</h2>
              <div className="text-xs text-white/70 flex items-center gap-1.5 mt-1 font-bold">
                <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_#4ade80] animate-pulse" /> Online • Hindi/English
              </div>
            </div>
          </div>
          
          <div className="flex-1 p-6 bg-[#f9f0ee] overflow-y-auto flex flex-col gap-4">
            {chatMessages.map((msg, idx) => (
              <div key={idx} className={`max-w-[80%] p-4 rounded-2xl shadow-sm ${
                msg.role === 'bot' 
                  ? 'self-start bg-white border border-[#f0e6e4] rounded-tl-sm text-[#201a19]' 
                  : 'self-end bg-[#000666] text-white rounded-tr-sm'
              }`}>
                <p className="font-medium text-sm leading-relaxed">{msg.text}</p>
                {msg.role === 'bot' && idx === 2 && (
                  <button className="mt-3 bg-[#ffead6] text-[#944b00] px-4 py-2 rounded-lg text-xs font-black w-full hover:bg-[#ffd1aa] transition-colors shadow-sm uppercase tracking-wider">
                    Click to Connect (NALSA)
                  </button>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="self-start bg-white border border-[#f0e6e4] p-4 rounded-2xl rounded-tl-sm shadow-sm flex gap-1">
                <span className="w-2 h-2 bg-[#857371] rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-[#857371] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                <span className="w-2 h-2 bg-[#857371] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
              </div>
            )}
            <div ref={chatEndRef}></div>
          </div>
          
          <div className="p-4 bg-white border-t border-[#f0e6e4] shrink-0 flex items-center gap-3">
            <button className="p-3 bg-[#f9f0ee] text-[#000666] rounded-full hover:bg-[#e0e5ff] transition-colors">
              <Mic size={20} />
            </button>
            <input 
              type="text" 
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message safely here..." 
              className="flex-1 bg-[#f9f0ee] rounded-full px-5 py-3 outline-none focus:ring-2 focus:ring-[#000666]/20 transition-all text-[#201a19] font-medium border border-[#f0e6e4]" 
            />
            <button 
              onClick={handleSendMessage}
              disabled={!chatInput.trim()}
              className="p-3 bg-[#000666] text-white rounded-full hover:bg-[#00044d] transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      )}

      {/* Auto e-FIR Drafter Section */}
      <div className="mt-12">
        <h2 className="text-3xl font-extrabold text-[#000666] mb-6">Auto e-FIR Drafter</h2>
        <div className="bg-white rounded-3xl p-8 border border-[#f0e6e4] shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <p className="text-[#534341] font-medium mb-4">Simulate your voice recording or type your incident description below:</p>
          <textarea 
            rows={4} 
            className="w-full bg-[#f9f0ee] p-4 rounded-xl border border-[#f0e6e4] outline-none focus:border-[#000666]/30 focus:ring-2 focus:ring-[#000666]/10 transition-all resize-none font-medium text-[#201a19] mb-4" 
            defaultValue="My landlord threatened me with caste slurs and physically pushed me on 24th September 2026 at around 8pm near the market in Bundelkhand District..."
          />
          <button 
            onClick={() => {
              const btn = document.getElementById('draft-btn');
              if (btn) btn.innerHTML = 'Analyzing...';
              setTimeout(() => {
                document.getElementById('efir-result')?.classList.remove('hidden');
                if (btn) btn.innerHTML = 'ANALYZE & DRAFT e-FIR';
              }, 2000);
            }} 
            id="draft-btn"
            className="bg-[#ba1a1a] hover:bg-[#93000a] text-white py-3 px-6 rounded-xl font-bold text-lg transition-all shadow-md flex items-center justify-center gap-2"
          >
             ANALYZE & DRAFT e-FIR
          </button>
          
          <div id="efir-result" className="hidden mt-8 border border-[#f0e6e4] bg-[#fff8f6] rounded-2xl p-8 shadow-sm">
            <div className="text-center mb-6 border-b border-[#f0e6e4] pb-6">
              <ShieldCheck size={48} className="mx-auto mb-2 text-[#000666]" />
              <h3 className="text-2xl font-black text-[#000666] uppercase">Government of India</h3>
              <h4 className="text-xl font-bold text-[#201a19]">FIRST INFORMATION REPORT</h4>
              <p className="text-sm font-medium text-[#534341] mt-2">FIR No: NHAA/2026/04821</p>
            </div>
            
            <div className="mb-6">
              <h5 className="font-bold text-[#000666] mb-2 text-lg">Complainant Details</h5>
              <p className="text-[#201a19] bg-white p-4 rounded-xl border border-[#f0e6e4]">Auto-filled from verified user profile.</p>
            </div>
            
            <div className="mb-6">
              <h5 className="font-bold text-[#ba1a1a] mb-2 text-lg">Alleged Offense (PoA Act Sections)</h5>
              <ul className="bg-white p-4 rounded-xl border border-[#f0e6e4] text-[#201a19] space-y-2 font-medium">
                <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#ba1a1a]"></div> Section 3(1)(r) - Intentional Insult/Humiliation</li>
                <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#ba1a1a]"></div> Section 3(1)(s) - Intimidation</li>
                <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#ba1a1a]"></div> Section 3(2)(va) - Physical Assault</li>
              </ul>
            </div>
            
            <div className="mb-8">
              <h5 className="font-bold text-[#000666] mb-2 text-lg">Incident Narrative</h5>
              <p className="bg-white p-4 rounded-xl border border-[#f0e6e4] text-[#201a19] italic font-serif leading-relaxed">
                "It is submitted that on 24th September 2026, at approximately 20:00 hours, near the market area in Bundelkhand District, the accused (landlord) engaged in an unprovoked altercation. The accused intentionally insulted the complainant using derogatory caste slurs with the intent to humiliate in a place within public view, and further committed physical assault by pushing the complainant."
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex gap-3 w-full sm:w-auto">
                <button onClick={() => window.print()} className="bg-white border border-[#f0e6e4] text-[#000666] py-2 px-4 rounded-lg font-bold shadow-sm hover:bg-[#f9f0ee] transition-colors flex items-center gap-2">
                  🖨️ Print e-FIR
                </button>
                <button className="bg-[#000666] text-white py-2 px-4 rounded-lg font-bold shadow-md hover:bg-[#00044d] transition-colors flex items-center gap-2">
                  📤 Send to Police Station
                </button>
              </div>
              <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div> AI Confidence: 94.3% | PoA Act Compliant | Ready for Filing
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

