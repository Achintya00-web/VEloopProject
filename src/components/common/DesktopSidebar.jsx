import React, { useEffect, useState } from 'react';
import { Award, Gift, Home, ListChecks, Settings, Trophy } from 'lucide-react';
import { TreasureChest } from './GameAssets.jsx';
import { playSound } from '../../utils/audio.js';

const items = [
  { view: 'dashboard', label: 'Dashboard', icon: Home },
  { view: 'rewards', label: 'Rewards', icon: Gift },
  { view: 'earn', label: 'Quests', icon: ListChecks },
  { view: 'dashboard', label: 'Leaderboard', icon: Trophy, section: 'leaderboard' },
  { view: 'dashboard', label: 'Achievements', icon: Award, section: 'achievements' },
];

export const DesktopSidebar = ({ currentView, onNavigate, onOpenSettings }) => {
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    setActiveSection(null);
  }, [currentView]);

  return (
  <aside className="desktop-sidebar">
    <button className="desktop-sidebar__brand" onClick={() => onNavigate('dashboard')} aria-label="VELOOP Rewards home">
      <span className="desktop-sidebar__brand-mark">V</span>
      <span>VELOOP <b>REWARDS</b></span>
    </button>

    <nav className="desktop-sidebar__nav" aria-label="Main navigation">
      {items.map(({ view, label, icon: Icon, section }) => {
        const isActive = section ? activeSection === section : view === currentView && !activeSection;
        return (
        <button
          key={label}
          className={`desktop-sidebar__link ${isActive ? 'is-active' : ''}`}
          aria-current={isActive ? 'page' : undefined}
          onClick={() => {
            playSound.click();
            setActiveSection(section || null);
            onNavigate(view);
            if (section) {
              window.setTimeout(() => {
                document.getElementById(section)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }, 80);
            }
          }}
        >
          <Icon size={16} strokeWidth={2.2} />
          <span>{label}</span>
        </button>
        );
      })}
      <button
        className="desktop-sidebar__link"
        onClick={() => {
          playSound.click();
          onOpenSettings();
        }}
      >
        <Settings size={16} strokeWidth={2.2} />
        <span>Settings</span>
      </button>
    </nav>

    <div className="desktop-sidebar__promo">
      <div className="desktop-sidebar__chest"><TreasureChest size={82} /></div>
      <strong>Level Up<br />Your Journey!</strong>
      <button
        onClick={() => {
          playSound.click();
          onNavigate('rewards');
        }}
      >
        Explore Rewards <span>→</span>
      </button>
    </div>

    <div className="desktop-sidebar__season"><i /> SEASON 04 ACTIVE</div>
  </aside>
  );
};
