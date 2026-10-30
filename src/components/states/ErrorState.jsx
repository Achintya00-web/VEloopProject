import React from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';
import { playSound } from '../../utils/audio.js';

export const ErrorState = ({ onRetry }) => {
  return (
    <div className="w-100 max-w-md mx-auto py-5 px-4 rounded-4 bg-[#191C2B] border border-red-500/20 text-center d-flex flex-column align-items-center justify-content-center my-4 shadow-2xl">
      <div className="w-16 h-16 rounded-4 bg-red-500/10 border border-red-500/30 d-flex align-items-center justify-center text-red-400 mb-3">
        <AlertTriangle className="w-8 h-8" />
      </div>

      <h3 className="fs-5 fw-bold text-white font-display mb-1">
        Unable to Load Level Progress
      </h3>
      <p className="text-xs text-slate-400 max-w-xs mb-4">
        We couldn't load your level information right now. Please check your network connection and retry.
      </p>

      <button
        onClick={() => {
          playSound.click();
          onRetry();
        }}
        className="btn btn-dark px-4 py-2.5 rounded-4 text-white fw-bold text-xs d-flex align-items-center gap-2 bg-slate-800 border border-white/10"
      >
        <RefreshCcw className="w-4 h-4" />
        <span>Try Again</span>
      </button>
    </div>
  );
};
