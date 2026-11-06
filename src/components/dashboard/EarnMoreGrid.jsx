import React from 'react';
import { ArrowRight } from 'lucide-react';
import { RewardIconTile } from '../common/RewardIconTile.jsx';
import { playSound } from '../../utils/audio.js';

export const EarnMoreGrid = ({ onSelectActivity, onViewAllEarn }) => {
  const items = [
    {
      id: 'act-watch',
      title: 'Watch & Earn',
      icon: 'play',
      reward: '+50 XP',
      tone: 'purple',
      badgeColor: 'text-purple-300',
    },
    {
      id: 'act-tasks',
      title: 'Daily Tasks',
      icon: 'tasks',
      reward: '+30 XP',
      tone: 'teal',
      badgeColor: 'text-blue-300',
    },
    {
      id: 'act-refer',
      title: 'Refer & Earn',
      icon: 'users',
      reward: '+100 XP',
      tone: 'cyan',
      badgeColor: 'text-emerald-300',
    },
    {
      id: 'act-catcher',
      title: 'XP Catcher',
      icon: 'spark',
      reward: '+10 XP',
      tone: 'gold',
      badgeColor: 'text-[#F4C542]',
    },
    {
      id: 'act-games',
      title: 'Mini Games',
      icon: 'game',
      reward: '+75 XP',
      tone: 'blue',
      badgeColor: 'text-indigo-300',
    },
    {
      id: 'act-streak',
      title: 'Streak Bonus',
      icon: 'flame',
      reward: '+25 XP',
      tone: 'orange',
      badgeColor: 'text-amber-300',
    },
  ];

  return (
    <section className="mt-4 earn-more-section">
      {/* Section Header matching Page 33 */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <div>
          <h2 className="earn-more-section__title fw-bolder text-white text-uppercase tracking-wider font-display mb-0">
            Earn More
          </h2>
          <p className="earn-more-section__description text-slate-400 mb-0">
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
            <div key={item.id} className="col-6 col-sm-4 col-md-2">
              <button
                onClick={() => {
                  playSound.click();
                  onSelectActivity(item.id);
                }}
                className={`w-100 card earn-more-card earn-more-card--${item.tone} rounded-4 bg-[#191C2B] hover:bg-[#202438] border border-white/5 p-2 d-flex flex-column align-items-center justify-content-between text-center min-h-[96px] text-decoration-none`}
              >
                <RewardIconTile name={item.icon} tone={item.tone} />

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
