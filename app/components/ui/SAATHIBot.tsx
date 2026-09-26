"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Bot, X, Send, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

type Message = {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  isAction?: boolean;
  actionType?: 'efir' | 'police';
};

const SUGGESTIONS = [
  'Help me file an e-FIR',
  'I need immediate police help',
  'What are my legal rights?',
];

export default function SAATHIBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init',
      sender: 'bot',
      text: 'Hello, I am SAATHI, your legal and safety AI assistant. How can I help you today?',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const newUserMsg: Message = { id: Date.now().toString(), sender: 'user', text };
    setMessages((prev) => [...prev, newUserMsg]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      handleBotResponse(text);
    }, 1500);
  };

  const handleBotResponse = (userText: string) => {
    const textLower = userText.toLowerCase();
    let botMsg: Message = { id: Date.now().toString(), sender: 'bot', text: '' };

    if (textLower.includes('e-fir') || textLower.includes('efir')) {
      botMsg.text = 'I can help you file an e-FIR. Click the button below to start the process.';
      botMsg.isAction = true;
      botMsg.actionType = 'efir';
    } else if (textLower.includes('police') || textLower.includes('immediate') || textLower.includes('help')) {
      botMsg.text = 'If you are in immediate danger, please contact the police immediately!';
      botMsg.isAction = true;
      botMsg.actionType = 'police';
    } else {
      botMsg.text = 'I am here to assist you with legal rights, filing an e-FIR, or emergency contacts. Please let me know how I can help.';
    }

    setMessages((prev) => [...prev, botMsg]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Bot Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 bg-[#fff8f6] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-[#000666]/10 transform transition-all">
          {/* Header */}
          <div className="bg-[#000666] text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Bot size={24} className="text-[#fff8f6]" />
              <h3 className="font-semibold text-[#fff8f6]">SAATHI AI Assistant</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#fff8f6] hover:text-white transition-colors"
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 h-96 overflow-y-auto bg-[#fff8f6]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`mb-4 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    msg.sender === 'user'
                      ? 'bg-[#000666] text-[#fff8f6] rounded-br-none'
                      : 'bg-white border border-[#000666]/10 text-gray-800 rounded-bl-none shadow-sm'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  
                  {/* Action Buttons inside bot message */}
                  {msg.isAction && msg.actionType === 'efir' && (
                    <div className="mt-3">
                      <Link
                        href="/efir"
                        className="inline-block bg-[#ba1a1a] text-white text-xs px-3 py-1.5 rounded-lg font-medium hover:bg-[#ba1a1a]/90 transition-colors"
                      >
                        File e-FIR Now
                      </Link>
                    </div>
                  )}
                  {msg.isAction && msg.actionType === 'police' && (
                    <div className="mt-3">
                      <Link
                        href="/mobile"
                        className="inline-flex items-center gap-1 bg-[#ba1a1a] text-white text-xs px-3 py-1.5 rounded-lg font-medium hover:bg-[#ba1a1a]/90 transition-colors"
                      >
                        <AlertTriangle size={14} /> Get Police Help
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start mb-4">
                <div className="bg-white border border-[#000666]/10 text-gray-800 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm flex gap-1">
                  <div className="w-2 h-2 bg-[#000666]/40 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-[#000666]/40 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-[#000666]/40 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          {!isTyping && messages.length < 3 && (
            <div className="px-4 py-2 bg-[#fff8f6] border-t border-[#000666]/5 flex flex-wrap gap-2">
              {SUGGESTIONS.map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(suggestion)}
                  className="text-xs bg-white border border-[#000666]/20 text-[#000666] px-2 py-1 rounded-full hover:bg-[#000666]/5 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-[#000666]/10 flex items-center gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend(inputValue)}
              placeholder="Type your message..."
              className="flex-1 bg-gray-50 border border-gray-200 text-sm rounded-full px-4 py-2 focus:outline-none focus:border-[#000666] focus:ring-1 focus:ring-[#000666]"
            />
            <button
              onClick={() => handleSend(inputValue)}
              disabled={!inputValue.trim()}
              className="bg-[#000666] text-[#fff8f6] p-2 rounded-full hover:bg-[#000666]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#ba1a1a] hover:bg-[#ba1a1a]/90 text-white p-4 rounded-full shadow-lg transition-transform transform hover:scale-105 flex items-center justify-center relative group"
          aria-label="Open SAATHI Assistant"
        >
          {/* Pulse effect */}
          <span className="absolute inset-0 rounded-full bg-[#ba1a1a] animate-ping opacity-75"></span>
          <Bot size={28} className="relative z-10" />
        </button>
      )}
    </div>
  );
}
