"use client";

import { Chapter } from "@/data/gameContent";
import { ChapterProgress } from "@/store/gameState";
import { motion } from "framer-motion";
import { Lock, Star, Play, Check } from "lucide-react";

interface ChapterNodeProps {
  chapter: Chapter;
  progress: ChapterProgress;
  isCurrent: boolean;
  onSelect: () => void;
  onLockedClick: (chapter: Chapter) => void;
}

export default function ChapterNode({
  chapter,
  progress,
  isCurrent,
  onSelect,
  onLockedClick,
}: ChapterNodeProps) {
  const isLocked = progress.status === "locked";
  const isCompleted = progress.completed;
  const starsEarned = progress.stars || 0;

  const handleClick = () => {
    if (isLocked) {
      onLockedClick(chapter);
    } else {
      onSelect();
    }
  };

  return (
    <motion.div
      style={{
        left: `${chapter.coordinates.x}%`,
        top: `${chapter.coordinates.y}%`,
      }}
      className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer select-none group"
      whileHover={{ scale: isLocked ? 1.02 : 1.08 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
    >
      <div className="flex flex-col items-center">
        {/* Node Circle */}
        <div
          className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl sm:rounded-3xl flex items-center justify-center relative transition-all duration-300 shadow-xl ${
            isCompleted
              ? "bg-gradient-to-tr from-earth-950 via-earth-900 to-earth-850 border-2 border-gold-400 text-gold-300 shadow-[0_0_20px_rgba(212,175,55,0.4)]"
              : !isLocked
              ? "bg-earth-900 border-2 border-gold-400 text-gold-300 shadow-[0_0_25px_rgba(212,175,55,0.6)] animate-pulse"
              : "bg-stone-900/90 border border-stone-700/60 text-stone-500 opacity-60"
          }`}
        >
          {isLocked ? (
            <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-stone-500" />
          ) : isCompleted ? (
            <div className="flex flex-col items-center justify-center">
              <span className="font-serif font-bold text-xs sm:text-sm text-gold-300">
                {chapter.chapterNumber}
              </span>
              <Check className="w-3.5 h-3.5 text-gold-400" />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <span className="font-serif font-bold text-xs sm:text-sm text-gold-300">
                {chapter.chapterNumber}
              </span>
              <Play className="w-3 h-3 fill-gold-400 text-gold-400" />
            </div>
          )}

          {/* Active / Current indicator ring */}
          {isCurrent && !isCompleted && !isLocked && (
            <div className="absolute inset-0 rounded-2xl sm:rounded-3xl border-2 border-gold-400 animate-ping pointer-events-none opacity-50" />
          )}

          {/* Stars Earned pill for completed chapters */}
          {isCompleted && (
            <div className="absolute -bottom-2.5 px-2 py-0.5 rounded-full bg-earth-950 border border-gold-500/60 shadow flex items-center gap-0.5 whitespace-nowrap">
              {[1, 2, 3].map((starIdx) => (
                <Star
                  key={starIdx}
                  className={`w-2.5 h-2.5 ${
                    starIdx <= starsEarned
                      ? "fill-gold-400 text-gold-400"
                      : "text-earth-700 fill-earth-900"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Chapter Title Badge */}
        <div
          className={`mt-3 px-3 py-1 rounded-xl text-center backdrop-blur-md shadow-lg border transition-all ${
            isCompleted
              ? "bg-earth-950/90 border-gold-500/40 text-parchment-200"
              : !isLocked
              ? "bg-earth-950/95 border-gold-400 text-gold-300 shadow-[0_0_15px_rgba(212,175,55,0.3)]"
              : "bg-stone-950/80 border-stone-700/40 text-stone-500"
          }`}
        >
          <div className="font-serif text-xs font-bold tracking-wider whitespace-nowrap">
            {chapter.title}
          </div>
          <div className="text-[9px] font-mono text-parchment-400/80 hidden sm:block whitespace-nowrap">
            {chapter.locationName}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
