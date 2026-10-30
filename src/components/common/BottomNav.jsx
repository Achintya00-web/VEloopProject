import React from 'react';
import { Home, DollarSign, Gift, Wallet, Gamepad2 } from 'lucide-react';
import { playSound } from '../../utils/audio.js';

export const BottomNav = ({ currentView, onNavigate }) => {
  const navItems = [
    { view: 'dashboard', label: 'Home', icon: Home },
    { view: 'earn', label: 'Earn', icon: DollarSign },
    { view: 'game', label: 'Game', icon: Gamepad2 },
    { view: 'rewards', label: 'Rewards', icon: Gift },
    { view: 'activity', label: 'Activity', icon: Wallet },
  ];

  return (
    <nav className="fixed-bottom z-40 bg-[#161827]/95 backdrop-blur-xl border-t border-white/10 d-md-none">
      <div className="row g-0 h-16 align-items-center text-center">
        {navItems.map((item) => {
          const isActive = currentView === item.view;
          const Icon = item.icon;

          return (
            <button
              key={item.view}
              onClick={() => {
                playSound.click();
                onNavigate(item.view);
              }}
              className={`col d-flex flex-column align-items-center justify-content-center h-full bg-transparent border-0 transition-all ${
                isActive ? 'text-[#F4C542]' : 'text-slate-400'
              }`}
            >
              <div className="position-relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
                {isActive && (
                  <span className="position-absolute -bottom-1 start-50 translate-middle-x w-1 h-1 rounded-circle bg-[#F4C542]" />
                )}
              </div>
              <span className={`text-[10px] mt-1 ${isActive ? 'fw-bold' : 'fw-medium'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
