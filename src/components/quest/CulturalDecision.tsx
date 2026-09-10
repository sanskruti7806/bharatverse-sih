import { useState } from "react";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { GitBranch, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function CulturalDecision({ onComplete }: { onComplete: (pts: number) => void }) {
  const [decision, setDecision] = useState<number | null>(null);

  const choices = [
    {
      id: 1,
      title: "Preserve the Medical Texts",
      desc: "Prioritize the copying and distribution of Susruta Samhita and Charaka Samhita.",
      consequence: "You chose to prioritize public health and surgical knowledge. Historically, Nalanda was instrumental in transmitting Ayurvedic knowledge across Asia, especially to Tibet and China.",
      points: 200,
      awareness: "High Cultural Awareness"
    },
    {
      id: 2,
      title: "Preserve Astronomical Texts",
      desc: "Prioritize the works of Aryabhata and Varahamihira on planetary motions.",
      consequence: "You chose to advance science and navigation. The translation of these Indian astronomical texts later profoundly influenced the global history of mathematics and astronomy.",
      points: 200,
      awareness: "High Scientific Awareness"
    },
    {
      id: 3,
      title: "Preserve Philosophical Texts",
      desc: "Prioritize the Buddhist logic and epistemology (Pramana) texts.",
      consequence: "You chose to prioritize philosophical discourse. Nalanda's primary fame historically was as a center of profound philosophical debate, attracting scholars like Xuanzang.",
      points: 200,
      awareness: "High Philosophical Awareness"
    }
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[600px] py-8">
      <Card className="max-w-4xl w-full p-8 bg-parchment-100 border-gold-500/30 shadow-xl">
        <div className="mb-2 text-sm font-semibold text-terracotta-500 tracking-widest uppercase">Mission 4</div>
        <h2 className="font-serif text-3xl text-earth-900 mb-6 flex items-center gap-3">
          <GitBranch className="text-gold-600 w-8 h-8" /> Cultural Decision
        </h2>
        
        <div className="bg-blue-50/50 p-4 rounded-lg border border-blue-200 mb-8 flex items-start gap-3">
          <AlertCircle className="text-blue-500 w-5 h-5 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-blue-900 leading-relaxed">
            <strong>Gameplay Simulation:</strong> This is an interactive scenario designed to explore the diverse curricula of ancient Indian universities. Historically, Nalanda preserved all these branches of knowledge.
          </p>
        </div>

        <p className="text-earth-800 text-lg mb-8 leading-relaxed">
          The head monk approaches you. "Scholar, the monsoon approaches, and our copyists are limited. 
          Which division of the Dharmaganja should we prioritize for transcription and preservation this season?"
        </p>

        {decision === null ? (
          <div className="grid md:grid-cols-3 gap-6">
            {choices.map((choice, idx) => (
              <motion.div
                key={choice.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
                className="h-full"
              >
                <Card 
                  className="h-full p-6 cursor-pointer hover:border-gold-500 hover:shadow-lg transition-all bg-parchment-200 border-parchment-300 flex flex-col group"
                  onClick={() => setDecision(choice.id)}
                >
                  <h3 className="font-serif text-xl text-earth-900 mb-3 group-hover:text-gold-600 transition-colors">{choice.title}</h3>
                  <p className="text-earth-600 text-sm flex-1 leading-relaxed">{choice.desc}</p>
                  <div className="mt-6 text-gold-600 font-semibold text-sm group-hover:translate-x-1 transition-transform">Select Option →</div>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }}
            className="bg-parchment-200 p-8 rounded-xl border border-gold-500/50 shadow-inner"
          >
            <h3 className="font-serif text-2xl text-earth-900 mb-4">A Wise Choice</h3>
            <p className="text-earth-800 text-lg mb-8 leading-relaxed">
              {choices.find(c => c.id === decision)?.consequence}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center border-t border-parchment-300 pt-6">
              <div className="text-sm font-semibold text-earth-600 bg-parchment-100 px-4 py-2 rounded-full border border-parchment-300 shadow-sm">
                Trait Unlocked: {choices.find(c => c.id === decision)?.awareness}
              </div>
              <Button size="lg" onClick={() => onComplete(200)} className="w-full sm:w-auto px-8">
                Complete Quest (+200 XP)
              </Button>
            </div>
          </motion.div>
        )}
      </Card>
    </div>
  );
}
