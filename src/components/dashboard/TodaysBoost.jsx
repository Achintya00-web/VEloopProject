import React from 'react';
import { Zap } from 'lucide-react';
import { RewardIconTile } from '../common/RewardIconTile.jsx';
import { playSound } from '../../utils/audio.js';

export const TodaysBoost = ({
  xpEarned,
  tasksDone,
  totalTasks,
  streakDays,
  onCardClick,
}) => {
  const cards = [
    {
      id: 'xp',
      label: 'XP Earned',
      value: `${xpEarned} XP`,
      icon: 'star',
      tone: 'gold',
      borderColor: 'border-[#F4C542]/20',
    },
    {
      id: 'tasks',
      label: 'Tasks Done',
      value: `${tasksDone} / ${totalTasks}`,
      icon: 'tasks',
      tone: 'blue',
      borderColor: 'border-[#65A9FF]/20',
    },
    {
      id: 'streak',
      label: 'Streak',
      value: `${streakDays} Days`,
      icon: 'flame',
      tone: 'orange',
      borderColor: 'border-[#FF7A45]/20',
    },
  ];

  return (
    <section className="mt-4 todays-boost-section">
      <div className="d-flex align-items-center gap-1 mb-2">
        <Zap className="w-4 h-4 text-[#F4C542] fill-[#F4C542]" />
        <h2 className="fw-bolder text-white text-uppercase tracking-wider font-display mb-0">
          Today's Boost
        </h2>
      </div>

      <div className="row g-2">
        {cards.map((card) => {
          return (
            <div key={card.id} className="col-4">
              <div
                onClick={() => {
                  playSound.click();
                  if (onCardClick) onCardClick(card.id);
                }}
                className={`card todays-boost-card todays-boost-card--${card.id} rounded-4 bg-[#191C2B] border ${card.borderColor} p-2 p-sm-3 d-flex flex-column align-items-center justify-content-center text-center cursor-pointer shadow-sm`}
              >
                <RewardIconTile name={card.icon} tone={card.tone} size="small" />
                <span className="todays-boost-card__label fw-medium text-slate-400 mb-0.5">
                  {card.label}
                </span>
                <span className="todays-boost-card__value fw-bold text-white tabular-nums font-display">
                  {card.value}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
