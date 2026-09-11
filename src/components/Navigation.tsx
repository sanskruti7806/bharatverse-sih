"use client";

import Link from "next/link";
import { Compass, Trophy } from "lucide-react";
import { useGameStore } from "@/store/gameState";

export default function Navigation() {
  const { player } = useGameStore();

  return (
    <nav className="bg-earth-950 border-b border-gold-500/40 sticky top-0 z-50 shadow-md text-parchment-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-earth-900 border border-gold-500/40 flex items-center justify-center text-gold-400 group-hover:border-gold-400 transition-colors shadow">
            <Compass className="w-5 h-5" />
          </div>
          <span className="font-serif text-xl font-bold tracking-wider text-parchment-100">
            BHARAT<span className="text-gold-400">VERSE</span>
          </span>
        </Link>

        {/* Primary & Secondary Nav Links */}
        <div className="hidden lg:flex items-center gap-6 text-xs font-serif font-bold uppercase tracking-wider text-parchment-300">
          <Link href="/" className="hover:text-gold-400 transition-colors">
            Your Bharat
          </Link>
          <Link href="/quest/nalanda" className="hover:text-gold-400 transition-colors">
            Quests
          </Link>
          <Link href="/games" className="hover:text-gold-400 transition-colors">
            Game Lab
          </Link>
          <Link href="/map" className="hover:text-gold-400 transition-colors">
            Heritage Atlas
          </Link>
          <Link href="/dashboard" className="hover:text-gold-400 transition-colors">
            Chronicle
          </Link>
          <div className="w-px h-4 bg-earth-800" />
          <Link href="/historian" className="hover:text-gold-400 transition-colors text-parchment-400">
            AI Historian
          </Link>
          <Link href="/classroom" className="hover:text-gold-400 transition-colors text-parchment-400">
            Classroom
          </Link>
        </div>

        {/* Player State Chip */}
        <div className="flex items-center gap-3">
          <Link href="/dashboard">
            <div className="flex items-center gap-2 bg-earth-900/90 border border-gold-500/30 px-3 py-1.5 rounded-full hover:border-gold-400 transition-all cursor-pointer">
              <Trophy className="w-3.5 h-3.5 text-gold-400" />
              <span className="text-[11px] font-mono font-bold text-gold-300">
                Lvl {player.level}
              </span>
              <span className="text-[11px] font-mono text-parchment-300 hidden sm:inline">
                · {player.xp} XP
              </span>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}
