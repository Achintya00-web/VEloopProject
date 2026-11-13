import React, { useEffect, useRef, useState } from 'react';
import { Award, ArrowRight, CheckCircle2, ChevronLeft, ChevronRight, Lock, MapPin } from 'lucide-react';
import { BadgeIcon } from '../common/BadgeIcon.jsx';
import { playSound } from '../../utils/audio.js';

export const LevelRoadmap = ({
  levels,
  currentLevel,
  currentXP = 0,
  requiredXP = 0,
  compact = false,
}) => {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const roadmapRef = useRef(null);
  const progressPercent = requiredXP > 0
    ? Math.min(100, Math.max(0, (currentXP / requiredXP) * 100))
    : 0;
  const nextTier = levels.find((tier) => tier.level === currentLevel + 1);

  useEffect(() => {
    if (!compact || !roadmapRef.current) return;

    const positionCurrentJourney = () => {
      const roadmap = roadmapRef.current;
      if (!roadmap) return;

      const firstVisibleLevel = Math.max(1, currentLevel - 3);
      const firstCard = roadmap.querySelector(`[data-level="${firstVisibleLevel}"]`);
      if (!firstCard) return;

      const padding = Number.parseFloat(window.getComputedStyle(roadmap).paddingLeft) || 0;
      const cardOffset = firstCard.getBoundingClientRect().left - roadmap.getBoundingClientRect().left;
      roadmap.scrollLeft += cardOffset - padding;
    };

    positionCurrentJourney();
    window.addEventListener('resize', positionCurrentJourney);
    return () => window.removeEventListener('resize', positionCurrentJourney);
  }, [compact, currentLevel, levels]);

  const scrollRoadmap = (direction) => {
    const roadmap = roadmapRef.current;
    if (!roadmap) return;
    const card = roadmap.querySelector('.roadmap-card');
    const gap = Number.parseFloat(window.getComputedStyle(roadmap).gap) || 0;
    const visibleCards = window.matchMedia('(max-width: 767.98px)').matches ? 2 : 3;

    roadmap.scrollBy({
      left: (card.getBoundingClientRect().width + gap) * visibleCards * direction,
      behavior: 'smooth',
    });
  };

  return (
    <section className={`mt-4 level-roadmap ${compact ? 'level-roadmap--compact' : ''}`}>
      {compact ? (
        <div className="level-roadmap__top">
          <div className="level-roadmap__heading">
            <span className="level-roadmap__mark"><Award size={18} /></span>
            <span className="level-roadmap__copy">
              <span className="level-roadmap__title-row">
                <h2>Your Level Journey</h2>
                <span className="level-roadmap__active-tier">Tier {currentLevel} Active</span>
              </span>
              <p>Climb higher tiers to unlock premium rewards.</p>
            </span>
          </div>
          <span className="level-roadmap__view-all">View Full Roadmap <ArrowRight size={14} /></span>
        </div>
      ) : (
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="level-roadmap__heading">
            <Award className="level-roadmap__heading-icon" size={24} />
            <span>
              <h2 className="text-xs fw-bolder text-white text-uppercase tracking-wider font-display d-flex align-items-center gap-1 mb-0">
                Your Level Journey
              </h2>
              <p className="text-xs text-slate-400 mb-0">
                Climb higher tiers to unlock premium rewards.
              </p>
            </span>
          </div>
          <span className="level-roadmap__view-all">View Full Roadmap <ArrowRight size={15} /></span>
        </div>
      )}

      <div className={compact ? 'level-roadmap__carousel' : undefined}>
        {compact && (
          <button
            type="button"
            className="level-roadmap__arrow level-roadmap__arrow--previous"
            onClick={() => scrollRoadmap(-1)}
            aria-label="Show previous levels"
          >
            <ChevronLeft size={18} />
          </button>
        )}
        <div
          ref={compact ? roadmapRef : undefined}
          className="roadmap-grid"
          style={compact ? {
            '--journey-line-width': `calc(${((levels.length - 1) / 3) * 100}% - ${((levels.length - 1) * 16) / 3}px)`,
            '--journey-line-width-mobile': `calc(${((levels.length - 1) / 2) * 100}% - ${(levels.length - 1) * 22}px)`,
          } : undefined}
          role={compact ? 'region' : undefined}
          aria-label={compact ? 'Level journey. Scroll horizontally to explore levels.' : undefined}
          tabIndex={compact ? 0 : undefined}
        >
          {levels.map((tier) => {
            const isCompleted = tier.level < currentLevel;
            const isCurrent = tier.level === currentLevel;
            const isNext = tier.level === currentLevel + 1;
            const isLocked = tier.level > currentLevel + 1;
            const status = isCurrent ? 'current' : isCompleted ? 'completed' : isNext ? 'next' : 'locked';
            const statusLabel = isCurrent ? 'Active tier' : isCompleted ? 'Completed' : isNext ? 'Next tier' : 'Locked';
            const journeyStatus = isCompleted ? 'Claimed' : isCurrent ? 'In Progress' : isNext ? 'Next Tier' : 'Locked';

            return (
              <button
                type="button"
                key={tier.level}
                data-level={tier.level}
                style={compact ? { '--journey-progress': `${progressPercent}%` } : undefined}
                onClick={() => {
                  playSound.click();
                  setSelectedLevel(tier);
                }}
                className={`roadmap-card roadmap-card--${status}`}
                aria-label={`Level ${tier.level}: ${tier.title}, ${statusLabel}`}
              >
                {compact ? (
                  <>
                    <span className="roadmap-card__badge-wrap">
                      <BadgeIcon level={tier.level} size="lg" glow={isCurrent} />
                      <span className={`roadmap-card__completion roadmap-card__completion--${status}`}>
                        {isCompleted ? <CheckCircle2 size={15} /> : isCurrent ? <MapPin size={14} /> : isLocked ? <Lock size={12} /> : null}
                      </span>
                    </span>
                    <span className="roadmap-card__title">
                      <small>LEVEL {String(tier.level).padStart(2, '0')}</small>
                      <strong>{tier.title}</strong>
                    </span>
                    <span className={`roadmap-card__journey-status roadmap-card__journey-status--${status}`}>
                      {journeyStatus}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="roadmap-card__meta">
                      <span className="roadmap-card__state">
                        {isCompleted ? <CheckCircle2 size={14} /> : isCurrent ? <MapPin size={14} /> : isLocked ? <Lock size={13} /> : null}
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
                      {isCompleted ? <CheckCircle2 size={14} /> : isCurrent ? <MapPin size={14} /> : isLocked ? <Lock size={13} /> : <Award size={14} />}
                      {statusLabel}
                    </span>
                  </>
                )}
              </button>
            );
          })}
        </div>
        {compact && (
          <button
            type="button"
            className="level-roadmap__arrow level-roadmap__arrow--next"
            onClick={() => scrollRoadmap(1)}
            aria-label="Show next levels"
          >
            <ChevronRight size={18} />
          </button>
        )}
      </div>

      {compact && (
        <div className="level-roadmap__progress">
          <div className="level-roadmap__next-reward">
            <span aria-hidden="true" />
            <span>Next tier reward: <b>{nextTier?.rewardText || 'All tiers unlocked'}</b></span>
          </div>
          <div className="level-roadmap__xp">
            <span>XP Progress:</span>
            <b>{currentXP.toLocaleString()} / {requiredXP.toLocaleString()}</b>
            <span
              className="level-roadmap__xp-track"
              role="progressbar"
              aria-label="Level XP progress"
              aria-valuenow={Math.round(progressPercent)}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <span style={{ width: `${progressPercent}%` }} />
            </span>
          </div>
        </div>
      )}

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
