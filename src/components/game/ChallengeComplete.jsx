import React from 'react';
import { ArrowLeft, Share2, Sparkles, RotateCcw, Home } from 'lucide-react';
import { LaurelTrophy } from '../common/GameAssets.jsx';
import { playSound } from '../../utils/audio.js';

export const ChallengeComplete = ({
  score,
  xpEarned,
  vesEarned,
  isNewBest,
  currentLevel,
  currentXP,
  requiredXP,
  onPlayAgain,
  onBackToDashboard,
}) => {
  const nextLevel = currentLevel + 1;
  const progressPercent = Math.min(100, Math.max(0, (currentXP / requiredXP) * 100));

  return (
    <div className="w-100 max-w-md mx-auto min-h-[600px] d-flex flex-column justify-content-between p-2 p-sm-3 animate-in fade-in">
      <div className="d-flex justify-content-between align-items-center pb-2">
        <button
          onClick={() => {
            playSound.click();
            onBackToDashboard();
          }}
          className="w-10 h-10 rounded-3 bg-[#191C2B] border border-white/10 d-flex align-items-center justify-center text-slate-300 hover:text-white"
          aria-label="Back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <span className="text-xs fw-bold text-slate-400 text-uppercase tracking-widest">
          Game Results
        </span>

        <button
          onClick={() => {
            playSound.click();
            if (navigator.share) {
              navigator.share({
                title: 'VELOOP Rewards',
                text: `I just scored ${score} in VELOOP XP Catcher!`,
              }).catch(() => {});
            }
          }}
          className="w-10 h-10 rounded-3 bg-[#191C2B] border border-white/10 d-flex align-items-center justify-center text-slate-300 hover:text-white"
          aria-label="Share score"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      <div className="d-flex flex-column align-items-center text-center my-auto">
        <div className="position-relative mb-2 animate-float">
          <LaurelTrophy size={110} />
          <div className="position-absolute -top-2 -right-2">
            <Sparkles className="w-5 h-5 text-[#F4C542] animate-spin" />
          </div>
        </div>

        <h2 className="fs-4 fw-bolder text-white text-uppercase tracking-wider font-display mb-0">
          Challenge Complete!
        </h2>
        <p className="text-sm fw-semibold text-slate-400 mt-1 mb-3">
          Outstanding!
        </p>

        {/* Final Score */}
        <div className="my-3 d-flex flex-column align-items-center">
          <span className="text-[10px] fw-bold text-slate-400 text-uppercase tracking-widest mb-1">
            Final Score
          </span>
          <div className="d-flex align-items-center gap-2">
            <span className="display-4 fw-bolder text-white font-display tabular-nums tracking-tight">
              {score}
            </span>
            {isNewBest && (
              <span className="badge bg-warning text-dark text-[10px] fw-bold text-uppercase">
                New Best!
              </span>
            )}
          </div>
        </div>

        {/* Reward Metric Cards Row using Bootstrap row & col-6 */}
        <div className="row g-2 w-100 max-w-xs mb-4">
          <div className="col-6">
            <div className="card rounded-4 bg-[#191C2B] border border-purple-500/20 p-3 text-center">
              <span className="fs-5 fw-bolder text-purple-300 font-display tabular-nums d-block">
                +{xpEarned} XP
              </span>
              <span className="text-[10px] fw-semibold text-slate-400 text-uppercase">
                Experience
              </span>
            </div>
          </div>

          <div className="col-6">
            <div className="card rounded-4 bg-[#191C2B] border border-[#F4C542]/20 p-3 text-center">
              <span className="fs-5 fw-bolder text-[#F4C542] font-display tabular-nums d-block">
                +{vesEarned} VEs
              </span>
              <span className="text-[10px] fw-semibold text-slate-400 text-uppercase">
                Your Reward
              </span>
            </div>
          </div>
        </div>

        {/* Mini Level Progress Bar */}
        <div className="w-100 max-w-xs space-y-1 mb-4">
          <div className="d-flex justify-content-between text-xs fw-semibold text-slate-300">
            <span>Level {currentLevel < 10 ? `0${currentLevel}` : currentLevel}</span>
            <span className="text-slate-400 text-[11px] tabular-nums">
              {currentXP.toLocaleString()} / {requiredXP.toLocaleString()} XP
            </span>
            <span>Level {nextLevel < 10 ? `0${nextLevel}` : nextLevel}</span>
          </div>
          <div className="progress rounded-pill bg-[#0E1019] border border-white/5 p-0.5" style={{ height: '10px' }}>
            <div
              className="progress-bar rounded-pill gold-gradient-bg"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      <div className="space-y-2 w-100 max-w-xs mx-auto">
        <button
          onClick={() => {
            playSound.click();
            onPlayAgain();
          }}
          className="btn btn-warning w-100 py-3 rounded-4 fw-bolder text-xs d-flex align-items-center justify-center gap-2 gold-gradient-bg text-dark border-0 shadow-lg"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Play Again</span>
        </button>

        <button
          onClick={() => {
            playSound.click();
            onBackToDashboard();
          }}
          className="btn btn-dark w-100 py-2.5 rounded-4 text-slate-300 hover:text-white fw-bold text-xs d-flex align-items-center justify-center gap-2 bg-[#191C2B] border border-white/10"
        >
          <Home className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>
      </div>
    </div>
  );
};
