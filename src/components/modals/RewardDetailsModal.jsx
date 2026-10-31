import React from 'react';
import { X, Lock, Sparkles } from 'lucide-react';
import { VECoin, GemIcon, TreasureChest } from '../common/GameAssets.jsx';
import { playSound } from '../../utils/audio.js';

export const RewardDetailsModal = ({ isOpen, onClose, currentLevel }) => {
  if (!isOpen) return null;

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 z-50 d-flex align-items-center justify-content-center p-3 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="position-relative w-100 max-w-sm rounded-4 bg-[#191C2B] border border-white/10 p-4 shadow-2xl">
        <button
          onClick={() => {
            playSound.click();
            onClose();
          }}
          className="position-absolute top-3 end-3 p-1 rounded-circle text-slate-400 hover:text-white bg-white/5 border-0"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="d-flex flex-column align-items-center text-center mb-3">
          <div className="mb-2">
            <TreasureChest size={64} />
          </div>
          <span className="reward-vault__rank"><Sparkles size={10} /> RANK UNLOCKED</span>
          <h3 className="fs-5 fw-bold text-white font-display mb-0">
            Level {String(currentLevel).padStart(2, '0')} Reward Vault
          </h3>
          <p className="text-xs text-slate-400 mb-0">
            Exclusive tier perks, token grants, and tournament entry privileges.
          </p>
        </div>

        <div className="space-y-2 mb-4">
          <div className="p-2.5 rounded-3 bg-[#161827] border border-[#F4C542]/20 d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-2">
              <VECoin size={24} />
              <div className="text-start">
                <span className="text-xs fw-bold text-white d-block">500 VE Tokens</span>
                <span className="text-[10px] text-slate-400">Direct wallet grant upon level-up</span>
              </div>
            </div>
            <span className="badge bg-warning text-dark text-[10px] fw-bold">
              Active Tier
            </span>
          </div>

          <div className="p-2.5 rounded-3 bg-[#161827] border border-purple-500/20 d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-2">
              <GemIcon size={22} />
              <div className="text-start">
                <span className="text-xs fw-bold text-white d-block">25 Rare Gems</span>
                <span className="text-[10px] text-slate-400">Tournament tickets</span>
              </div>
            </div>
            <span className="badge bg-purple-900 text-purple-200 text-[10px] fw-bold">
              Active Tier
            </span>
          </div>

          <div className="p-2.5 rounded-3 bg-[#161827] border border-emerald-500/20 d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-2">
              <div className="w-6 h-6 rounded-circle bg-emerald-500/15 d-flex align-items-center justify-center text-emerald-300">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <div className="text-start">
                <span className="text-xs fw-bold text-white d-block">2× Weekend XP Multiplier</span>
                <span className="text-[10px] text-slate-400">Saturday and Sunday quests are boosted</span>
              </div>
            </div>
            <span className="badge bg-emerald-900 text-emerald-200 text-[10px] fw-bold">
              Active
            </span>
          </div>

          <div className="p-2.5 rounded-3 bg-[#161827] border border-white/5 d-flex align-items-center justify-content-between opacity-60">
            <div className="d-flex align-items-center gap-2">
              <div className="w-6 h-6 rounded-circle bg-slate-800 d-flex align-items-center justify-center text-slate-400">
                <Lock className="w-3 h-3" />
              </div>
              <div className="text-start">
                <span className="text-xs fw-semibold text-slate-300 d-block">Level {String(currentLevel + 1).padStart(2, '0')}: Diamond</span>
                <span className="text-[10px] text-slate-500">1,000 VEs + 50 Gems + 2 VIP Spins</span>
              </div>
            </div>
            <span className="text-[10px] text-slate-500">Locked</span>
          </div>
        </div>

        <button
          onClick={() => {
            playSound.click();
            onClose();
          }}
          className="btn btn-secondary w-100 py-2 rounded-3 text-white fw-bold text-xs border-0"
        >
          Close
        </button>
      </div>
    </div>
  );
};
