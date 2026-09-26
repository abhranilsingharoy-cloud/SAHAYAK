"use client";

import FarmerTestimonials from "./components/home/FarmerTestimonials";
import AgriFAQ from "./components/home/AgriFAQ";
import AgriFooter from "./components/layout/AgriFooter";
import FullPageScroller from "./components/ui/FullPageScroller";
import { ScrollReveal, StaggerReveal, StaggerChild } from "./components/ui/ScrollReveal";
import Link from "next/link";
import { ArrowRight, Mic, MapPin, FileText, Zap, Shield } from "lucide-react";
import AgriMapVisualization from "./components/home/AgriMapVisualization";

export default function HomePage() {
  return (
    <FullPageScroller>
      {/* 1. HERO PANEL */}
      <div className="w-full h-full bg-[#00044d] text-white flex flex-col pt-24 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative w-full flex flex-col items-center justify-center flex-1 z-10 pb-16">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.08] mb-6">
            Protect the Vulnerable.<br/>
            <span className="text-[#ba1a1a]">Intercept Crisis.</span><br/>
            In Milliseconds.
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto font-normal leading-relaxed mb-9">
            NHAA 14566 Trauma Triage Platform
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="w-full sm:w-auto bg-[#ba1a1a] hover:bg-[#8a1212] text-white font-medium px-8 py-3.5 rounded-full shadow-sm hover:shadow-md transition-all text-base"
            >
              Access Live Dashboard
            </Link>
            <Link
              href="/suraksha"
              className="w-full sm:w-auto bg-transparent text-[#ffead6] font-medium px-8 py-3.5 rounded-full border border-[#ffead6] hover:bg-white/10 transition-all text-base shadow-sm"
            >
              Explore Suraksha Path
            </Link>
          </div>
        </div>
        {/* Live status bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#000666]/80 backdrop-blur-md border-t border-white/10 p-3 flex justify-center">
          <div className="flex items-center gap-4 text-sm font-semibold text-white/90">
            <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> 🟢 Secure Channel Active</span>
            <span className="opacity-50">|</span>
            <span>14 Calls in Queue</span>
            <span className="opacity-50">|</span>
            <span>SVI Avg: 67</span>
            <span className="opacity-50">|</span>
            <span className="text-[#ba1a1a]">3 Critical Cases</span>
          </div>
        </div>
      </div>

      {/* 2. PLATFORM ARCHITECTURE PANEL */}
      <div className="w-full h-full bg-[#fff8f6] flex flex-col justify-center pt-20 pb-4">
         <div className="max-w-7xl mx-auto px-4 w-full">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#000666]">Platform Architecture</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#f0e6e4] flex items-start gap-4">
                  <div className="p-4 bg-[#ffdad6] rounded-xl text-[#ba1a1a]"><Mic size={32} /></div>
                  <div>
                    <h3 className="text-xl font-bold text-[#000666] mb-2">Acoustic Biomarker AI</h3>
                    <p className="text-slate-600">Detects fear & vocal stress in 420ms. No words needed.</p>
                  </div>
               </div>
               <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#f0e6e4] flex items-start gap-4">
                  <div className="p-4 bg-[#000666]/10 rounded-xl text-[#000666]"><MapPin size={32} /></div>
                  <div>
                    <h3 className="text-xl font-bold text-[#000666] mb-2">Suraksha Path Routing</h3>
                    <p className="text-slate-600">AI routes victims away from KAVACH threat zones to safety.</p>
                  </div>
               </div>
               <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#f0e6e4] flex items-start gap-4">
                  <div className="p-4 bg-amber-100 rounded-xl text-amber-600"><FileText size={32} /></div>
                  <div>
                    <h3 className="text-xl font-bold text-[#000666] mb-2">Auto e-FIR Drafting</h3>
                    <p className="text-slate-600">Legally accurate FIRs under PoA Act generated in one click.</p>
                  </div>
               </div>
               <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#f0e6e4] flex items-start gap-4">
                  <div className="p-4 bg-green-100 rounded-xl text-green-600"><Zap size={32} /></div>
                  <div>
                    <h3 className="text-xl font-bold text-[#000666] mb-2">Zero-Touch Dispatch</h3>
                    <p className="text-slate-600">Autonomously alerts Police, NALSA & Ambulance when SVI &gt; 90.</p>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* 3. IMPACT METRICS PANEL */}
      <div className="w-full h-full bg-[#000666] flex flex-col justify-center text-white py-20">
         <div className="max-w-7xl mx-auto px-4 w-full">
            <h2 className="text-3xl font-bold text-center mb-16 text-[#ffead6]">System Performance</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
               <div>
                  <div className="text-5xl font-extrabold text-[#ba1a1a] mb-2">420ms</div>
                  <div className="text-white/70 font-semibold uppercase tracking-wide">Triage Latency</div>
               </div>
               <div>
                  <div className="text-5xl font-extrabold text-[#ba1a1a] mb-2">94.3%</div>
                  <div className="text-white/70 font-semibold uppercase tracking-wide">ASR Accuracy (Whisper v3)</div>
               </div>
               <div>
                  <div className="text-5xl font-extrabold text-[#ba1a1a] mb-2">28 States</div>
                  <div className="text-white/70 font-semibold uppercase tracking-wide">Coverage</div>
               </div>
               <div>
                  <div className="text-5xl font-extrabold text-[#ba1a1a] mb-2">89%</div>
                  <div className="text-white/70 font-semibold uppercase tracking-wide">FIR Auto-Draft Precision</div>
               </div>
            </div>
         </div>
      </div>

      {/* 4. PILLAR CARDS PANEL */}
      <div className="w-full h-full bg-[#fff8f6] flex flex-col justify-center pt-28 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <ScrollReveal preset="fade-down" className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-slate-300" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-wide text-center">
              What Does This Platform Do?
            </h2>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-slate-300" />
          </ScrollReveal>
          <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" delay={0.1}>
            <PillarCard
              title="Crisis Console"
              description="Live call intercept, SVI scoring, and operator triage interface"
              href="/dashboard"
              iconBg="bg-red-50 text-red-600 border border-red-100"
              hoverColor="group-hover:text-red-600"
              badgeColor="bg-red-50 text-red-700 border-red-100"
              emoji="🚨"
            />
            <PillarCard
              title="KAVACH Hotspots"
              description="Predictive geospatial threat mapping with 30-day AI forecast"
              href="/hotspots"
              iconBg="bg-orange-50 text-orange-600 border border-orange-100"
              hoverColor="group-hover:text-orange-600"
              badgeColor="bg-orange-50 text-orange-700 border-orange-100"
              emoji="🗺️"
            />
            <PillarCard
              title="Victim Sanctuary"
              description="Secure e-FIR filing, legal bot (SAATHI), and case tracking"
              href="/sanctuary"
              iconBg="bg-blue-50 text-blue-600 border border-blue-100"
              hoverColor="group-hover:text-blue-600"
              badgeColor="bg-blue-50 text-blue-700 border-blue-100"
              emoji="🛡️"
            />
            <PillarCard
              title="Suraksha Path"
              description="AI-powered safe route navigation away from threat zones"
              href="/suraksha"
              iconBg="bg-indigo-50 text-indigo-600 border border-indigo-100"
              hoverColor="group-hover:text-indigo-600"
              badgeColor="bg-indigo-50 text-indigo-700 border-indigo-100"
              emoji="🧭"
            />
            <PillarCard
              title="SVI Telemetry"
              description="Real-time NLP transcript analysis and vulnerability indexing"
              href="/telemetry"
              iconBg="bg-teal-50 text-teal-600 border border-teal-100"
              hoverColor="group-hover:text-teal-600"
              badgeColor="bg-teal-50 text-teal-700 border-teal-100"
              emoji="📊"
            />
            <PillarCard
              title="Mobile Panic"
              description="Silent SOS, IVRS panic system, and WhatsApp integration"
              href="/mobile"
              iconBg="bg-rose-50 text-rose-600 border border-rose-100"
              hoverColor="group-hover:text-rose-600"
              badgeColor="bg-rose-50 text-rose-700 border-rose-100"
              emoji="📱"
            />
          </StaggerReveal>
        </div>
      </div>

      {/* 5. HOW IT WORKS PANEL */}
      <div className="w-full h-full bg-white flex flex-col justify-center pt-28 pb-4">
         <div className="max-w-5xl mx-auto px-4 w-full">
            <h2 className="text-3xl font-bold text-center text-[#000666] mb-12">How It Works</h2>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 relative">
               <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-100 -z-10 hidden sm:block"></div>
               <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center shadow-sm relative">
                  <div className="w-12 h-12 bg-[#000666] text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4 border-4 border-white shadow-sm">1</div>
                  <h3 className="font-bold text-lg mb-2">Call Intercepted</h3>
                  <p className="text-slate-600 text-sm">Caller dials 14566. SAHAYAK-AI instantly joins the call.</p>
               </div>
               <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center shadow-sm relative">
                  <div className="w-12 h-12 bg-[#000666] text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4 border-4 border-white shadow-sm">2</div>
                  <h3 className="font-bold text-lg mb-2">Biomarker Analysis</h3>
                  <p className="text-slate-600 text-sm">Voice stress, dialect, and keywords processed in &lt;500ms.</p>
               </div>
               <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center shadow-sm relative">
                  <div className="w-12 h-12 bg-[#000666] text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4 border-4 border-white shadow-sm">3</div>
                  <h3 className="font-bold text-lg mb-2">SVI Computed</h3>
                  <p className="text-slate-600 text-sm">Severity Vulnerability Index scored 0-100 using 12 signals.</p>
               </div>
               <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center shadow-sm relative">
                  <div className="w-12 h-12 bg-[#ba1a1a] text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4 border-4 border-white shadow-sm">4</div>
                  <h3 className="font-bold text-lg mb-2">Zero-Touch Response</h3>
                  <p className="text-slate-600 text-sm">If SVI&gt;90, Police/NALSA/Hospital alerted autonomously.</p>
               </div>
            </div>
         </div>
      </div>

      {/* 6. SIH JUDGE PANEL (Bento Grid) */}
      <div className="w-full h-full bg-[#f9f0ee] flex flex-col justify-center py-20 relative overflow-hidden">
         {/* Decorative grid background */}
         <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #ba1a1a 1px, transparent 0)', backgroundSize: '40px 40px' }} />
         
         <div className="max-w-6xl mx-auto px-4 w-full relative z-10">
            <div className="text-center mb-12">
               <span className="inline-block px-4 py-1.5 bg-[#ba1a1a]/10 text-[#ba1a1a] rounded-full text-sm font-bold mb-4 uppercase tracking-wider">SIH 2026 Edge</span>
               <h2 className="text-4xl md:text-5xl font-extrabold text-[#000666]">Why SAHAYAK Wins</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[160px]">
               <div className="md:col-span-2 md:row-span-2 bg-gradient-to-br from-[#000666] to-[#00044d] rounded-3xl p-8 text-white flex flex-col justify-between shadow-lg relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-500"></div>
                  <div>
                     <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4"><Zap size={24} className="text-[#ffead6]" /></div>
                     <h3 className="text-2xl font-bold mb-2">Zero-Touch Dispatch</h3>
                     <p className="text-white/70">Real-time AI telemetry autonomously alerts emergency services in 420ms when critical stress is detected.</p>
                  </div>
                  <div className="flex gap-2 mt-4"><span className="px-3 py-1 bg-white/20 rounded-lg text-xs font-bold">14566 Integration</span></div>
               </div>
               
               <div className="md:col-span-2 bg-white rounded-3xl p-6 border border-[#f0e6e4] shadow-sm flex items-center gap-6 hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 bg-[#ba1a1a]/10 text-[#ba1a1a] rounded-xl flex items-center justify-center shrink-0"><FileText size={28} /></div>
                  <div>
                     <h3 className="text-lg font-bold text-[#000666]">PoA Act Compliant e-FIRs</h3>
                     <p className="text-slate-600 text-sm mt-1">Legally accurate incident reports generated via NLP.</p>
                  </div>
               </div>
               
               <div className="md:col-span-1 bg-white rounded-3xl p-6 border border-[#f0e6e4] shadow-sm flex flex-col justify-center items-center text-center hover:bg-[#ba1a1a] hover:text-white transition-colors group">
                  <Shield size={32} className="text-[#000666] mb-3 group-hover:text-white" />
                  <h3 className="font-bold text-[#000666] group-hover:text-white">DPDP Safe</h3>
                  <p className="text-xs text-slate-500 mt-2 group-hover:text-white/80">End-to-end encryption</p>
               </div>
               
               <div className="md:col-span-1 bg-white rounded-3xl p-6 border border-[#f0e6e4] shadow-sm flex flex-col justify-center items-center text-center hover:bg-amber-500 hover:text-white transition-colors group">
                  <MapPin size={32} className="text-amber-600 mb-3 group-hover:text-white" />
                  <h3 className="font-bold text-[#000666] group-hover:text-white">Predictive AI</h3>
                  <p className="text-xs text-slate-500 mt-2 group-hover:text-white/80">KAVACH Hotspots</p>
               </div>
            </div>
         </div>
      </div>

      {/* 7. MAP VISUALIZATION PANEL */}
      <div className="w-full h-full bg-white flex flex-col justify-center pt-28 pb-4 relative">
         <div className="text-center mb-4 shrink-0 z-10 relative">
           <h2 className="text-3xl font-bold text-[#000666]">KAVACH Hotspot Intelligence</h2>
           <p className="text-slate-600 mt-2">Real-time atrocity incident density across 28 Indian states.</p>
         </div>
         <div className="flex-1 min-h-0">
            <AgriMapVisualization />
         </div>
      </div>

      {/* 8. TESTIMONIALS PANEL */}
      <div className="w-full h-full bg-[#fff8f6] flex flex-col justify-center">
        <FarmerTestimonials />
      </div>

      {/* 9. FAQ PANEL */}
      <div className="w-full h-full bg-white flex flex-col justify-center">
        <AgriFAQ />
      </div>

      {/* 10. FOOTER PANEL */}
      <div className="w-full h-full bg-[#00044d] flex flex-col justify-end">
        <AgriFooter />
      </div>

    </FullPageScroller>
  );
}

// ─── Inline PillarCard ─────
function PillarCard({
  title, description, href, iconBg, hoverColor, badgeColor, emoji,
}: {
  title: string; description: string; href: string;
  iconBg: string; hoverColor: string; badgeColor: string; emoji: string;
}) {
  return (
    <StaggerChild preset="stagger-child-scale">
      <Link
        href={href}
        className={`group p-7 rounded-2xl bg-white border border-slate-200 shadow-sm hover:-translate-y-1.5 hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full`}
      >
        <div>
          <div className="flex items-center justify-between mb-5">
            <div className={`w-14 h-14 rounded-2xl ${iconBg} flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform duration-300`}>
              {emoji}
            </div>
            <div className="p-2 rounded-full bg-slate-50 border border-slate-100 text-slate-400">
              <ArrowRight className={`w-4 h-4 ${hoverColor} group-hover:translate-x-1 transition-transform duration-300`} />
            </div>
          </div>
          <h3 className={`text-xl font-bold text-slate-900 ${hoverColor} transition-colors duration-300`}>{title}</h3>
          <p className="text-sm text-slate-500 mt-2 leading-relaxed">{description}</p>
        </div>
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
          <span className={`px-2.5 py-1 rounded-full border ${badgeColor}`}>SAHAYAK Module</span>
          <span className="text-slate-400 group-hover:text-slate-600 flex items-center gap-1 transition-colors">
            Explore <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </Link>
    </StaggerChild>
  );
}
