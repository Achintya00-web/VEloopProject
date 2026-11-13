import React, { useMemo, useState } from 'react';
import {
  Check,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Clock,
  Trophy,
} from 'lucide-react';
import { playSound } from '../../utils/audio.js';

import avatarRankOne from '../../assets/images/avatar_rank_one_1794540537399.jpg';
import avatarRankTwo from '../../assets/images/avatar_rank_two_1794540536931.jpg';
import avatarRankThree from '../../assets/images/avatar_rank_three_1794540537222.jpg';
import avatarUserAchintya from '../../assets/images/avatar_user_achintya_1794540537100.jpg';
import avatarPlayerLily from '../../assets/images/avatar_player_lily_1794540537337.jpg';
import avatarPlayerSami from '../../assets/images/avatar_player_sami_1794540536413.jpg';

const PERIOD_TABS = [
  { id: 'weekly', label: 'Weekly', resetLabel: 'Resets in 2d 14h' },
  { id: 'monthly', label: 'Monthly', resetLabel: 'Resets in 16d 8h' },
  { id: 'allTime', label: 'All Time', resetLabel: 'Season 04 Totals' },
];

const STANDINGS_BY_PERIOD = {
  weekly: {
    podium: [
      {
        rank: 2,
        name: 'Aahva',
        xp: 2200,
        avatar: avatarRankTwo,
        initials: 'AA',
        tone: 'silver',
      },
      {
        rank: 1,
        name: 'Rebecca',
        xp: 2300,
        avatar: avatarRankOne,
        initials: 'RB',
        tone: 'gold',
        verified: true,
      },
      {
        rank: 3,
        name: 'Ayaan',
        xp: 2000,
        avatar: avatarRankThree,
        initials: 'AY',
        tone: 'bronze',
      },
    ],
    rows: [
      { rank: 4, name: 'Lily', xp: 1800, avatar: avatarPlayerLily, initials: 'LY' },
      { rank: 5, name: 'Alisha', xp: 1730, avatar: avatarRankTwo, initials: 'AL' },
      { rank: 6, name: 'Sami', xp: 1400, avatar: avatarPlayerSami, initials: 'SM' },
    ],
    extraRows: [
      { rank: 7, name: 'Kabir', xp: 1290, initials: 'KB' },
      { rank: 8, name: 'Meera', xp: 1150, initials: 'MR' },
      { rank: 9, name: 'Dev', xp: 980, initials: 'DV' },
      { rank: 10, name: 'Zoya', xp: 840, initials: 'ZY' },
    ],
    baseUserRank: 23,
    subtitlePrefix: 'this week',
  },
  monthly: {
    podium: [
      {
        rank: 2,
        name: 'Aahva',
        xp: 11450,
        avatar: avatarRankTwo,
        initials: 'AA',
        tone: 'silver',
      },
      {
        rank: 1,
        name: 'Rebecca',
        xp: 12800,
        avatar: avatarRankOne,
        initials: 'RB',
        tone: 'gold',
        verified: true,
      },
      {
        rank: 3,
        name: 'Ayaan',
        xp: 10200,
        avatar: avatarRankThree,
        initials: 'AY',
        tone: 'bronze',
      },
    ],
    rows: [
      { rank: 4, name: 'Lily', xp: 9420, avatar: avatarPlayerLily, initials: 'LY' },
      { rank: 5, name: 'Alisha', xp: 8890, avatar: avatarRankTwo, initials: 'AL' },
      { rank: 6, name: 'Sami', xp: 7940, avatar: avatarPlayerSami, initials: 'SM' },
    ],
    extraRows: [
      { rank: 7, name: 'Kabir', xp: 7410, initials: 'KB' },
      { rank: 8, name: 'Meera', xp: 6980, initials: 'MR' },
      { rank: 9, name: 'Dev', xp: 6620, initials: 'DV' },
      { rank: 10, name: 'Zoya', xp: 6510, initials: 'ZY' },
    ],
    baseUserRank: 14,
    subtitlePrefix: 'this month',
  },
  allTime: {
    podium: [
      {
        rank: 2,
        name: 'Aahva',
        xp: 98750,
        avatar: avatarRankTwo,
        initials: 'AA',
        tone: 'silver',
      },
      {
        rank: 1,
        name: 'Rebecca',
        xp: 125000,
        avatar: avatarRankOne,
        initials: 'RB',
        tone: 'gold',
        verified: true,
      },
      {
        rank: 3,
        name: 'Ayaan',
        xp: 87200,
        avatar: avatarRankThree,
        initials: 'AY',
        tone: 'bronze',
      },
    ],
    rows: [
      { rank: 4, name: 'Lily', xp: 74600, avatar: avatarPlayerLily, initials: 'LY' },
      { rank: 5, name: 'Alisha', xp: 68900, avatar: avatarRankTwo, initials: 'AL' },
      { rank: 6, name: 'Sami', xp: 52300, avatar: avatarPlayerSami, initials: 'SM' },
    ],
    extraRows: [
      { rank: 7, name: 'Kabir', xp: 47850, initials: 'KB' },
      { rank: 8, name: 'Meera', xp: 43100, initials: 'MR' },
      { rank: 9, name: 'Dev', xp: 39400, initials: 'DV' },
      { rank: 10, name: 'Zoya', xp: 34200, initials: 'ZY' },
    ],
    baseUserRank: 9,
    subtitlePrefix: 'all time',
  },
};

const CREST_PALETTES = {
  gold: {
    rim: '#F4C542',
    light: '#FFF4C2',
    dark: '#A96813',
    number: '#FFD56E',
    wing: '#E9A92E',
  },
  silver: {
    rim: '#B9C4D2',
    light: '#FFFFFF',
    dark: '#5D6878',
    number: '#E4ECF5',
    wing: '#9BA8BA',
  },
  bronze: {
    rim: '#D98C43',
    light: '#FFE0B5',
    dark: '#794015',
    number: '#FFC27A',
    wing: '#B86D2B',
  },
};

const ROW_BADGE_PALETTES = [
  { rim: '#A987FF', light: '#EEE6FF', dark: '#633DA6', wing: '#8D67E8' },
  { rim: '#4BD7EF', light: '#D9FBFF', dark: '#147A9A', wing: '#32B5D3' },
  { rim: '#F08ED7', light: '#FFE4F7', dark: '#8B3F77', wing: '#D36DBA' },
  { rim: '#35D89B', light: '#D5FFF0', dark: '#117A58', wing: '#26BD87' },
];

function PodiumCrest({ rank, tone, avatar, name, initials }) {
  const palette = CREST_PALETTES[tone];
  const uid = React.useId().replace(/:/g, '');
  const gradientId = `podium-badge-${tone}-${rank}-${uid}`;
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div className={`vl-podium__crest vl-podium__crest--${tone}`}>
      {/* Back badge frame: swept wings, outer metallic hex-shield & dark recessed bevel */}
      <svg
        className="vl-podium__crest-svg vl-podium__crest-svg--back"
        viewBox="0 0 180 184"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`${gradientId}-rim`} x1="12" y1="8" x2="164" y2="176" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={palette.light} />
            <stop offset="32%" stopColor={palette.rim} />
            <stop offset="68%" stopColor={palette.dark} />
            <stop offset="100%" stopColor={palette.light} />
          </linearGradient>

          <linearGradient id={`${gradientId}-face`} x1="90" y1="35" x2="90" y2="158" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#252536" />
            <stop offset="100%" stopColor="#11131D" />
          </linearGradient>
        </defs>

        {/* Swept faceted wings matching Level Journey BadgeIcon */}
        <path
          d="M39 74 L6 49 L17 81 L6 94 L39 100 L50 86 Z M141 74 L174 49 L163 81 L174 94 L141 100 L130 86 Z"
          fill={palette.wing}
          stroke={`url(#${gradientId}-rim)`}
          strokeWidth="2.2"
          strokeLinejoin="round"
          opacity="0.94"
        />
        <path
          d="M19 75 L39 83 M17 84 L37 92 M161 75 L141 83 M163 84 L143 92"
          stroke={palette.light}
          strokeWidth="1.8"
          strokeLinecap="round"
          opacity="0.72"
        />

        {/* Rank 1 champion crest horns behind top hex emblem */}
        {rank === 1 && (
          <path
            d="M66 24 L56 9 L77 17 M114 24 L124 9 L103 17"
            fill={palette.wing}
            stroke={`url(#${gradientId}-rim)`}
            strokeWidth="2"
            strokeLinejoin="round"
          />
        )}

        {/* Outer metallic hexagonal shield */}
        <polygon
          points="90,22 144,44 144,130 90,174 36,130 36,44"
          fill={`url(#${gradientId}-rim)`}
        />

        {/* Recessed dark bevel channel */}
        <polygon
          points="90,29 137,49 137,126 90,165 43,126 43,49"
          fill="#0B0D14"
        />

        {/* Inner face base (shows behind portrait / fallback initials) */}
        <polygon
          points="90,35 132,53 132,123 90,158 48,123 48,53"
          fill={`url(#${gradientId}-face)`}
        />
      </svg>

      {/* Clipped portrait layer nested inside the faceted hex-shield face */}
      <div className="vl-podium__avatar-box">
        {!imgFailed && avatar ? (
          <img
            src={avatar}
            alt={name}
            className="vl-podium__avatar-img"
            referrerPolicy="no-referrer"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <span className="vl-podium__avatar-fallback">{initials}</span>
        )}
      </div>

      {/* Front badge overlay: inner metallic rim, bevel hairline, corner rivets, bottom chevron & hex rank medallion */}
      <svg
        className="vl-podium__crest-svg vl-podium__crest-svg--front"
        viewBox="0 0 180 184"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`${gradientId}-rim-front`} x1="12" y1="8" x2="164" y2="176" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={palette.light} />
            <stop offset="32%" stopColor={palette.rim} />
            <stop offset="68%" stopColor={palette.dark} />
            <stop offset="100%" stopColor={palette.light} />
          </linearGradient>

          <linearGradient id={`${gradientId}-num`} x1="90" y1="12" x2="90" y2="30" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={palette.light} />
            <stop offset="50%" stopColor={palette.number} />
            <stop offset="100%" stopColor={palette.rim} />
          </linearGradient>
        </defs>

        {/* Inner shield rim */}
        <polygon
          points="90,35 132,53 132,123 90,158 48,123 48,53"
          fill="none"
          stroke={`url(#${gradientId}-rim-front)`}
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Inner chamfer bevel */}
        <polygon
          points="90,41 126,57 126,119 90,150 54,119 54,57"
          fill="none"
          stroke={palette.rim}
          strokeWidth="1.15"
          opacity="0.58"
        />

        {/* Top bevel highlight & metallic rivets */}
        <path d="M51 55 L90 38 L129 55" stroke={palette.light} strokeOpacity="0.45" strokeWidth="1.3" />
        <circle cx="46" cy="54" r="2.2" fill={palette.light} />
        <circle cx="134" cy="54" r="2.2" fill={palette.light} />

        {/* Bottom V-chevron */}
        <path
          d="M76 151 L90 160 L104 151"
          stroke={palette.rim}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Top hexagonal rank emblem matching Level Badge geometry */}
        <polygon
          points="90,5 106,14 106,29 90,38 74,29 74,14"
          fill={`url(#${gradientId}-rim-front)`}
        />
        <polygon
          points="90,8.5 102.5,15.5 102.5,27.5 90,34.5 77.5,27.5 77.5,15.5"
          fill="#11131D"
          stroke={palette.rim}
          strokeWidth="1"
        />
        <text
          x="90"
          y="26.5"
          textAnchor="middle"
          fill={`url(#${gradientId}-num)`}
          fontSize="14.5"
          fontWeight="800"
          fontFamily="'Outfit', 'Plus Jakarta Sans', sans-serif"
          style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.85))' }}
        >
          {rank}
        </text>
      </svg>
    </div>
  );
}

function RowAvatar({ avatar, name, initials, isCurrentUser, rank = 4 }) {
  const [imgFailed, setImgFailed] = useState(false);
  const uid = React.useId().replace(/:/g, '');
  const palette = isCurrentUser
    ? { rim: '#35D89B', light: '#D5FFF0', dark: '#117A58', wing: '#26BD87' }
    : ROW_BADGE_PALETTES[Math.max(0, rank - 4) % ROW_BADGE_PALETTES.length];
  const gradientId = `row-badge-${rank}-${uid}`;

  return (
    <span className={`vl-lb-row__avatar ${isCurrentUser ? 'vl-lb-row__avatar--you' : ''}`}>
      <svg
        className="vl-lb-row__avatar-svg vl-lb-row__avatar-svg--back"
        viewBox="0 0 44 48"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`${gradientId}-rim`} x1="4" y1="2" x2="40" y2="46" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={palette.light} />
            <stop offset="35%" stopColor={palette.rim} />
            <stop offset="70%" stopColor={palette.dark} />
            <stop offset="100%" stopColor={palette.light} />
          </linearGradient>
        </defs>

        {isCurrentUser && (
          <path
            d="M8 18 L1 12 L4 21 L1 25 L8 27 Z M36 18 L43 12 L40 21 L43 25 L36 27 Z"
            fill={palette.wing}
            stroke={`url(#${gradientId}-rim)`}
            strokeWidth="1.1"
            strokeLinejoin="round"
            opacity="0.92"
          />
        )}

        <polygon
          points="22,2 38,11 38,34 22,46 6,34 6,11"
          fill={`url(#${gradientId}-rim)`}
        />
        <polygon
          points="22,4.5 35.5,12.5 35.5,32.5 22,43 8.5,32.5 8.5,12.5"
          fill="#0B0D14"
        />
      </svg>

      <span className="vl-lb-row__avatar-frame">
        {!imgFailed && avatar ? (
          <img
            src={avatar}
            alt={name}
            referrerPolicy="no-referrer"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <span className="vl-lb-row__avatar-fallback">{initials}</span>
        )}
      </span>

      <svg
        className="vl-lb-row__avatar-svg vl-lb-row__avatar-svg--front"
        viewBox="0 0 44 48"
        fill="none"
        aria-hidden="true"
      >
        <polygon
          points="22,6 33.5,13.5 33.5,31.5 22,40.5 10.5,31.5 10.5,13.5"
          fill="none"
          stroke={palette.rim}
          strokeWidth="1.25"
          strokeLinejoin="round"
        />
        <circle cx="10" cy="14" r="1" fill={palette.light} />
        <circle cx="34" cy="14" r="1" fill={palette.light} />
        <path
          d="M18 39 L22 42 L26 39"
          stroke={palette.rim}
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export const DashboardShowcase = ({
  currentLevel = 5,
  currentXP = 6420,
  todayXP = 215,
  onViewLeaderboard,
}) => {
  const [activePeriod, setActivePeriod] = useState('weekly');
  const [showFullStandings, setShowFullStandings] = useState(false);

  const periodMeta =
    PERIOD_TABS.find((tab) => tab.id === activePeriod) || PERIOD_TABS[0];
  const dataset = STANDINGS_BY_PERIOD[activePeriod];

  const userDisplayXP = useMemo(() => {
    if (activePeriod === 'weekly') {
      return `+${todayXP.toLocaleString()} XP`;
    }
    return `${currentXP.toLocaleString()} XP`;
  }, [activePeriod, currentXP, todayXP]);

  const userRank = useMemo(() => {
    const bonusOffset = activePeriod === 'weekly' ? Math.floor(Math.max(0, todayXP - 215) / 100) : Math.floor(Math.max(0, currentXP - 6420) / 500);
    return Math.max(4, dataset.baseUserRank - bonusOffset);
  }, [activePeriod, currentXP, dataset.baseUserRank, todayXP]);

  const visibleRows = showFullStandings
    ? [...dataset.rows, ...dataset.extraRows]
    : dataset.rows;

  const handleTabChange = (tabId) => {
    if (tabId === activePeriod) return;
    playSound.click();
    setActivePeriod(tabId);
  };

  const handleToggleFullStandings = () => {
    playSound.click();
    setShowFullStandings((prev) => !prev);
  };

  return (
    <section className="dashboard-showcase" aria-labelledby="leaderboard-heading">
      <article className="dashboard-showcase__panel vl-leaderboard" id="leaderboard">
        {/* Decorative ambient cosmic stars inside podium backdrop */}
        <span className="vl-lb-star vl-lb-star--1" aria-hidden="true" />
        <span className="vl-lb-star vl-lb-star--2" aria-hidden="true" />
        <span className="vl-lb-star vl-lb-star--3" aria-hidden="true" />
        <span className="vl-lb-star vl-lb-star--4" aria-hidden="true" />

        {/* Header */}
        <header className="vl-lb-header">
          <div className="vl-lb-header__identity">
            <span className="vl-lb-header__emblem" aria-hidden="true">
              <Trophy size={20} />
            </span>
            <div className="vl-lb-header__titles">
              <div className="vl-lb-header__title-row">
                <h2 id="leaderboard-heading">LEADERBOARD</h2>
                <span className="vl-lb-header__season">
                  <span aria-hidden="true">·</span> Season 04 Active
                </span>
              </div>
              <p>See how you rank among elite VeLoopers!</p>
            </div>
          </div>

          <div className="vl-lb-header__controls">
            <span className="vl-lb-reset">
              <Clock size={13} aria-hidden="true" />
              <span>{periodMeta.resetLabel}</span>
            </span>

            <div className="vl-lb-tabs" role="tablist" aria-label="Leaderboard timeframe">
              {PERIOD_TABS.map((tab) => {
                const isActive = tab.id === activePeriod;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`vl-lb-tabs__btn ${isActive ? 'is-active' : ''}`}
                    onClick={() => handleTabChange(tab.id)}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </header>

        {/* Top 3 Podium Spotlight */}
        <div className="vl-podium" aria-label="Top 3 ranked players">
          {dataset.podium.map((player) => (
            <div
              key={`${activePeriod}-${player.rank}`}
              className={`vl-podium__slot vl-podium__slot--${player.tone} ${
                player.rank === 1 ? 'vl-podium__slot--first' : ''
              }`}
            >
              <PodiumCrest
                rank={player.rank}
                tone={player.tone}
                avatar={player.avatar}
                name={player.name}
                initials={player.initials}
              />

              <div className="vl-podium__name">
                <span>{player.name}</span>
                {player.verified && (
                  <span className="vl-podium__verified" title="Season Leader">
                    <Check size={10} strokeWidth={3} />
                  </span>
                )}
              </div>

              <div className="vl-podium__xp tabular-nums">
                <span className="vl-lb-xp-dot" aria-hidden="true" />
                <span>{player.xp.toLocaleString()} XP</span>
              </div>

              <div className="vl-podium__stage" aria-hidden="true">
                <div className="vl-podium__beam" />
                <div className="vl-podium__pedestal">
                  <span className="vl-podium__pedestal-core" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Highlighted YOU row + Ranked Contenders */}
        <div className="vl-lb-list" role="list" aria-label="Leaderboard standings">
          <div className="vl-lb-row vl-lb-row--you" role="listitem">
            <div className="vl-lb-row__left">
              <span className="vl-lb-row__rank vl-lb-row__rank--you tabular-nums">
                #{userRank}
              </span>
              <RowAvatar
                avatar={avatarUserAchintya}
                name="Achintya"
                initials="AC"
                isCurrentUser
                rank={userRank}
              />
              <div className="vl-lb-row__identity">
                <div className="vl-lb-row__name-row">
                  <strong>Achintya</strong>
                  <span className="vl-lb-row__you-tag">YOU</span>
                </div>
                <small className="vl-lb-row__sub">
                  <ChevronUp size={12} aria-hidden="true" />
                  <span>
                    Ranked #{userRank} {dataset.subtitlePrefix} · Level{' '}
                    {String(currentLevel).padStart(2, '0')}
                  </span>
                </small>
              </div>
            </div>

            <div className="vl-lb-row__xp tabular-nums">
              <span className="vl-lb-xp-dot" aria-hidden="true" />
              <span>{userDisplayXP}</span>
            </div>
          </div>

          {visibleRows.map((player) => (
            <div
              key={`${activePeriod}-row-${player.rank}`}
              className="vl-lb-row"
              role="listitem"
            >
              <div className="vl-lb-row__left">
                <span className="vl-lb-row__rank tabular-nums">{player.rank}</span>
                <RowAvatar
                  avatar={player.avatar}
                  name={player.name}
                  initials={player.initials}
                  rank={player.rank}
                />
                <div className="vl-lb-row__identity">
                  <div className="vl-lb-row__name-row">
                    <strong>{player.name}</strong>
                  </div>
                </div>
              </div>

              <div className="vl-lb-row__xp tabular-nums">
                <span className="vl-lb-xp-dot" aria-hidden="true" />
                <span>{player.xp.toLocaleString()} XP</span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <footer className="vl-lb-footer">
          <span className="vl-lb-footer__sync">
            Live rank sync every 15m
            {onViewLeaderboard && (
              <>
                <span aria-hidden="true"> · </span>
                <button
                  type="button"
                  className="vl-lb-footer__activity-link"
                  onClick={() => {
                    playSound.click();
                    onViewLeaderboard();
                  }}
                >
                  Recent XP Log
                </button>
              </>
            )}
          </span>

          <button
            type="button"
            className="vl-lb-footer__cta"
            onClick={handleToggleFullStandings}
            aria-expanded={showFullStandings}
          >
            <span>
              {showFullStandings ? 'Show Top Standings' : 'View Full Standings (100+)'}
            </span>
            {showFullStandings ? (
              <ChevronDown size={15} aria-hidden="true" />
            ) : (
              <ChevronRight size={15} aria-hidden="true" />
            )}
          </button>
        </footer>
      </article>
    </section>
  );
};
