"use client";

import React from 'react';
import Link from 'next/link';
import { 
  Shield, Activity, MapPin, Brain, Phone, ArrowRight,
  Microscope, Bell, ShieldCheck, HeartPulse
} from 'lucide-react';
import FullPageScroller from './components/ui/FullPageScroller';

export default function LandingPage() {
  return (
    <div className="font-sans selection:bg-[#000666] selection:text-white">
      
      {/* NAVBAR */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-[#f0e6e4] transition-all">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00044d] to-[#000666] flex items-center justify-center shadow-md">
              <Shield size={22} className="text-[#ffead6]" />
            </div>
            <span className="font-black text-2xl tracking-tight text-[#000666]">SAHAYAK-AI</span>
          </div>
          <div className="flex items-center gap-4">
            <Link 
              href="/dashboard" 
              className="px-6 py-2.5 rounded-full font-bold bg-[#ba1a1a] text-white hover:bg-[#93000a] transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              System Login
            </Link>
          </div>
        </div>
      </header>

      <FullPageScroller>
        {/* PANEL 0: HERO */}
        <div className="w-full h-full bg-[#fff8f6] relative flex flex-col items-center justify-center pt-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#ffead6] rounded-full blur-[120px] opacity-50 pointer-events-none" />
          
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#ba1a1a]/20 text-[#ba1a1a] font-bold text-xs uppercase tracking-widest mb-8 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#ba1a1a] animate-pulse" />
              Live National Helpline Integration
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-[#000666] leading-[1.1] tracking-tight mb-6">
              Intelligent Crisis <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ba1a1a] to-[#944b00]">
                Intercept & Response
              </span>
            </h1>
            <p className="text-lg md:text-xl text-[#534341] max-w-2xl mx-auto font-medium leading-relaxed mb-10">
              Real-time trauma assessment, automated vulnerability indexing, and autonomous zero-touch dispatch for the National Helpline Against Atrocities (14566).
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="/dashboard" 
                className="w-full sm:w-auto px-8 py-4 rounded-full font-black text-lg bg-[#000666] text-white hover:bg-[#00044d] transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                Access Dashboard <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>

        {/* PANEL 1: PLATFORM ARCHITECTURE */}
        <div className="w-full h-full bg-white flex flex-col justify-center pt-20 pb-4">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-5xl font-black text-[#000666] mb-4 tracking-tight">Engineered for Rapid Response</h2>
              <p className="text-[#534341] font-medium text-lg">Deep-learning modules purpose-built for high-stress emergency triage.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-3xl bg-[#fff8f6] border border-[#f0e6e4] hover:shadow-xl transition-all group">
                <div className="w-14 h-14 rounded-2xl bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Microscope size={28} />
                </div>
                <h3 className="text-lg font-bold text-[#000666] mb-2">Acoustic Biomarkers</h3>
                <p className="text-[#534341] text-xs leading-relaxed mb-4">
                  Analyzes voice tremors and speech rate in real-time to detect fear and stress levels before the caller even explains the situation.
                </p>
                <div className="flex gap-2">
                  <span className="text-[9px] font-bold px-2 py-1 bg-white rounded-md border border-[#f0e6e4] text-[#857371] uppercase">RNNoise</span>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-[#fff8f6] border border-[#f0e6e4] hover:shadow-xl transition-all group">
                <div className="w-14 h-14 rounded-2xl bg-[#ffead6] text-[#944b00] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Brain size={28} />
                </div>
                <h3 className="text-lg font-bold text-[#000666] mb-2">Contextual NLP</h3>
                <p className="text-[#534341] text-xs leading-relaxed mb-4">
                  Transcribes dialects (like Bundelkhandi) via Whisper Large-v3 and cross-references keywords with the PoA Act database.
                </p>
                <div className="flex gap-2">
                  <span className="text-[9px] font-bold px-2 py-1 bg-white rounded-md border border-[#f0e6e4] text-[#857371] uppercase">Whisper V3</span>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-[#fff8f6] border border-[#f0e6e4] hover:shadow-xl transition-all group">
                <div className="w-14 h-14 rounded-2xl bg-[#e0e5ff] text-[#000666] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <MapPin size={28} />
                </div>
                <h3 className="text-lg font-bold text-[#000666] mb-2">Predictive Hotspots</h3>
                <p className="text-[#534341] text-xs leading-relaxed mb-4">
                  Spatiotemporal mapping of incident density. Predicts future volatility zones up to 30 days in advance to pre-deploy resources.
                </p>
                <div className="flex gap-2">
                  <span className="text-[9px] font-bold px-2 py-1 bg-white rounded-md border border-[#f0e6e4] text-[#857371] uppercase">Forecast AI</span>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-[#fff8f6] border border-[#f0e6e4] hover:shadow-xl transition-all group">
                <div className="w-14 h-14 rounded-2xl bg-[#d3f4e6] text-[#0d7a46] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Bell size={28} />
                </div>
                <h3 className="text-lg font-bold text-[#000666] mb-2">Zero-Touch Dispatch</h3>
                <p className="text-[#534341] text-xs leading-relaxed mb-4">
                  Automatically alerts PCR units, hospitals, and legal aid (NALSA) based on the computed SVI (Severity Vulnerability Index).
                </p>
                <div className="flex gap-2">
                  <span className="text-[9px] font-bold px-2 py-1 bg-white rounded-md border border-[#f0e6e4] text-[#857371] uppercase">Automated</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PANEL 2: IMPACT METRICS */}
        <div className="w-full h-full bg-[#000666] flex flex-col justify-center pt-20 pb-4">
          <div className="max-w-7xl mx-auto px-6 w-full text-white">
            <div className="text-center mb-16">
               <span className="text-xs font-bold text-[#ffead6] uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full border border-white/20">MEASURABLE RESULTS</span>
               <h3 className="text-3xl sm:text-4xl font-black text-white mt-4">Immediate Intercepts</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl md:text-5xl font-black mb-2 text-[#ffead6]">420ms</div>
                <div className="text-sm font-bold text-white/70 uppercase tracking-widest">Triage Latency</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-black mb-2 text-[#ffead6]">94.3%</div>
                <div className="text-sm font-bold text-white/70 uppercase tracking-widest">ASR Accuracy</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-black mb-2 text-[#ffead6]">24/7</div>
                <div className="text-sm font-bold text-white/70 uppercase tracking-widest">Active Monitoring</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-black mb-2 text-[#ffead6]">&gt;85%</div>
                <div className="text-sm font-bold text-white/70 uppercase tracking-widest">SVI Precision</div>
              </div>
            </div>
          </div>
        </div>

        {/* PANEL 3: MODULES GRID */}
        <div className="w-full h-full bg-[#fff8f6] flex flex-col justify-center pt-20 pb-4">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="flex items-center justify-center gap-4 mb-12">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#857371]" />
              <h2 className="text-xl sm:text-2xl font-bold text-[#000666] tracking-widest uppercase">Explore Platform Modules</h2>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#857371]" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              
              <Link href="/dashboard" className="group bg-white p-6 rounded-3xl border border-[#f0e6e4] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col h-full">
                <div className="w-12 h-12 rounded-xl bg-[#e0e5ff] text-[#000666] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Activity size={24} />
                </div>
                <h3 className="text-xl font-black text-[#000666] mb-3 group-hover:text-[#ba1a1a] transition-colors">Crisis Console</h3>
                <p className="text-[#534341] text-sm font-medium leading-relaxed mb-6 flex-1">
                  The central nervous system for operators. View live intercepted calls, SVI scores, and dispatch units instantly.
                </p>
                <div className="flex items-center text-[#ba1a1a] font-bold text-xs uppercase tracking-wide">
                  Access Module <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link href="/sanctuary" className="group bg-white p-6 rounded-3xl border border-[#f0e6e4] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col h-full">
                <div className="w-12 h-12 rounded-xl bg-[#ffead6] text-[#944b00] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <ShieldCheck size={24} />
                </div>
                <h3 className="text-xl font-black text-[#000666] mb-3 group-hover:text-[#ba1a1a] transition-colors">Victim Sanctuary</h3>
                <p className="text-[#534341] text-sm font-medium leading-relaxed mb-6 flex-1">
                  A secure citizen hub for recording audio e-FIRs, tracking legal aid, and chatting with the SAATHI legal bot.
                </p>
                <div className="flex items-center text-[#ba1a1a] font-bold text-xs uppercase tracking-wide">
                  Access Module <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link href="/hotspots" className="group bg-white p-6 rounded-3xl border border-[#f0e6e4] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col h-full">
                <div className="w-12 h-12 rounded-xl bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <MapPin size={24} />
                </div>
                <h3 className="text-xl font-black text-[#000666] mb-3 group-hover:text-[#ba1a1a] transition-colors">KAVACH Hotspots</h3>
                <p className="text-[#534341] text-sm font-medium leading-relaxed mb-6 flex-1">
                  Geospatial AI visualization mapping out high-risk zones across districts with a 30-day forecast slider.
                </p>
                <div className="flex items-center text-[#ba1a1a] font-bold text-xs uppercase tracking-wide">
                  Access Module <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

            </div>
          </div>
        </div>
      </FullPageScroller>

    </div>
  );
}
