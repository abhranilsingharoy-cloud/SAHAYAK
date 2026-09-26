'use client';

import React, { useState } from 'react';
import { Shield, Upload, FileText, CheckCircle2, AlertTriangle, Phone, Activity } from 'lucide-react';

export default function NcwPortal() {
  const [submitted, setSubmitted] = useState(false);
  const [trackId, setTrackId] = useState('');
  const [showTracker, setShowTracker] = useState(false);

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-yellow-500 rounded-2xl flex items-center justify-center shadow-lg">
            <Shield className="text-white" size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-[#000666]">NCW Online Complaint Portal</h1>
            <p className="text-[#857371] font-medium">National Commission for Women | Integrated with SAHAYAK-AI</p>
          </div>
        </div>
        <div className="bg-[#ba1a1a] text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-3 shadow-lg">
          <Phone size={20} />
          <div>
            <div className="text-[10px] uppercase tracking-wider opacity-80">Helpline</div>
            <div className="text-lg leading-none">7827170170</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Form */}
        <div className="lg:col-span-2">
          {!submitted ? (
            <div className="bg-white rounded-3xl shadow-xl border border-[#f0e6e4] p-8">
              <h2 className="text-xl font-bold text-[#000666] mb-6 border-b border-gray-100 pb-4">File a New Complaint</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-[#857371] mb-2 uppercase">Complaint Category</label>
                  <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#000666]">
                    <option>Sexual Harassment</option>
                    <option>Domestic Violence</option>
                    <option>Caste-based Violence</option>
                    <option>Dowry</option>
                    <option>Trafficking</option>
                    <option>Workplace Discrimination</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-1">
                    <label className="block text-xs font-bold text-[#857371] mb-2 uppercase">Name</label>
                    <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#000666]" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#857371] mb-2 uppercase">State</label>
                    <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#000666]" placeholder="e.g. Uttar Pradesh" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#857371] mb-2 uppercase">District</label>
                    <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#000666]" placeholder="e.g. Chitrakoot" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#857371] mb-2 uppercase">Incident Description</label>
                  <textarea className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#000666]" rows={4} placeholder="Describe what happened..."></textarea>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#857371] mb-2 uppercase">Upload Evidence (Optional)</label>
                  <button className="w-full border-2 border-dashed border-gray-300 rounded-xl p-6 text-gray-500 font-medium hover:bg-gray-50 hover:border-[#000666] transition-colors flex flex-col items-center gap-2">
                    <Upload size={24} />
                    + Add Photo / Video / Document
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#857371] mb-2 uppercase">Respondent Details (Who are you complaining against?)</label>
                  <textarea className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#000666]" rows={2} placeholder="Name, address, contact info if known..."></textarea>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#857371] mb-3 uppercase">Relief Sought</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['Police action', 'Compensation', 'Counseling', 'Legal Aid', 'All of the above'].map(relief => (
                      <label key={relief} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200 cursor-pointer hover:border-[#000666]">
                        <input type="checkbox" className="w-4 h-4 text-[#000666] rounded border-gray-300" />
                        <span className="text-sm font-medium">{relief}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <button onClick={() => setSubmitted(true)} className="w-full py-4 bg-[#000666] text-white rounded-xl font-black text-lg hover:bg-[#00044d] transition-all shadow-lg">
                    SUBMIT TO NCW
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl shadow-xl border border-green-200 p-10 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={40} className="text-green-600" />
              </div>
              <h2 className="text-2xl font-black text-[#000666] mb-2">Complaint Submitted Successfully</h2>
              <p className="text-gray-600 mb-6">Your complaint has been registered with the National Commission for Women.</p>
              
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 inline-block mb-8">
                <div className="text-sm text-gray-500 uppercase font-bold tracking-wider mb-1">Tracking Number</div>
                <div className="text-2xl font-mono font-black text-[#ba1a1a]">NCW/2026/UP/08821</div>
              </div>

              <div className="max-w-md mx-auto text-left relative">
                <div className="absolute left-[15px] top-4 bottom-4 w-0.5 bg-gray-200"></div>
                {[
                  { title: 'Received', status: 'done' },
                  { title: 'Under Review', status: 'pending' },
                  { title: 'Assigned to Officer', status: 'pending' },
                  { title: 'Action Taken', status: 'pending' },
                  { title: 'Closed', status: 'pending' }
                ].map((step, i) => (
                  <div key={i} className="flex items-center gap-4 mb-6 relative z-10">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step.status === 'done' ? 'bg-green-500 border-green-500 text-white' : 'bg-white border-gray-300 text-transparent'}`}>
                      {step.status === 'done' && <CheckCircle2 size={16} />}
                    </div>
                    <div className={`font-bold ${step.status === 'done' ? 'text-[#000666]' : 'text-gray-400'}`}>{step.title}</div>
                  </div>
                ))}
              </div>
              
              <button onClick={() => setSubmitted(false)} className="mt-8 text-sm font-bold text-[#000666] hover:underline">
                File another complaint
              </button>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Tracker Card */}
          <div className="bg-gradient-to-br from-[#00044d] to-[#000666] rounded-3xl shadow-xl p-6 text-white">
            <h3 className="font-bold mb-4 flex items-center gap-2"><Activity size={20} /> Track Existing Complaint</h3>
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="NCW/..." 
                className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-2 outline-none focus:border-white text-white placeholder-white/50 text-sm"
                value={trackId}
                onChange={e => setTrackId(e.target.value)}
              />
              <button 
                onClick={() => setShowTracker(true)}
                className="bg-white text-[#000666] px-4 py-2 rounded-xl font-bold text-sm hover:bg-gray-100"
              >
                TRACK
              </button>
            </div>

            {showTracker && (
              <div className="mt-6 pt-6 border-t border-white/10 animate-in fade-in">
                <div className="text-sm font-bold mb-4 text-[#ffead6]">Status for NCW/2026/UP/08455</div>
                <div className="space-y-4 text-sm relative">
                  <div className="absolute left-[7px] top-2 bottom-2 w-px bg-white/20"></div>
                  
                  <div className="flex gap-4 relative z-10">
                    <div className="w-4 h-4 rounded-full bg-green-400 mt-0.5 shrink-0"></div>
                    <div>
                      <div className="font-bold">Received on 20 Sept</div>
                    </div>
                  </div>
                  <div className="flex gap-4 relative z-10">
                    <div className="w-4 h-4 rounded-full bg-green-400 mt-0.5 shrink-0"></div>
                    <div>
                      <div className="font-bold">Assigned to Dy. Director (North Zone)</div>
                    </div>
                  </div>
                  <div className="flex gap-4 relative z-10">
                    <div className="w-4 h-4 rounded-full bg-green-400 mt-0.5 shrink-0"></div>
                    <div>
                      <div className="font-bold">Police intimation sent to DGP UP</div>
                    </div>
                  </div>
                  <div className="flex gap-4 relative z-10">
                    <div className="w-4 h-4 rounded-full border-2 border-yellow-400 bg-[#000666] mt-0.5 shrink-0"></div>
                    <div>
                      <div className="font-bold text-yellow-400">Response awaited from police</div>
                    </div>
                  </div>
                  <div className="flex gap-4 relative z-10">
                    <div className="w-4 h-4 rounded-full border-2 border-white/30 bg-[#000666] mt-0.5 shrink-0"></div>
                    <div className="opacity-50">
                      <div className="font-bold">Closure pending</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Info Cards */}
          <div className="bg-white rounded-3xl p-6 shadow-lg border border-[#f0e6e4]">
            <h3 className="font-bold text-[#000666] mb-2">NCW Powers</h3>
            <p className="text-sm text-gray-600 mb-4">Can summon, inquire into cases of deprivation of women's rights, and recommend prosecution to state authorities.</p>
            
            <h3 className="font-bold text-[#000666] mb-2 mt-4">Response Timeline</h3>
            <p className="text-sm text-gray-600 mb-4">Standard complaints are processed within 30 working days.</p>
          </div>

          <div className="bg-[#ffdad6]/30 rounded-3xl p-6 border border-[#ffdad6]">
            <div className="flex items-center gap-2 text-[#ba1a1a] font-bold mb-2">
              <AlertTriangle size={20} /> Emergency Escalation
            </div>
            <p className="text-sm text-[#93000a]">If there is an immediate threat to life, bypass this portal and use the <strong>Mobile Panic</strong> button or dial <strong>112</strong> for immediate police intervention.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
