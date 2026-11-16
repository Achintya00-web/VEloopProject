import React from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';
import { playSound } from '../../utils/audio.js';

export const ErrorState = ({ onRetry }) => {
  return (
    <div className="cosmic-state-card cosmic-state-card--error w-100 max-w-lg mx-auto py-5 px-4 text-center d-flex flex-column align-items-center justify-content-center my-4">
      <div className="w-16 h-16 rounded-4 bg-red-500/15 border border-red-400/35 d-flex align-items-center justify-center text-red-300 mb-3">
        <AlertTriangle className="w-8 h-8" />
      </div>

      <h3 className="fs-4 fw-bold text-white font-display mb-2">
        Unable to Load Level Progress
      </h3>
      <p className="text-sm text-purple-100/80 max-w-sm mb-4">
        We couldn&apos;t load your level information right now. Please check your network connection and retry.
      </p>

      <button
        onClick={() => {
          playSound.click();
          onRetry();
        }}
        className="cosmic-cta-secondary px-4 whitespace-nowrap"
      >
        <RefreshCcw className="w-4 h-4" />
        <span>Try Again</span>
      </button>
    </div>
  );
};
