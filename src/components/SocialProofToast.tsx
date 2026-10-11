import React, { useState, useEffect } from 'react';
import { RECENT_PURCHASES } from '../data/mockData';
import { Sparkles, X, MapPin } from 'lucide-react';

export const SocialProofToast: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (isDismissed) return;

    // Show initial notification after 3 seconds
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    // Cycle every 11 seconds
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % RECENT_PURCHASES.length);
        setIsVisible(true);
      }, 600);
    }, 11000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [isDismissed]);

  if (isDismissed || !isVisible) return null;

  const current = RECENT_PURCHASES[currentIndex];

  return (
    <div className="fixed bottom-5 left-5 z-40 max-w-sm bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-[#E8DFD8] shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-full bg-[#F5F0EB] flex items-center justify-center shrink-0 text-stone-900 border border-[#E8DFD8]">
          <Sparkles className="w-4 h-4 text-stone-950" />
        </div>

        <div className="flex-1 pr-2">
          <div className="flex items-center gap-1.5 text-[11px] text-stone-500 font-medium">
            <span className="font-bold text-stone-900">{current.name}</span>
            <span>en</span>
            <span className="flex items-center text-stone-700 font-semibold">
              <MapPin className="w-3 h-3 inline mr-0.5 text-stone-500" />
              {current.location}
            </span>
          </div>

          <p className="text-xs font-bold text-stone-950 mt-0.5 line-clamp-1">
            {current.combo}
          </p>

          <span className="text-[10px] text-stone-400 mt-1 block">
            {current.time} · Co-creación en vivo
          </span>
        </div>

        <button
          onClick={() => setIsDismissed(true)}
          className="text-stone-400 hover:text-stone-700 p-1"
          aria-label="Cerrar notificación"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
