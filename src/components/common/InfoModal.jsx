import React from 'react';
import { X, Info } from 'lucide-react';
import { playSound } from '../../utils/audio.js';

export const InfoModal = ({ isOpen, onClose, title, body }) => {
  if (!isOpen) return null;

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 z-50 d-flex align-items-center justify-content-center p-3 bg-black/70 backdrop-blur-sm animate-in fade-in">
      <div className="position-relative w-100 max-w-md rounded-2xl bg-[#191C2B] border border-white/10 p-4 shadow-2xl">
        <button
          onClick={() => {
            playSound.click();
            onClose();
          }}
          className="position-absolute top-3 end-3 p-1 rounded-lg text-slate-400 hover:text-white bg-white/5 border-0"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="d-flex align-items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-[#F4C542]/10 border border-[#F4C542]/30 d-flex align-items-center justify-center text-[#F4C542]">
            <Info className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base fw-bold text-white mb-0 font-display">{title}</h3>
            <span className="text-[11px] text-slate-400">Official VELOOP Rule</span>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-[#161827] border border-white/5 text-sm text-slate-300 leading-relaxed mb-4">
          {body}
        </div>

        <button
          onClick={() => {
            playSound.click();
            onClose();
          }}
          className="w-100 py-2.5 rounded-xl bg-gradient-to-r from-[#F4C542] to-[#D9A52C] text-dark fw-bold text-sm border-0 shadow-lg"
        >
          Got it
        </button>
      </div>
    </div>
  );
};
