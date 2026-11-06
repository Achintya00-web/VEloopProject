import React, { useEffect, useRef, useState } from 'react';
import {
  Bell,
  Check,
  ChevronRight,
  CircleHelp,
  Coins,
  Flame,
  Gem,
  Menu,
  Monitor,
  RefreshCw,
  Search,
  Settings2,
  Smartphone,
  Sparkles,
  Trophy,
  UserRound,
  Volume2,
  VolumeX,
  X,
  Zap,
} from 'lucide-react';
import { SolidRewardIcon } from './SolidRewardIcon.jsx';
import { playSound } from '../../utils/audio.js';

const navigationItems = [
  { view: 'dashboard', label: 'Dashboard', description: 'Overview & Roadmap', icon: 'home' },
  { view: 'earn', label: 'Earn & Quests', description: 'Daily Tasks & Yield', icon: 'tasks' },
  { view: 'game', label: 'XP Catcher Arcade', description: 'Play 20s Run', icon: 'game' },
  { view: 'activity', label: 'Recent Activity', description: 'Event Log', icon: 'activity' },
  { view: 'rewards', label: 'Reward Vault', description: 'Tier 05 Unlocks', icon: 'gift' },
];

export const Header = ({
  uiState,
  onSetUiState,
  onTriggerLevelUp,
  onQuickAddXP,
  onResetDemo,
  isMobilePreview,
  onToggleMobilePreview,
  currentView,
  onNavigate,
  currentLevel,
  currentXP,
  requiredXP,
  vesBalance,
  gemsBalance,
  streakDays,
  isSoundMuted,
  onToggleSound,
  unreadCount = 2,
}) => {
  const [showNavigationMenu, setShowNavigationMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showDemoControls, setShowDemoControls] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const searchInputRef = useRef(null);
  const progressPercent = Math.min(100, Math.max(0, (currentXP / requiredXP) * 100));

  useEffect(() => {
    if (!showNavigationMenu) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setShowNavigationMenu(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showNavigationMenu]);

  const navigate = (view) => {
    playSound.click();
    onNavigate(view);
    setShowNavigationMenu(false);
    setShowNotifications(false);
  };

  const handleSearchKeyDown = (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      searchInputRef.current?.focus();
      return;
    }

    if (event.key === 'Enter' && searchTerm.trim()) {
      const query = searchTerm.toLowerCase();
      const view = /reward|vault/.test(query)
        ? 'rewards'
        : /game|arcade|catcher/.test(query)
          ? 'game'
          : /activity|history/.test(query)
            ? 'activity'
            : 'earn';
      navigate(view);
      setSearchTerm('');
      searchInputRef.current?.blur();
    }
  };

  return (
    <>
      <header className="app-header sticky-top">
        <div className="app-header__inner">
          <div className="d-flex align-items-center gap-3">
            <button
              onClick={() => {
                playSound.click();
                setShowNavigationMenu(true);
              }}
              className="app-icon-button app-menu-button"
              aria-label="Open navigation menu"
              aria-expanded={showNavigationMenu}
              aria-controls="app-navigation-drawer"
            >
              <Menu size={19} />
            </button>
            <button className="app-brand" onClick={() => navigate('dashboard')} aria-label="VELOOP Rewards home">
              <span className="app-brand__mark">V</span>
              <span className="app-brand__name">VELOOP <span>REWARDS</span></span>
            </button>
          </div>

          <label className="app-search">
            <Search size={15} />
            <input
              ref={searchInputRef}
              aria-label="Search rewards and quests"
              placeholder="Search rewards, quests..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              onKeyDown={handleSearchKeyDown}
            />
            <kbd>Ctrl K</kbd>
          </label>

          <div className="app-header__actions">
            <div className="app-header__popover-anchor app-demo-anchor">
              <button
                onClick={() => setShowDemoControls(!showDemoControls)}
                className="app-icon-button app-demo-toggle"
                aria-label="Prototype controls"
                aria-expanded={showDemoControls}
              >
                <Settings2 size={16} />
              </button>
              {showDemoControls && (
                <div className="app-demo-controls">
                  <strong>Prototype controls</strong>
                  <button onClick={onTriggerLevelUp}><Sparkles size={12} /> Test Level-Up</button>
                  <button onClick={onQuickAddXP}><Zap size={12} /> +200 XP Boost</button>
                  <div className="app-demo-states" aria-label="Demo UI state">
                    {['normal', 'loading', 'empty', 'error'].map((state) => (
                      <button
                        key={state}
                        onClick={() => onSetUiState(state)}
                        className={uiState === state ? 'is-selected' : ''}
                      >
                        {uiState === state && <Check size={10} />}
                        {state}
                      </button>
                    ))}
                  </div>
                  <button onClick={onToggleMobilePreview}>
                    {isMobilePreview ? <Monitor size={12} /> : <Smartphone size={12} />}
                    {isMobilePreview ? 'Desktop preview' : 'Mobile preview'}
                  </button>
                  <button onClick={onResetDemo}><RefreshCw size={12} /> Reset demo</button>
                </div>
              )}
            </div>
            <div className="app-balance-chip app-balance-chip--gold">
              <Coins size={13} />
              <span>{vesBalance.toLocaleString()} VEs</span>
            </div>
            <div className="app-balance-chip app-balance-chip--purple d-none d-md-flex">
              <Gem size={13} />
              <span>{gemsBalance} Gems</span>
            </div>
            <div className="app-balance-chip app-balance-chip--muted d-none d-sm-flex">
              <Flame size={13} />
              <span>{streakDays} Days</span>
            </div>

            <button
              onClick={onToggleSound}
              className="app-icon-button app-sound-toggle"
              aria-label={isSoundMuted ? 'Unmute sounds' : 'Mute sounds'}
              aria-pressed={isSoundMuted}
              title={isSoundMuted ? 'Unmute sounds' : 'Mute sounds'}
            >
              {isSoundMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>

            <div className="app-header__popover-anchor">
              <button
                onClick={() => {
                  playSound.click();
                  setShowNotifications(!showNotifications);
                }}
                className="app-icon-button app-notification-button"
                aria-label="Notifications"
                aria-expanded={showNotifications}
              >
                <Bell size={17} />
                {unreadCount > 0 && <span className="app-notification-dot" />}
              </button>
              {showNotifications && (
                <div className="app-notification-popover">
                  <div className="d-flex justify-content-between align-items-center pb-2 mb-2 border-bottom border-white/10">
                    <strong>Notifications</strong>
                    <span className="app-notification-new">{unreadCount} New</span>
                  </div>
                  <div className="app-notification-item">
                    <strong>Level {String(currentLevel).padStart(2, '0')} perks unlocked</strong>
                    <span>You are {progressPercent.toFixed(1)}% through your level.</span>
                  </div>
                  <div className="app-notification-item">
                    <strong>Daily streak maintained</strong>
                    <span>Your {streakDays}-day streak is active.</span>
                  </div>
                </div>
              )}
            </div>

            <button
              className="app-profile-chip"
              aria-label={`Profile, level ${currentLevel}`}
              onClick={() => {
                playSound.click();
                setShowNavigationMenu(true);
              }}
            >
              <span className="app-profile-chip__avatar"><UserRound size={15} /></span>
              <span className="app-profile-chip__level">LVL {String(currentLevel).padStart(2, '0')}</span>
            </button>
          </div>
        </div>

      </header>

      <div
        className={`app-drawer-backdrop ${showNavigationMenu ? 'is-visible' : ''}`}
        onClick={() => setShowNavigationMenu(false)}
        aria-hidden="true"
      />
      <aside
        id="app-navigation-drawer"
        className={`app-navigation-drawer ${showNavigationMenu ? 'is-open' : ''}`}
        role="dialog"
        aria-modal={showNavigationMenu}
        aria-label="VELOOP Rewards navigation"
        aria-hidden={!showNavigationMenu}
        inert={!showNavigationMenu}
      >
        <div className="app-drawer__top">
          <div className="app-drawer__brand">
            <span className="app-brand__mark">V</span>
            <div>
              <strong>VELOOP REWARDS</strong>
              <span>PROTOCOL V4.2</span>
            </div>
          </div>
          <button
            onClick={() => setShowNavigationMenu(false)}
            className="app-icon-button app-drawer__close"
            aria-label="Close navigation menu"
            tabIndex={showNavigationMenu ? 0 : -1}
          >
            <X size={17} />
          </button>
        </div>

        <div className="app-season-pill">
          <span><i /> SEASON 04 ACTIVE</span>
          <b>14d Remaining</b>
        </div>

        <nav className="app-drawer__nav" aria-label="Main navigation">
          {navigationItems.map((item) => {
            const active = currentView === item.view;
            return (
              <button
                key={item.view}
                onClick={() => navigate(item.view)}
                className={`app-drawer-link ${active ? 'is-active' : ''}`}
                aria-current={active ? 'page' : undefined}
                tabIndex={showNavigationMenu ? 0 : -1}
              >
                <span className="app-drawer-link__icon"><SolidRewardIcon name={item.icon} size={17} /></span>
                <span className="app-drawer-link__text">
                  <strong>{item.label}</strong>
                  <small>{item.description}</small>
                </span>
                {item.view === 'dashboard' && active && <b className="app-drawer-link__status">ACTIVE</b>}
                {item.view === 'game' && <b className="app-drawer-link__reward">+75 XP</b>}
                {item.view === 'rewards' && <b className="app-drawer-link__reward">420 VEs</b>}
              </button>
            );
          })}
        </nav>

        <div className="app-drawer__footer">
          <div className="app-drawer__user">
            <span className="app-drawer__avatar"><UserRound size={18} /></span>
            <div className="app-drawer__user-details">
              <strong>Alex Vance <b>LVL {String(currentLevel).padStart(2, '0')}</b></strong>
              <span><i /> Platinum Vanguard</span>
            </div>
            <button
              className="app-drawer__help"
              onClick={() => {
                setShowNavigationMenu(false);
                onNavigate('activity');
              }}
              aria-label="View account activity"
              tabIndex={showNavigationMenu ? 0 : -1}
            >
              <CircleHelp size={15} />
            </button>
          </div>
          <div className="app-drawer__progress-heading">
            <span>XP Progress to Lvl {String(currentLevel + 1).padStart(2, '0')}</span>
            <strong>{currentXP.toLocaleString()} / {requiredXP.toLocaleString()}</strong>
          </div>
          <div className="app-drawer__progress">
            <span style={{ width: `${progressPercent}%` }} />
          </div>
          <div className="app-drawer__wallet">
            <span><Coins size={13} /> Ready Yield <b>{vesBalance.toLocaleString()} VEs</b></span>
            <span><Gem size={13} /> Gems Vault <b>{gemsBalance} Gems</b></span>
          </div>
          <div className="app-drawer__fineprint"><Trophy size={11} /> Your rewards are ready to claim</div>
        </div>
      </aside>
    </>
  );
};
