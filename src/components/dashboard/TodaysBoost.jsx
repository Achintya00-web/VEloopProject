import React from 'react';
import { Zap, Star, CheckSquare, Flame } from 'lucide-react';
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
      icon: Star,
      iconColor: 'text-[#F4C542]',
      bgColor: 'bg-[#F4C542]/10',
      borderColor: 'border-[#F4C542]/20',
    },
    {
      id: 'tasks',
      label: 'Tasks Done',
      value: `${tasksDone} / ${totalTasks}`,
      icon: CheckSquare,
      iconColor: 'text-[#65A9FF]',
      bgColor: 'bg-[#65A9FF]/10',
      borderColor: 'border-[#65A9FF]/20',
    },
    {
      id: 'streak',
      label: 'Streak',
      value: `${streakDays} Days`,
      icon: Flame,
      iconColor: 'text-[#FF7A45]',
      bgColor: 'bg-[#FF7A45]/10',
      borderColor: 'border-[#FF7A45]/20',
    },
  ];

  return (
    <section className="mt-4">
      <div className="d-flex align-items-center gap-1 mb-2">
        <Zap className="w-4 h-4 text-[#F4C542] fill-[#F4C542]" />
        <h2 className="text-xs fw-bolder text-white text-uppercase tracking-wider font-display mb-0">
          Today's Boost
        </h2>
      </div>

      <div className="row g-2">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.id} className="col-4">
              <div
                onClick={() => {
                  playSound.click();
                  if (onCardClick) onCardClick(card.id);
                }}
                className={`card rounded-4 bg-[#191C2B] border ${card.borderColor} p-2 p-sm-3 d-flex flex-column align-items-center justify-content-center text-center cursor-pointer shadow-sm`}
              >
                <div
                  className={`w-9 h-9 rounded-circle ${card.bgColor} d-flex align-items-center justify-center mb-1`}
                >
                  <Icon className={`w-4 h-4 ${card.iconColor}`} />
                </div>
                <span className="text-[10px] sm:text-[11px] fw-medium text-slate-400 mb-0.5">
                  {card.label}
                </span>
                <span className="text-xs sm:text-sm fw-bold text-white tabular-nums font-display">
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
