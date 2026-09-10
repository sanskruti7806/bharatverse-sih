"use client";

import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/Button";
import { MapPin, X, Lock, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function HeritageMap() {
  const [selectedLoc, setSelectedLoc] = useState<any>(null);

  // Exact geographical coordinates mapped to the SVG bounding box.
  // Bounding box: N: 37.5, S: 6.5, W: 67.0, E: 98.0
  const locations = [
    { id: 'nalanda', name: 'Nalanda', period: '5th - 12th Century CE', category: 'Ancient University', desc: 'One of the greatest centers of learning in the ancient world, attracting scholars from across Asia.', x: 59.5, y: 39.9, playable: true },
    { id: 'ajanta', name: 'Ajanta Caves', period: '2nd Century BCE - 6th Century CE', category: 'Rock-Cut Architecture', desc: 'Ancient Buddhist cave monuments featuring masterpieces of Buddhist religious art.', x: 28.0, y: 54.7, playable: false },
    { id: 'hampi', name: 'Hampi', period: '14th Century CE', category: 'Capital City', desc: 'The magnificent ruins of the Vijayanagara Empire capital, known for its grand temples.', x: 30.5, y: 71.5, playable: false },
    { id: 'dholavira', name: 'Dholavira', period: '3000 - 1500 BCE', category: 'Indus Valley Civilization', desc: 'An ancient metropolis demonstrating sophisticated urban planning and water conservation.', x: 10.35, y: 43.9, playable: false },
    { id: 'konark', name: 'Konark Sun Temple', period: '13th Century CE', category: 'Temple Architecture', desc: 'A monumental representation of the sun god Surya\'s chariot.', x: 61.5, y: 56.8, playable: false },
    { id: 'sanchi', name: 'Sanchi Stupa', period: '3rd Century BCE', category: 'Buddhist Monument', desc: 'The oldest stone structure in India, originally commissioned by Emperor Ashoka.', x: 34.6, y: 45.2, playable: false },
  ];

  return (
    <div className="min-h-screen bg-parchment-200 flex flex-col">
      <Navigation />
      
      <main className="flex-1 flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden relative">
        {/* Map Area */}
        <div className="flex-1 relative bg-[#e0e9f0] overflow-hidden border-r border-parchment-300">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
          
          <div className="absolute top-8 left-8 z-10 pointer-events-none bg-white/80 p-4 rounded-xl backdrop-blur-sm border border-white shadow-sm">
            <h1 className="font-serif text-3xl text-earth-900 mb-1 drop-shadow-sm font-bold">BharatVerse Explorer</h1>
            <p className="text-earth-700 text-sm font-medium uppercase tracking-widest">Geographical Map of India</p>
          </div>

          <div className="relative w-full h-full flex items-center justify-center p-8">
            {/* The container aspect ratio matches the India SVG bounding box perfectly */}
            <div className="relative h-full aspect-[862/993] max-w-full">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/b/b4/India_location_map.svg" 
                alt="Map of India" 
                className="w-full h-full object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.15)] opacity-90"
              />
              
              {locations.map((loc) => (
                <motion.button
                  key={loc.id}
                  onClick={() => setSelectedLoc(loc)}
                  whileHover={{ scale: 1.3 }}
                  className={`absolute w-8 h-8 -ml-4 -mt-4 rounded-full flex items-center justify-center transition-all z-20 shadow-lg ${
                    loc.playable 
                      ? 'bg-gold-500 text-earth-900 animate-[pulse_2s_ease-in-out_infinite] shadow-[0_0_20px_rgba(212,175,55,0.8)] border-2 border-white' 
                      : 'bg-earth-800 text-parchment-100 hover:bg-terracotta-500 border-2 border-parchment-100'
                  }`}
                  style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
                >
                  <MapPin size={16} />
                  <div className="absolute top-full mt-1 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-bold text-earth-900 shadow-sm border border-parchment-300 opacity-0 group-hover:opacity-100 whitespace-nowrap">
                    {loc.name}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Info Panel Overlay */}
        <AnimatePresence>
          {selectedLoc && (
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute inset-y-0 right-0 w-full md:w-[450px] bg-parchment-100 shadow-2xl z-30 flex flex-col"
            >
              <div className="relative h-56 bg-earth-900 shrink-0 border-b-4 border-gold-500">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-earth-800 to-earth-900 z-0"></div>
                <div className="absolute inset-0 bg-[url('/mandala.svg')] opacity-10 bg-center bg-cover z-0"></div>
                
                <button 
                  onClick={() => setSelectedLoc(null)}
                  className="absolute top-4 right-4 z-20 bg-white/10 text-white hover:bg-white/30 p-2 rounded-full backdrop-blur-sm transition-colors border border-white/20"
                >
                  <X size={20} />
                </button>
                <div className="absolute bottom-6 left-8 z-20 pr-8">
                  <span className="bg-gold-500 text-earth-900 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-3 inline-block shadow-sm">
                    {selectedLoc.category}
                  </span>
                  <h2 className="font-serif text-4xl text-white drop-shadow-md">{selectedLoc.name}</h2>
                </div>
              </div>
              
              <div className="p-8 flex-1 flex flex-col">
                <div className="mb-8">
                  <h4 className="text-xs font-bold text-earth-500 uppercase tracking-widest mb-2">Historical Period</h4>
                  <p className="text-xl text-earth-900 font-serif">{selectedLoc.period}</p>
                </div>
                
                <div className="mb-8 flex-1">
                  <h4 className="text-xs font-bold text-earth-500 uppercase tracking-widest mb-3">Historical Context</h4>
                  <p className="text-lg text-earth-800 leading-relaxed font-medium">
                    {selectedLoc.desc}
                  </p>
                </div>
                
                <div className="pt-6 border-t border-parchment-300 mt-auto">
                  {selectedLoc.playable ? (
                    <Link href="/quest/nalanda" className="block">
                      <Button size="lg" className="w-full gap-3 text-lg py-7 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all">
                        <Play className="w-5 h-5" fill="currentColor" /> Enter Simulation
                      </Button>
                    </Link>
                  ) : (
                    <Button variant="secondary" size="lg" disabled className="w-full gap-3 text-lg py-7 opacity-70 cursor-not-allowed">
                      <Lock className="w-5 h-5" /> Module Locked (Coming Soon)
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
