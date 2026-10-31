import React, { useState } from 'react';
import { Play, CheckSquare, Users, Gamepad2, Flame, Sparkles, ChevronRight, Check, Zap, Coins, Activity, Trophy } from 'lucide-react';
import { SolidRewardIcon } from '../common/SolidRewardIcon.jsx';
import { playSound } from '../../utils/audio.js';

export const EarnActivitiesPage = ({
  activities,
  history,
  todayXP,
  todayVEs,
  onViewActivity,
  onCompleteActivity,
  onOpenGame,
}) => {
  const [activeModalId, setActiveModalId] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'watch':
        return 'play';
      case 'tasks':
        return 'tasks';
      case 'refer':
        return 'users';
      case 'games':
        return 'game';
      case 'streak':
        return 'flame';
      case 'catcher':
      default:
        return 'spark';
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
  const completedCount = activities.filter((activity) => activity.status === 'completed').length;
  const filterOptions = [
    { id: 'all', label: 'All Activities', icon: Sparkles },
    {
      id: 'daily',
      label: `Daily Quests (${activities.filter((activity) => ['watch', 'tasks', 'streak'].includes(activity.iconName) && activity.status !== 'completed').length} available)`,
      icon: CheckSquare,
    },
    { id: 'arcade', label: 'Arcade & Gaming', icon: Gamepad2 },
    { id: 'social', label: 'Social & Referrals', icon: Users },
  ];
  const filteredActivities = activities.filter((activity) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'daily') return ['watch', 'tasks', 'streak'].includes(activity.iconName);
    if (activeFilter === 'arcade') return ['games', 'catcher'].includes(activity.iconName);
    return activity.iconName === 'refer';
  });
  const recentHistory = history.slice(0, 4);

  return (
    <div className="w-100 max-w-6xl mx-auto pb-5 user-select-none animate-in fade-in earn-page">
      <div className="earn-page__hero">
        <div>
          <div className="earn-page__eyebrow"><span><i /> CAMPAIGN HUB</span><b>SEASON 04 ACTIVE</b></div>
          <h1>Earn &amp; Level Up</h1>
          <p>Complete daily quests, mini-games, and partner activities to accelerate your level progression and unlock rewards.</p>
          <div className="earn-page__filters">
            {filterOptions.map((option) => {
              const Icon = option.icon;
              return (
                <button
                  key={option.id}
                  type="button"
                  className={activeFilter === option.id ? 'is-active' : ''}
                  aria-pressed={activeFilter === option.id}
                  onClick={() => {
                    playSound.click();
                    setActiveFilter(option.id);
                  }}
                >
                  <Icon size={11} /> {option.label}
                </button>
              );
            })}
          </div>
        </div>
        <div className="earn-page__vault">
          <span><Zap size={12} /> XP Vault <b>{todayXP.toLocaleString()} XP</b></span>
          <span><Coins size={12} /> Ready Yield <b>{todayVEs.toLocaleString()} VEs</b></span>
        </div>
      </div>

      <div className="row g-3">
        <div className="col-12 col-lg-7">
          <section className="earn-quests">
            <div className="earn-quests__heading">
              <div><h2><CheckSquare size={15} /> Available Quests</h2><span>{filteredActivities.length} tasks available</span></div>
              <span className="earn-quests__season"><i /> DAILY RESET IN 14H 22M</span>
            </div>
            <div className="earn-quests__list">
              {filteredActivities.map((act) => {
                const icon = getIcon(act.iconName);
                const theme = getIconTheme(act.iconName);
                const isDone = act.status === 'completed';

                return (
                  <button
                    key={act.id}
                    onClick={() => {
                      playSound.click();
                      handleCardClick(act);
                    }}
                    className={`earn-quest ${isDone ? 'is-completed' : ''}`}
                  >
                    <span className={`earn-quest__icon ${theme.bg} ${theme.border} ${theme.color}`}>
                      <SolidRewardIcon name={icon} size={19} />
                    </span>
                    <span className="earn-quest__content">
                      <span className="earn-quest__type">{isDone ? 'MILESTONE REACHED' : act.iconName === 'watch' ? 'DAILY QUEST' : 'AVAILABLE QUEST'}</span>
                      <strong>{act.title}</strong>
                      <small>{act.description}</small>
                      <span className="earn-quest__progress"><i style={{ width: isDone ? '100%' : '12%' }} /></span>
                    </span>
                    <span className="earn-quest__reward">
                      <b>+{act.rewardXP} XP</b>
                      {act.rewardVEs > 0 && <small>+{act.rewardVEs} VEs</small>}
                      <span>{isDone ? <><Check size={11} /> Completed</> : <>Start Task <ChevronRight size={11} /></>}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
        </div>

        <div className="col-12 col-lg-5">
          <aside className="earn-sidebar">
            <section className="earn-summary">
              <div className="earn-sidebar__heading"><div><Zap size={14} /><h2>Today’s Summary</h2></div><span>ACTIVE SESSION</span></div>
              <div className="earn-summary__content">
                <div className="earn-summary__ring"><strong>{todayXP}</strong><small>XP EARNED</small></div>
                <div className="earn-summary__stats">
                  <div><i className="is-gold" /><span>XP Gathered</span><b>+{todayXP} XP</b></div>
                  <div><i className="is-purple" /><span>Tokens Minted</span><b>+{todayVEs} VEs</b></div>
                  <div><i className="is-green" /><span>Quests Completed</span><b>{completedCount}/{activities.length}</b></div>
                </div>
              </div>
            </section>

            <section className="earn-recent">
              <div className="earn-sidebar__heading"><div><Activity size={14} /><h2>Recent Activity</h2></div><span>{history.length} EVENTS</span></div>
              <div className="earn-recent__list">
                {recentHistory.length === 0 ? (
                  <p className="earn-recent__empty">Your recent rewards will appear here.</p>
                ) : recentHistory.map((item) => (
                  <div className="earn-recent__item" key={item.id}>
                    <span className="earn-recent__dot"><SolidRewardIcon name="coins" size={14} /></span>
                    <span><strong>{item.title}</strong><small>{item.timestamp}</small></span>
                    <b className={item.rewardType === 'XP' ? 'is-purple' : 'is-gold'}>
                      +{item.amount} {item.rewardType === 'VE' ? 'VEs' : 'XP'}
                    </b>
                  </div>
                ))}
              </div>
              <button
                className="earn-recent__all"
                onClick={() => {
                  playSound.click();
                  onViewActivity();
                }}
              >
                View all events <ChevronRight size={12} />
              </button>
            </section>
          </aside>
        </div>
      </div>

      <div className="earn-encouragement">
        <div className="earn-encouragement__icon"><Trophy size={18} /></div>
        <div>
          <strong>Keep going! You’re doing great.</strong>
          <span>Complete missions to unlock your next level rewards.</span>
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
