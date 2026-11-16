import React from 'react';
import { Compass, Sparkles } from 'lucide-react';
import { playSound } from '../../utils/audio.js';

export const EmptyState = ({ onStartEarning }) => {
  return (
    <div className="cosmic-state-card w-100 max-w-lg mx-auto py-5 px-4 text-center d-flex flex-column align-items-center justify-content-center my-4">
      <div className="w-16 h-16 rounded-4 bg-linear-to-br from-[#F4C542]/20 to-purple-500/25 border border-[#F4C542]/40 d-flex align-items-center justify-center text-[#F4C542] mb-3">
        <Compass className="w-8 h-8 animate-spin" style={{ animationDuration: '15s' }} />
      </div>

      <h3 className="fs-4 fw-bold text-white font-display mb-2">
        Your XP journey starts here.
      </h3>
      <p className="text-sm text-purple-100/80 max-w-sm mb-4">
        Play our mini-games, complete daily missions, or invite friends to accumulate XP and unlock epic rewards.
      </p>

      <button
        onClick={() => {
          playSound.click();
          onStartEarning();
        }}
        className="cosmic-cta-gold px-4 whitespace-nowrap"
      >
        <Sparkles className="w-4 h-4 fill-current" />
        <span>Start Earning XP →</span>
      </button>
    </div>
  );
};
