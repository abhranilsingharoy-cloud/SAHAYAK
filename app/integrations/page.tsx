"use client";

import React, { useState, useEffect } from 'react';
import {
  Activity, CheckCircle2, ChevronDown, Clock, Search, Send, ShieldAlert, Zap, Server, Phone, FileText, CheckCircle
} from 'lucide-react';

// Color Palette
// Navy: #000666, Crimson: #ba1a1a, Warm White: #fff8f6, Amber: #944b00

const LIVE_AGENCIES = [
  { name: 'NALSA (National Legal Services Authority)', type: 'Government', status: 'LIVE', latency: 142, cases: 12, action: 'File Case' },
  { name: 'NCW (National Commission for Women)', type: 'Government', status: 'LIVE', latency: 89, cases: 8, action: 'Submit' },
  { name: 'NHRC (National Human Rights Commission)', type: 'Government', status: 'LIVE', latency: 203, cases: 3, action: 'Escalate' },
  { name: '112 India Emergency Response', type: 'Emergency', status: 'LIVE', latency: 34, cases: 2, action: 'Dispatch' },
  { name: 'DIAL 100 UP Police', type: 'Police', status: 'LIVE', latency: 67, cases: 1, action: 'Alert' },
  { name: 'DSJ&E Ministry (Social Justice)', type: 'Ministry', status: 'LIVE', latency: 156, cases: 5, action: 'Send Report' },
  { name: 'Ministry of Home Affairs', type: 'Ministry', status: 'LIVE', latency: 289, cases: 1, action: 'Escalate' },
  { name: 'Prerna NGO (UP)', type: 'NGO', status: 'LIVE', latency: 91, cases: 4, action: 'Refer' },
  { name: 'Sakhi One Stop Centre', type: 'Support', status: 'LIVE', latency: 78, cases: 7, action: 'Refer' },
  { name: 'iCall (TISS)', type: 'Support', status: 'LIVE', latency: 112, cases: 2, action: 'Connect' },
  { name: 'Snehi Foundation', type: 'NGO', status: 'DEGRADED', latency: 890, cases: 0, action: 'Retry' },
  { name: 'State Legal Aid Authority', type: 'Government', status: 'LIVE', latency: 134, cases: 6, action: 'File' },
];

const NGO_DIRECTORY = [
  { name: 'Prerna Women Rights', state: 'UP', specs: ['Legal', 'Shelter'], availability: '24/7', rating: 4.8, phone: '+91-9876543210' },
  { name: 'Sakhi Sangam', state: 'MP', specs: ['Counseling', 'Legal'], availability: '24/7', rating: 4.7, phone: '+91-9876543211' },
  { name: 'Vanangana', state: 'UP', specs: ['Legal', 'Advocacy'], availability: 'Office Hours', rating: 4.6, phone: '+91-9876543212' },
  { name: 'iCall TISS', state: 'Maharashtra', specs: ['Counseling'], availability: '24/7', rating: 4.9, phone: '+91-9876543213' },
  { name: 'Jan Sahas', state: 'MP', specs: ['Rescue', 'Rehabilitation'], availability: '24/7', rating: 4.8, phone: '+91-9876543214' },
  { name: 'Snehi Foundation', state: 'Delhi', specs: ['Crisis Helpline'], availability: '24/7', rating: 4.5, phone: '+91-9876543215' },
  { name: 'Prayas', state: 'Delhi', specs: ['Shelter', 'Legal'], availability: 'Office Hours', rating: 4.4, phone: '+91-9876543216' },
  { name: 'Swayam', state: 'WB', specs: ['Legal', 'Counseling'], availability: '24/7', rating: 4.7, phone: '+91-9876543217' },
  { name: 'Majlis Law', state: 'Maharashtra', specs: ['Legal'], availability: 'Office Hours', rating: 4.9, phone: '+91-9876543218' },
];

const SCHEMES = [
  { name: 'PM Awas Yojana', benefit: 'Housing subsidy ₹2.5 Lakh', ministry: 'MoHUA' },
  { name: 'PM-JAY Ayushman Bharat', benefit: 'Free medical up to ₹5 Lakh', ministry: 'MoHFW' },
  { name: 'PoA Act Compensation', benefit: 'State compensation ₹1-8.25 Lakh', ministry: 'MHA' },
  { name: 'NALSA Legal Aid', benefit: 'Free legal representation', ministry: 'NALSA' },
  { name: 'One Stop Centre', benefit: 'Free shelter, counseling, legal, medical', ministry: 'MWCD' },
  { name: 'Nirbhaya Fund Scheme', benefit: 'Rehabilitation support', ministry: 'MWCD' },
];

const FEED_MESSAGES = [
  "[14:32] NALSA acknowledged case NHAA-4821. Legal aid assigned: Adv. Sharma",
  "[14:33] NCW complaint #UP-2026-1847 filed successfully",
  "[14:34] PCR Unit #14 dispatched — ETA 4 min (via 112 API)",
  "[14:35] Sakhi Centre confirmed availability for 2 victims",
  "[14:36] NHRC escalation approved — Case flagged PRIORITY"
];

export default function IntegrationsPage() {
  const [agencies, setAgencies] = useState(LIVE_AGENCIES);
  
  // Update latency periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setAgencies(prev => prev.map(a => ({
        ...a,
        latency: Math.max(10, a.latency + (Math.floor(Math.random() * 41) - 20))
      })));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Transfer State
  const [transferStep, setTransferStep] = useState(0); // 0 = form, 1-4 = progress, 5 = success
  const handleTransfer = () => {
    setTransferStep(1);
    let step = 1;
    const interval = setInterval(() => {
      step++;
      if (step > 4) {
        clearInterval(interval);
        setTimeout(() => setTransferStep(5), 800);
      } else {
        setTransferStep(step);
      }
    }, 800);
  };

  // NGO Directory State
  const [ngoSearch, setNgoSearch] = useState('');
  const [ngoCategory, setNgoCategory] = useState('All');

  const filteredNGOs = NGO_DIRECTORY.filter(ngo => {
    const matchSearch = ngo.name.toLowerCase().includes(ngoSearch.toLowerCase()) || ngo.state.toLowerCase().includes(ngoSearch.toLowerCase());
    const matchCategory = ngoCategory === 'All' || ngo.specs.some(s => s.includes(ngoCategory) || ngoCategory.includes(s));
    return matchSearch && matchCategory;
  });

  // Scheme state
  const [showSchemes, setShowSchemes] = useState(false);
  const [schemeLoading, setSchemeLoading] = useState(false);

  const checkSchemes = () => {
    setSchemeLoading(true);
    setShowSchemes(false);
    setTimeout(() => {
      setSchemeLoading(false);
      setShowSchemes(true);
    }, 1500);
  };

  // Feed State
  const [feed, setFeed] = useState<string[]>([FEED_MESSAGES[0]]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setFeed(prevFeed => {
        // Find the index of the last message added
        const lastMsg = prevFeed[prevFeed.length - 1];
        const nextIndex = (FEED_MESSAGES.indexOf(lastMsg) + 1) % FEED_MESSAGES.length;
        
        const newFeed = [...prevFeed, FEED_MESSAGES[nextIndex]];
        if (newFeed.length > 5) return newFeed.slice(newFeed.length - 5);
        return newFeed;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-6 text-[#201a19]">
      {/* HEADER */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#f0e6e4]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#000666]">Integration Command Center</h1>
            <p className="text-[#534341] mt-1">Real-time connectivity with 24 NGOs, 6 Ministries, and 5 State Police APIs</p>
          </div>
          <div className="flex items-center gap-3 bg-[#e8f5e9] px-4 py-2 rounded-full border border-[#c8e6c9]">
            <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
            <span className="text-green-800 font-semibold text-sm">All Systems Operational</span>
          </div>
        </div>
        <div className="mt-6 bg-[#000666] text-white p-4 rounded-xl flex items-center justify-between text-sm font-medium">
          <span>24 NGOs Connected</span>
          <span className="w-1 h-1 bg-white/30 rounded-full" />
          <span>6 Ministry APIs</span>
          <span className="w-1 h-1 bg-white/30 rounded-full" />
          <span>47 Active Cases</span>
          <span className="w-1 h-1 bg-white/30 rounded-full" />
          <span className="text-[#ffb4a9]">3 Pending Transfers</span>
        </div>
      </div>

      {/* SECTION 1: Live Agency Status Grid */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#f0e6e4]">
        <h2 className="text-xl font-bold text-[#000666] mb-4 flex items-center gap-2">
          <Server size={20} /> Live Agency Status Grid
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {agencies.map((agency, i) => {
            const isLive = agency.status === 'LIVE';
            const isDegraded = agency.status === 'DEGRADED';
            return (
              <div key={i} className="border border-[#f0e6e4] rounded-xl p-4 flex flex-col gap-3 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div className="font-bold text-sm text-[#000666] leading-tight pr-2">{agency.name}</div>
                  <div className={`shrink-0 flex items-center justify-center w-8 h-8 rounded-full ${isLive ? 'bg-green-100 text-green-600' : isDegraded ? 'bg-amber-100 text-[#944b00]' : 'bg-red-100 text-red-600'}`}>
                    <Activity size={16} />
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold">
                  <span className="bg-[#f0e6e4] px-2 py-1 rounded-md text-[#534341]">{agency.type}</span>
                  <span className={`px-2 py-1 rounded-md flex items-center gap-1 ${isLive ? 'bg-green-50 text-green-700' : isDegraded ? 'bg-amber-50 text-[#944b00]' : 'bg-red-50 text-red-700'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${isLive ? 'bg-green-500 animate-pulse' : isDegraded ? 'bg-[#944b00]' : 'bg-red-500'}`} />
                    {agency.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-[#534341] mt-1">
                  <div>
                    <div className="text-[#857371]">Latency</div>
                    <div className="font-mono font-medium">{agency.latency}ms</div>
                  </div>
                  <div>
                    <div className="text-[#857371]">Active</div>
                    <div className="font-medium">{agency.cases} {agency.cases === 1 ? 'case' : 'cases'}</div>
                  </div>
                </div>
                <button className="mt-auto pt-2 text-sm font-semibold text-[#000666] border-t border-[#f0e6e4] hover:text-[#ba1a1a] transition-colors w-full text-left">
                  {agency.action} &rarr;
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: Case Transfer Workflow */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#f0e6e4]">
        <h2 className="text-xl font-bold text-[#000666] mb-4 flex items-center gap-2">
          <Send size={20} /> Inter-Agency Case Transfer
        </h2>
        {transferStep === 0 ? (
          <div className="flex flex-col gap-5">
            <div>
              <label className="block text-sm font-bold text-[#534341] mb-2">Step 1: Select Source Case</label>
              <select className="w-full p-3 rounded-xl border border-[#f0e6e4] bg-[#fff8f6] outline-none focus:border-[#000666]">
                <option>NHAA-2026-4821 | Bundelkhand | SVI:89</option>
                <option>NHAA-2026-4756 | Lucknow | SVI:72</option>
                <option>NHAA-2026-4699 | Varanasi | SVI:65</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-[#534341] mb-2">Step 2: Select Target Agency</label>
              <div className="flex flex-wrap gap-3">
                {['NALSA', 'NCW', 'NHRC', 'State Police', 'Sakhi Centre'].map((agency, i) => (
                  <label key={i} className="flex items-center gap-2 p-3 border border-[#f0e6e4] rounded-xl cursor-pointer hover:bg-[#fff8f6] has-[:checked]:border-[#000666] has-[:checked]:bg-[#e6e6ff] transition-all">
                    <input type="radio" name="target_agency" className="accent-[#000666]" defaultChecked={i === 0} />
                    <span className="text-sm font-semibold">{agency}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-[#534341] mb-2">Step 3: Priority Level</label>
              <div className="flex gap-3">
                <button className="flex-1 py-2 px-4 rounded-xl border border-red-200 bg-red-50 text-red-700 font-bold text-sm hover:bg-red-100">CRITICAL</button>
                <button className="flex-1 py-2 px-4 rounded-xl border-amber-200 bg-amber-50 text-[#944b00] font-bold text-sm hover:bg-amber-100">HIGH</button>
                <button className="flex-1 py-2 px-4 rounded-xl border-blue-200 bg-blue-50 text-blue-700 font-bold text-sm hover:bg-blue-100">MEDIUM</button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-[#534341] mb-2">Step 4: Transfer Notes</label>
              <textarea rows={3} className="w-full p-3 rounded-xl border border-[#f0e6e4] bg-[#fff8f6] outline-none focus:border-[#000666]" placeholder="Add context for the target agency..."></textarea>
            </div>
            <button onClick={handleTransfer} className="bg-[#ba1a1a] hover:bg-[#93000a] text-white font-bold py-4 rounded-xl transition-colors shadow-md">
              INITIATE TRANSFER
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4 p-8 border border-[#f0e6e4] rounded-xl bg-[#fff8f6]">
            {transferStep >= 1 && (
              <div className="flex items-center gap-3 text-lg font-medium">
                <CheckCircle2 size={24} className="text-green-600" /> Case data packaged and encrypted
              </div>
            )}
            {transferStep >= 2 && (
              <div className="flex items-center gap-3 text-lg font-medium">
                <CheckCircle2 size={24} className="text-green-600" /> Secure channel established with NALSA
              </div>
            )}
            {transferStep >= 3 && (
              <div className="flex items-center gap-3 text-lg font-medium">
                <CheckCircle2 size={24} className="text-green-600" /> Case reference number generated: NALSA/2026/UP/00891
              </div>
            )}
            {transferStep >= 4 && (
              <div className="flex items-center gap-3 text-lg font-medium">
                <CheckCircle2 size={24} className="text-green-600" /> Acknowledgement received — Legal aid assigned
              </div>
            )}
            {transferStep === 5 && (
              <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-xl font-bold border border-green-200">
                Case successfully transferred. Victim will be contacted within 2 hours.
              </div>
            )}
            {transferStep < 5 && (
              <div className="flex justify-center mt-4">
                <div className="w-6 h-6 border-4 border-[#000666] border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            {transferStep === 5 && (
              <button onClick={() => setTransferStep(0)} className="mt-4 text-[#000666] font-bold hover:underline">
                Transfer another case
              </button>
            )}
          </div>
        )}
      </div>

      {/* SECTION 3: NGO Directory */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#f0e6e4]">
        <h2 className="text-xl font-bold text-[#000666] mb-4 flex items-center gap-2">
          <Search size={20} /> NGO Partner Directory
        </h2>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#857371]" />
            <input 
              type="text" 
              placeholder="Search NGOs or States..." 
              value={ngoSearch}
              onChange={e => setNgoSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#f0e6e4] bg-[#fff8f6] outline-none focus:border-[#000666]" 
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {['All', 'Legal Aid', 'Counseling', 'Shelter', 'Medical', 'Helpline'].map(cat => (
              <button 
                key={cat} 
                onClick={() => setNgoCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${ngoCategory === cat ? 'bg-[#000666] text-white' : 'bg-[#f0e6e4] text-[#534341] hover:bg-[#e0d6d4]'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredNGOs.map((ngo, i) => (
            <div key={i} className="border border-[#f0e6e4] rounded-xl p-5 flex flex-col gap-3 hover:border-[#000666] transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg text-[#201a19]">{ngo.name}</h3>
                  <div className="text-sm text-[#857371]">{ngo.state}</div>
                </div>
                <div className="bg-amber-100 text-[#944b00] px-2 py-1 rounded-md text-xs font-bold flex items-center gap-1">
                  ★ {ngo.rating}
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {ngo.specs.map(spec => (
                  <span key={spec} className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-xs font-medium">{spec}</span>
                ))}
              </div>
              <div className="flex items-center gap-4 text-sm text-[#534341] mt-2">
                <span className="flex items-center gap-1"><Phone size={14} /> {ngo.phone}</span>
                <span className="flex items-center gap-1"><Clock size={14} /> {ngo.availability}</span>
              </div>
              <div className="flex gap-2 mt-auto pt-4 border-t border-[#f0e6e4]">
                <button className="flex-1 bg-[#000666] text-white py-2 rounded-lg text-sm font-bold hover:bg-[#00044d] transition-colors">Refer Victim</button>
                <button className="flex-1 bg-[#fff8f6] border border-[#000666] text-[#000666] py-2 rounded-lg text-sm font-bold hover:bg-[#f0e6ff] transition-colors">View Profile</button>
              </div>
            </div>
          ))}
          {filteredNGOs.length === 0 && (
            <div className="col-span-full py-8 text-center text-[#857371]">No NGOs found matching your filters.</div>
          )}
        </div>
      </div>

      {/* SECTION 4: Government Scheme Eligibility Checker */}
      <div className="bg-gradient-to-br from-[#000666] to-[#000333] p-1 rounded-2xl shadow-lg">
        <div className="bg-white p-6 rounded-xl h-full flex flex-col">
          <h2 className="text-2xl font-bold text-[#000666] mb-1 flex items-center gap-2">
            <Zap size={24} className="text-[#944b00]" /> Instant Scheme Eligibility Check
          </h2>
          <p className="text-[#534341] mb-6">Find all government schemes the victim qualifies for</p>
          
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <label className="block text-xs font-bold text-[#857371] uppercase mb-1">Victim Category</label>
              <select className="w-full p-2.5 rounded-lg border border-[#f0e6e4] bg-[#fff8f6] outline-none focus:border-[#000666] text-sm">
                <option>SC/ST</option><option>Woman</option><option>Child</option><option>Disabled</option><option>Minority</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-xs font-bold text-[#857371] uppercase mb-1">Income Group</label>
              <select className="w-full p-2.5 rounded-lg border border-[#f0e6e4] bg-[#fff8f6] outline-none focus:border-[#000666] text-sm">
                <option>BPL</option><option>APL</option><option>NA</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-xs font-bold text-[#857371] uppercase mb-1">State</label>
              <select className="w-full p-2.5 rounded-lg border border-[#f0e6e4] bg-[#fff8f6] outline-none focus:border-[#000666] text-sm">
                <option>Uttar Pradesh</option><option>Madhya Pradesh</option><option>Maharashtra</option><option>Delhi</option>
              </select>
            </div>
            <div className="flex items-end">
              <button onClick={checkSchemes} className="w-full md:w-auto px-6 py-2.5 bg-[#944b00] hover:bg-[#733a00] text-white rounded-lg font-bold text-sm transition-colors h-[42px] flex items-center justify-center min-w-[160px]">
                {schemeLoading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : 'CHECK ELIGIBILITY'}
              </button>
            </div>
          </div>

          {showSchemes && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {SCHEMES.map((scheme, i) => (
                <div key={i} className="border border-green-200 bg-green-50 rounded-xl p-4 flex flex-col gap-2">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-[#000666] text-sm">{scheme.name}</h3>
                    <span className="text-[10px] font-bold bg-[#000666] text-white px-2 py-0.5 rounded-sm">{scheme.ministry}</span>
                  </div>
                  <p className="text-sm font-semibold text-green-700">{scheme.benefit}</p>
                  <button className="mt-2 text-xs font-bold text-[#000666] hover:underline text-left">How to apply &rarr;</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* SECTION 5: Live Activity Feed */}
      <div className="bg-[#00044d] p-6 rounded-2xl shadow-xl text-white">
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Activity size={20} className="text-[#ffb4a9]" /> Live Inter-Agency Activity
        </h2>
        <div className="h-[120px] overflow-hidden relative">
          <div className="flex flex-col gap-2 absolute bottom-0 left-0 right-0 w-full justify-end">
            {feed.map((msg, i) => (
              <div key={msg + i} className="text-sm font-mono text-white/80 animate-in slide-in-from-bottom-2 fade-in duration-300">
                {msg}
              </div>
            ))}
          </div>
        </div>
      </div>
      
    </div>
  );
}
