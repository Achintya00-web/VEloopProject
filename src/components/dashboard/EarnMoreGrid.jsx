import React from 'react';
import { ArrowRight } from 'lucide-react';
import { SolidRewardIcon } from '../common/SolidRewardIcon.jsx';
import { playSound } from '../../utils/audio.js';

export const EarnMoreGrid = ({ onSelectActivity, onViewAllEarn }) => {
  const items = [
    {
      id: 'act-watch',
      title: 'Watch & Earn',
      icon: 'play',
      reward: '+50 XP',
      color: 'from-purple-500/20 to-purple-600/5',
      iconColor: 'text-purple-400',
      badgeColor: 'text-purple-300',
    },
    {
      id: 'act-tasks',
      title: 'Daily Tasks',
      icon: 'tasks',
      reward: '+30 XP',
      color: 'from-blue-500/20 to-blue-600/5',
      iconColor: 'text-blue-400',
      badgeColor: 'text-blue-300',
    },
    {
      id: 'act-refer',
      title: 'Refer & Earn',
      icon: 'users',
      reward: '+100 XP',
      color: 'from-emerald-500/20 to-emerald-600/5',
      iconColor: 'text-emerald-400',
      badgeColor: 'text-emerald-300',
    },
    {
      id: 'act-catcher',
      title: 'XP Catcher',
      icon: 'spark',
      reward: '+10 XP',
      color: 'from-[#F4C542]/20 to-[#D9A52C]/5',
      iconColor: 'text-[#F4C542]',
      badgeColor: 'text-[#F4C542]',
    },
    {
      id: 'act-games',
      title: 'Mini Games',
      icon: 'game',
      reward: '+75 XP',
      color: 'from-indigo-500/20 to-indigo-600/5',
      iconColor: 'text-indigo-400',
      badgeColor: 'text-indigo-300',
    },
    {
      id: 'act-streak',
      title: 'Streak Bonus',
      icon: 'flame',
      reward: '+25 XP',
      color: 'from-amber-500/20 to-amber-600/5',
      iconColor: 'text-amber-400',
      badgeColor: 'text-amber-300',
    },
  ];

  return (
    <section className="mt-4">
      {/* Section Header matching Page 33 */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <div>
          <h2 className="text-xs fw-bolder text-white text-uppercase tracking-wider font-display mb-0">
            Earn More
          </h2>
          <p className="text-[11px] text-slate-400 mb-0">
            Explore fun activities and earn exciting rewards.
          </p>
        </div>

        <button
          onClick={() => {
            playSound.click();
            onViewAllEarn();
          }}
          className="w-8 h-8 rounded-circle bg-white/5 border border-white/10 d-flex align-items-center justify-center text-slate-300 hover:text-[#F4C542]"
          title="View all activities"
          aria-label="View all activities"
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* 6 Grid Cards using Bootstrap row & col */}
      <div className="row g-2">
        {items.map((item) => {
          return (
            <div key={item.id} className="col-4 col-sm-4 col-md-2">
              <button
                onClick={() => {
                  playSound.click();
                  onSelectActivity(item.id);
                }}
                className="w-100 card earn-more-card rounded-4 bg-[#191C2B] hover:bg-[#202438] border border-white/5 p-2 d-flex flex-column align-items-center justify-content-between text-center min-h-[96px] text-decoration-none"
              >
                <div
                  className={`earn-more-card__icon w-9 h-9 rounded-3 bg-gradient-to-br ${item.color} d-flex align-items-center justify-center mb-1`}
                >
                  <SolidRewardIcon name={item.icon} size={18} className={item.iconColor} />
                </div>

                <span className="text-[11px] fw-semibold text-slate-200 text-truncate w-100">
                  {item.title}
                </span>

                <span className={`text-[10px] fw-bold ${item.badgeColor} mt-0.5 tabular-nums`}>
                  {item.reward}
                </span>
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};
