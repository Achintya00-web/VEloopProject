import React from 'react';
import { Info, Sparkles, ChevronRight, ShieldCheck } from 'lucide-react';
import { TreasureChest } from '../common/GameAssets.jsx';
import { playSound } from '../../utils/audio.js';

export const LevelRewardChest = ({
  level,
  onViewRewards,
  onRewardInfoClick,
}) => {
  const formattedLevel = level < 10 ? `0${level}` : `${level}`;

  return (
    <section className="mt-4 level-vault-preview">
      <div className="card rounded-4 bg-gradient-to-r from-[#1E1B2E] via-[#1A1D2F] to-[#171928] border border-white/10 p-3 p-sm-4 shadow-lg overflow-hidden position-relative level-vault-preview__card">
        <div className="d-flex justify-content-between align-items-center gap-3">
          <div className="flex-1 z-10 level-vault-preview__copy">
            <span className="level-vault-preview__status"><ShieldCheck size={11} /> ACTIVE TIER · LEVEL {formattedLevel}</span>
            <div className="d-flex align-items-center gap-1 mb-1">
              <h3 className="fs-6 fw-bolder text-white font-display mb-0">
                Level {formattedLevel} Rewards
              </h3>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  playSound.click();
                  onRewardInfoClick();
                }}
                className="text-slate-400 hover:text-white p-1 bg-transparent border-0"
                title="Reward information"
                aria-label="Reward information"
              >
                <Info className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="text-xs text-slate-400 mb-3 fw-medium">
              Exclusive tier perks, token grants, and bonus rewards.
            </p>

            <button
              onClick={() => {
                playSound.click();
                onViewRewards();
              }}
              className="level-vault-preview__button"
            >
              <span>Open Reward Vault</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="level-vault-preview__art position-relative shrink-0 d-flex align-items-center justify-center animate-float">
            <TreasureChest size={112} />
            <div className="position-absolute -top-1 -right-1">
              <Sparkles className="w-4 h-4 text-[#F4C542] animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
