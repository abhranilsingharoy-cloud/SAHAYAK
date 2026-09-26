"use client";
import { useCallback, useEffect, useState } from "react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { ScrollReveal } from "@/app/components/ui/ScrollReveal";

type FarmerStory = {
  id: string; name: string; quote: string; subtitle: string;
  initials: string; avatarGradient: string;
};

const FARMER_STORIES: FarmerStory[] = [
  {
    id: "dr-meena-gupta",
    name: "Dr. Meena Gupta",
    quote: "SAHAYAK reduced our response time from 22 minutes to under 4 minutes.",
    subtitle: "District Collector",
    initials: "MG",
    avatarGradient: "from-blue-400 to-indigo-600",
  },
  {
    id: "rajan-prasad",
    name: "Rajan Prasad",
    quote: "The SVI score tells us instantly who needs the fastest help.",
    subtitle: "PCR Inspector",
    initials: "RP",
    avatarGradient: "from-amber-400 to-orange-500",
  },
  {
    id: "anjali-devi",
    name: "Anjali Devi",
    quote: "The SAATHI bot helped me file my FIR from home. I felt safe.",
    subtitle: "Survivor, Bundelkhand",
    initials: "AD",
    avatarGradient: "from-emerald-400 to-teal-600",
  }
];

const AUTO_SWIPE_MS = 3500;

export default function FarmerTestimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  // We'll use a key to force re-animation of the progress bar when slide changes
  const [key, setKey] = useState(0);

  const goTo = useCallback((index: number) => {
    const total = FARMER_STORIES.length;
    setActiveIndex(((index % total) + total) % total);
    setKey(k => k + 1);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const t = window.setTimeout(() => {
      setActiveIndex((p) => (p + 1) % FARMER_STORIES.length);
      setKey(k => k + 1);
    }, AUTO_SWIPE_MS);
    return () => window.clearTimeout(t);
  }, [isPaused, activeIndex]);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section label */}
      <ScrollReveal preset="fade-up" className="flex items-center justify-center gap-4 mb-7">
        <div className="h-px w-14 bg-gradient-to-r from-transparent to-slate-300" />
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-wide">Farmer Success Stories</h2>
        <div className="h-px w-14 bg-gradient-to-l from-transparent to-slate-300" />
      </ScrollReveal>

      {/* Carousel */}
      <ScrollReveal preset="scale-up" delay={0.1}>
        <div
          className="relative rounded-3xl bg-slate-50 border border-slate-200 shadow-sm overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {/* Slides */}
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {FARMER_STORIES.map((s) => (
                <article key={s.id} className="min-w-full p-7 sm:p-10">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    {/* Avatar */}
                    <div className="md:col-span-3 flex justify-center md:justify-start">
                      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-white shadow-lg">
                        <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${s.avatarGradient} text-white text-2xl font-bold`}>
                          {s.initials}
                        </div>
                      </div>
                    </div>

                    {/* Quote */}
                    <div className="md:col-span-9 space-y-3 text-center md:text-left">
                      <Quote className="w-8 h-8 text-slate-300 mx-auto md:mx-0 rotate-180" />
                      <p className="text-lg sm:text-xl font-serif italic text-slate-800 leading-relaxed">
                        &ldquo;{s.quote}&rdquo;
                      </p>
                      <div>
                        <div className="text-base font-bold text-slate-900">— {s.name}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{s.subtitle}</div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Arrow nav */}
          <button
            onClick={() => goTo(activeIndex - 1)}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 border border-slate-200 shadow-sm flex items-center justify-center hover:bg-white transition-all"
          >
            <ChevronLeft className="w-4 h-4 text-slate-600" />
          </button>
          <button
            onClick={() => goTo(activeIndex + 1)}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 border border-slate-200 shadow-sm flex items-center justify-center hover:bg-white transition-all"
          >
            <ChevronRight className="w-4 h-4 text-slate-600" />
          </button>
        </div>

        {/* Dot indicators with progress bars */}
        <div className="mt-5 flex items-center justify-center gap-2">
          {FARMER_STORIES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => goTo(i)}
              className={`relative h-2 rounded-full overflow-hidden transition-all duration-300 ${i === activeIndex ? "w-8 bg-slate-200" : "w-2 bg-slate-300 hover:bg-slate-400"}`}
            >
              {i === activeIndex && (
                <div 
                  key={key} 
                  className={`absolute top-0 left-0 h-full bg-[#65a30d] ${isPaused ? 'w-full' : 'w-0 animate-[fill_3.5s_linear_forwards]'}`}
                />
              )}
            </button>
          ))}
        </div>
      </ScrollReveal>
      
      {/* Injecting keyframes for the dot progress bar */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fill {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}} />
    </div>
  );
}

