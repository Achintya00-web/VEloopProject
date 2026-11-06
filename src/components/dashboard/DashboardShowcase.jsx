import React from 'react';
import { ArrowRight, Crown, Shield, Trophy, Users, Zap } from 'lucide-react';
import { BadgeIcon } from '../common/BadgeIcon.jsx';
import { playSound } from '../../utils/audio.js';

const leaderboard = [
  { name: 'TechKing007', score: '125,000 XP', rank: 1, initials: 'TK' },
  { name: 'CodeWizard', score: '98,750 XP', rank: 2, initials: 'CW' },
  { name: 'DevMaster', score: '87,200 XP', rank: 3, initials: 'DM' },
  { name: 'Achintya', score: '64,200 XP', rank: 4, initials: 'AV', current: true },
  { name: 'ProGamer', score: '52,300 XP', rank: 5, initials: 'PG' },
];

const achievements = [
  { title: 'Early Bird', detail: 'Login 5 Days', level: 1 },
  { title: 'Quest Master', detail: 'Complete 50 Quests', level: 5 },
  { title: 'XP Grinder', detail: 'Earn 100K XP', level: 6 },
  { title: 'Social Butterfly', detail: 'Refer 10 Friends', level: 3 },
  { title: 'Streak Legend', detail: 'Maintain 30 Day Streak', level: 4 },
];

export const DashboardShowcase = ({ onViewLeaderboard, onViewAchievements }) => (
  <section className="dashboard-showcase">
    <article className="dashboard-showcase__panel leaderboard-panel" id="leaderboard">
      <div className="dashboard-showcase__heading">
        <div><Trophy size={20} /><span><strong>Leaderboard</strong><small>See how you rank among other VEloopers!</small></span></div>
        <button onClick={() => { playSound.click(); onViewLeaderboard(); }}>View Full Leaderboard <ArrowRight size={12} /></button>
      </div>
      <div className="leaderboard-tabs"><span className="is-active">Weekly</span><span>Monthly</span><span>All Time</span></div>
      <ol className="leaderboard-list">
        {leaderboard.map((user) => (
          <li key={user.name} className={user.current ? 'is-current' : ''}>
            <b className={`leaderboard-list__rank leaderboard-list__rank--${user.rank}`}>{user.rank === 1 ? <Crown size={13} /> : user.rank}</b>
            <span className={`leaderboard-list__avatar leaderboard-list__avatar--${user.rank}`} aria-hidden="true">{user.initials}</span>
            <strong>{user.name}</strong>
            <span>{user.score}</span>
          </li>
        ))}
      </ol>
    </article>

    <article className="dashboard-showcase__panel achievements-panel" id="achievements">
      <div className="dashboard-showcase__heading">
        <div><Shield size={20} /><span><strong>Achievements</strong><small>Unlock achievements and showcase your skills!</small></span></div>
        <button onClick={() => { playSound.click(); onViewAchievements(); }}>View All <ArrowRight size={12} /></button>
      </div>
      <div className="achievement-list">
        {achievements.map((achievement) => (
          <div className="achievement-item" key={achievement.title}>
            <BadgeIcon level={achievement.level} size="md" glow={achievement.title === 'Quest Master'} />
            <strong>{achievement.title}</strong>
            <small>{achievement.detail}</small>
          </div>
        ))}
      </div>
      <div className="achievements-panel__foot"><Users size={12} /> 12 achievements unlocked <span><Zap size={11} /> 3,450 XP earned</span></div>
    </article>
  </section>
);
