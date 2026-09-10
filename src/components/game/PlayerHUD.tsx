import { useGameStore } from "@/store/gameState";
import { motion, AnimatePresence } from "framer-motion";
import { Box, User, Network, Gamepad2 } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function PlayerHUD() {
  const { inventory, heritageDNA } = useGameStore();
  const [openTab, setOpenTab] = useState<'inventory' | 'dna' | null>(null);

  const getDNAProfile = () => {
    const traits = Object.entries(heritageDNA).sort((a, b) => b[1] - a[1]);
    const top2 = traits.slice(0, 2).map(t => t[0]);
    
    if (top2.includes('architecture') && top2.includes('history')) return "Historian + Architect";
    if (top2.includes('strategy') && top2.includes('geography')) return "Strategist + Explorer";
    return "Cultural Explorer";
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-40 overflow-hidden">
      {/* Top Bar */}
      <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-black/80 to-transparent flex justify-between items-start px-8 py-6">
        <div className="font-serif text-3xl tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-gold-300 to-gold-600 font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          BharatVerse
        </div>
        <div className="flex gap-4 pointer-events-auto">
          <Link href="/games">
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-full border transition-all backdrop-blur-md bg-earth-900/60 text-parchment-200 border-earth-700 hover:bg-gold-500 hover:text-earth-900 hover:border-gold-400 shadow-lg">
              <Gamepad2 size={20} /> <span className="text-sm font-bold tracking-widest uppercase">Game Lab</span>
            </button>
          </Link>
          <button 
            onClick={() => setOpenTab(openTab === 'inventory' ? null : 'inventory')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full border transition-all backdrop-blur-md shadow-lg ${openTab === 'inventory' ? 'bg-gold-500 text-earth-900 border-gold-400' : 'bg-earth-900/60 text-parchment-200 border-earth-700 hover:bg-earth-800'}`}
          >
            <Box size={20} /> <span className="text-sm font-bold tracking-widest uppercase">Chest</span>
          </button>
          <button 
            onClick={() => setOpenTab(openTab === 'dna' ? null : 'dna')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full border transition-all backdrop-blur-md shadow-lg ${openTab === 'dna' ? 'bg-gold-500 text-earth-900 border-gold-400' : 'bg-earth-900/60 text-parchment-200 border-earth-700 hover:bg-earth-800'}`}
          >
            <User size={20} /> <span className="text-sm font-bold tracking-widest uppercase">Profile</span>
          </button>
        </div>
      </div>

      {/* Slide-out Panels */}
      <AnimatePresence>
        {openTab === 'inventory' && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: "100%", opacity: 0 }} transition={{ type: "spring", damping: 25 }}
            className="absolute top-28 bottom-8 right-8 w-[400px] bg-parchment-100 border-2 border-gold-500/30 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] p-6 pointer-events-auto flex flex-col"
          >
            <h2 className="font-serif text-3xl text-earth-900 mb-6 flex items-center gap-3 border-b-2 border-parchment-300 pb-4">
              <Box className="text-gold-600 w-8 h-8" /> My Heritage Chest
            </h2>
            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
              {inventory.map(item => (
                <div key={item.id} className={`p-4 rounded-2xl border-2 flex items-center gap-4 transition-all ${item.isPlaced ? 'bg-parchment-200 border-parchment-300 opacity-60 grayscale' : 'bg-white border-gold-500/30 shadow-md hover:border-gold-500'}`}>
                  <div className="w-14 h-14 flex items-center justify-center bg-parchment-100 rounded-xl text-3xl border border-parchment-300 shadow-inner">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-earth-900 text-lg leading-tight">{item.name}</div>
                    <div className="text-[10px] font-bold text-earth-500 uppercase tracking-widest mt-1.5">{item.category}</div>
                  </div>
                  {item.isPlaced && <div className="text-xs font-bold text-green-700 bg-green-100 px-3 py-1.5 rounded-full border border-green-200">Placed</div>}
                </div>
              ))}
              {inventory.length === 0 && <p className="text-earth-500 text-center font-medium italic mt-12 bg-parchment-200 p-6 rounded-xl border border-parchment-300">Your chest is empty. Complete quests to gather heritage pieces.</p>}
            </div>
          </motion.div>
        )}

        {openTab === 'dna' && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: "100%", opacity: 0 }} transition={{ type: "spring", damping: 25 }}
            className="absolute top-28 bottom-8 right-8 w-[400px] bg-earth-900 border-2 border-gold-500/50 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] p-6 pointer-events-auto flex flex-col text-parchment-100 overflow-hidden"
          >
            <div className="absolute inset-0 bg-[url('/mandala.svg')] opacity-5 pointer-events-none"></div>
            <h2 className="font-serif text-3xl mb-2 flex items-center gap-3 border-b-2 border-earth-700 pb-4 relative z-10">
              <User className="text-gold-500 w-8 h-8" /> Your Bharat Profile
            </h2>
            <div className="text-gold-400 font-serif text-2xl italic mb-10 mt-4 text-center relative z-10 drop-shadow-md">
              "{getDNAProfile()}"
            </div>
            
            <div className="space-y-6 flex-1 relative z-10">
              {Object.entries(heritageDNA).map(([trait, value]) => (
                <div key={trait}>
                  <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-earth-300 mb-2">
                    <span>{trait}</span>
                    <span className="text-gold-400">{value}%</span>
                  </div>
                  <div className="w-full bg-earth-800 rounded-full h-2.5 overflow-hidden shadow-inner border border-earth-700">
                    <motion.div 
                      initial={{ width: 0 }} animate={{ width: `${Math.min(value, 100)}%` }} transition={{ duration: 1.5, ease: "easeOut" }}
                      className="bg-gradient-to-r from-gold-600 to-gold-400 h-full rounded-full shadow-[0_0_10px_rgba(212,175,55,0.5)]" 
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 bg-earth-800/80 p-5 rounded-2xl border border-gold-500/30 relative z-10 backdrop-blur-md">
              <div className="flex items-center gap-3 text-sm text-gold-300 font-bold mb-3 uppercase tracking-widest">
                <Network size={18} className="text-gold-500" /> Connection Power
              </div>
              <p className="text-sm text-earth-300 leading-relaxed font-medium">
                Connect nodes on the living board to generate cultural fusions and unlock new DNA traits.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
