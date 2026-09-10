"use client";

import { useState, useRef, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/Button";
import { BrainCircuit, Send, ShieldCheck, BookMarked, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Message = {
  role: "user" | "ai";
  content: string;
  sources?: { title: string; type: string }[];
};

export default function AIHistorian() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      content: "Namaste, Scholar. I am the AI Historian. You can ask me anything about ancient India, its universities, sciences, and culture. My answers are strictly grounded in verified historical sources.",
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMsg = input;
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setIsTyping(true);

    // Simulated RAG retrieval delay
    setTimeout(() => {
      let aiResponse: Message;
      
      const lower = userMsg.toLowerCase();
      if (lower.includes("nalanda") || lower.includes("university") || lower.includes("education")) {
        aiResponse = {
          role: "ai",
          content: "Nalanda Mahavihara, operating from the 5th to 12th century CE, was a revered monastic university in ancient Magadha (modern Bihar). At its peak, it accommodated over 10,000 students and 2,000 teachers. The curriculum was vast, covering philosophy, logic (Pramana), Sanskrit grammar, medicine, and mathematics. Admission was strictly regulated through rigorous entrance examinations conducted by the 'Dwarapalas' (gatekeepers).",
          sources: [
            { title: "Record of the Western Regions by Xuanzang (7th Century CE)", type: "Primary Source" },
            { title: "Education in Ancient India - A. S. Altekar", type: "Historical Analysis" }
          ]
        };
      } else if (lower.includes("manuscript") || lower.includes("write") || lower.includes("book")) {
        aiResponse = {
          role: "ai",
          content: "Before the widespread use of paper, knowledge in ancient India was predominantly recorded on palm leaves (Tala-patra) or birch bark (Bhurja-patra). Scribes used an iron stylus to incise characters into the dried leaves, then rubbed lamp soot or charcoal mixed with oil over the surface to make the etching visible. These leaves were strung together through holes and protected by wooden covers.",
          sources: [
            { title: "National Mission for Manuscripts, India", type: "Cultural Registry" }
          ]
        };
      } else {
        aiResponse = {
          role: "ai",
          content: "That is an excellent question. While I don't have a specific retrieved chunk for that in my current prototype dataset, Indian history has vast resources on this topic. In a fully connected environment, I would query the Archaeological Survey of India (ASI) database and verified historical texts to provide a precise, grounded answer.",
          sources: [
            { title: "System Fallback Response", type: "Simulation Note" }
          ]
        };
      }
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-parchment-200 flex flex-col">
      <Navigation />
      
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8 flex flex-col h-[calc(100vh-64px)]">
        <div className="bg-parchment-100 p-6 rounded-t-2xl border-x border-t border-parchment-300 shadow-sm flex items-center justify-between z-10">
          <div className="flex items-center gap-4">
            <div className="bg-gold-500/20 p-3 rounded-xl border border-gold-500/30">
              <BrainCircuit className="text-gold-600 w-8 h-8" />
            </div>
            <div>
              <h1 className="font-serif text-3xl text-earth-900">AI Historian</h1>
              <p className="text-sm text-earth-600 flex items-center gap-1.5 font-medium mt-1">
                <ShieldCheck className="w-4 h-4 text-green-600" /> Source-Grounded Knowledge Engine
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-white border-x border-parchment-300 overflow-y-auto p-4 sm:p-8 space-y-8 scroll-smooth shadow-inner">
          <AnimatePresence>
            {messages.map((msg, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-4 w-full sm:max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
              >
                <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center shadow-md ${msg.role === 'user' ? 'bg-earth-800 text-white' : 'bg-gradient-to-br from-gold-400 to-gold-600 text-earth-900'}`}>
                  {msg.role === 'user' ? <User size={24} /> : <BrainCircuit size={24} />}
                </div>
                
                <div className={`flex flex-col gap-3 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`p-5 rounded-2xl text-lg ${msg.role === 'user' ? 'bg-earth-800 text-white rounded-tr-sm shadow-md' : 'bg-parchment-100 text-earth-900 border border-parchment-300 rounded-tl-sm shadow-sm'}`}>
                    <p className="leading-relaxed">{msg.content}</p>
                  </div>
                  
                  {msg.sources && (
                    <div className="bg-blue-50/50 border border-blue-200 p-4 rounded-xl w-full max-w-md shadow-sm">
                      <div className="text-xs font-bold text-blue-800 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <ShieldCheck size={16} className="text-blue-600" /> Based on verified sources
                      </div>
                      <div className="space-y-2">
                        {msg.sources.map((src, i) => (
                          <div key={i} className="flex items-start gap-3 text-sm text-earth-800 bg-white p-3 rounded-lg border border-parchment-200 shadow-sm">
                            <BookMarked size={18} className="text-gold-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <div className="font-semibold text-earth-900 leading-tight">{src.title}</div>
                              <div className="text-xs text-earth-500 mt-1 uppercase tracking-wider font-medium">{src.type}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
            
            {isTyping && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-4 max-w-[85%]"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 text-earth-900 flex items-center justify-center shadow-md">
                  <BrainCircuit size={24} />
                </div>
                <div className="bg-parchment-100 border border-parchment-300 p-5 rounded-2xl rounded-tl-sm flex items-center gap-2 shadow-sm h-[72px]">
                  <div className="w-2.5 h-2.5 bg-earth-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2.5 h-2.5 bg-earth-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2.5 h-2.5 bg-earth-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </motion.div>
            )}
            <div ref={bottomRef} />
          </AnimatePresence>
        </div>

        <div className="bg-parchment-100 p-5 rounded-b-2xl border-x border-b border-t border-parchment-300 shadow-sm z-10">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="flex gap-3"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Nalanda, manuscripts, or Indian history..."
              className="flex-1 bg-white border border-parchment-300 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-gold-500 text-earth-900 text-lg shadow-inner"
            />
            <Button type="submit" disabled={!input.trim() || isTyping} size="lg" className="rounded-xl px-8 shadow-md">
              <Send className="w-6 h-6" />
            </Button>
          </form>
          <div className="text-center mt-4 text-xs text-earth-500 tracking-wide">
            BharatVerse AI uses simulated retrieval for this prototype. In production, this connects to a vetted RAG architecture.
          </div>
        </div>
      </main>
    </div>
  );
}
