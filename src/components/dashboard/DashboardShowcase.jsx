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

const podium = [
  {
    rank: 2,
    name: 'CodeWizard',
    initials: 'CW',
    badge: 'MASTER VANGUARD',
    xp: '98,750 XP',
    streak: '18 Days',
    gems: '+1,200 VES',
    ves: '+200 Gems',
    className: 'leaderboard-card--secondary',
  },
  {
    rank: 1,
    name: 'TechKing007',
    initials: 'TK',
    badge: 'RANK #1',
    xp: '125,000 XP',
    streak: '42 Days',
    gems: '+3,000 VES',
    ves: '+250 Gems',
    className: 'leaderboard-card--champion',
    champion: true,
  },
  {
    rank: 3,
    name: 'DevMaster',
    initials: 'DM',
    badge: 'ELITE TACTICIAN',
    xp: '87,200 XP',
    streak: '12 Days',
    gems: '+800 VES',
    ves: '+60 Gems',
    className: 'leaderboard-card--secondary',
  },
];

const rankedPlayers = [
  { rank: 4, initials: 'AV', name: 'Achintya', detail: 'Level 05 Explorer • 7 Day Streak', xp: '64,200 XP', boost: '+560 VES', gems: '+48 Gems', current: true },
  { rank: 5, initials: 'PG', name: 'ProGamer', detail: 'Rookie • 42 Days', xp: '52,300 XP', boost: '+480 VES', gems: '+20 Gems' },
  { rank: 6, initials: 'SB', name: 'ShadowBlade', detail: 'Quest Hunter • 39 Days', xp: '47,850 XP', boost: '+350 VES', gems: '+25 Gems' },
  { rank: 7, initials: 'NK', name: 'NeonKnight', detail: 'Adventure • 34 Days', xp: '43,100 XP', boost: '+300 VES', gems: '+20 Gems' },
];

export const DashboardShowcase = ({ onViewLeaderboard, onViewAchievements }) => (
  <section className="dashboard-showcase dashboard-showcase--competitive">
    <div className="dashboard-showcase__topbar">
      <div className="dashboard-showcase__meta">
        <span className="season-tag">SEASON 04 ACTIVE</span>
        <span className="crumbs">• Dashboard / Competitive Arena</span>
      </div>
      <button className="dashboard-showcase__boost">XP Boost Active 2x</button>
    </div>

    <article className="dashboard-showcase__panel leaderboard-panel" id="leaderboard">
      <div className="dashboard-showcase__heading">
        <div>
          <span className="leaderboard-icon"><Trophy size={22} /></span>
          <span>
            <strong>LEADERBOARD</strong>
            <small>See how your rank among fellow VEloopers! Climb the ladder to unlock legendary rewards.</small>
          </span>
        </div>
      </div>

      <div className="leaderboard-shell__actions">
        <button type="button" className="leaderboard-chip leaderboard-chip--active">Global Elite</button>
        <button type="button" className="leaderboard-chip">Friends (19)</button>
        <button type="button" className="leaderboard-chip leaderboard-chip--ghost">Resets in 2d 14h</button>
        <button type="button" className="leaderboard-chip leaderboard-chip--ghost">View Full</button>
      </div>

      <div className="leaderboard-tabs"><span className="is-active">Weekly</span><span>Monthly</span><span>All Time</span></div>

      <div className="leaderboard-top3">
        {podium.map((player) => (
          <div key={player.rank} className={`leaderboard-card ${player.className} ${player.champion ? 'leaderboard-card--champion' : ''}`}>
            <div className="leaderboard-card__rank">RANK {player.rank}</div>
            {player.champion && <div className="leaderboard-card__crown"><Crown size={16} /></div>}
            <div className="leaderboard-card__avatar">{player.initials}</div>
            <div className="leaderboard-card__title">{player.name}</div>
            <div className="leaderboard-card__badge">{player.badge}</div>
            <div className="leaderboard-card__stats">
              <span>Total XP</span>
              <b>{player.xp}</b>
            </div>
            <div className="leaderboard-card__row">
              <span>{player.gems}</span>
              <span>{player.ves}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="leaderboard-table">
        <div className="leaderboard-table__head">
          <span>RANK</span>
          <span>PLAYER PROFILE</span>
          <span>SEASON XP</span>
          <span>POTENTIAL PIER LOOT</span>
        </div>

        {rankedPlayers.map((player) => (
          <div key={player.rank} className={`leaderboard-row ${player.current ? 'leaderboard-row--current' : ''}`}>
            <div className="leaderboard-row__rank">#{player.rank}</div>
            <div className="leaderboard-row__profile">
              <span className="leaderboard-row__avatar">{player.initials}</span>
              <div>
                <strong>{player.name}</strong>
                <small>{player.detail}</small>
              </div>
            </div>
            <div className="leaderboard-row__xp">{player.xp}</div>
            <div className="leaderboard-row__rewards">
              <span>{player.boost}</span>
              <span>{player.gems}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="leaderboard-footer">
        <div className="leaderboard-footer__left">
          <span className="leaderboard-footer__icon"><Trophy size={16} /></span>
          <span>Tier Milestone Progress:</span>
          <strong>Earn 23,800 XP more to reach the Bronze Podium spot!</strong>
        </div>
        <button type="button" className="leaderboard-footer__cta">Push your rank now</button>
      </div>
    </article>
  </section>
);
