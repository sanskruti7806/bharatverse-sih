"use client";

import { useEffect, useState } from "react";
import { useGameStore } from "@/store/gameState";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from 'next/dynamic';
const LivingBoard = dynamic(() => import('@/components/game/LivingBoard'), { 
  ssr: false, 
  loading: () => <div className="absolute inset-0 bg-earth-900 flex flex-col items-center justify-center text-gold-500 font-serif text-2xl animate-pulse"><div className="w-16 h-16 border-4 border-gold-500 border-t-transparent rounded-full animate-spin mb-4"></div>Initializing Geographical Core...</div> 
});
import PlayerHUD from "@/components/game/PlayerHUD";
import GameMaster from "@/components/game/GameMaster";
import { Sparkles } from "lucide-react";

export default function GameRoot() {
  const { hasSeenIntro, setHasSeenIntro } = useGameStore();
  const [introStep, setIntroStep] = useState(0);

  useEffect(() => {
    if (!hasSeenIntro) {
      const t1 = setTimeout(() => setIntroStep(1), 1500); // "India is not one story."
      const t2 = setTimeout(() => setIntroStep(2), 4000); // Glowing map forms
      const t3 = setTimeout(() => setIntroStep(3), 7000); // "It is millions of stories connected across time."
      const t4 = setTimeout(() => setIntroStep(4), 10000); // BHARATVERSE
      const t5 = setTimeout(() => setHasSeenIntro(true), 14000); // Start Game
      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); };
    }
  }, [hasSeenIntro, setHasSeenIntro]);

  if (!hasSeenIntro) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
        <AnimatePresence mode="wait">
          {introStep === 1 && (
            <motion.div key="1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.5 }} className="text-white font-serif text-3xl md:text-5xl tracking-wide font-light">
              "India is not one story."
            </motion.div>
          )}
          {introStep === 2 && (
            <motion.div key="2" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 2 }} className="relative w-[400px] h-[400px]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold-500/30 to-transparent rounded-full blur-3xl animate-[pulse_3s_ease-in-out_infinite]"></div>
              <svg viewBox="0 0 100 100" className="w-full h-full text-gold-500/60 drop-shadow-[0_0_20px_rgba(212,175,55,0.8)] stroke-current stroke-[0.5] fill-none relative z-10">
                {/* Abstract geometric representation of connections forming India */}
                <path d="M50 10 L80 40 L60 90 L30 80 L20 40 Z" strokeDasharray="5,5" className="animate-[dash_20s_linear_infinite]" />
                <path d="M20 40 L50 60 L80 40" />
                <path d="M50 10 L50 60 L60 90" />
                <circle cx="50" cy="10" r="1.5" fill="currentColor" />
                <circle cx="80" cy="40" r="1.5" fill="currentColor" />
                <circle cx="60" cy="90" r="1.5" fill="currentColor" />
                <circle cx="30" cy="80" r="1.5" fill="currentColor" />
                <circle cx="20" cy="40" r="1.5" fill="currentColor" />
                <circle cx="50" cy="60" r="1.5" fill="currentColor" />
              </svg>
            </motion.div>
          )}
          {introStep === 3 && (
            <motion.div key="3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.5 }} className="text-gold-200 font-serif text-2xl md:text-4xl text-center px-4 leading-relaxed font-light">
              "It is millions of stories<br/>connected across time."
            </motion.div>
          )}
          {introStep === 4 && (
            <motion.div key="4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 2 }} className="text-center flex flex-col items-center">
              <h1 className="text-6xl md:text-8xl font-serif tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-gold-300 to-gold-600 mb-6 drop-shadow-[0_0_30px_rgba(212,175,55,0.4)]">
                BHARATVERSE
              </h1>
              <p className="text-gold-200/80 uppercase tracking-[0.4em] text-sm flex items-center gap-3">
                <Sparkles className="w-4 h-4 text-gold-500" /> Enter the living map of India <Sparkles className="w-4 h-4 text-gold-500" />
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-earth-900 overflow-hidden relative selection:bg-gold-500/30">
      <LivingBoard />
      <PlayerHUD />
      <GameMaster />
    </div>
  );
}
