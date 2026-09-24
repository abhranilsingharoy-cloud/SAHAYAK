"use client";

import React from 'react';
import Link from 'next/link';
import { 
  Shield, Activity, MapPin, Brain, Phone, ArrowRight,
  Microscope, Bell, ShieldCheck, HeartPulse
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#fff8f6] font-sans selection:bg-[#000666] selection:text-white flex flex-col">
      
      {/* NAVBAR */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-[#f0e6e4] transition-all">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00044d] to-[#000666] flex items-center justify-center shadow-md">
              <Shield size={22} className="text-[#ffead6]" />
            </div>
            <span className="font-black text-2xl tracking-tight text-[#000666]">SAHAYAK-AI</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 font-semibold text-[#534341]">
            <a href="#platform" className="hover:text-[#ba1a1a] transition-colors">Platform</a>
            <a href="#modules" className="hover:text-[#ba1a1a] transition-colors">Modules</a>
            <a href="#impact" className="hover:text-[#ba1a1a] transition-colors">Impact</a>
          </nav>
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

      {/* HERO SECTION */}
      <section className="relative pt-40 pb-20 overflow-hidden flex-1 flex flex-col items-center justify-center">
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
            <a 
              href="#platform" 
              className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-lg bg-white text-[#000666] border-2 border-[#000666]/10 hover:border-[#000666]/30 transition-all flex items-center justify-center"
            >
              Explore Architecture
            </a>
          </div>
        </div>
      </section>

      {/* PLATFORM FEATURES (Like KisanSeva Features) */}
      <section id="platform" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-[#000666] mb-4 tracking-tight">Engineered for Rapid Response</h2>
            <p className="text-[#534341] font-medium text-lg">Deep-learning modules purpose-built for high-stress emergency triage.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-8 rounded-3xl bg-[#fff8f6] border border-[#f0e6e4] hover:shadow-xl transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Microscope size={28} />
              </div>
              <h3 className="text-xl font-bold text-[#000666] mb-3">Acoustic Biomarkers</h3>
              <p className="text-[#534341] text-sm leading-relaxed mb-4">
                Analyzes voice tremors and speech rate in real-time to detect fear and stress levels before the caller even explains the situation.
              </p>
              <div className="flex gap-2">
                <span className="text-[10px] font-bold px-2 py-1 bg-white rounded-md border border-[#f0e6e4] text-[#857371]">RNNoise</span>
                <span className="text-[10px] font-bold px-2 py-1 bg-white rounded-md border border-[#f0e6e4] text-[#857371]">Sub-second</span>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-[#fff8f6] border border-[#f0e6e4] hover:shadow-xl transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-[#ffead6] text-[#944b00] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Brain size={28} />
              </div>
              <h3 className="text-xl font-bold text-[#000666] mb-3">Contextual NLP</h3>
              <p className="text-[#534341] text-sm leading-relaxed mb-4">
                Transcribes dialects (like Bundelkhandi) via Whisper Large-v3 and cross-references keywords with the PoA Act database.
              </p>
              <div className="flex gap-2">
                <span className="text-[10px] font-bold px-2 py-1 bg-white rounded-md border border-[#f0e6e4] text-[#857371]">Whisper V3</span>
                <span className="text-[10px] font-bold px-2 py-1 bg-white rounded-md border border-[#f0e6e4] text-[#857371]">Indic NER</span>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-[#fff8f6] border border-[#f0e6e4] hover:shadow-xl transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-[#e0e5ff] text-[#000666] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <MapPin size={28} />
              </div>
              <h3 className="text-xl font-bold text-[#000666] mb-3">Predictive Hotspots</h3>
              <p className="text-[#534341] text-sm leading-relaxed mb-4">
                Spatiotemporal mapping of incident density. Predicts future volatility zones up to 30 days in advance to pre-deploy resources.
              </p>
              <div className="flex gap-2">
                <span className="text-[10px] font-bold px-2 py-1 bg-white rounded-md border border-[#f0e6e4] text-[#857371]">GeoJSON</span>
                <span className="text-[10px] font-bold px-2 py-1 bg-white rounded-md border border-[#f0e6e4] text-[#857371]">Forecast AI</span>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-[#fff8f6] border border-[#f0e6e4] hover:shadow-xl transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-[#d3f4e6] text-[#0d7a46] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Bell size={28} />
              </div>
              <h3 className="text-xl font-bold text-[#000666] mb-3">Zero-Touch Dispatch</h3>
              <p className="text-[#534341] text-sm leading-relaxed mb-4">
                Automatically alerts PCR units, hospitals, and legal aid (NALSA) based on the computed SVI (Severity Vulnerability Index).
              </p>
              <div className="flex gap-2">
                <span className="text-[10px] font-bold px-2 py-1 bg-white rounded-md border border-[#f0e6e4] text-[#857371]">Automated</span>
                <span className="text-[10px] font-bold px-2 py-1 bg-white rounded-md border border-[#f0e6e4] text-[#857371]">Multi-Agency</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IMPACT METRICS */}
      <section id="impact" className="py-20 bg-[#000666] text-white">
        <div className="max-w-7xl mx-auto px-6">
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
      </section>

      {/* MODULES GRID (Like "What Do You Need?") */}
      <section id="modules" className="py-24 bg-[#fff8f6]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#857371]" />
            <h2 className="text-2xl font-bold text-[#000666] tracking-widest uppercase">Platform Modules</h2>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#857371]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <Link href="/dashboard" className="group bg-white p-8 rounded-3xl border border-[#f0e6e4] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col h-full">
              <div className="w-12 h-12 rounded-xl bg-[#e0e5ff] text-[#000666] flex items-center justify-center mb-6">
                <Activity size={24} />
              </div>
              <h3 className="text-2xl font-black text-[#000666] mb-3 group-hover:text-[#ba1a1a] transition-colors">Crisis Console</h3>
              <p className="text-[#534341] font-medium leading-relaxed mb-6 flex-1">
                The central nervous system for operators. View live intercepted calls, SVI scores, and dispatch units instantly.
              </p>
              <div className="flex items-center text-[#ba1a1a] font-bold text-sm">
                Access Module <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link href="/sanctuary" className="group bg-white p-8 rounded-3xl border border-[#f0e6e4] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col h-full">
              <div className="w-12 h-12 rounded-xl bg-[#ffead6] text-[#944b00] flex items-center justify-center mb-6">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-2xl font-black text-[#000666] mb-3 group-hover:text-[#ba1a1a] transition-colors">Victim Sanctuary</h3>
              <p className="text-[#534341] font-medium leading-relaxed mb-6 flex-1">
                A secure citizen hub for recording audio e-FIRs, tracking legal aid, and chatting with the SAATHI legal bot.
              </p>
              <div className="flex items-center text-[#ba1a1a] font-bold text-sm">
                Access Module <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link href="/hotspots" className="group bg-white p-8 rounded-3xl border border-[#f0e6e4] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col h-full">
              <div className="w-12 h-12 rounded-xl bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center mb-6">
                <MapPin size={24} />
              </div>
              <h3 className="text-2xl font-black text-[#000666] mb-3 group-hover:text-[#ba1a1a] transition-colors">KAVACH Hotspots</h3>
              <p className="text-[#534341] font-medium leading-relaxed mb-6 flex-1">
                Geospatial AI visualization mapping out high-risk zones across districts with a 30-day forecast slider.
              </p>
              <div className="flex items-center text-[#ba1a1a] font-bold text-sm">
                Access Module <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

          </div>
        </div>
      </section>

    </div>
  );
}
