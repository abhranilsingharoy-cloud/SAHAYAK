"use client";
import { useState } from "react";
import { Search, ChevronDown, HelpCircle } from "lucide-react";
import { ScrollReveal, StaggerReveal, StaggerChild } from "@/app/components/ui/ScrollReveal";

export default function AgriFAQ() {
  const [searchQuery, setSearchQuery] = useState("");
  const faqs = [
    { question: "What is the SVI (Severity Vulnerability Index)?", answer: "It is a 0-100 score computed from 12 real-time signals including vocal stress, NLP keyword density, caller location risk, and time-of-day patterns." },
    { question: "How does Suraksha Path work?", answer: "Our AI uses KAVACH hotspot data to dynamically route victims along paths that avoid high-risk zones, police voids, and unlit roads." },
    { question: "Is caller data encrypted?", answer: "Yes. All audio is processed in-memory and never stored. Transcripts are encrypted at rest using AES-256." },
    { question: "Which languages are supported?", answer: "Hindi, Bundelkhandi, Bhojpuri, Marathi, Tamil, and Telugu — powered by OpenAI Whisper Large-v3." }
  ];

  const [openId, setOpenId] = useState<string | null>(faqs[0].question);

  const filteredFaqs = faqs.filter(
    (f) => f.question.toLowerCase().includes(searchQuery.toLowerCase()) || f.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const leftFaqs = filteredFaqs.filter((_, i) => i % 2 === 0);
  const rightFaqs = filteredFaqs.filter((_, i) => i % 2 !== 0);

  const renderFaqCard = (faq: any) => {
    const isOpen = openId === faq.question;
    return (
      <StaggerChild key={faq.question} preset="stagger-child">
        <div 
          className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
            isOpen 
              ? "border-[#84cc16]/40 shadow-md shadow-[#84cc16]/5 ring-1 ring-[#84cc16]/20" 
              : "border-slate-200/80 shadow-sm hover:border-slate-300 hover:shadow"
          }`}
        >
          <button
            onClick={() => setOpenId(isOpen ? null : faq.question)}
            className={`w-full px-5 py-4 text-left flex items-center justify-between gap-4 transition-colors ${
              isOpen ? "bg-gradient-to-r from-[#f7fee7]/50 to-transparent" : "hover:bg-slate-50/50"
            }`}
          >
            <span className={`text-sm font-semibold transition-colors duration-300 ${isOpen ? "text-[#4d7c0f]" : "text-slate-800"}`}>
              {faq.question}
            </span>
            <div className={`p-1 rounded-full transition-colors duration-300 ${isOpen ? "bg-[#84cc16]/10" : "bg-transparent"}`}>
              <ChevronDown className={`w-4 h-4 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-[#65a30d]" : "text-slate-400"}`} />
            </div>
          </button>
          
          <div 
            className="grid transition-all duration-300 ease-in-out" 
            style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
          >
            <div className="overflow-hidden">
              <div className="px-5 pb-5 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-gradient-to-b from-slate-50/50 to-transparent">
                {faq.answer}
              </div>
            </div>
          </div>
        </div>
      </StaggerChild>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8">

      {/* Header */}
      <ScrollReveal preset="fade-up" className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-7">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center gap-2">
            <HelpCircle className="w-7 h-7 text-[#65a30d]" />
            <span>Frequently Asked Questions</span>
          </h2>
          <p className="text-sm text-slate-500 mt-1">Disease detection, prices, privacy, and schedule answers.</p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#65a30d] shadow-sm"
          />
        </div>
      </ScrollReveal>

      {/* 2-column masonry layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-start">
        {/* Left Column */}
        <StaggerReveal className="flex flex-col gap-3" delay={0.1} threshold={0.05}>
          {leftFaqs.map(renderFaqCard)}
        </StaggerReveal>

        {/* Right Column */}
        <StaggerReveal className="flex flex-col gap-3" delay={0.2} threshold={0.05}>
          {rightFaqs.map(renderFaqCard)}
        </StaggerReveal>
      </div>

      {filteredFaqs.length === 0 && (
        <div className="text-center py-8 text-slate-500 text-sm">
          No matching questions found for &ldquo;{searchQuery}&rdquo;.
        </div>
      )}
    </div>
  );
}

