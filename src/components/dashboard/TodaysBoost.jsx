import React from 'react';
import { CheckSquare, Flame, Play, Users, Zap } from 'lucide-react';
import { playSound } from '../../utils/audio.js';

export const TodaysBoost = ({
  tasksDone,
  totalTasks,
  streakDays,
  onCardClick,
}) => {
  const cards = [
    { id: 'game', label: 'Play & Earn', reward: '+50 XP', icon: Play, tile: 'play', tone: 'purple' },
    { id: 'tasks', label: 'Daily Tasks', reward: `+${Math.max(1, totalTasks - tasksDone) * 10} XP`, icon: CheckSquare, tile: 'tasks', tone: 'teal' },
    { id: 'streak', label: 'Streak Bonus', reward: `+${streakDays * 5} XP`, icon: Flame, tile: 'flame', tone: 'orange' },
    { id: 'refer', label: 'Refer & Earn', reward: '+100 XP', icon: Users, tile: 'users', tone: 'blue' },
  ];

  return (
    <section className="todays-boost-section">
      <div className="d-flex justify-content-between align-items-center gap-2 mb-2">
        <div className="d-flex align-items-center gap-1">
          <Zap className="w-4 h-4 text-[#F4C542] fill-[#F4C542]" />
          <h2 className="fw-bolder text-white text-uppercase tracking-wider font-display mb-0">Quick Access</h2>
        </div>
        <span className="todays-boost-section__more">View All <b>→</b></span>
      </div>

      <div className="todays-boost-grid">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <button
                type="button"
                key={card.id}
                onClick={() => {
                  playSound.click();
                  if (onCardClick) onCardClick(card.id);
                }}
                className={`card todays-boost-card todays-boost-card--${card.id} rounded-4 p-2 d-flex flex-column align-items-center justify-content-center text-center shadow-sm`}
              >
                <span className={`todays-boost-card__icon todays-boost-card__icon--${card.tone}`}><Icon size={18} fill={card.id === 'game' ? 'currentColor' : 'none'} /></span>

                <span className="todays-boost-card__label fw-medium text-slate-400 mb-0.5">
                  {card.label}
                </span>
                <span className={`todays-boost-card__value todays-boost-card__value--${card.tone} fw-bold text-white tabular-nums font-display`}>
                  {card.reward}
                </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
