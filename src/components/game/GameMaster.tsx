import { useState } from "react";
import { BrainCircuit, MessageSquare, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function GameMaster() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'gm', text: "Greetings, Explorer. Your India is currently empty. Begin by exploring the Magadha region to lay the foundations of your civilization. Then check your Heritage Chest." }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if(!input.trim()) return;
    setMessages(prev => [...prev, { role: 'user', text: input }]);
    setInput("");
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'gm', text: "A fascinating inquiry. I am analyzing the historical connections... Currently, simulated Game Master responses are active. In production, this uses verified ASI data." }]);
    }, 1000);
  };

  return (
    <div className="absolute bottom-8 left-8 z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", damping: 25 }}
            className="w-[350px] bg-parchment-100 border-2 border-gold-500/80 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] mb-6 overflow-hidden flex flex-col h-[450px] pointer-events-auto"
          >
            <div className="bg-earth-900 text-parchment-100 p-5 flex items-center justify-between border-b-4 border-gold-600">
              <div className="flex items-center gap-3">
                <div className="bg-gold-500/20 p-2 rounded-lg border border-gold-500/30">
                  <BrainCircuit className="text-gold-500 w-5 h-5" />
                </div>
                <span className="font-serif font-bold text-xl tracking-wide">AI Game Master</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-earth-400 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-white/50">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`p-4 rounded-2xl max-w-[85%] text-sm leading-relaxed shadow-sm ${msg.role === 'user' ? 'bg-earth-800 text-white rounded-br-sm' : 'bg-parchment-100 border border-parchment-300 text-earth-900 rounded-bl-sm font-medium'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-parchment-200 border-t border-parchment-300">
              <form onSubmit={e => { e.preventDefault(); handleSend(); }} className="flex gap-3">
                <input 
                  type="text" 
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  className="flex-1 bg-white border-2 border-parchment-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold-500 font-medium text-earth-900 shadow-inner"
                  placeholder="Ask for guidance or a quest..."
                />
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-20 h-20 rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.6)] border-[3px] border-white/20 text-earth-900 pointer-events-auto hover:scale-105 transition-all duration-300 ${isOpen ? 'bg-parchment-200 text-earth-800 border-earth-400' : 'bg-gradient-to-br from-gold-400 to-gold-600 animate-[bounce_4s_infinite]'}`}
      >
        {isOpen ? <X size={32} /> : <MessageSquare size={32} fill="currentColor" className="text-earth-900/20" />}
      </button>
    </div>
  );
}
