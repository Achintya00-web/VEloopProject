import React from 'react';
import { X, Info } from 'lucide-react';
import { playSound } from '../../utils/audio.js';

export const InfoModal = ({ isOpen, onClose, title, body }) => {
  if (!isOpen) return null;

  return (
    <div className="cosmic-modal-overlay position-fixed top-0 start-0 w-100 h-100 z-50 d-flex align-items-center justify-content-center backdrop-blur-sm animate-in fade-in">
      <div className="cosmic-modal-card max-w-md shadow-2xl">
        <button
          onClick={() => {
            playSound.click();
            onClose();
          }}
          className="position-absolute top-3 end-3 task-start-card__close"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="d-flex align-items-center gap-3 mb-3 pe-5">
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[#F4C542]/20 to-purple-500/25 border border-[#F4C542]/40 d-flex align-items-center justify-center text-[#F4C542] shrink-0">
            <Info className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <h3 className="text-base fw-bold text-white mb-0 font-display">{title}</h3>
            <span className="text-xs text-purple-200/75">Official VELOOP Rule</span>
          </div>
        </div>

        <div className="cosmic-modal-inset text-sm text-purple-100/85 leading-relaxed mb-4">
          {body}
        </div>

        <button
          onClick={() => {
            playSound.click();
            onClose();
          }}
          className="cosmic-cta-gold w-100"
        >
          Got it
        </button>
      </div>
    </div>
  );
};
