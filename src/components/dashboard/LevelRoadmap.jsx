import React, { useState } from 'react';
import { CheckCircle2, Lock, MapPin, Award, ArrowRight } from 'lucide-react';
import { BadgeIcon } from '../common/BadgeIcon.jsx';
import { playSound } from '../../utils/audio.js';

export const LevelRoadmap = ({ levels, currentLevel, compact = false }) => {
  const [selectedLevel, setSelectedLevel] = useState(null);

  return (
    <section className={`mt-4 level-roadmap ${compact ? 'level-roadmap--compact' : ''}`}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="level-roadmap__heading">
          <Award className="level-roadmap__heading-icon" />
          <span>
          <h2 className="text-xs fw-bolder text-white text-uppercase tracking-wider font-display d-flex align-items-center gap-1 mb-0">
            Your Level Journey
          </h2>
          <p className="text-xs text-slate-400 mb-0">
            Climb higher tiers to unlock premium rewards.
          </p>
          </span>
        </div>
        <span className="level-roadmap__view-all">View Full Roadmap <ArrowRight size={12} /></span>
      </div>

      <div className="roadmap-grid">
        {levels.map((tier) => {
          const isCompleted = tier.level < currentLevel;
          const isCurrent = tier.level === currentLevel;
          const isNext = tier.level === currentLevel + 1;
          const isLocked = tier.level > currentLevel + 1;
          const status = isCurrent ? 'current' : isCompleted ? 'completed' : isNext ? 'next' : 'locked';
          const statusLabel = isCurrent ? 'Active tier' : isCompleted ? 'Completed' : isNext ? 'Next tier' : 'Locked';

          return (
            <button
              type="button"
              key={tier.level}
              onClick={() => {
                playSound.click();
                setSelectedLevel(tier);
              }}
              className={`roadmap-card roadmap-card--${status}`}
              aria-label={`Level ${tier.level}: ${tier.title}, ${statusLabel}`}
            >
              <span className="roadmap-card__meta">
                <span className="roadmap-card__state">
                  {isCompleted ? <CheckCircle2 size={11} /> : isCurrent ? <MapPin size={11} /> : isLocked ? <Lock size={10} /> : null}
                  {statusLabel}
                </span>
                <span className="roadmap-card__xp">{tier.requiredXP.toLocaleString()} XP</span>
              </span>

              <span className="roadmap-card__badge">
                <BadgeIcon level={tier.level} size="lg" glow={isCurrent} />
              </span>

              <span className="roadmap-card__title">
                <small>LEVEL {String(tier.level).padStart(2, '0')}</small>
                <strong>{tier.title}</strong>
              </span>

              <span className="roadmap-card__reward">
                Reward: <b>{tier.rewardText}</b>
              </span>

              <span className="roadmap-card__footer">
                {isCompleted ? <CheckCircle2 size={11} /> : isCurrent ? <MapPin size={11} /> : isLocked ? <Lock size={10} /> : <Award size={11} />}
                {statusLabel}
              </span>
            </button>
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
