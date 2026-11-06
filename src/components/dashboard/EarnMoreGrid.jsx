import React from 'react';
import { ArrowRight, CheckSquare, Play, Rocket, Users } from 'lucide-react';
import { playSound } from '../../utils/audio.js';

export const EarnMoreGrid = ({ onSelectActivity, onViewAllEarn }) => {
  const items = [
    {
      id: 'act-watch',
      title: 'Watch 3 Videos',
      description: 'Watch any 3 videos to earn XP.',
      icon: 'play',
      reward: '+50 XP',
      tone: 'purple',
      progress: '0 / 3',
    },
    {
      id: 'act-tasks',
      title: 'Complete 5 Tasks',
      description: 'Finish 5 daily tasks.',
      icon: 'tasks',
      reward: '+30 XP',
      tone: 'teal',
      progress: '0 / 5',
    },
    {
      id: 'act-refer',
      title: 'Refer a Friend',
      description: 'Invite a friend to join VEloop.',
      icon: 'users',
      reward: '+100 XP',
      tone: 'cyan',
      progress: '0 / 1',
    },
  ];

  return (
    <section className="mt-4 earn-more-section dashboard-quests" id="quests">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <div className="dashboard-quests__heading">
          <CheckSquare size={20} />
          <span>
          <h2 className="earn-more-section__title fw-bolder text-white text-uppercase tracking-wider font-display mb-0">
            Quests &amp; Challenges
          </h2>
          <p className="earn-more-section__description text-slate-400 mb-0">
            Complete quests, earn XP and collect rewards.
          </p>
          </span>
        </div>

        <button
          onClick={() => {
            playSound.click();
            onViewAllEarn();
          }}
          className="dashboard-quests__all"
          title="View all activities"
          aria-label="View all activities"
        >
          View Full Quests <ArrowRight size={12} />
        </button>
      </div>

      <div className="dashboard-quests__layout">
      <div className="dashboard-quests__cards">
        {items.map((item) => {
          const Icon = item.icon === 'play' ? Play : item.icon === 'tasks' ? CheckSquare : Users;
          return (
            <button
              key={item.id}
              onClick={() => {
                playSound.click();
                onSelectActivity(item.id);
              }}
              className={`card dashboard-quest dashboard-quest--${item.tone}`}
            >
              <span className="dashboard-quest__icon"><Icon size={16} fill={item.icon === 'play' ? 'currentColor' : 'none'} /></span>
              <span className="dashboard-quest__body">
                <strong>{item.title}</strong>
                <small>{item.description}</small>
                <span className="dashboard-quest__progress"><span>{item.progress}</span><i /></span>
              </span>
              <span className="dashboard-quest__action">
                <b>{item.reward}</b>
                <span>Start Quest <ArrowRight size={10} /></span>
              </span>
            </button>
          );
        })}
      </div>
      <button
        className="dashboard-quests__promo"
        onClick={() => {
          playSound.click();
          onSelectActivity('act-catcher');
        }}
      >
        <span><Rocket size={26} /></span>
        <strong>Complete Quests<br />Earn More XP!</strong>
        <small>Boost your progress</small>
      </button>
      </div>
    </section>
  );
};
