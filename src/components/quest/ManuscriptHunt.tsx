import { useState } from "react";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

export default function ManuscriptHunt({ onComplete }: { onComplete: (pts: number) => void }) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [status, setStatus] = useState<"idle" | "correct" | "incorrect">("idle");

  const items = [
    { id: 1, name: "Bronze Bell", desc: "A heavy ritual bell used for temple ceremonies.", isTarget: false },
    { id: 2, name: "Palm-Leaf Bundle", desc: "Tied with string, covered in ancient Brahmi script.", isTarget: true },
    { id: 3, name: "Clay Inkpot", desc: "Dried black soot and gum remains inside.", isTarget: false },
    { id: 4, name: "Copper Plate", desc: "A royal land grant inscription by a Gupta emperor.", isTarget: false },
  ];

  const handleSelect = (id: number, isTarget: boolean) => {
    setSelectedId(id);
    if (isTarget) {
      setStatus("correct");
    } else {
      setStatus("incorrect");
    }
  };

  return (
    <div className="flex flex-col h-full min-h-[600px]">
      <div className="mb-8">
        <div className="mb-2 text-sm font-semibold text-terracotta-500 tracking-widest uppercase">Mission 3</div>
        <h2 className="font-serif text-3xl text-earth-900 mb-3 flex items-center gap-3">
          <Search className="text-gold-600 w-8 h-8" /> The Lost Manuscript
        </h2>
        <p className="text-earth-800 text-lg max-w-3xl">
          The missing text on logic (Pramana) is hidden among these objects in the library anteroom. 
          Identify the correct object format that was historically used to preserve long texts before paper was common.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 flex-1 mb-8">
        {items.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={status === "idle" ? { y: -5, scale: 1.02 } : {}}
            className={`cursor-pointer rounded-2xl p-6 border-2 flex flex-col items-center justify-center text-center transition-all bg-parchment-100 ${
              selectedId === item.id 
                ? (item.isTarget ? 'border-green-500 bg-green-50 shadow-lg' : 'border-red-500 bg-red-50')
                : 'border-parchment-300 hover:border-gold-500 shadow-sm'
            }`}
            onClick={() => status === "idle" && handleSelect(item.id, item.isTarget)}
          >
            <div className="w-24 h-24 bg-parchment-300 rounded-full mb-6 flex items-center justify-center text-earth-500/50 relative overflow-hidden">
              <span className="font-serif text-4xl opacity-50">?</span>
            </div>
            <h3 className="font-serif text-xl text-earth-900 mb-3">{item.name}</h3>
            <p className="text-sm text-earth-600 leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      {status === "incorrect" && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="p-6 bg-red-50 border-red-200 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-red-800 font-medium text-lg">That's not it. Remember, ancient Indian texts were typically inscribed on dried leaves.</p>
            <Button onClick={() => { setStatus("idle"); setSelectedId(null); }} variant="outline" className="border-red-300 text-red-700 hover:bg-red-100">Keep Looking</Button>
          </Card>
        </motion.div>
      )}

      {status === "correct" && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="p-6 bg-green-50 border-green-200 flex flex-col sm:flex-row justify-between items-center gap-6 shadow-md">
            <div>
              <h3 className="font-serif text-2xl mb-2 text-green-900">Manuscript Recovered!</h3>
              <p className="text-green-800">
                You found the Palm-Leaf Manuscript (Tala-patra). This was the standard medium for preserving knowledge in ancient India, carefully etched with a stylus and bound with cord.
              </p>
            </div>
            <Button onClick={() => onComplete(150)} size="lg" className="bg-green-600 hover:bg-green-700 text-white whitespace-nowrap">
              Proceed (+150 XP)
            </Button>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
