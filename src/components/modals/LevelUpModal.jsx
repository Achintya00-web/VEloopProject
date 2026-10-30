import React from 'react';
import { Sparkles, Zap, Target, Gift, X } from 'lucide-react';
import { BadgeIcon } from '../common/BadgeIcon.jsx';
import { VECoin, GemIcon } from '../common/GameAssets.jsx';
import { LEVEL_PERKS } from '../../data/levelData.js';
import { playSound } from '../../utils/audio.js';

export const LevelUpModal = ({ isOpen, level, onClaim, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 z-50 d-flex align-items-center justify-content-center p-3 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="position-relative w-100 max-w-sm rounded-4 bg-gradient-to-b from-[#1C1F33] via-[#161827] to-[#0E1019] border border-[#F4C542]/40 p-4 text-center shadow-2xl overflow-hidden">
        <button
          onClick={() => {
            playSound.click();
            onClose();
          }}
          className="position-absolute top-3 end-3 p-1 rounded-circle text-slate-400 hover:text-white bg-white/5 border-0"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="mb-3">
          <div className="d-flex align-items-center justify-content-center gap-1 mb-1">
            <Sparkles className="w-4 h-4 text-[#F4C542] animate-bounce" />
            <h2 className="fs-4 fw-bolder text-white tracking-widest text-uppercase font-display mb-0">
              Level Up!
            </h2>
            <Sparkles className="w-4 h-4 text-[#F4C542] animate-bounce" />
          </div>
          <p className="text-xs fw-semibold text-slate-400 mb-0">
            You've reached
          </p>
        </div>

        <div className="position-relative my-3 d-flex justify-content-center animate-float">
          <BadgeIcon level={level} size="xl" glow={true} />
        </div>

        {/* Two Reward Cards Row using Bootstrap col-6 */}
        <div className="row g-2 my-3">
          <div className="col-6">
            <div className="card rounded-3 bg-[#191C2B] border border-[#F4C542]/30 p-2.5 d-flex flex-column align-items-center">
              <span className="fs-6 fw-bold text-[#F4C542] font-display tabular-nums mb-1">
                +500 VEs
              </span>
              <div className="d-flex -space-x-2">
                <VECoin size={22} />
                <VECoin size={22} />
                <VECoin size={22} />
              </div>
            </div>
          </div>

          <div className="col-6">
            <div className="card rounded-3 bg-[#191C2B] border border-purple-500/30 p-2.5 d-flex flex-column align-items-center">
              <span className="fs-6 fw-bold text-purple-300 font-display tabular-nums mb-1">
                +25 Gems
              </span>
              <div className="d-flex -space-x-1">
                <GemIcon size={20} />
                <GemIcon size={20} />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-1 text-start mb-4 px-1">
          {LEVEL_PERKS.map((perk, i) => (
            <div key={i} className="d-flex align-items-center gap-2 text-xs text-slate-300">
              {i === 0 && <Zap className="w-3.5 h-3.5 text-[#F4C542] shrink-0" />}
              {i === 1 && <Target className="w-3.5 h-3.5 text-purple-400 shrink-0" />}
              {i === 2 && <Gift className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
              <span className="fw-semibold text-white">{perk.title}</span>
            </div>
          ))}
        </div>

        <button
          onClick={onClaim}
          className="btn btn-warning w-100 py-3 rounded-4 fw-bolder text-xs text-uppercase tracking-wider gold-gradient-bg text-dark border-0 shadow-lg"
        >
          <span>Claim Rewards</span>
        </button>
      </div>
    </div>
  );
};
