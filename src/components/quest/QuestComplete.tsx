import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { Trophy, Star, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function QuestComplete({ score }: { score: number }) {
  const stats = [
    { label: "Historical Knowledge", value: 88 },
    { label: "Cultural Awareness", value: 91 },
    { label: "Problem Solving", value: 84 },
    { label: "Exploration", value: 95 },
  ];

  return (
    <div className="flex justify-center items-center h-full py-12">
      <Card className="max-w-2xl w-full p-8 md:p-12 bg-parchment-100 border-gold-500 shadow-2xl relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-earth-900 to-transparent pointer-events-none"></div>
        
        <motion.div 
          initial={{ scale: 0 }} 
          animate={{ scale: 1 }} 
          transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
          className="w-24 h-24 mx-auto bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(212,175,55,0.4)] mb-8 relative z-10"
        >
          <Trophy className="text-white w-12 h-12" />
        </motion.div>

        <div className="text-center mb-10 relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="font-serif text-4xl text-earth-900 mb-2"
          >
            Quest Completed!
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="text-xl text-earth-600 font-serif italic"
          >
            The Lost Library of Nalanda
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          className="bg-parchment-200 rounded-2xl p-6 md:p-8 border border-parchment-300 mb-8 relative z-10 shadow-inner"
        >
          <h3 className="text-center text-sm font-bold tracking-widest text-earth-500 uppercase mb-8">Heritage Knowledge Score</h3>
          
          <div className="space-y-5 mb-10">
            {stats.map((stat, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-sm font-medium text-earth-900 mb-2">
                  <span>{stat.label}</span>
                  <span>{stat.value}%</span>
                </div>
                <div className="w-full bg-parchment-300 rounded-full h-2 overflow-hidden shadow-inner">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${stat.value}%` }}
                    transition={{ duration: 1.5, delay: 0.8 + (idx * 0.2), ease: "easeOut" }}
                    className="bg-gradient-to-r from-terracotta-500 to-gold-500 h-full rounded-full" 
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-parchment-300 pt-8 flex justify-between items-end">
            <div>
              <p className="text-xs text-earth-500 uppercase tracking-widest mb-1 font-semibold">Overall Assessment</p>
              <p className="font-serif text-4xl text-earth-900 font-bold">89<span className="text-2xl text-earth-500">/100</span></p>
            </div>
            <div className="text-right">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 2, type: "spring" }}
                className="inline-flex items-center gap-2 bg-gold-500/10 text-earth-900 px-4 py-2 rounded-full border border-gold-500/40 shadow-sm"
              >
                <Star className="w-5 h-5 fill-gold-600 text-gold-600" />
                <span className="font-bold font-serif text-lg">Nalanda Scholar</span>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}
          className="text-center space-y-6 relative z-10"
        >
          <p className="text-earth-600 text-sm">Total XP Earned: <span className="font-bold text-earth-900 text-lg">+{score}</span></p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full bg-white/50">Return to Dashboard</Button>
            </Link>
            <Link href="/historian" className="w-full sm:w-auto">
              <Button size="lg" className="w-full gap-2 shadow-md hover:shadow-lg">Consult AI Historian <ChevronRight className="w-4 h-4" /></Button>
            </Link>
          </div>
        </motion.div>
      </Card>
    </div>
  );
}
