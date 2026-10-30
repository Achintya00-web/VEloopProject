import React from 'react';
import { Info } from 'lucide-react';
import { BadgeIcon } from '../common/BadgeIcon.jsx';
import { playSound } from '../../utils/audio.js';

export const CurrentLevelCard = ({
  currentLevel,
  currentXP,
  requiredXP,
  onInfoClick,
}) => {
  const nextLevel = currentLevel + 1;
  const remainingXP = Math.max(0, requiredXP - currentXP);
  const progressPercent = Math.min(100, Math.max(0, (currentXP / requiredXP) * 100));
  const formattedNextLevel = nextLevel < 10 ? `0${nextLevel}` : `${nextLevel}`;

  return (
    <div className="card rounded-4 border border-white/10 p-4 p-sm-4 shadow-lg card-glow-gold overflow-hidden bg-gradient-to-b from-[#1C1F32] to-[#161928] text-white">
      {/* Header Level Row matching Page 33 */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center gap-3">
          <BadgeIcon level={currentLevel} size="md" glow={true} />

          <div>
            <div className="d-flex align-items-baseline gap-1">
              <span className="fs-2 fw-bolder text-white font-display tabular-nums">
                {currentXP.toLocaleString()}
              </span>
              <span className="fs-6 fw-bold text-[#F4C542] font-display">
                XP
              </span>
            </div>
            <p className="text-xs text-slate-400 fw-medium mb-0">
              to reach Level {formattedNextLevel}
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            playSound.click();
            onInfoClick();
          }}
          className="w-8 h-8 rounded-circle bg-white/5 border border-white/10 d-flex align-items-center justify-center text-slate-400 hover:text-white"
          title="Level progression details"
          aria-label="Level information"
        >
          <Info className="w-4 h-4" />
        </button>
      </div>

      {/* XP Progress Bar Section */}
      <div className="space-y-2">
        <div className="d-flex justify-content-between text-xs fw-semibold">
          <span className="text-slate-300 tabular-nums">
            {currentXP.toLocaleString()} / {requiredXP.toLocaleString()} XP
          </span>
          <span className="text-[#F4C542] font-mono tabular-nums">
            {progressPercent.toFixed(progressPercent % 1 === 0 ? 0 : 2)}%
          </span>
        </div>

        {/* Progress Track */}
        <div className="progress rounded-pill bg-[#0E1019] border border-white/5 p-0.5" style={{ height: '12px' }}>
          <div
            className="progress-bar rounded-pill gold-gradient-bg animate-shimmer"
            role="progressbar"
            style={{ width: `${progressPercent}%` }}
            aria-valuenow={progressPercent}
            aria-valuemin="0"
            aria-valuemax="100"
          />
        </div>

        <div className="d-flex justify-content-between text-[11px] text-slate-400 pt-1">
          <span>{remainingXP.toLocaleString()} XP remaining</span>
          <span className="text-slate-500">Next: Level {formattedNextLevel}</span>
        </div>
      </div>
    </div>
  );
};
