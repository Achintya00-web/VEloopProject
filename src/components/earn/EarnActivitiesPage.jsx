import React, { useState } from 'react';
import { ArrowLeft, Play, CheckSquare, Users, Gamepad2, Flame, Sparkles, ChevronRight, Check } from 'lucide-react';
import { playSound } from '../../utils/audio.js';

export const EarnActivitiesPage = ({
  activities,
  onBack,
  onCompleteActivity,
  onOpenGame,
}) => {
  const [activeModalId, setActiveModalId] = useState(null);

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'watch':
        return Play;
      case 'tasks':
        return CheckSquare;
      case 'refer':
        return Users;
      case 'games':
        return Gamepad2;
      case 'streak':
        return Flame;
      case 'catcher':
      default:
        return Sparkles;
    }
  };

  const getIconTheme = (iconName) => {
    switch (iconName) {
      case 'watch':
        return { bg: 'bg-purple-500/15', color: 'text-purple-400', border: 'border-purple-500/20' };
      case 'tasks':
        return { bg: 'bg-emerald-500/15', color: 'text-emerald-400', border: 'border-emerald-500/20' };
      case 'refer':
        return { bg: 'bg-blue-500/15', color: 'text-blue-400', border: 'border-blue-500/20' };
      case 'games':
        return { bg: 'bg-indigo-500/15', color: 'text-indigo-400', border: 'border-indigo-500/20' };
      case 'streak':
        return { bg: 'bg-amber-500/15', color: 'text-amber-400', border: 'border-amber-500/20' };
      case 'catcher':
      default:
        return { bg: 'bg-[#F4C542]/15', color: 'text-[#F4C542]', border: 'border-[#F4C542]/20' };
    }
  };

  const handleCardClick = (activity) => {
    if (activity.id === 'act-catcher') {
      onOpenGame();
      return;
    }
    setActiveModalId(activity.id);
  };

  const activeActivity = activities.find((a) => a.id === activeModalId);

  return (
    <div className="w-100 max-w-md mx-auto pb-5 user-select-none animate-in fade-in">
      <div className="d-flex align-items-center gap-3 px-2 py-3 mb-1">
        <button
          onClick={() => {
            playSound.click();
            onBack();
          }}
          className="w-10 h-10 rounded-3 bg-[#191C2B] border border-white/10 d-flex align-items-center justify-center text-slate-300 hover:text-white"
          aria-label="Back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div>
          <h2 className="fs-6 fw-bold text-white tracking-wider font-display text-uppercase mb-0">
            Earn & Level Up
          </h2>
          <p className="text-xs text-slate-400 mb-0">
            Complete activities. Earn XP. Climb levels. Get rewards.
          </p>
        </div>
      </div>

      <div className="space-y-2 px-2">
        {activities.map((act) => {
          const Icon = getIcon(act.iconName);
          const theme = getIconTheme(act.iconName);
          const isDone = act.status === 'completed';

          return (
            <div
              key={act.id}
              onClick={() => {
                playSound.click();
                handleCardClick(act);
              }}
              className={`card rounded-4 p-3 d-flex flex-row justify-content-between align-items-center gap-3 cursor-pointer border transition-all ${
                isDone
                  ? 'bg-[#151724]/70 border-emerald-500/20 opacity-80'
                  : 'bg-[#191C2B] border-white/10 hover:bg-[#1E2235]'
              }`}
            >
              <div className="d-flex align-items-center gap-3 flex-1 min-w-0">
                <div
                  className={`w-11 h-11 rounded-3 ${theme.bg} ${theme.border} border d-flex align-items-center justify-center shrink-0`}
                >
                  <Icon className={`w-5 h-5 ${theme.color}`} />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-sm fw-bold text-white font-display text-truncate mb-0">
                    {act.title}
                  </h3>
                  <p className="text-[11px] text-slate-400 text-truncate mb-0">
                    {act.description}
                  </p>
                  <div className="mt-1 d-flex align-items-center gap-2">
                    <span className="text-xs fw-bold text-[#F4C542] font-display tabular-nums">
                      +{act.rewardXP} XP
                    </span>
                    {act.rewardVEs && (
                      <span className="text-[11px] fw-bold text-amber-300 tabular-nums">
                        +{act.rewardVEs} VEs
                      </span>
                    )}
                    {isDone && (
                      <span className="text-[10px] fw-bold text-[#70D68B] d-flex align-items-center gap-0.5">
                        <Check className="w-3 h-3 stroke-[3]" /> Done
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="text-slate-500 shrink-0">
                <ChevronRight className="w-5 h-5" />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 mx-2 p-3 rounded-4 bg-[#1D2032] border border-white/10 d-flex justify-content-between align-items-center shadow-sm">
        <div className="d-flex align-items-center gap-2">
          <span className="fs-4">🏆</span>
          <div>
            <p className="text-xs fw-bold text-white mb-0">
              Keep going! You're doing great!
            </p>
            <p className="text-[11px] text-slate-400 mb-0">
              Complete missions to unlock Level 06.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            playSound.click();
            onOpenGame();
          }}
          className="btn btn-warning btn-sm rounded-3 fw-bold text-[11px] gold-gradient-bg text-dark border-0"
        >
          Play Game
        </button>
      </div>

      {activeActivity && (
        <div className="position-fixed top-0 start-0 w-100 h-100 z-50 d-flex align-items-center justify-content-center p-3 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="w-100 max-w-sm rounded-4 bg-[#191C2B] border border-white/10 p-4 shadow-2xl">
            <h3 className="fs-6 fw-bold text-white font-display mb-1">
              {activeActivity.title}
            </h3>
            <p className="text-xs text-slate-300 mb-3">
              {activeActivity.description}
            </p>

            <div className="p-3 rounded-3 bg-[#161827] border border-white/5 d-flex justify-content-between align-items-center text-xs mb-3">
              <span className="text-slate-400">Reward:</span>
              <span className="fw-bolder text-[#F4C542] font-display">
                +{activeActivity.rewardXP} XP {activeActivity.rewardVEs ? `& +${activeActivity.rewardVEs} VEs` : ''}
              </span>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => {
                  onCompleteActivity(activeActivity.id);
                  setActiveModalId(null);
                }}
                disabled={activeActivity.status === 'completed'}
                className="btn btn-warning w-100 py-2 rounded-3 text-dark fw-bold text-xs gold-gradient-bg border-0"
              >
                {activeActivity.status === 'completed' ? 'Already Claimed' : 'Complete & Earn XP'}
              </button>
              <button
                onClick={() => setActiveModalId(null)}
                className="btn btn-secondary w-100 py-2 rounded-3 text-slate-300 text-xs fw-semibold border-0"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
