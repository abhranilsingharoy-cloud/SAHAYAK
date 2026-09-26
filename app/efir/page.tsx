'use client';

import React, { useState, useEffect } from 'react';
import { FileText, Shield, User, Clock, MapPin, AlertCircle, CheckCircle2, Download, Share2, MessageSquare, ChevronRight, ChevronLeft, Database, Link as LinkIcon, ShieldCheck } from 'lucide-react';

export default function EfirPortal() {
  const [step, setStep] = useState(1);
  const [analyzing, setAnalyzing] = useState(false);
  const [showSections, setShowSections] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [locking, setLocking] = useState(false);
  const [blockchainStep, setBlockchainStep] = useState(0);
  const [locked, setLocked] = useState(false);

  const nextStep = () => setStep(s => Math.min(s + 1, 4));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const handleAIAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setShowSections(true);
    }, 1500);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleLock = () => {
    setLocking(true);
    let stepCount = 0;
    const interval = setInterval(() => {
      stepCount++;
      setBlockchainStep(stepCount);
      if (stepCount >= 4) {
        clearInterval(interval);
        setTimeout(() => {
          setLocking(false);
          setLocked(true);
        }, 1000);
      }
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="max-w-4xl mx-auto p-8 bg-white rounded-3xl shadow-xl border border-[#f0e6e4] text-center">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={48} className="text-green-600" />
        </div>
        <h2 className="text-3xl font-black text-[#000666] mb-2">FIR REGISTERED SUCCESSFULLY</h2>
        <div className="text-xl font-mono bg-gray-100 py-3 px-6 rounded-lg inline-block mb-6 text-[#201a19]">
          FIR Number: <span className="font-bold">UP/CHT/2026/04821</span>
        </div>
        
        <div className="text-left max-w-lg mx-auto bg-gray-50 p-6 rounded-2xl mb-8 border border-gray-200">
          <div className="mb-4 pb-4 border-b border-gray-200">
            <span className="text-sm text-gray-500">Acknowledged by:</span>
            <div className="font-bold text-[#000666]">District SP Office</div>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle2 size={20} className="text-green-600 shrink-0 mt-0.5" />
              <span className="text-sm text-gray-700">FIR digitally signed and securely transmitted to the relevant police station.</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 size={20} className="text-green-600 shrink-0 mt-0.5" />
              <span className="text-sm text-gray-700">Investigating Officer (IO) will be assigned within 2 hours.</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 size={20} className="text-green-600 shrink-0 mt-0.5" />
              <span className="text-sm text-gray-700">You will receive SMS updates on your registered mobile number.</span>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4 mb-10">
          <button className="flex items-center gap-2 px-6 py-3 bg-[#000666] text-white rounded-xl font-bold hover:bg-[#00044d] transition-all">
            <Download size={18} /> Download PDF
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-[#f0e6e4] text-[#000666] rounded-xl font-bold hover:bg-[#e0d6d4] transition-all">
            <Share2 size={18} /> Share with NALSA
          </button>
        </div>

        {/* Blockchain Immutable Record Section */}
        <div className="max-w-2xl mx-auto bg-[#0a0a0a] rounded-2xl p-6 text-left shadow-2xl border border-gray-800">
          <div className="flex items-center gap-3 mb-6">
            <Database className="text-purple-500" size={24} />
            <h3 className="text-xl font-bold text-white">Blockchain Immutable Record</h3>
          </div>
          
          {!locked && !locking && (
            <div className="text-center py-6">
              <p className="text-gray-400 mb-6 text-sm">Lock your FIR on the Polygon zkEVM blockchain to ensure it can never be altered or deleted by corrupt officials.</p>
              <button 
                onClick={handleLock}
                className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-all shadow-[0_0_15px_rgba(147,51,234,0.4)]"
              >
                <ShieldCheck size={18} /> Lock FIR on Blockchain
              </button>
            </div>
          )}

          {locking && (
            <div className="bg-black/50 rounded-xl p-6 font-mono text-sm text-green-400 border border-gray-800 space-y-2">
              <div className={blockchainStep >= 1 ? 'opacity-100' : 'opacity-0'}>&gt; Hashing FIR Document (SHA-256)...</div>
              <div className={blockchainStep >= 2 ? 'opacity-100' : 'opacity-0'}>&gt; Connecting to Polygon zkEVM Network...</div>
              <div className={blockchainStep >= 3 ? 'opacity-100' : 'opacity-0'}>&gt; Deploying Smart Contract...</div>
              <div className={blockchainStep >= 4 ? 'opacity-100' : 'opacity-0'}>&gt; Transaction Confirmed! Block #1849201</div>
              {blockchainStep < 4 && <div className="animate-pulse">&gt; _</div>}
            </div>
          )}

          {locked && (
            <div className="bg-green-900/20 border border-green-500/30 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle2 className="text-green-400" size={24} />
                <h4 className="text-green-400 font-bold text-lg">FIR Locked!</h4>
              </div>
              <p className="text-green-200/70 text-sm mb-4">This document is now immutable. No corrupt official can alter or delete this statement.</p>
              <div className="bg-black/50 rounded-lg p-4 font-mono text-xs text-gray-300 break-all border border-gray-800 mb-4">
                TxHash: 0x8f7d9a3b2c1e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a
              </div>
              <a href="#" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors">
                <LinkIcon size={14} /> View on PolygonScan
              </a>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
      {/* Main Form Area */}
      <div className="flex-1">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-[#000666] flex items-center gap-3">
            <Shield className="text-[#ba1a1a]" size={32} />
            Digital e-FIR Filing Portal
          </h1>
          <p className="text-sm text-[#857371] font-medium mt-2">
            Powered by SAHAYAK-AI | Integrated with State Police APIs | PoA Act Compliant
          </p>
          <div className="mt-4 flex gap-4 text-xs font-bold text-[#534341]">
            <span className="bg-white px-3 py-1.5 rounded-full shadow-sm border border-[#f0e6e4]">1,247 FIRs Filed</span>
            <span className="bg-white px-3 py-1.5 rounded-full shadow-sm border border-[#f0e6e4]">Avg Processing: 12 min</span>
            <span className="bg-green-50 text-green-700 px-3 py-1.5 rounded-full shadow-sm border border-green-200">94% Acceptance Rate</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-[#f0e6e4] overflow-hidden">
          {/* Progress Bar */}
          <div className="flex border-b border-[#f0e6e4]">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className={`flex-1 h-2 transition-colors ${i <= step ? 'bg-[#ba1a1a]' : 'bg-gray-100'}`} />
            ))}
          </div>
          
          <div className="p-8">
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                <h2 className="text-xl font-bold text-[#000666] mb-6 flex items-center gap-2"><User size={20} /> Complainant Details</h2>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-[#857371] mb-2 uppercase">Full Name</label>
                    <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#000666]" placeholder="Enter full name" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#857371] mb-2 uppercase">Aadhaar Number</label>
                    <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#000666]" placeholder="XXXX-XXXX-1234" defaultValue="XXXX-XXXX-1234" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#857371] mb-2 uppercase">Mobile Number</label>
                    <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#000666]" defaultValue="98XXXXXX21" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#857371] mb-2 uppercase">Gender</label>
                    <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#000666]">
                      <option>Female</option>
                      <option>Male</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#857371] mb-2 uppercase">Address</label>
                  <textarea className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#000666]" rows={3} placeholder="Full residential address"></textarea>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#857371] mb-2 uppercase">Caste Category</label>
                  <div className="flex gap-4">
                    {['SC', 'ST', 'OBC', 'General'].map(cat => (
                      <label key={cat} className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="caste" className="text-[#ba1a1a] focus:ring-[#ba1a1a]" defaultChecked={cat === 'SC'} />
                        <span className="font-medium text-[#201a19]">{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="pt-6 flex justify-end">
                  <button onClick={nextStep} className="flex items-center gap-2 px-6 py-3 bg-[#000666] text-white rounded-xl font-bold hover:bg-[#00044d] transition-all">
                    NEXT <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                <h2 className="text-xl font-bold text-[#000666] mb-6 flex items-center gap-2"><MapPin size={20} /> Incident Details</h2>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-[#857371] mb-2 uppercase">Date of Incident</label>
                    <input type="date" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#000666]" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#857371] mb-2 uppercase">Time of Incident</label>
                    <input type="time" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#000666]" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#857371] mb-2 uppercase">Location of Incident</label>
                  <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#000666]" defaultValue="Near Premnagar Village, Chitrakoot, UP" />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-[#857371] mb-2 uppercase">Accused Name(s)</label>
                    <textarea className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#000666]" rows={2}></textarea>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#857371] mb-2 uppercase">Witnesses (if any)</label>
                    <textarea className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#000666]" rows={2}></textarea>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#857371] mb-2 uppercase">Description of Incident</label>
                  <textarea className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#000666]" rows={5} defaultValue="They stopped me on the way to the polling booth, insulted my caste, and physically pushed me away saying my vote doesn't matter. The local sub-inspector refused to take my complaint initially."></textarea>
                </div>

                <div className="pt-6 flex justify-between">
                  <button onClick={prevStep} className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-all">
                    <ChevronLeft size={18} /> BACK
                  </button>
                  <button onClick={() => { handleAIAnalyze(); nextStep(); }} className="flex items-center gap-2 px-6 py-3 bg-[#944b00] text-white rounded-xl font-bold hover:bg-[#7a3d00] transition-all">
                    AI AUTO-DETECT SECTIONS <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                <h2 className="text-xl font-bold text-[#000666] mb-6 flex items-center gap-2"><AlertCircle size={20} /> Legal Sections (AI-Identified)</h2>
                
                {analyzing ? (
                  <div className="py-12 flex flex-col items-center justify-center text-[#000666]">
                    <div className="w-12 h-12 border-4 border-[#000666] border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="font-bold">Analyzing description and mapping to legal statutes...</p>
                  </div>
                ) : showSections ? (
                  <>
                    <div className="bg-[#ffead6]/30 p-4 rounded-2xl border border-[#ffead6] mb-6 flex items-center justify-between">
                      <span className="text-sm font-bold text-[#944b00]">AI Analysis Complete</span>
                      <span className="bg-[#944b00] text-white px-3 py-1 rounded-full text-xs font-bold">Confidence: 91.2%</span>
                    </div>

                    <div className="space-y-4">
                      <label className="flex items-start gap-4 p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 bg-white">
                        <input type="checkbox" defaultChecked className="mt-1 w-5 h-5 text-[#000666]" />
                        <div>
                          <div className="font-bold text-[#000666]">Section 3(1)(r)</div>
                          <div className="text-sm text-gray-600">Intentional Insult based on caste</div>
                        </div>
                      </label>
                      <label className="flex items-start gap-4 p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 bg-white">
                        <input type="checkbox" defaultChecked className="mt-1 w-5 h-5 text-[#000666]" />
                        <div>
                          <div className="font-bold text-[#000666]">Section 3(1)(s)</div>
                          <div className="text-sm text-gray-600">Intimidation to prevent voting/exercising rights</div>
                        </div>
                      </label>
                      <label className="flex items-start gap-4 p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 bg-white">
                        <input type="checkbox" defaultChecked className="mt-1 w-5 h-5 text-[#000666]" />
                        <div>
                          <div className="font-bold text-[#000666]">Section 3(2)(va)</div>
                          <div className="text-sm text-gray-600">Physical assault on SC/ST member</div>
                        </div>
                      </label>
                      <label className="flex items-start gap-4 p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 bg-white">
                        <input type="checkbox" defaultChecked className="mt-1 w-5 h-5 text-[#000666]" />
                        <div>
                          <div className="font-bold text-[#000666]">Section 4</div>
                          <div className="text-sm text-gray-600">Failure of duty by public servant</div>
                        </div>
                      </label>
                    </div>

                    <div className="mt-6">
                      <label className="block text-xs font-bold text-[#857371] mb-2 uppercase">Add Other Sections Manually</label>
                      <div className="flex gap-2">
                        <input type="text" className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none" placeholder="e.g. IPC 323" />
                        <button className="px-6 py-3 bg-gray-200 text-gray-800 rounded-xl font-bold">ADD</button>
                      </div>
                    </div>
                  </>
                ) : null}

                <div className="pt-6 flex justify-between">
                  <button onClick={prevStep} className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-all">
                    <ChevronLeft size={18} /> BACK
                  </button>
                  <button onClick={nextStep} disabled={!showSections} className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${showSections ? 'bg-[#000666] text-white hover:bg-[#00044d]' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}>
                    REVIEW & SUBMIT <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                <h2 className="text-xl font-bold text-[#000666] mb-6 flex items-center gap-2"><FileText size={20} /> Review & Submit</h2>
                
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 font-serif text-gray-800 text-sm leading-relaxed max-h-[300px] overflow-y-auto">
                  <h3 className="text-center font-bold text-lg mb-4 uppercase underline">First Information Report (Under Section 154 Cr.P.C.)</h3>
                  <p className="mb-2"><strong>To:</strong> The Station House Officer</p>
                  <p className="mb-4"><strong>Subject:</strong> Complaint regarding caste-based insult and physical assault under SC/ST (PoA) Act.</p>
                  <p className="mb-2">Respected Sir/Madam,</p>
                  <p className="mb-4">I am writing to formally lodge a complaint regarding an incident that occurred on the date mentioned below. They stopped me on the way to the polling booth, insulted my caste, and physically pushed me away saying my vote doesn't matter. The local sub-inspector refused to take my complaint initially.</p>
                  <p className="mb-2"><strong>Sections Applied:</strong> 3(1)(r), 3(1)(s), 3(2)(va), 4 of SC/ST (PoA) Act.</p>
                </div>

                <div className="grid grid-cols-2 gap-6 mt-6">
                  <div>
                    <label className="block text-xs font-bold text-[#857371] mb-2 uppercase">Select Police Station</label>
                    <select className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#000666]">
                      <option>Chitrakoot Kotwali</option>
                      <option>Karwi Police Station</option>
                      <option>Manikpur Police Station</option>
                      <option>Rajapur Police Station</option>
                      <option>Mau Police Station</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#857371] mb-2 uppercase">Send Via</label>
                    <div className="flex flex-wrap gap-4 mt-2">
                      <label className="flex items-center gap-2"><input type="radio" name="sendvia" defaultChecked className="text-[#000666]" /> Online Portal</label>
                      <label className="flex items-center gap-2"><input type="radio" name="sendvia" className="text-[#000666]" /> WhatsApp</label>
                      <label className="flex items-center gap-2"><input type="radio" name="sendvia" className="text-[#000666]" /> Email</label>
                      <label className="flex items-center gap-2"><input type="radio" name="sendvia" className="text-[#000666]" /> Print</label>
                    </div>
                  </div>
                </div>

                <div className="pt-6 flex justify-between">
                  <button onClick={prevStep} className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-all">
                    <ChevronLeft size={18} /> BACK
                  </button>
                  <button onClick={handleSubmit} className="flex items-center gap-2 px-8 py-4 bg-[#ba1a1a] text-white rounded-xl font-black text-lg hover:bg-[#93000a] transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                    SUBMIT e-FIR <CheckCircle2 size={24} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Side Panel */}
      <div className="w-full md:w-80 shrink-0 space-y-6">
        <div className="bg-white rounded-3xl p-6 shadow-lg border border-[#f0e6e4]">
          <div className="flex items-center gap-2 mb-4 text-[#000666] font-bold">
            <MessageSquare size={20} /> AI Legal Assistant
          </div>
          <div className="space-y-3 mb-4">
            <div className="bg-[#e0e5ff] p-3 rounded-xl text-sm text-[#000666] rounded-tl-none">
              Hello! I can help you draft this FIR properly. Need help describing the incident?
            </div>
            <div className="flex flex-col gap-2">
              <button className="text-xs bg-gray-50 border border-gray-200 p-2 rounded-lg text-left hover:bg-gray-100 transition-colors">What happens after I file this?</button>
              <button className="text-xs bg-gray-50 border border-gray-200 p-2 rounded-lg text-left hover:bg-gray-100 transition-colors">Can I keep my identity secret?</button>
              <button className="text-xs bg-gray-50 border border-gray-200 p-2 rounded-lg text-left hover:bg-gray-100 transition-colors">I need immediate police protection.</button>
            </div>
          </div>
          <input type="text" placeholder="Ask SAATHI bot..." className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-[#000666]" />
        </div>

        <div className="bg-[#000666] text-white rounded-3xl p-6 shadow-lg">
          <h3 className="font-bold mb-4 opacity-80 uppercase text-xs tracking-wider">Emergency Helplines</h3>
          <div className="space-y-4">
            <div>
              <div className="text-xs opacity-70">NALSA Legal Aid</div>
              <div className="text-xl font-black">15100</div>
            </div>
            <div>
              <div className="text-xs opacity-70">NCW (Women's Helpline)</div>
              <div className="text-xl font-black">7827170170</div>
            </div>
            <div>
              <div className="text-xs opacity-70">Police Emergency</div>
              <div className="text-xl font-black">112</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
