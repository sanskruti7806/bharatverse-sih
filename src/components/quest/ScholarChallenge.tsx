import { useState } from "react";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { Brain } from "lucide-react";
import { motion } from "framer-motion";

export default function ScholarChallenge({ onComplete }: { onComplete: (pts: number) => void }) {
  const [answer, setAnswer] = useState("");
  const [status, setStatus] = useState<"idle" | "correct" | "incorrect">("idle");

  const handleSubmit = () => {
    if (answer.trim() === "13") {
      setStatus("correct");
    } else {
      setStatus("incorrect");
    }
  };

  return (
    <div className="flex justify-center items-center h-full min-h-[500px]">
      <Card className="max-w-2xl w-full p-8 bg-parchment-100 border-gold-500/30 shadow-xl">
        <div className="mb-2 text-sm font-semibold text-terracotta-500 tracking-widest uppercase">Mission 2</div>
        <h2 className="font-serif text-3xl text-earth-900 mb-6 flex items-center gap-3">
          <Brain className="text-gold-600 w-8 h-8" /> The Scholar's Challenge
        </h2>
        
        <div className="bg-parchment-200 p-6 rounded-xl border border-parchment-300 mb-8 relative">
          <div className="absolute -left-3 top-6 w-6 h-6 bg-parchment-200 border-t border-l border-parchment-300 transform -rotate-45"></div>
          <p className="text-earth-800 text-lg leading-relaxed italic">
            "Ah, a new seeker of knowledge! Before I let you browse the Dharmaganja, tell me this: 
            The ancient metricians like Pingala and Hemachandra studied patterns of short and long syllables. 
            They discovered a sequence of variations: 1, 2, 3, 5, 8... What is the next number in this sequence?"
          </p>
        </div>

        {status === "idle" && (
          <div className="flex flex-col sm:flex-row gap-4">
            <input 
              type="number"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Enter your answer..."
              className="flex-1 bg-white px-4 py-3 rounded-lg border border-parchment-300 focus:outline-none focus:ring-2 focus:ring-gold-500 text-earth-900 text-lg"
            />
            <Button size="lg" onClick={handleSubmit}>Submit Answer</Button>
          </div>
        )}

        {status === "incorrect" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p className="text-red-600 mb-4 font-medium text-lg">The scholar shakes his head. "Not quite. Think about adding the previous two numbers."</p>
            <Button onClick={() => setStatus("idle")} variant="outline" size="lg">Try Again</Button>
          </motion.div>
        )}

        {status === "correct" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-green-50 text-green-900 p-6 rounded-xl border border-green-200">
            <h3 className="font-serif text-2xl mb-2">Correct!</h3>
            <p className="mb-4 text-green-800">
              The scholar smiles. "Excellent! This sequence (later known as the Fibonacci sequence in the West) was described by Indian mathematicians centuries earlier while analyzing Sanskrit poetry meters."
            </p>
            <div className="flex gap-4 mb-6">
              <div className="bg-white/50 px-4 py-2 rounded-lg font-bold text-green-700 border border-green-200 shadow-sm">+100 Heritage XP</div>
              <div className="bg-white/50 px-4 py-2 rounded-lg font-bold text-green-700 border border-green-200 shadow-sm">+20 Scholar Knowledge</div>
            </div>
            <Button onClick={() => onComplete(100)} className="w-full bg-green-600 hover:bg-green-700 text-white text-lg py-4">Continue to Library</Button>
          </motion.div>
        )}
      </Card>
    </div>
  );
}
