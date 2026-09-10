"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import { Map, Lock, Unlock, PlayCircle, Trophy, Star, History } from "lucide-react";
import Link from "next/link";
import Navigation from "@/components/Navigation";

export default function Dashboard() {
  const locations = [
    { name: "Nalanda", period: "7th Century CE", status: "unlocked", progress: 72, image: "bg-orange-900/20" },
    { name: "Ajanta", period: "2nd Century BCE", status: "locked", progress: 0, image: "bg-stone-900/20" },
    { name: "Hampi", period: "14th Century CE", status: "locked", progress: 0, image: "bg-amber-900/20" },
    { name: "Sanchi", period: "3rd Century BCE", status: "locked", progress: 0, image: "bg-yellow-900/20" },
  ];

  return (
    <div className="min-h-screen bg-parchment-200">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-4"
          >
            <div>
              <h1 className="text-4xl font-serif text-earth-900 mb-2">Welcome back, Scholar.</h1>
              <p className="text-lg text-earth-500">Your journey through India's civilization continues.</p>
            </div>
            <div className="flex gap-4">
              <div className="bg-parchment-100 border border-gold-500/30 px-6 py-3 rounded-lg shadow-sm flex items-center gap-3">
                <Trophy className="text-gold-500 w-6 h-6" />
                <div>
                  <div className="text-xs text-earth-500 font-medium uppercase tracking-wider">Heritage XP</div>
                  <div className="text-xl font-serif text-earth-900">1,240</div>
                </div>
              </div>
              <div className="bg-parchment-100 border border-gold-500/30 px-6 py-3 rounded-lg shadow-sm flex items-center gap-3">
                <Star className="text-gold-500 w-6 h-6 fill-gold-500" />
                <div>
                  <div className="text-xs text-earth-500 font-medium uppercase tracking-wider">Level</div>
                  <div className="text-xl font-serif text-earth-900">Scholar</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Quest Card */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-serif text-earth-900 mb-6 flex items-center gap-2">
              <History className="text-gold-600" /> Current Quest
            </h2>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="bg-parchment-100 border-gold-500/30 shadow-md overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[url('/nalanda-pattern.svg')] opacity-5 pointer-events-none" />
                
                <CardHeader className="pb-4">
                  <div className="text-sm font-semibold text-terracotta-500 tracking-wider mb-2 uppercase">The Lost Library</div>
                  <CardTitle className="text-4xl text-earth-900">Nalanda University</CardTitle>
                  <CardDescription className="text-lg mt-2 text-earth-800/80 max-w-xl">
                    Several manuscripts have been misplaced before an important scholarly gathering. Explore Nalanda, interact with scholars, and recover the knowledge.
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="mb-2 flex justify-between text-sm font-medium text-earth-800">
                    <span>Quest Progress</span>
                    <span>72%</span>
                  </div>
                  <div className="w-full bg-parchment-300 rounded-full h-3 mb-8 shadow-inner">
                    <div className="bg-gradient-to-r from-terracotta-500 to-gold-500 h-3 rounded-full" style={{ width: '72%' }}></div>
                  </div>
                  
                  <Link href="/quest/nalanda">
                    <Button size="lg" className="w-full sm:w-auto text-lg gap-2 shadow-md hover:shadow-lg">
                      <PlayCircle className="w-5 h-5" /> Continue Quest
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
            
            <h2 className="text-2xl font-serif text-earth-900 mt-12 mb-6 flex items-center gap-2">
              <Map className="text-gold-600" /> Your Journey Across India
            </h2>
            
            <div className="grid sm:grid-cols-2 gap-6">
              {locations.map((loc, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + (idx * 0.1) }}
                >
                  <Card className={`overflow-hidden transition-all ${loc.status === 'locked' ? 'opacity-70 grayscale-[30%]' : 'hover:shadow-md border-gold-500/20'}`}>
                    <div className={`h-24 ${loc.image} relative flex items-center justify-center border-b border-parchment-300`}>
                      {loc.status === 'locked' && <Lock className="text-earth-900/50 w-8 h-8 absolute" />}
                    </div>
                    <CardHeader className="py-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl">{loc.name}</CardTitle>
                          <CardDescription>{loc.period}</CardDescription>
                        </div>
                        {loc.status === 'unlocked' && <Unlock className="text-gold-600 w-4 h-4" />}
                      </div>
                    </CardHeader>
                    {loc.status === 'unlocked' && (
                      <CardContent className="py-0 pb-4">
                        <div className="w-full bg-parchment-300 rounded-full h-1.5 shadow-inner">
                          <div className="bg-gold-500 h-1.5 rounded-full" style={{ width: `${loc.progress}%` }}></div>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Sidebar */}
          <div>
            <h2 className="text-2xl font-serif text-earth-900 mb-6">Discovery</h2>
            
            <div className="flex flex-col gap-6">
              <Card className="bg-parchment-100">
                <CardHeader>
                  <CardTitle className="text-xl">AI Historian</CardTitle>
                  <CardDescription>Ask questions about your discoveries based on verified heritage sources.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/historian">
                    <Button variant="outline" className="w-full">Consult Historian</Button>
                  </Link>
                </CardContent>
              </Card>
              
              <Card className="bg-parchment-100">
                <CardHeader>
                  <CardTitle className="text-xl">Revive India's Games</CardTitle>
                  <CardDescription>Play traditional games like Chaupar and Ashtapada.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/games">
                    <Button variant="secondary" className="w-full">Games Hub</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
