import React from 'react';
import { Compass, Sparkles } from 'lucide-react';
import { playSound } from '../../utils/audio.js';

export const EmptyState = ({ onStartEarning }) => {
  return (
    <div className="w-100 max-w-md mx-auto py-5 px-4 rounded-4 bg-[#191C2B] border border-white/5 text-center d-flex flex-column align-items-center justify-content-center my-4 shadow-2xl">
      <div className="w-16 h-16 rounded-4 bg-[#F4C542]/10 border border-[#F4C542]/30 d-flex align-items-center justify-center text-[#F4C542] mb-3">
        <Compass className="w-8 h-8 animate-spin" style={{ animationDuration: '15s' }} />
      </div>

      <h3 className="fs-5 fw-bold text-white font-display mb-1">
        Your XP journey starts here.
      </h3>
      <p className="text-xs text-slate-400 max-w-xs mb-4">
        Play our mini-games, complete daily missions, or invite friends to accumulate XP and unlock epic rewards.
      </p>

      <button
        onClick={() => {
          playSound.click();
          onStartEarning();
        }}
        className="btn btn-warning px-4 py-2.5 rounded-4 fw-bolder text-xs d-flex align-items-center gap-2 gold-gradient-bg text-dark border-0 shadow-lg"
      >
        <Sparkles className="w-4 h-4 fill-dark" />
        <span>Start Earning XP →</span>
      </button>
    </div>
  );
};
