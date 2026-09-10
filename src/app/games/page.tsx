"use client";

import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Gamepad2, Info } from "lucide-react";
import Ashtapada from "@/components/games/Ashtapada";
import { motion, AnimatePresence } from "framer-motion";

export default function GamesHub() {
  const [playing, setPlaying] = useState<string | null>(null);

  const games = [
    { id: 'ashtapada', name: 'Ashtapada', origin: 'Ancient India', period: 'Pre-6th Century BCE', desc: 'The predecessor to chess (Chaturanga), played on an 8x8 uncheckered board with dice and racing mechanics.', playable: true },
    { id: 'pachisi', name: 'Pachisi', origin: 'Medieval India', period: '16th Century CE', desc: 'The national game of India, a cross and circle board game played with cowrie shells. Famously played by Emperor Akbar.', playable: false },
    { id: 'gilli', name: 'Gilli-Danda', origin: 'Indian Subcontinent', period: 'Ancient (2500 BCE)', desc: 'An ancient sport utilizing a long wooden stick (danda) and a short oval piece of wood (gilli).', playable: false },
  ];

  return (
    <div className="min-h-screen bg-parchment-200 flex flex-col">
      <Navigation />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="font-serif text-5xl md:text-6xl text-earth-900 mb-6 drop-shadow-sm"
          >
            Revive India's Games
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="text-xl text-earth-600 max-w-3xl mx-auto leading-relaxed"
          >
            Explore and play digital restorations of traditional Indian games that shaped the history of global play, preserving our cultural heritage through interaction.
          </motion.p>
        </div>

        <AnimatePresence mode="wait">
          {playing === 'ashtapada' ? (
            <motion.div 
              key="game"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <Button variant="outline" className="mb-8 bg-parchment-100 hover:bg-parchment-200 text-earth-800" onClick={() => setPlaying(null)}>
                ← Back to Games Hub
              </Button>
              <Ashtapada />
            </motion.div>
          ) : (
            <motion.div 
              key="hub"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="grid md:grid-cols-3 gap-8"
            >
              {games.map((game, idx) => (
                <motion.div 
                  key={game.id} 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ delay: idx * 0.1 }}
                  className="h-full"
                >
                  <Card className="h-full flex flex-col bg-parchment-100 overflow-hidden border-parchment-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                    <div className="h-48 bg-earth-900 relative flex items-center justify-center border-b-4 border-gold-500">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-earth-800 to-earth-900 z-0"></div>
                      <Gamepad2 className="w-16 h-16 text-gold-500/30 z-10" />
                      <div className="absolute top-4 right-4 bg-earth-900/50 backdrop-blur-sm text-parchment-200 text-xs px-3 py-1 rounded-full border border-earth-700">
                        {game.period}
                      </div>
                    </div>
                    <div className="p-6 sm:p-8 flex flex-col flex-1">
                      <h3 className="font-serif text-3xl text-earth-900 mb-3">{game.name}</h3>
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-terracotta-500 mb-4">
                        <Info className="w-4 h-4" /> {game.origin}
                      </div>
                      <p className="text-earth-700 mb-8 flex-1 leading-relaxed">{game.desc}</p>
                      
                      {game.playable ? (
                        <Button size="lg" className="w-full text-lg shadow-md hover:shadow-lg" onClick={() => setPlaying(game.id)}>
                          Play Digital Prototype
                        </Button>
                      ) : (
                        <Button variant="secondary" size="lg" disabled className="w-full text-lg opacity-70">
                          Digitization in Progress
                        </Button>
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
