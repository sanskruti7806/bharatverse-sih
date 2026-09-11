"use client";

import { useEffect, useState } from "react";
import { useGameStore } from "@/store/gameState";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import PlayerHUD from "@/components/game/PlayerHUD";
import GameMaster from "@/components/game/GameMaster";
import { ArrowRight, SkipForward } from "lucide-react";

const LivingBoard = dynamic(() => import("@/components/game/LivingBoard"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-earth-950 flex flex-col items-center justify-center text-gold-400 font-serif text-xl">
      <div className="w-12 h-12 border-4 border-gold-500 border-t-transparent rounded-full animate-spin mb-4" />
      <span>Calibrating Living India Board...</span>
    </div>
  ),
});

export default function GameRoot() {
  const { hasSeenIntro, setHasSeenIntro } = useGameStore();
  const [introStep, setIntroStep] = useState(0);

  useEffect(() => {
    if (!hasSeenIntro) {
      const t1 = setTimeout(() => setIntroStep(1), 800);  // "India is not one story."
      const t2 = setTimeout(() => setIntroStep(2), 2600); // "It is millions of stories connected across time."
      const t3 = setTimeout(() => setIntroStep(3), 4800); // BHARATVERSE "Don't just learn India. Play it."
      const t4 = setTimeout(() => setHasSeenIntro(true), 7200); // Auto enter game
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        clearTimeout(t4);
      };
    }
  }, [hasSeenIntro, setHasSeenIntro]);

  const handleSkipIntro = () => {
    setHasSeenIntro(true);
  };

  if (!hasSeenIntro) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden text-center p-6 selection:bg-gold-500/40">
        {/* Subtle geometric mandala watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
          <div className="w-[600px] h-[600px] bg-[url('/mandala.svg')] bg-contain bg-center bg-no-repeat animate-[spin_80s_linear_infinite]" />
        </div>

        {/* Skip button */}
        <button
          onClick={handleSkipIntro}
          className="absolute bottom-8 right-8 z-30 flex items-center gap-1.5 px-4 py-2 rounded-xl bg-earth-950/70 border border-gold-500/30 text-parchment-300 hover:text-gold-300 text-xs font-mono tracking-widest uppercase transition-all backdrop-blur-sm"
        >
          <span>Skip Intro</span>
          <SkipForward className="w-3.5 h-3.5" />
        </button>

        <AnimatePresence mode="wait">
          {introStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.9 }}
              className="text-white font-serif text-3xl sm:text-5xl tracking-wide font-light max-w-2xl leading-relaxed"
            >
              &ldquo;India is not one story.&rdquo;
            </motion.div>
          )}

          {introStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.9 }}
              className="text-gold-200 font-serif text-2xl sm:text-4xl tracking-wide font-light max-w-2xl leading-relaxed"
            >
              &ldquo;It is millions of stories<br />connected across time.&rdquo;
            </motion.div>
          )}

          {introStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center space-y-6 max-w-xl"
            >
              <h1 className="text-6xl sm:text-8xl font-serif tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-white via-gold-200 to-gold-500 font-bold drop-shadow-[0_0_40px_rgba(212,175,55,0.7)]">
                BHARATVERSE
              </h1>

              <p className="text-gold-300 font-serif italic text-xl sm:text-2xl">
                &ldquo;Don&apos;t just learn India. Play it.&rdquo;
              </p>

              <button
                onClick={handleSkipIntro}
                className="mt-4 px-10 py-4 rounded-2xl bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 text-earth-950 font-serif font-bold text-sm tracking-widest uppercase shadow-[0_0_35px_rgba(212,175,55,0.6)] hover:brightness-110 active:scale-[0.99] transition-all flex items-center gap-2"
              >
                <span>ENTER BHARAT</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-earth-950 overflow-hidden relative selection:bg-gold-500/30">
      <LivingBoard />
      <PlayerHUD />
      <GameMaster />
    </div>
  );
}
