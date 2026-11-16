import React, { useState } from 'react';
import { ArrowLeft, Share2, Sparkles, RotateCcw, Home, Trophy, Check } from 'lucide-react';
import { LaurelTrophy, VECoin, XPOrb } from '../common/GameAssets.jsx';
import { BadgeIcon } from '../common/BadgeIcon.jsx';
import { playSound } from '../../utils/audio.js';

export const ChallengeComplete = ({
  score,
  xpEarned,
  vesEarned,
  isNewBest,
  itemsCaught,
  maxMultiplier,
  accuracy,
  currentLevel,
  currentXP,
  requiredXP,
  onPlayAgain,
  onBackToDashboard,
}) => {
  const [shareCopied, setShareCopied] = useState(false);

  const nextLevel = currentLevel + 1;
  const formattedCurrent = currentLevel < 10 ? `0${currentLevel}` : `${currentLevel}`;
  const formattedNext = nextLevel < 10 ? `0${nextLevel}` : `${nextLevel}`;
  const remainingXP = Math.max(0, requiredXP - currentXP);
  const progressPercent = Math.min(100, Math.max(0, (currentXP / requiredXP) * 100));

  const performanceLabel =
    isNewBest
      ? 'New Personal Best · Legendary Run'
      : score >= 60
      ? 'Strong Precision · Rewards Credited'
      : 'Session Complete · Rewards Credited';

  const handleShare = () => {
    playSound.click();
    const shareText = `I scored ${score} PTS in VELOOP XP Catcher (+${xpEarned} XP, +${vesEarned} VEs)!`;
    if (navigator.share) {
      navigator
        .share({
          title: 'VELOOP XP Catcher',
          text: shareText,
        })
        .catch(() => {});
    } else if (navigator.clipboard?.writeText) {
      navigator.clipboard
        .writeText(shareText)
        .then(() => {
          setShareCopied(true);
          window.setTimeout(() => setShareCopied(false), 1800);
        })
        .catch(() => {});
    }
  };

  return (
    <div className="w-100 mx-auto d-flex flex-column justify-content-between user-select-none animate-in fade-in challenge-complete">
      {/* Cosmic nebula & subtle starlight layer matched to Dashboard */}
      <div className="challenge-complete__backdrop" aria-hidden="true">
        <div className="challenge-complete__orbit challenge-complete__orbit--one" />
        <div className="challenge-complete__orbit challenge-complete__orbit--two" />
        <span className="vl-lb-star vl-lb-star--1" />
        <span className="vl-lb-star vl-lb-star--2" />
        <span className="vl-lb-star vl-lb-star--3" />
        <span className="vl-lb-star vl-lb-star--4" />
        {Array.from({ length: 18 }, (_, index) => (
          <span
            key={index}
            className={`challenge-complete__confetti challenge-complete__confetti--${index % 4}`}
            style={{
              left: `${(index * 41 + 9) % 94 + 3}%`,
              top: `${(index * 59 + 7) % 88 + 6}%`,
              '--confetti-delay': `${(index % 9) * -0.45}s`,
              '--confetti-duration': `${5.2 + (index % 4) * 0.7}s`,
            }}
          />
        ))}
      </div>

      {/* Top Navigation Bar */}
      <div className="challenge-complete__topbar">
        <button
          type="button"
          onClick={() => {
            playSound.click();
            onBackToDashboard();
          }}
          className="challenge-complete__icon-btn"
          aria-label="Back to dashboard"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="challenge-complete__topbar-title">
          <Sparkles size={13} className="text-[#FFD15A]" />
          <span>XP Catcher · Results</span>
        </div>

        <button
          type="button"
          onClick={handleShare}
          className="challenge-complete__icon-btn"
          aria-label="Share score"
          title={shareCopied ? 'Copied summary' : 'Share score'}
        >
          {shareCopied ? <Check className="w-4 h-4 text-emerald-300" /> : <Share2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Center Cosmic Victory Stage */}
      <div className="challenge-complete__main">
        {/* Trophy Pedestal */}
        <div className="challenge-complete__trophy">
          <div className="challenge-complete__trophy-halo" />
          <div className="challenge-complete__trophy-crest">
            <LaurelTrophy size={178} />
          </div>
        </div>

        <h2 className="challenge-complete__title">Challenge Complete!</h2>
        <p className="challenge-complete__subtitle">
          {isNewBest && <Trophy size={13} className="text-[#FFD15A]" />}
          <span>{performanceLabel}</span>
        </p>

        {/* Hero Score Plinth */}
        <div className="challenge-complete__score">
          <span className="challenge-complete__score-label">Final Score</span>
          <div className="challenge-complete__score-value-row">
            <span className="challenge-complete__score-value tabular-nums">{score}</span>
            <span className="challenge-complete__score-unit">PTS</span>
            {isNewBest && <span className="challenge-complete__best-tag">New Best</span>}
          </div>

          {(typeof itemsCaught === 'number' || typeof maxMultiplier === 'number') && (
            <div className="challenge-complete__telemetry">
              {typeof itemsCaught === 'number' && (
                <span>
                  <b>{itemsCaught}</b> Caught
                </span>
              )}
              {typeof maxMultiplier === 'number' && (
                <span>
                  <b>{maxMultiplier}X</b> Peak Streak
                </span>
              )}
              {typeof accuracy === 'number' && (
                <span>
                  <b>{accuracy}%</b> Accuracy
                </span>
              )}
            </div>
          )}
        </div>

        {/* Rewards Earned Grid */}
        <div className="challenge-complete__rewards">
          <div className="challenge-complete__reward-card challenge-complete__reward-card--xp">
            <div className="challenge-complete__reward-icon challenge-complete__reward-icon--xp">
              <XPOrb size={28} />
            </div>
            <div className="challenge-complete__reward-copy">
              <strong className="tabular-nums">+{xpEarned} XP</strong>
              <span>Experience Earned</span>
            </div>
          </div>

          <div className="challenge-complete__reward-card challenge-complete__reward-card--ve">
            <div className="challenge-complete__reward-icon challenge-complete__reward-icon--ve">
              <VECoin size={26} />
            </div>
            <div className="challenge-complete__reward-copy">
              <strong className="tabular-nums">+{vesEarned} VEs</strong>
              <span>Vault Reward</span>
            </div>
          </div>
        </div>

        {/* Level Journey Progress Card (Synced with Dashboard CurrentLevelCard) */}
        <div className="challenge-complete__progress-panel">
          <div className="challenge-complete__progress-header">
            <div className="challenge-complete__level-node">
              <BadgeIcon level={currentLevel} size="sm" glow={true} showLevelText={false} />
              <div className="challenge-complete__level-text">
                <span>Current</span>
                <strong>Level {formattedCurrent}</strong>
              </div>
            </div>

            <div className="challenge-complete__xp-summary">
              <span className="tabular-nums">
                {currentXP.toLocaleString()} / {requiredXP.toLocaleString()} XP
              </span>
              <small>{remainingXP.toLocaleString()} XP to Level {formattedNext}</small>
            </div>

            <div className="challenge-complete__level-node challenge-complete__level-node--next">
              <div className="challenge-complete__level-text text-end">
                <span>Next Tier</span>
                <strong>Level {formattedNext}</strong>
              </div>
              <BadgeIcon level={nextLevel} size="sm" showLevelText={false} />
            </div>
          </div>

          <div
            className="challenge-complete__xp-track"
            role="progressbar"
            aria-valuenow={Math.round(progressPercent)}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="challenge-complete__xp-bar"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Bottom Action Footer */}
      <div className="challenge-complete__actions">
        <button
          type="button"
          onClick={() => {
            playSound.click();
            onPlayAgain();
          }}
          className="challenge-complete__btn challenge-complete__btn--primary"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Play Again</span>
        </button>

        <button
          type="button"
          onClick={() => {
            playSound.click();
            onBackToDashboard();
          }}
          className="challenge-complete__btn challenge-complete__btn--secondary"
        >
          <Home className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>
      </div>
    </div>
  );
};
