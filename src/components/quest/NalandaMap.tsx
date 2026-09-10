import { useState } from "react";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { MapPin } from "lucide-react";
import { motion } from "framer-motion";

export default function NalandaMap({ onComplete }: { onComplete: () => void }) {
  const [visited, setVisited] = useState<string[]>([]);
  
  const locations = [
    { id: 'gate', name: 'Main Gate', x: 20, y: 70, desc: "The entrance to the great university, strictly guarded by the 'Dwarapala' who tests the knowledge of those seeking admission." },
    { id: 'library', name: 'Dharmaganja', x: 70, y: 30, desc: "The massive library complex containing hundreds of thousands of manuscripts across three multi-story buildings." },
    { id: 'lecture', name: 'Lecture Hall', x: 40, y: 45, desc: "One of the many grand halls where scholars debate theology, logic, astronomy, and mathematics." },
  ];

  const handleVisit = (id: string) => {
    if (!visited.includes(id)) {
      setVisited([...visited, id]);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 h-full">
      <div className="flex-1 bg-earth-900 rounded-2xl relative overflow-hidden border-4 border-parchment-300 shadow-xl min-h-[400px]">
        {/* Placeholder for map background, using CSS patterns to look like an old map */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-earth-900 to-earth-800 opacity-80"></div>
        
        {locations.map((loc) => (
          <button
            key={loc.id}
            onClick={() => handleVisit(loc.id)}
            className={`absolute w-12 h-12 -ml-6 -mt-6 rounded-full flex items-center justify-center transition-all duration-500 z-10 ${visited.includes(loc.id) ? 'bg-gold-500 text-earth-900 scale-110 shadow-[0_0_20px_rgba(212,175,55,0.6)]' : 'bg-parchment-100 text-earth-900 animate-pulse hover:bg-gold-300'}`}
            style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
          >
            <MapPin size={24} />
          </button>
        ))}

        {/* Decorative elements */}
        <div className="absolute bottom-4 right-4 text-parchment-300/30 font-serif text-4xl font-bold italic pointer-events-none">
          Nalanda Mahavihara
        </div>
      </div>
      
      <div className="w-full lg:w-96 flex flex-col gap-4">
        <Card className="flex-1 p-6 flex flex-col border-gold-500/20">
          <div className="mb-2 text-sm font-semibold text-terracotta-500 tracking-widest uppercase">Mission 1</div>
          <h2 className="font-serif text-3xl text-earth-900 mb-4">Enter Nalanda</h2>
          <p className="text-earth-800 mb-6 text-lg leading-relaxed">
            Welcome to the 7th Century CE. You have arrived at one of the greatest centers of learning in the ancient world. 
            <br/><br/>
            Explore the campus to understand its layout before you begin your task.
          </p>
          
          <div className="space-y-4 mb-6 flex-1 overflow-y-auto">
            {locations.map(loc => (
              visited.includes(loc.id) && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={loc.id} 
                  className="p-4 bg-parchment-200 rounded-xl border-l-4 border-gold-500 shadow-sm"
                >
                  <strong className="block text-earth-900 mb-1 font-serif text-xl">{loc.name}</strong>
                  <span className="text-earth-800/80 leading-relaxed text-sm">{loc.desc}</span>
                </motion.div>
              )
            ))}
          </div>

          <Button 
            size="lg"
            disabled={visited.length < 3} 
            onClick={onComplete}
            className="w-full py-6 text-lg"
          >
            {visited.length < 3 ? `Discover ${3 - visited.length} more locations` : "Proceed to the Library"}
          </Button>
        </Card>
      </div>
    </div>
  );
}
