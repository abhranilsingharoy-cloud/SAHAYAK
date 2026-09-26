"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  X,
  Send,
  AlertTriangle,
  Minimize2,
  Maximize2,
  Phone,
  FileText,
  Shield,
  ChevronRight,
  Mic,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";

type Message = {
  id: string;
  sender: "user" | "bot";
  text: string;
  time: string;
  actions?: { label: string; href: string; variant: "primary" | "outline" }[];
};

const QUICK_CHIPS = [
  { label: "🆘 Emergency Help", text: "I need immediate police help" },
  { label: "📄 File e-FIR", text: "Help me file an e-FIR" },
  { label: "⚖️ My Legal Rights", text: "What are my legal rights under the SC/ST act?" },
  { label: "🛡️ Safe Route", text: "I need a safe route to escape" },
  { label: "📞 Helpline", text: "What are the emergency helpline numbers?" },
];

const getTime = () =>
  new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });

const INITIAL_MESSAGES: Message[] = [
  {
    id: "init",
    sender: "bot",
    text: "Namaste 🙏 I am **SAATHI**, your AI legal & safety assistant for NHAA Helpline **14566**.\n\nI can help you with emergency guidance, legal rights, e-FIR filing, and connecting you to support services. How can I help you today?",
    time: getTime(),
    actions: [
      { label: "📞 Call 14566 Now", href: "tel:14566", variant: "primary" },
      { label: "File e-FIR", href: "/efir", variant: "outline" },
    ],
  },
];

export default function SAATHIBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleSend = async (text: string) => {
    if (!text.trim() || isTyping) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: "user",
      text,
      time: getTime(),
    };
    setMessages((p) => [...p, userMsg]);
    setInputValue("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/saathi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, context: "NHAA 14566 helpline assistant" }),
      });
      const data = await res.json();

      const lower = text.toLowerCase();
      const actions: Message["actions"] = [];

      if (lower.includes("efir") || lower.includes("fir") || lower.includes("complaint") || lower.includes("file")) {
        actions.push({ label: "📄 File e-FIR", href: "/efir", variant: "primary" });
        actions.push({ label: "NCW Portal", href: "/ncw", variant: "outline" });
      } else if (lower.includes("police") || lower.includes("emergency") || lower.includes("help") || lower.includes("danger")) {
        actions.push({ label: "🚨 Silent SOS", href: "/mobile", variant: "primary" });
        actions.push({ label: "Call 14566", href: "tel:14566", variant: "outline" });
      } else if (lower.includes("route") || lower.includes("safe") || lower.includes("escape")) {
        actions.push({ label: "🛡️ Suraksha Path", href: "/suraksha", variant: "primary" });
      } else if (lower.includes("legal") || lower.includes("rights") || lower.includes("act")) {
        actions.push({ label: "Victim Sanctuary", href: "/sanctuary", variant: "outline" });
        actions.push({ label: "Integration Hub", href: "/integrations", variant: "outline" });
      }

      const botMsg: Message = {
        id: `b-${Date.now()}`,
        sender: "bot",
        text: data.reply || "I am here to help. Please call 14566 immediately if you are in danger.",
        time: getTime(),
        actions: actions.length > 0 ? actions : undefined,
      };

      setMessages((p) => [...p, botMsg]);
    } catch {
      setMessages((p) => [
        ...p,
        {
          id: `b-${Date.now()}`,
          sender: "bot",
          text: "I'm having trouble connecting. If you're in danger, **please call 14566 immediately**.",
          time: getTime(),
          actions: [{ label: "📞 Call 14566", href: "tel:14566", variant: "primary" }],
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleReset = () => {
    setMessages(INITIAL_MESSAGES);
    setInputValue("");
  };

  const formatText = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\n/g, "<br/>");
  };

  const chatWidth = isMaximized ? "w-[420px] sm:w-[480px]" : "w-80 sm:w-96";
  const chatHeight = isMaximized ? "h-[600px]" : "h-[500px]";

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      {/* ── Chat Window ─────────────────────────────────── */}
      {isOpen && (
        <div
          className={`mb-3 ${chatWidth} ${chatHeight} bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 transition-all duration-300`}
          style={{ boxShadow: "0 25px 60px rgba(0,6,102,0.18), 0 8px 20px rgba(186,26,26,0.08)" }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#000666] to-[#000999] text-white px-4 py-3 flex items-center gap-3 shrink-0">
            {/* Avatar */}
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center overflow-hidden">
                <img src="/saathi_bot.png" alt="SAATHI" className="w-7 h-7 object-contain brightness-0 invert" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-[#000666]" />
            </div>
            {/* Title */}
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-sm leading-none">SAATHI AI</h3>
              <p className="text-[10px] text-white/70 mt-0.5">NHAA Legal & Safety Assistant</p>
            </div>
            {/* Controls */}
            <div className="flex items-center gap-1">
              <button
                onClick={handleReset}
                className="p-1.5 hover:bg-white/15 rounded-lg transition-colors"
                title="New conversation"
              >
                <RefreshCw size={14} />
              </button>
              <button
                onClick={() => setIsMaximized(!isMaximized)}
                className="p-1.5 hover:bg-white/15 rounded-lg transition-colors"
                title={isMaximized ? "Minimize" : "Maximize"}
              >
                {isMaximized ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/15 rounded-lg transition-colors"
                title="Close"
              >
                <X size={14} />
              </button>
            </div>
          </div>

          {/* Emergency Banner */}
          <div className="bg-[#ba1a1a]/8 border-b border-[#ba1a1a]/15 px-4 py-2 flex items-center gap-2 shrink-0">
            <AlertTriangle size={12} className="text-[#ba1a1a] shrink-0" />
            <p className="text-[10px] text-[#ba1a1a] font-semibold">
              Emergency? Call{" "}
              <a href="tel:14566" className="underline font-black">14566</a>{" "}
              · Women Helpline:{" "}
              <a href="tel:1091" className="underline font-black">1091</a>
            </p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#fafbff]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                {/* Bot avatar */}
                {msg.sender === "bot" && (
                  <div className="w-7 h-7 rounded-full bg-[#000666] flex items-center justify-center shrink-0 mt-1">
                    <img src="/saathi_bot.png" alt="" className="w-4 h-4 object-contain brightness-0 invert" />
                  </div>
                )}

                <div className={`max-w-[78%] ${msg.sender === "user" ? "items-end" : "items-start"} flex flex-col gap-1`}>
                  {/* Bubble */}
                  <div
                    className={`rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-[#000666] text-white rounded-tr-sm"
                        : "bg-white border border-gray-100 text-gray-800 shadow-sm rounded-tl-sm"
                    }`}
                  >
                    <p dangerouslySetInnerHTML={{ __html: formatText(msg.text) }} />
                  </div>

                  {/* Action buttons */}
                  {msg.actions && msg.actions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {msg.actions.map((action, i) => (
                        <Link
                          key={i}
                          href={action.href}
                          className={`inline-flex items-center gap-1 text-[11px] font-semibold px-3 py-1.5 rounded-lg transition-colors ${
                            action.variant === "primary"
                              ? "bg-[#ba1a1a] text-white hover:bg-[#a01515]"
                              : "bg-white border border-[#000666]/25 text-[#000666] hover:bg-[#000666]/5"
                          }`}
                        >
                          {action.label}
                          <ChevronRight size={10} />
                        </Link>
                      ))}
                    </div>
                  )}

                  {/* Time */}
                  <span className="text-[9px] text-gray-400 px-1">{msg.time}</span>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex gap-2 items-end">
                <div className="w-7 h-7 rounded-full bg-[#000666] flex items-center justify-center shrink-0">
                  <img src="/saathi_bot.png" alt="" className="w-4 h-4 object-contain brightness-0 invert" />
                </div>
                <div className="bg-white border border-gray-100 shadow-sm rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1.5">
                  {[0, 0.2, 0.4].map((d, i) => (
                    <span
                      key={i}
                      className="w-2 h-2 bg-[#000666]/40 rounded-full animate-bounce"
                      style={{ animationDelay: `${d}s` }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Chips */}
          {messages.length <= 2 && !isTyping && (
            <div className="px-3 py-2 border-t border-gray-100 bg-white shrink-0">
              <p className="text-[10px] text-gray-400 font-medium mb-1.5 uppercase tracking-wider">Quick Help</p>
              <div className="flex flex-wrap gap-1.5">
                {QUICK_CHIPS.map((chip, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(chip.text)}
                    className="text-[11px] bg-[#f0f2ff] border border-[#000666]/15 text-[#000666] px-2.5 py-1 rounded-full hover:bg-[#000666]/10 transition-colors font-medium"
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-3 bg-white border-t border-gray-100 flex items-center gap-2 shrink-0">
            <div className="flex-1 flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 focus-within:border-[#000666] focus-within:ring-1 focus-within:ring-[#000666]/20 transition-all">
              <Mic size={14} className="text-gray-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend(inputValue)}
                placeholder="Type your message..."
                className="flex-1 bg-transparent text-sm outline-none text-gray-800 placeholder-gray-400 min-w-0"
              />
            </div>
            <button
              onClick={() => handleSend(inputValue)}
              disabled={!inputValue.trim() || isTyping}
              className="bg-[#000666] text-white p-2.5 rounded-xl hover:bg-[#000999] transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
            >
              <Send size={15} />
            </button>
          </div>

          {/* Footer */}
          <div className="px-4 py-1.5 bg-gray-50 border-t border-gray-100 text-center shrink-0">
            <p className="text-[9px] text-gray-400">
              SAHAYAK-AI · Powered by Gemini · All conversations are confidential
            </p>
          </div>
        </div>
      )}

      {/* ── Floating Trigger Button ─────────────────────── */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative group w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 ${
          isOpen
            ? "bg-gray-700 rotate-0 scale-95"
            : "bg-gradient-to-br from-[#ba1a1a] to-[#8a0f0f] hover:scale-110"
        }`}
        aria-label={isOpen ? "Close SAATHI Bot" : "Open SAATHI Bot"}
        style={{
          boxShadow: isOpen
            ? "none"
            : "0 8px 30px rgba(186,26,26,0.5), 0 4px 12px rgba(186,26,26,0.3)",
        }}
      >
        {/* Ping animation when closed */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-[#ba1a1a] animate-ping opacity-40" />
        )}

        {/* Icon */}
        {isOpen ? (
          <X size={22} className="text-white relative z-10" />
        ) : (
          <img
            src="/saathi_bot.png"
            alt="SAATHI Bot"
            className="w-8 h-8 object-contain brightness-0 invert relative z-10"
          />
        )}

        {/* Unread badge */}
        {!isOpen && hasUnread && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
            <span className="text-[8px] text-white font-black">1</span>
          </span>
        )}
      </button>

      {/* Tooltip label when closed */}
      {!isOpen && (
        <div className="absolute right-16 bottom-4 bg-[#000666] text-white text-xs font-semibold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg">
          Chat with SAATHI AI
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1.5 border-4 border-transparent border-l-[#000666]" />
        </div>
      )}
    </div>
  );
}
