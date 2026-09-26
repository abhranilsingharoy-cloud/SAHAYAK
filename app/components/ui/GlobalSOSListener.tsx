'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function GlobalSOSListener() {
  const [sosActive, setSosActive] = useState(false);
  const [taps, setTaps] = useState<number[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input or textarea
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        return;
      }

      if (e.code === 'Space') {
        const now = Date.now();
        setTaps((prev) => {
          // Keep only taps from the last 2 seconds
          const recentTaps = prev.filter((t) => now - t < 2000);
          const newTaps = [...recentTaps, now];
          
          if (newTaps.length >= 3) {
            triggerSOS();
            return []; // reset
          }
          return newTaps;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const triggerSOS = () => {
    setSosActive(true);
    
    // Play a siren/beep sound if possible (browser might block if no interaction, but spacebar counts as interaction!)
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      osc.type = 'square';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    } catch (e) {
      // ignore audio errors
    }

    toast.error('🚨 SILENT SOS TRIGGERED', {
      description: 'Your location (25.1745°N, 80.8322°E) has been shared with District Police Control Room and PCR #14 is en route.',
      duration: 8000,
      position: 'top-center',
      style: {
        background: '#ba1a1a',
        color: 'white',
        border: 'none',
        padding: '16px',
        fontSize: '16px',
        fontWeight: 'bold'
      }
    });

    // Remove the red flash after 3 seconds
    setTimeout(() => {
      setSosActive(false);
    }, 3000);
  };

  if (!sosActive) return null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center">
      <div className="absolute inset-0 bg-red-600/20 animate-pulse mix-blend-multiply" />
      <div className="absolute inset-x-0 top-0 h-4 bg-red-600 animate-pulse shadow-[0_0_30px_red]" />
      <div className="absolute inset-x-0 bottom-0 h-4 bg-red-600 animate-pulse shadow-[0_0_30px_red]" />
      <div className="absolute inset-y-0 left-0 w-4 bg-red-600 animate-pulse shadow-[0_0_30px_red]" />
      <div className="absolute inset-y-0 right-0 w-4 bg-red-600 animate-pulse shadow-[0_0_30px_red]" />
    </div>
  );
}
