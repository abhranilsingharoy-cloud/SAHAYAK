'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { 
  Shield, AlertTriangle, Clock, MapPin, FileX, 
  PhoneIncoming, Mic, Activity, Zap, ArrowRight, Menu, X, ArrowUpRight
} from 'lucide-react';

// === SECTION 1: NAVBAR ===
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'py-4' : 'py-6'}`}
      >
        <div className={`mx-auto flex items-center justify-between transition-all duration-500 ${
          scrolled 
            ? 'max-w-7xl bg-[#0b0614]/80 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.6)] rounded-full px-6 py-3' 
            : 'max-w-7xl px-6 py-2'
        }`}>
          <Link href="/" className="flex items-center gap-3 z-50 group">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 group-hover:border-[#ba1a1a]/50 transition-colors">
              <Shield className="text-[#ba1a1a] w-5 h-5 drop-shadow-[0_0_8px_rgba(186,26,26,0.6)]" />
            </div>
            <span className="font-black text-xl md:text-2xl tracking-tighter text-white drop-shadow-md">
              SAHAYAK<span className="text-[#ba1a1a]">-AI</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {['Home', 'Platform', 'Suraksha Path', 'How It Works', 'Crisis Console'].map((item) => (
              <Link 
                key={item} 
                href={`#${item.toLowerCase().replace(/ /g, '-')}`} 
                className="relative text-sm font-semibold text-white/60 hover:text-white transition-all duration-300 group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-[#ba1a1a] to-transparent group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <Link href="tel:14566" className="relative bg-gradient-to-r from-[#ba1a1a] to-[#900f0f] text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all hover:scale-105 shadow-[0_0_15px_rgba(186,26,26,0.4)] hover:shadow-[0_0_25px_rgba(186,26,26,0.7)] flex items-center gap-2 overflow-hidden group">
              <span className="absolute inset-0 w-full h-full bg-white/20 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></span>
              <PhoneIncoming className="w-4 h-4 animate-pulse" /> 14566
            </Link>
            <Link href="/dashboard" className="bg-white/5 border border-white/10 hover:bg-white hover:text-[#050505] text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]">
              Access Dashboard
            </Link>
          </div>

          <button className="lg:hidden text-white z-50 p-2 bg-white/5 border border-white/10 rounded-full" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#050505] z-40 flex flex-col items-center justify-center gap-8"
          >
            {['Home', 'Platform', 'Suraksha Path', 'How It Works', 'Crisis Console'].map((item) => (
              <Link 
                key={item} 
                href={`#${item.toLowerCase().replace(/ /g, '-')}`} 
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-bold text-white hover:text-[#ba1a1a] transition-colors"
              >
                {item}
              </Link>
            ))}
            <Link href="tel:14566" className="bg-[#ba1a1a] text-white px-8 py-4 rounded-full text-lg font-bold w-64 text-center mt-4">
              Call 14566
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// === SECTION 2: HERO ===
function Hero() {
  return (
    <section id="home" className="relative min-h-screen bg-[#050505] flex flex-col items-center justify-end pb-0 overflow-hidden pt-32">
      {/* Background Layers - Aurora Glow */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-[20%] left-[10%] w-[60vw] h-[60vw] bg-[#ba1a1a]/20 blur-[140px] rounded-full mix-blend-screen"
        />
        <motion.div 
          animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="absolute top-[20%] right-[10%] w-[50vw] h-[50vw] bg-[#000666]/40 blur-[140px] rounded-full mix-blend-screen"
        />
        <div className="absolute inset-0 bg-[#050505]/60 backdrop-blur-[1px]" />
        <div className="absolute inset-0 z-10 opacity-20 pointer-events-none" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-20 flex flex-col items-center">
        
        {/* Content - 2 Column Layout with India Map on Right */}
        <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-12 mt-10">
          
          {/* Left Column - Text Content */}
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left z-30">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 bg-white/5 border border-white/10 backdrop-blur-md px-5 py-2 rounded-full w-fit mb-8 shadow-xl"
            >
              <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]" />
              <span className="text-xs font-bold text-white tracking-widest uppercase">MINISTRY OF SOCIAL JUSTICE INITIATIVE</span>
            </motion.div>

            <div className="overflow-hidden mb-6 pb-2">
              <motion.h1 
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="text-[4rem] sm:text-[5rem] md:text-[6rem] lg:text-[6.5rem] xl:text-[7.5rem] font-black tracking-tighter leading-[0.9] text-white font-sans"
              >
                Intercept Crisis.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-[#ba1a1a]">
                  Protect Rights.
                </span>
              </motion.h1>
            </div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-lg md:text-xl text-white/70 max-w-2xl font-light leading-relaxed mb-10"
            >
              AI-powered trauma triage for India's National Helpline Against Atrocities — 14566. 
              Reacting in milliseconds, so you don't have to wait for help.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-center gap-6"
            >
              <Link href="/dashboard" className="h-14 px-8 rounded-full bg-white text-[#050505] hover:bg-gray-200 font-black text-lg shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all duration-300 flex items-center group">
                Access Console
                <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link href="/suraksha" className="h-14 px-8 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 font-bold text-lg transition-all duration-300 flex items-center gap-3 backdrop-blur-md">
                Explore Suraksha Path
              </Link>
            </motion.div>
          </div>

          {/* Right Column - Glowing India Map */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex-1 hidden lg:flex justify-center items-center relative h-[500px] w-full"
            style={{ perspective: "1000px" }}
          >
            <div className="absolute inset-0 bg-[#000666]/30 blur-[100px] rounded-full mix-blend-screen" />
            
            <motion.div 
              animate={{ rotateY: [0, 5, 0], rotateX: [5, 10, 5] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-full h-full flex items-center justify-center"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <img 
                src="/mapBg.png" 
                alt="India Network Map" 
                className="w-full h-full object-contain grayscale opacity-60 mix-blend-screen contrast-150"
                style={{ filter: 'drop-shadow(0 0 20px rgba(0,6,102,0.8))' }}
              />

              {/* Realistic Data Nodes Cluster */}
              {[
                { top: '38%', left: '44%', color: '#ba1a1a', label: 'UP-94', alert: true },
                { top: '56%', left: '38%', color: '#2dd4bf', label: 'MH-12' },
                { top: '48%', left: '54%', color: '#f59e0b', label: 'WB-45', alert: true },
                { top: '65%', left: '42%', color: '#2dd4bf' },
                { top: '46%', left: '48%', color: '#2dd4bf' },
                { top: '32%', left: '41%', color: '#f59e0b' },
                { top: '75%', left: '45%', color: '#2dd4bf' },
              ].map((node, i) => (
                <div key={i} className="absolute flex flex-col items-center justify-center" style={{ top: node.top, left: node.left }}>
                  <div className="relative flex items-center justify-center">
                    {node.alert && (
                      <div className="w-6 h-6 absolute rounded-full animate-ping opacity-75" style={{ backgroundColor: node.color }} />
                    )}
                    <div className="w-2.5 h-2.5 rounded-full relative z-10" style={{ backgroundColor: node.color, boxShadow: `0 0 12px ${node.color}` }} />
                  </div>
                  {node.label && (
                    <div className="absolute top-4 left-3 bg-[#050505]/80 backdrop-blur-md border border-white/10 text-[9px] font-mono font-bold text-white px-2 py-0.5 rounded shadow-xl tracking-widest z-20">
                      {node.label}
                    </div>
                  )}
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Dashboard Preview Dock (Properly nested inside max-w-7xl) */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, type: 'spring', bounce: 0.3 }}
          className="mt-12 lg:mt-16 w-full max-w-5xl bg-gradient-to-b from-white/10 to-transparent border-t border-x border-white/20 rounded-t-[2.5rem] p-8 pb-12 relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-8 backdrop-blur-2xl"
        >
           <div className="absolute inset-0 bg-[#000666]/20 mix-blend-overlay" />
           <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left">
              <div className="text-xs text-white/50 uppercase font-black tracking-widest mb-2 flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#2dd4bf]" /> Live Telemetry
              </div>
              <div className="text-4xl text-white font-black tracking-tighter">14,281</div>
              <div className="text-sm font-bold text-[#2dd4bf]">Active Nodes Connected</div>
           </div>
           
           <div className="hidden md:block w-[1px] h-16 bg-white/10"></div>
           
           <div className="relative z-10 flex flex-col items-center text-center">
              <div className="text-xs text-white/50 uppercase font-black tracking-widest mb-2 flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#ba1a1a]" /> Response Time
              </div>
              <div className="text-4xl text-white font-black tracking-tighter">420<span className="text-2xl text-white/50">ms</span></div>
              <div className="text-sm font-bold text-[#ba1a1a]">AI Intercept Speed</div>
           </div>

           <div className="hidden md:block w-[1px] h-16 bg-white/10"></div>

           <div className="relative z-10 flex flex-col items-center md:items-end text-center md:text-right">
              <div className="text-xs text-white/50 uppercase font-black tracking-widest mb-2 flex items-center gap-2 justify-center md:justify-end">
                <Shield className="w-4 h-4 text-amber-500" /> Threat Zones
              </div>
              <div className="text-4xl text-white font-black tracking-tighter">3 <span className="text-2xl text-white/50">Avoided</span></div>
              <div className="text-sm font-bold text-amber-500">KAVACH Engine Online</div>
           </div>
        </motion.div>
      </div>
    </section>
  );
}

// === SECTION 3: PROBLEM SECTION ===
function ProblemSection() {
  const problems = [
    { icon: <AlertTriangle className="w-8 h-8 text-[#ba1a1a]" />, stat: "145,000+ Cases/Year", desc: "SC/ST atrocity cases go unreported due to fear and systemic barriers" },
    { icon: <Clock className="w-8 h-8 text-amber-500" />, stat: "22 Min Avg Response", desc: "Victims wait 22 minutes on average before any crisis response is initiated" },
    { icon: <MapPin className="w-8 h-8 text-[#2dd4bf]" />, stat: "28 States Affected", desc: "Atrocity incidents span every corner of India, concentrated in 8 critical states" },
    { icon: <FileX className="w-8 h-8 text-orange-500" />, stat: "67% FIRs Rejected", desc: "Over two-thirds of atrocity FIR attempts are denied at police stations" }
  ];

  return (
    <section className="min-h-screen bg-[#0a0f1e] py-32 relative flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6">The Reality of Atrocities in India</h2>
          <p className="text-xl text-white/60 max-w-2xl">Why every second matters when vulnerability meets violence.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {problems.map((p, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-10 hover:-translate-y-2 transition-transform duration-300 group"
            >
              <div className="mb-6 p-4 rounded-xl bg-white/5 w-fit group-hover:scale-110 transition-transform">
                {p.icon}
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">{p.stat}</h3>
              <p className="text-lg text-white/70 leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// === SECTION 4: HOW IT WORKS ===
function HowItWorksSection() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-65%']);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const steps = [
    { num: '01', icon: <PhoneIncoming />, title: 'Call Intercepted', desc: 'Caller dials 14566. SAHAYAK-AI instantly joins the call and begins biomarker analysis.' },
    { num: '02', icon: <Mic />, title: 'Biomarker Scan', desc: 'Voice stress, dialect mapping, and cry detection processed in under 500ms using Whisper v3.' },
    { num: '03', icon: <Activity />, title: 'SVI Computed', desc: 'Severity Vulnerability Index (0-100) calculated from 12 real-time signals including location risk and time patterns.' },
    { num: '04', icon: <Zap />, title: 'Zero-Touch Dispatch', desc: 'If SVI > 90, Police, NALSA, and Ambulance are autonomously alerted. No operator needed.' }
  ];

  return (
    <section ref={targetRef} className="h-[300vh] bg-[#050505] relative" id="how-it-works">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        
        <motion.div style={{ opacity }} className="absolute left-6 md:left-24 top-1/3 z-20 pointer-events-none">
          <p className="text-[#ba1a1a] font-mono text-sm tracking-widest mb-4">SYSTEM_PROCESS</p>
          <h2 className="text-6xl md:text-8xl font-bold text-white leading-tight mb-8">How<br/>SAHAYAK<br/>Works</h2>
          <div className="flex items-center gap-4 text-white/50">
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center animate-bounce">
              <ArrowRight className="w-4 h-4 rotate-90" />
            </div>
            <span className="text-sm font-medium uppercase tracking-widest">Scroll Down</span>
          </div>
        </motion.div>

        <motion.div style={{ x }} className="flex gap-8 pl-[100vw] md:pl-[50vw] pr-[20vw]">
          {steps.map((step, i) => (
            <div key={i} className="w-[340px] md:w-[380px] h-[500px] shrink-0 bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-10 relative overflow-hidden flex flex-col">
              <div className="absolute top-4 right-4 text-8xl font-black text-white/[0.03] select-none">{step.num}</div>
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#000666] to-[#ba1a1a] flex items-center justify-center text-white mb-auto shadow-xl">
                {step.icon}
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white mb-4">{step.title}</h3>
                <p className="text-white/60 text-lg leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// === SECTION 5: FEATURES BENTO GRID ===
function FeaturesBento() {
  const [bars, setBars] = useState<number[]>(Array(30).fill(10));
  
  useEffect(() => {
    const interval = setInterval(() => {
      setBars(prev => prev.map(() => 10 + Math.random() * 80));
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen bg-[#050505] py-32 flex flex-col justify-center relative">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mb-16 text-center"
        >
          <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6">Why SAHAYAK Wins</h2>
          <p className="text-xl text-white/60">Built for the modern crisis. Powered by the latest AI.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[200px] gap-6">
          {/* Cell 1 */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="md:col-span-2 md:row-span-2 bg-gradient-to-br from-[#000666] to-[#000444] rounded-3xl p-10 relative overflow-hidden flex flex-col justify-end group"
          >
            <div className="absolute top-10 left-10 right-10 h-32 flex items-end gap-1">
              {bars.map((h, i) => (
                <motion.div key={i} className="flex-1 bg-white/20 rounded-t-sm" animate={{ height: `${h}%` }} transition={{ duration: 0.15 }} />
              ))}
            </div>
            <h3 className="text-3xl font-bold text-white mb-2">Acoustic Biomarker AI</h3>
            <p className="text-white/70">Real-time voice stress analysis detects fear and urgency in milliseconds.</p>
          </motion.div>

          {/* Cell 2 */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="md:col-span-2 bg-white/5 border border-white/10 rounded-3xl p-8 flex items-center gap-6 overflow-hidden relative"
          >
            <div className="flex-1 z-10">
              <h3 className="text-2xl font-bold text-white mb-2">Suraksha Path Routing</h3>
              <p className="text-white/60 text-sm">Dynamic AI navigation avoiding historical threat zones.</p>
            </div>
            <div className="w-32 h-32 relative shrink-0">
              <div className="absolute inset-0 border-2 border-dashed border-[#2dd4bf]/30 rounded-full animate-spin-slow"></div>
              <div className="absolute inset-4 bg-[#2dd4bf]/10 rounded-full backdrop-blur-sm"></div>
            </div>
          </motion.div>

          {/* Cell 3 */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="md:col-span-1 bg-[#ba1a1a]/10 border border-[#ba1a1a]/30 rounded-3xl p-8 flex flex-col justify-center items-center text-center group hover:bg-[#ba1a1a] transition-colors"
          >
            <FileX className="w-12 h-12 text-[#ba1a1a] mb-4 group-hover:text-white transition-colors" />
            <h3 className="text-xl font-bold text-[#ba1a1a] group-hover:text-white transition-colors">Auto e-FIR</h3>
          </motion.div>

          {/* Cell 4 */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="md:col-span-1 bg-amber-500/10 border border-amber-500/30 rounded-3xl p-8 flex flex-col justify-center items-center text-center group hover:bg-amber-500 transition-colors"
          >
            <Zap className="w-12 h-12 text-amber-500 mb-4 group-hover:text-white transition-colors" />
            <h3 className="text-xl font-bold text-amber-500 group-hover:text-white transition-colors">Zero-Touch Dispatch</h3>
          </motion.div>

          {/* Cell 5 */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="md:col-span-2 bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col justify-center"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Multi-Agency Sync</h3>
            <div className="flex gap-4">
              {['NALSA', 'NCW', '112'].map(agency => (
                <div key={agency} className="px-6 py-3 bg-white/10 rounded-xl font-bold text-white/80">{agency}</div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// === SECTION 6: LIVE STATS ===
function Counter({ end, suffix = "", duration = 2 }: { end: number, suffix?: string, duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const inView = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    let startTime: number;
    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(updateCount);
    };
    
    const unsubscribe = inView.on("change", (v) => {
      if (v > 0.5 && count === 0) requestAnimationFrame(updateCount);
    });
    return () => unsubscribe();
  }, [end, duration, count, inView]);

  return <span ref={ref}>{count}{suffix}</span>;
}

function LiveStats() {
  return (
    <section className="min-h-screen bg-[#000222] py-32 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 w-full z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-24">
          <div className="text-center">
            <div className="text-5xl md:text-7xl font-black text-[#2dd4bf] mb-4"><Counter end={420} suffix="ms" /></div>
            <div className="text-white/60 font-bold tracking-widest uppercase">Triage Latency</div>
          </div>
          <div className="text-center">
            <div className="text-5xl md:text-7xl font-black text-[#ba1a1a] mb-4"><Counter end={94} suffix=".3%" /></div>
            <div className="text-white/60 font-bold tracking-widest uppercase">ASR Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-5xl md:text-7xl font-black text-white mb-4"><Counter end={28} /></div>
            <div className="text-white/60 font-bold tracking-widest uppercase">States Active</div>
          </div>
          <div className="text-center">
            <div className="text-5xl md:text-7xl font-black text-[#fbbf24] mb-4"><Counter end={14566} /></div>
            <div className="text-white/60 font-bold tracking-widest uppercase">Helpline</div>
          </div>
        </div>

        <div className="relative w-full max-w-2xl mx-auto h-[400px]">
          <svg className="w-full h-full" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <motion.path 
              d="M150 50 L200 20 L250 80 L350 150 L320 250 L200 380 L100 280 L50 180 Z" 
              stroke="white" 
              strokeWidth="2" 
              strokeOpacity="0.2"
              fill="rgba(0,6,102,0.2)"
            />
            {/* Pulsing Dots for Hotspots */}
            <circle cx="180" cy="120" r="4" fill="#ba1a1a" className="animate-ping" />
            <circle cx="180" cy="120" r="4" fill="#ba1a1a" />
            
            <circle cx="220" cy="180" r="6" fill="#ba1a1a" className="animate-ping" />
            <circle cx="220" cy="180" r="6" fill="#ba1a1a" />

            <circle cx="120" cy="220" r="5" fill="#ba1a1a" className="animate-ping" />
            <circle cx="120" cy="220" r="5" fill="#ba1a1a" />
          </svg>
        </div>
      </div>
    </section>
  );
}

// === SECTION 7: PLATFORM PILLARS ===
function PlatformPillars() {
  const pillars = [
    { emoji: '🚨', title: 'Crisis Console', desc: 'Live call intercept, SVI scoring, operator triage', link: '/dashboard' },
    { emoji: '🗺️', title: 'KAVACH Hotspots', desc: 'Predictive threat mapping with 30-day AI forecast', link: '/hotspots' },
    { emoji: '🛡️', title: 'Victim Sanctuary', desc: 'Secure e-FIR filing, SAATHI legal bot, case tracking', link: '/sanctuary' },
    { emoji: '🧭', title: 'Suraksha Path', desc: 'AI-safe route navigation avoiding threat zones', link: '/suraksha' },
    { emoji: '📊', title: 'SVI Telemetry', desc: 'Real-time NLP transcript analysis', link: '/telemetry' },
    { emoji: '📱', title: 'Mobile Panic', desc: 'Silent SOS, IVRS panic, WhatsApp integration', link: '/mobile' },
  ];

  return (
    <section id="platform" className="min-h-screen bg-[#070d1a] py-32 flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-16">What Does SAHAYAK Do?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((p, i) => (
            <Link key={i} href={p.link}>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:border-[#ba1a1a] transition-all group h-full flex flex-col"
              >
                <div className="text-4xl mb-6 bg-white/5 w-16 h-16 flex items-center justify-center rounded-2xl group-hover:scale-110 transition-transform">{p.emoji}</div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#ba1a1a] transition-colors">{p.title}</h3>
                <p className="text-white/60 mb-6 flex-1">{p.desc}</p>
                <div className="flex justify-end">
                  <ArrowRight className="text-white/40 group-hover:text-[#ba1a1a] group-hover:translate-x-2 transition-all" />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// === SECTION 8: TESTIMONIALS ===
function Testimonials() {
  const [active, setActive] = useState(0);
  const t = [
    { name: "Dr. Meena Gupta", role: "District Collector", quote: "SAHAYAK reduced our response time from 22 minutes to under 4 minutes. This technology saves lives." },
    { name: "Rajan Prasad", role: "PCR Inspector", quote: "The SVI score tells us instantly who needs the fastest response. We act before the operator even speaks." },
    { name: "Anjali Devi", role: "Survivor, Bundelkhand", quote: "The SAATHI bot helped me file my FIR from home. I never had to face the police station alone." }
  ];

  useEffect(() => {
    const timer = setInterval(() => setActive(p => (p + 1) % t.length), 4000);
    return () => clearInterval(timer);
  }, [t.length]);

  return (
    <section className="min-h-screen bg-[#050505] py-32 flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <h2 className="text-5xl font-bold text-white mb-20 text-center">Voices from the Field</h2>
        <div className="flex flex-col items-center">
          <AnimatePresence mode="wait">
            <motion.div 
              key={active}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-4xl text-center"
            >
              <div className="text-7xl text-[#ba1a1a] opacity-50 mb-6">"</div>
              <p className="text-3xl md:text-5xl text-white font-medium leading-tight mb-12">
                {t[active].quote}
              </p>
              <div>
                <div className="font-bold text-xl text-white">{t[active].name}</div>
                <div className="text-[#2dd4bf] uppercase tracking-widest text-sm mt-2">{t[active].role}</div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="flex gap-3 mt-16">
            {t.map((_, i) => (
              <button key={i} onClick={() => setActive(i)} className={`w-3 h-3 rounded-full transition-all ${i === active ? 'bg-[#ba1a1a] w-10' : 'bg-white/20'}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// === SECTION 9: CTA ===
function CTA() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-[#000666] via-[#000444] to-[#050505] flex flex-col justify-center relative overflow-hidden py-32">
      <div className="max-w-5xl mx-auto px-6 w-full text-center relative z-10">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-8 backdrop-blur-xl border border-white/20 shadow-[0_0_50px_rgba(255,255,255,0.1)]"
        >
          <Shield className="w-12 h-12 text-white" />
        </motion.div>
        <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-8">Confidence in Every Response</h2>
        <p className="text-xl md:text-2xl text-white/70 mb-16 max-w-3xl mx-auto">
          SAHAYAK-AI is committed to protecting every vulnerable citizen with the speed and precision of modern AI.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6 mb-24">
          <Link href="/dashboard" className="bg-[#ba1a1a] hover:bg-[#a01616] text-white px-10 py-5 rounded-full text-lg font-bold transition-all flex items-center justify-center gap-2">
            Access Crisis Console <ArrowRight />
          </Link>
          <Link href="/suraksha" className="border border-white/30 hover:bg-white/10 text-white px-10 py-5 rounded-full text-lg font-bold transition-all flex items-center justify-center gap-2">
            Explore Suraksha Path <ArrowRight />
          </Link>
        </div>

        <div className="flex flex-wrap justify-center gap-8 md:gap-12 opacity-50">
          {['Ministry DSJ&E', 'PoA Act Compliant', 'DPDP Privacy Safe', 'Whisper v3 ASR', 'ISO 27001'].map(badge => (
            <div key={badge} className="text-sm font-bold tracking-widest uppercase text-white flex items-center gap-2">
              <Shield className="w-4 h-4" /> {badge}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// === SECTION 10: FOOTER ===
function Footer() {
  return (
    <footer className="bg-[#030303] py-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-6">
              <Shield className="text-[#ba1a1a] w-8 h-8" />
              <span className="font-bold text-2xl tracking-tighter text-white">
                SAHAYAK<span className="text-[#ba1a1a]">-AI</span>
              </span>
            </Link>
            <p className="text-white/50 max-w-sm">National Helpline Against Atrocities. AI-powered trauma triage platform for India.</p>
          </div>
          
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold mb-2">Platform</h4>
            {['Home', 'Platform', 'Suraksha Path', 'How It Works', 'Crisis Console'].map(l => (
              <Link key={l} href="#" className="text-white/50 hover:text-white transition-colors">{l}</Link>
            ))}
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Emergency</h4>
            <div className="flex flex-col gap-4">
              <a href="tel:14566" className="text-3xl font-black text-[#ba1a1a] hover:text-[#a01616]">14566 <span className="text-sm text-white/50 font-normal">NHAA</span></a>
              <a href="tel:1091" className="text-xl font-bold text-white/80">1091 <span className="text-sm text-white/50 font-normal">Women Helpline</span></a>
              <a href="tel:112" className="text-xl font-bold text-white/80">112 <span className="text-sm text-white/50 font-normal">National Emergency</span></a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-white/40 text-sm">
          <p>© 2026 SAHAYAK-AI. National Helpline Against Atrocities. SIH 2026.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white">Privacy Policy</Link>
            <Link href="#" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function LandingPage() {
  return (
    <main className="bg-[#050505] min-h-screen text-white font-sans selection:bg-[#ba1a1a] selection:text-white">
      <Navbar />
      <Hero />
      <ProblemSection />
      <HowItWorksSection />
      <FeaturesBento />
      <LiveStats />
      <PlatformPillars />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
}
