"use client";

import { useState, useEffect } from "react";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { Dices, RefreshCw, ScrollText, Swords } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Classic Ashtapada spiral path from outer edge to center
const spiralPath = [
  0, 1, 2, 3, 4, 5, 6, 7, 
  15, 23, 31, 39, 47, 55, 63,
  62, 61, 60, 59, 58, 57, 56,
  48, 40, 32, 24, 16, 8,
  9, 10, 11, 12, 13, 14,
  22, 30, 38, 46, 54,
  53, 52, 51, 50, 49,
  41, 33, 25, 17,
  18, 19, 20, 21,
  29, 37, 45,
  44, 43, 42,
  34, 26,
  27, 28, 36, 35
];

export default function Ashtapada() {
  const [board] = useState(Array(64).fill(null));
  const [playerIndex, setPlayerIndex] = useState(0);
  const [cpuIndex, setCpuIndex] = useState(0);
  const [dice, setDice] = useState<number | null>(null);
  const [turn, setTurn] = useState<'player' | 'cpu' | 'gameover'>('player');
  const [log, setLog] = useState<string[]>(["Game started. Your turn! Race to the center."]);

  const specialSquares = [0, 7, 56, 63, 27, 28, 35, 36];

  const addLog = (msg: string) => setLog(prev => [msg, ...prev].slice(0, 6));

  const handlePlayerRoll = () => {
    if (turn !== 'player') return;
    const val = Math.floor(Math.random() * 4) + 1;
    setDice(val);
    
    const newIndex = Math.min(playerIndex + val, 63);
    addLog(`You rolled ${val}.`);
    
    if (newIndex === cpuIndex && newIndex !== 0 && !specialSquares.includes(spiralPath[newIndex])) {
      addLog(`⚔️ You captured the CPU! They retreat to start.`);
      setCpuIndex(0);
    }
    
    setPlayerIndex(newIndex);
    
    if (newIndex === 63) {
      addLog("🏆 You reached the center! YOU WIN!");
      setTurn('gameover');
      return;
    }
    
    setTurn('cpu');
  };

  useEffect(() => {
    if (turn === 'cpu') {
      const timer = setTimeout(() => {
        const val = Math.floor(Math.random() * 4) + 1;
        setDice(val);
        
        const newIndex = Math.min(cpuIndex + val, 63);
        addLog(`CPU rolled ${val}.`);
        
        if (newIndex === playerIndex && newIndex !== 0 && !specialSquares.includes(spiralPath[newIndex])) {
          addLog(`💀 CPU captured your piece! Back to start.`);
          setPlayerIndex(0);
        }
        
        setCpuIndex(newIndex);
        
        if (newIndex === 63) {
          addLog("❌ CPU reached the center! CPU WINS!");
          setTurn('gameover');
          return;
        }
        
        setTurn('player');
      }, 1500); // AI thinking delay
      return () => clearTimeout(timer);
    }
  }, [turn, cpuIndex, playerIndex, specialSquares]);

  const resetGame = () => {
    setPlayerIndex(0);
    setCpuIndex(0);
    setDice(null);
    setTurn('player');
    setLog(["Game reset. Your turn!"]);
  };

  return (
    <Card className="p-6 sm:p-10 bg-parchment-100 border-gold-500/50 flex flex-col lg:flex-row gap-12 items-center shadow-2xl relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02] bg-[url('/mandala.svg')] bg-cover bg-center pointer-events-none"></div>
      
      <div className="flex-1 w-full max-w-md relative z-10">
        <div className="grid grid-cols-8 gap-1 bg-earth-900 p-2 sm:p-3 rounded-xl shadow-2xl border-4 border-earth-800">
          {board.map((_, i) => {
            const isSafe = specialSquares.includes(i);
            const hasPlayer = spiralPath[playerIndex] === i;
            const hasCpu = spiralPath[cpuIndex] === i;

            return (
              <div 
                key={i} 
                className={`aspect-square relative flex items-center justify-center rounded-sm transition-colors ${
                  isSafe ? 'bg-earth-800/80' : 'bg-parchment-200'
                }`}
              >
                {isSafe && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-30">
                    <div className="w-full h-0.5 bg-gold-500 rotate-45 absolute"></div>
                    <div className="w-full h-0.5 bg-gold-500 -rotate-45 absolute"></div>
                  </div>
                )}
                
                <div className="absolute inset-0 flex items-center justify-center gap-1 z-10">
                  {hasPlayer && (
                    <motion.div 
                      layoutId="player-piece"
                      className={`${hasCpu ? 'w-2/5 h-2/5' : 'w-2/3 h-2/3'} rounded-full bg-gradient-to-br from-gold-300 to-gold-600 shadow-[0_2px_8px_rgba(0,0,0,0.5)] border border-white/60 z-20 transition-all`}
                    />
                  )}
                  {hasCpu && (
                    <motion.div 
                      layoutId="cpu-piece"
                      className={`${hasPlayer ? 'w-2/5 h-2/5' : 'w-2/3 h-2/3'} rounded-full bg-gradient-to-br from-gray-700 to-black shadow-[0_2px_8px_rgba(0,0,0,0.5)] border border-gray-400 z-10 transition-all`}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="flex-1 w-full relative z-10 flex flex-col h-full">
        <div className="mb-2 flex items-center justify-between">
          <div className="text-sm font-bold text-terracotta-500 tracking-widest uppercase">Digital Preservation Module</div>
          <div className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm ${turn === 'player' ? 'bg-green-100 text-green-700 border border-green-200 animate-pulse' : turn === 'cpu' ? 'bg-red-100 text-red-700 border border-red-200' : 'bg-gold-100 text-gold-700 border border-gold-200'}`}>
            {turn === 'player' ? 'Your Turn' : turn === 'cpu' ? 'CPU Turn' : 'Game Over'}
          </div>
        </div>
        <h2 className="font-serif text-4xl text-earth-900 mb-4">Ashtapada Prototype</h2>
        <p className="text-earth-700 text-sm mb-6 leading-relaxed bg-white/60 p-4 rounded-xl border border-parchment-300 shadow-sm">
          <strong>How to Play:</strong> Race your golden piece along the spiral path to the center before the AI opponent. 
          If you land on a square occupied by the AI, you <strong>capture</strong> them and send them back to the start! 
          Squares marked with an <strong>'X'</strong> are safe zones.
        </p>
        
        <div className="bg-earth-900 p-4 rounded-xl border-2 border-gold-500/50 mb-6 flex-1 min-h-[140px] max-h-[160px] overflow-hidden flex flex-col shadow-inner">
          <div className="flex items-center gap-2 mb-3 text-gold-500 border-b border-earth-700 pb-2">
            <Swords className="w-4 h-4" /> <span className="font-bold text-xs uppercase tracking-widest">Chronicle of Moves</span>
          </div>
          <div className="flex-1 overflow-y-auto space-y-2 pr-2">
            <AnimatePresence>
              {log.map((msg, idx) => (
                <motion.div 
                  key={idx + msg} 
                  initial={{ opacity: 0, x: -10 }} 
                  animate={{ opacity: 1, x: 0 }}
                  className={`text-sm ${idx === 0 ? 'text-white font-medium' : 'text-earth-400/80'} ${msg.includes('You') && !msg.includes('CPU') ? 'text-green-300' : msg.includes('CPU') ? 'text-red-300' : ''}`}
                >
                  {msg}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex gap-3 items-stretch">
          <Button 
            size="lg" 
            onClick={handlePlayerRoll} 
            disabled={turn !== 'player'}
            className="flex-1 gap-3 text-lg py-7 shadow-md hover:shadow-lg transition-transform hover:-translate-y-1"
          >
            <Dices className="w-6 h-6" /> {turn === 'cpu' ? 'Opponent is thinking...' : 'Roll Cowrie Shells'}
          </Button>
          <div className="w-20 bg-white rounded-xl shadow-[inset_0_2px_10px_rgba(0,0,0,0.1)] border-2 border-parchment-300 flex items-center justify-center font-serif text-4xl text-gold-600 font-bold shrink-0">
            {dice || "-"}
          </div>
          <Button variant="outline" size="lg" onClick={resetGame} className="px-5 bg-white/50 border-parchment-300 hover:bg-parchment-200 text-earth-700 h-full">
            <RefreshCw className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
