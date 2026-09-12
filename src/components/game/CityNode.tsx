"use client";

import { City } from "@/data/gameContent";
import { motion } from "framer-motion";
import { Lock, Star } from "lucide-react";

interface CityNodeProps {
  city: City;
  isUnlocked: boolean;
  starsEarned: number;
  maxStars: number;
  onSelect: () => void;
  onLockedClick: (city: City) => void;
}

export default function CityNode({
  city,
  isUnlocked,
  starsEarned,
  maxStars,
  onSelect,
  onLockedClick,
}: CityNodeProps) {
  const isCompleted = starsEarned > 0 && starsEarned === maxStars;

  const handleClick = () => {
    if (isUnlocked) {
      onSelect();
    } else {
      onLockedClick(city);
    }
  };

  return (
    <motion.div
      style={{
        left: `${city.coordinates.x}%`,
        top: `${city.coordinates.y}%`,
      }}
      className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer select-none group"
      whileHover={{ scale: isUnlocked ? 1.06 : 1.02 }}
      whileTap={{ scale: 0.96 }}
      onClick={handleClick}
    >
      <div className="flex flex-col items-center">
        {/* City Icon / Badge Container */}
        <div
          className={`w-16 h-16 sm:w-20 sm:h-20 rounded-3xl flex items-center justify-center text-3xl sm:text-4xl relative transition-all duration-300 ${
            isUnlocked
              ? "bg-gradient-to-tr from-earth-950 via-earth-900 to-earth-850 border-2 border-gold-400 shadow-[0_0_25px_rgba(212,175,55,0.45)] group-hover:shadow-[0_0_35px_rgba(212,175,55,0.7)] group-hover:border-gold-300"
              : "bg-stone-900/90 border border-stone-700/60 opacity-60 shadow-lg"
          }`}
        >
          {isUnlocked ? (
            <>
              <span>{city.artwork}</span>
              {/* Subtle ambient pulse ring for unlocked cities */}
              <div className="absolute inset-0 rounded-3xl border border-gold-400/40 animate-ping pointer-events-none opacity-40" />
            </>
          ) : (
            <div className="flex flex-col items-center justify-center text-stone-400">
              <Lock className="w-6 h-6 sm:w-7 sm:h-7 text-stone-500" />
            </div>
          )}

          {/* Completion laurel / star count indicator badge */}
          {isUnlocked && (
            <div className={`absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-earth-950 border shadow flex items-center gap-1 text-[10px] font-mono ${isCompleted ? 'border-gold-300 text-gold-200' : 'border-gold-500/60 text-gold-300'}`}>
              <Star className="w-2.5 h-2.5 fill-gold-400 text-gold-400" />
              <span>
                {starsEarned}/{maxStars}
              </span>
            </div>
          )}

          {/* Locked star requirement pill */}
          {!isUnlocked && (
            <div className="absolute -bottom-2.5 px-2 py-0.5 rounded-full bg-stone-900/95 border border-stone-600 text-[10px] font-mono text-stone-400 flex items-center gap-1 whitespace-nowrap shadow">
              <Lock className="w-2.5 h-2.5 text-gold-500/80" />
              <span>{city.requiredStars}★ Req</span>
            </div>
          )}
        </div>

        {/* City Title Banner */}
        <div
          className={`mt-2.5 px-3 py-1 rounded-xl text-center transition-all backdrop-blur-md shadow-lg border ${
            isUnlocked
              ? "bg-earth-950/90 border-gold-500/50 group-hover:border-gold-400 group-hover:bg-earth-900/95"
              : "bg-stone-950/80 border-stone-700/40 text-stone-400"
          }`}
        >
          <div
            className={`font-serif text-xs sm:text-sm font-bold tracking-wider uppercase whitespace-nowrap ${
              isUnlocked ? "text-parchment-100 group-hover:text-gold-300" : "text-stone-400"
            }`}
          >
            {city.name}
          </div>
          <div className="text-[9px] font-mono text-parchment-400/80 hidden sm:block whitespace-nowrap">
            {isUnlocked ? city.subtitle : `Requires ${city.requiredStars} Total Stars`}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
