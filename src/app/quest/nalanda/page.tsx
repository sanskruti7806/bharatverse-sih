"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/store/gameState";
import { useRouter } from "next/navigation";
import { ShieldAlert, Key, ScrollText } from "lucide-react";

export default function NalandaQuest() {
  const router = useRouter();
  const { addToInventory, updateDNA } = useGameStore();
  const [step, setStep] = useState(0); // 0: Portal, 1: Escape Room 1, 2: Decision, 3: Reward

  useEffect(() => {
    if (step === 0) {
      setTimeout(() => setStep(1), 5000); // Portal sequence duration
    }
  }, [step]);

  const handleSolvePuzzle = () => {
    updateDNA('mathematics', 15);
    updateDNA('strategy', 10);
    setStep(2);
  };

  const handleDecision = (choice: string) => {
    if (choice === 'astronomy') {
      updateDNA('history', 20);
      updateDNA('geography', 15);
    } else {
      updateDNA('arts', 20);
      updateDNA('architecture', 15);
    }
    
    addToInventory({
      id: `nalanda_manuscript_${Date.now()}`,
      name: choice === 'astronomy' ? 'Aryabhatiya Scroll' : 'Natyashastra Folio',
      category: 'knowledge',
      icon: '📜',
      isPlaced: false
    });
    setStep(3);
  };

  const finishQuest = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div 
            key="portal"
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1.5 }} exit={{ opacity: 0, scale: 3 }}
            transition={{ duration: 5, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center flex-col"
          >
            <div className="w-[150vw] h-[150vw] rounded-full bg-[conic-gradient(var(--tw-gradient-stops))] from-gold-500 via-transparent to-gold-500 animate-[spin_2s_linear_infinite] opacity-60 blur-2xl absolute mix-blend-screen"></div>
            <div className="w-[80vw] h-[80vw] rounded-full bg-[conic-gradient(var(--tw-gradient-stops))] from-blue-500 via-transparent to-purple-500 animate-[spin_1.5s_linear_infinite_reverse] opacity-40 blur-xl absolute mix-blend-screen"></div>
            
            <h1 className="font-serif text-6xl md:text-9xl text-transparent bg-clip-text bg-gradient-to-b from-white to-gold-500 z-10 drop-shadow-[0_0_40px_rgba(212,175,55,1)] font-bold tracking-[0.3em] uppercase mb-8">
              Time Portal
            </h1>
            <p className="text-3xl mt-4 text-gold-300 z-10 tracking-[0.5em] font-mono animate-pulse">CALIBRATING: 5TH CENTURY CE</p>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div key="puzzle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/4/4b/Nalanda_University_Ruins.jpg')] bg-cover bg-center">
            <div className="absolute inset-0 bg-earth-900/85 backdrop-blur-md"></div>
            <div className="absolute inset-0 flex items-center justify-center p-6">
              <div className="bg-parchment-100 text-earth-900 max-w-3xl w-full rounded-3xl p-10 border-[6px] border-gold-500 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/mandala.svg')] opacity-5 pointer-events-none"></div>
                
                <div className="flex items-center gap-3 mb-8 text-terracotta-600 font-bold uppercase tracking-widest text-sm border-b-2 border-parchment-300 pb-4 relative z-10">
                  <ShieldAlert className="w-6 h-6" /> Escape Room: The Dwarapala's Test
                </div>
                <h2 className="font-serif text-5xl mb-6 relative z-10">The Gatekeeper's Riddle</h2>
                <p className="text-xl leading-relaxed mb-10 text-earth-700 font-medium relative z-10">
                  You stand before the grand entrance of Nalanda Mahavihara. The Dwarapala (gatekeeper scholar) blocks your path. 
                  "To enter, you must understand the rhythm of the universe. In Pingala's Chandaḥśāstra, what mathematical sequence describes the combinations of short and long syllables?"
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
                  <button onClick={() => alert("Incorrect. The gates remain closed.")} className="p-6 border-2 border-parchment-300 rounded-2xl hover:bg-red-50 hover:border-red-400 transition-all font-bold text-lg shadow-sm">The Pythagorean Sequence</button>
                  <button onClick={handleSolvePuzzle} className="p-6 border-2 border-gold-500 bg-gold-50 rounded-2xl hover:bg-gold-500 hover:text-earth-900 transition-all font-bold text-lg flex items-center justify-between shadow-md hover:shadow-lg group">
                    The Hemachandra (Fibonacci) Sequence <Key className="w-6 h-6 text-gold-600 group-hover:text-earth-900" />
                  </button>
                  <button onClick={() => alert("Incorrect. The gates remain closed.")} className="p-6 border-2 border-parchment-300 rounded-2xl hover:bg-red-50 hover:border-red-400 transition-all font-bold text-lg shadow-sm">The Vedic Square</button>
                  <button onClick={() => alert("Incorrect. The gates remain closed.")} className="p-6 border-2 border-parchment-300 rounded-2xl hover:bg-red-50 hover:border-red-400 transition-all font-bold text-lg shadow-sm">The Golden Ratio</button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="decision" initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, scale: 0.9 }} className="absolute inset-0 bg-earth-950 flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-terracotta-900/40 to-transparent animate-pulse"></div>
            <div className="bg-parchment-100 text-earth-900 max-w-3xl w-full rounded-3xl p-10 border-[6px] border-terracotta-500 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative z-10 overflow-hidden">
              <div className="flex items-center gap-3 mb-8 text-terracotta-600 font-bold uppercase tracking-widest text-sm border-b-2 border-parchment-300 pb-4">
                <ShieldAlert className="w-6 h-6" /> Critical Point
              </div>
              <h2 className="font-serif text-5xl mb-6">The Burning Library</h2>
              <p className="text-xl leading-relaxed mb-10 text-earth-700 font-medium">
                You have reached the Dharmaganja library, but time is collapsing. You can only save one critical text to bring back to your Living Board. This choice will permanently alter your Heritage DNA profile.
              </p>
              
              <div className="space-y-6">
                <button onClick={() => handleDecision('astronomy')} className="w-full p-6 border-2 border-gold-500/50 bg-white rounded-2xl hover:bg-gold-50 hover:border-gold-500 transition-all text-left flex gap-6 items-center shadow-md hover:shadow-lg group">
                  <div className="text-5xl bg-parchment-200 p-4 rounded-xl group-hover:scale-110 transition-transform">🔭</div>
                  <div>
                    <h3 className="font-serif font-bold text-3xl mb-2 text-earth-900">Aryabhatiya</h3>
                    <p className="text-earth-600 text-lg font-medium">Boosts History & Mathematics DNA. Focuses your board on science routes.</p>
                  </div>
                </button>
                <button onClick={() => handleDecision('arts')} className="w-full p-6 border-2 border-gold-500/50 bg-white rounded-2xl hover:bg-gold-50 hover:border-gold-500 transition-all text-left flex gap-6 items-center shadow-md hover:shadow-lg group">
                  <div className="text-5xl bg-parchment-200 p-4 rounded-xl group-hover:scale-110 transition-transform">🎭</div>
                  <div>
                    <h3 className="font-serif font-bold text-3xl mb-2 text-earth-900">Natyashastra</h3>
                    <p className="text-earth-600 text-lg font-medium">Boosts Arts & Architecture DNA. Focuses your board on cultural nodes.</p>
                  </div>
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="reward" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="absolute inset-0 bg-black flex items-center justify-center p-6 flex-col">
            <div className="absolute inset-0 bg-[url('/mandala.svg')] opacity-30 animate-[spin_60s_linear_infinite]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold-900/50 to-transparent"></div>
            
            <ScrollText className="w-40 h-40 text-gold-500 mb-10 drop-shadow-[0_0_50px_rgba(212,175,55,1)] animate-bounce relative z-10" />
            <h1 className="font-serif text-6xl md:text-8xl text-white mb-6 text-center relative z-10 drop-shadow-2xl">Discovery Unlocked</h1>
            <p className="text-3xl text-gold-300 mb-16 relative z-10 font-bold tracking-wide">New Knowledge Token added to your Heritage Chest!</p>
            
            <button onClick={finishQuest} className="bg-gradient-to-b from-gold-400 to-gold-600 text-earth-900 px-16 py-6 rounded-full font-bold text-2xl hover:scale-105 transition-transform shadow-[0_0_50px_rgba(212,175,55,0.8)] z-10 border-2 border-white/40 uppercase tracking-widest">
              Return to Living Board
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
