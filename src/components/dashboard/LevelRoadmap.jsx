import React, { useState } from 'react';
import { CheckCircle2, Lock, MapPin, ChevronRight, Award } from 'lucide-react';
import { BadgeIcon } from '../common/BadgeIcon.jsx';
import { playSound } from '../../utils/audio.js';

export const LevelRoadmap = ({ levels, currentLevel, onLevelSelect }) => {
  const [selectedLevel, setSelectedLevel] = useState(null);

  return (
    <section className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2 className="text-xs fw-bolder text-white text-uppercase tracking-wider font-display d-flex align-items-center gap-1 mb-0">
            <Award className="w-4 h-4 text-[#F4C542]" />
            Level Progression Roadmap
          </h2>
          <p className="text-xs text-slate-400 mb-0">
            Climb higher tiers to unlock amplified earnings.
          </p>
        </div>
      </div>

      <div className="position-relative ps-4 space-y-3">
        {/* Connecting Vertical Track Line */}
        <div className="position-absolute inset-s-3 top-2 bottom-4 w-0.5 bg-linear-to-b from-[#70D68B] via-[#F4C542] to-slate-800" style={{ left: '20px' }} />

        {levels.map((tier) => {
          const isCompleted = tier.level < currentLevel;
          const isCurrent = tier.level === currentLevel;
          const isNext = tier.level === currentLevel + 1;
          const isLocked = tier.level > currentLevel + 1;

          return (
            <div
              key={tier.level}
              onClick={() => {
                playSound.click();
                setSelectedLevel(tier);
                if (onLevelSelect) onLevelSelect(tier);
              }}
              className={`card rounded-4 p-3 d-flex flex-row align-items-center justify-content-between gap-3 cursor-pointer border ${
                isCurrent
                  ? 'bg-linear-to-r from-[#1F2338] to-[#1B1E30] border-[#F4C542]/60 shadow-sm'
                  : isCompleted
                  ? 'bg-[#191C2B]/80 border-[#70D68B]/30'
                  : isNext
                  ? 'bg-[#191C2B]/90 border-purple-500/30'
                  : 'bg-[#141622]/60 border-white/5 opacity-60'
              }`}
            >
              <div className="d-flex align-items-center gap-3">
                <div className="position-relative z-10 shrink-0">
                  <BadgeIcon
                    level={tier.level}
                    size="sm"
                    glow={isCurrent}
                    showLevelText={false}
                  />

                  {isCompleted && (
                    <div className="position-absolute -bottom-1 -right-1 w-5 h-5 rounded-circle bg-[#161827] d-flex align-items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-[#70D68B]" />
                    </div>
                  )}
                  {isCurrent && (
                    <div className="position-absolute -bottom-1 -right-1 w-5 h-5 rounded-circle bg-[#161827] d-flex align-items-center justify-center">
                      <MapPin className="w-4 h-4 text-[#F4C542]" />
                    </div>
                  )}
                  {isLocked && (
                    <div className="position-absolute -bottom-1 -right-1 w-5 h-5 rounded-circle bg-[#161827] d-flex align-items-center justify-center">
                      <Lock className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                  )}
                </div>

                <div>
                  <div className="d-flex align-items-center gap-2 mb-0.5">
                    <span className="text-xs fw-bold text-slate-400">
                      Level {tier.level < 10 ? `0${tier.level}` : tier.level}
                    </span>

                    {isCurrent && (
                      <span className="badge bg-warning text-dark text-[10px] fw-bold">
                        You Are Here
                      </span>
                    )}
                    {isCompleted && (
                      <span className="text-[10px] fw-bold text-[#70D68B]">
                        ✓ Completed
                      </span>
                    )}
                    {isNext && (
                      <span className="badge bg-purple-900 text-purple-200 text-[10px] fw-bold">
                        Next Goal
                      </span>
                    )}
                  </div>

                  <h4 className="text-sm fw-bold text-white font-display mb-0">
                    {tier.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 mb-0">
                    Reward: <span className="text-slate-200 fw-semibold">{tier.rewardText}</span>
                  </p>
                </div>
              </div>

              <div className="d-flex align-items-center gap-1 shrink-0">
                <span className="text-xs font-mono fw-semibold text-slate-400 tabular-nums">
                  {tier.requiredXP.toLocaleString()} XP
                </span>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </div>
            </div>
          );
        })}
      </div>

      {selectedLevel && (
        <div className="position-fixed top-0 inset-s-0 w-100 h-100 z-50 d-flex align-items-center justify-content-center p-3 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="w-100 max-w-sm rounded-4 bg-[#191C2B] border border-white/10 p-4 shadow-2xl">
            <div className="d-flex justify-content-between align-items-center pb-2 border-bottom border-white/5 mb-3">
              <span className="text-xs fw-bold text-slate-400 text-uppercase">Tier Details</span>
              <button
                onClick={() => setSelectedLevel(null)}
                className="text-slate-400 hover:text-white text-xs fw-semibold bg-transparent border-0"
              >
                Close
              </button>
            </div>

            <div className="d-flex flex-column align-items-center text-center my-3">
              <BadgeIcon level={selectedLevel.level} size="lg" glow={selectedLevel.level === currentLevel} />
              <h3 className="fs-5 fw-bold text-white mt-2 font-display mb-0">{selectedLevel.title}</h3>
              <p className="text-xs text-slate-400 mt-1 mb-3">Requires {selectedLevel.requiredXP.toLocaleString()} XP</p>
            </div>

            <div className="p-3 rounded-3 bg-[#161827] border border-white/5 space-y-2 text-xs mb-3">
              <div className="d-flex justify-content-between">
                <span className="text-slate-400">Unlock Reward:</span>
                <span className="fw-bold text-[#F4C542]">{selectedLevel.rewardText}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="text-slate-400">Tier Status:</span>
                <span className="fw-semibold text-capitalize text-white">{selectedLevel.status}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedLevel(null)}
              className="btn btn-secondary w-100 py-2 rounded-3 text-xs fw-bold border-0"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
