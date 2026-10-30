import React, { useState } from 'react';
import { Menu, Bell, Sparkles, RefreshCw, Smartphone, Monitor } from 'lucide-react';
import { playSound } from '../../utils/audio.js';

export const Header = ({
  uiState,
  onSetUiState,
  onTriggerLevelUp,
  onQuickAddXP,
  onResetDemo,
  isMobilePreview,
  onToggleMobilePreview,
  unreadCount = 2,
}) => {
  const [showDemoMenu, setShowDemoMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <header className="w-full border-b border-white/5 bg-[#161827]/95 backdrop-blur-md sticky top-0 z-40">
      {/* Dev & Evaluation Prototype Control Bar */}
      <div className="container-fluid px-3 py-1 bg-[#0e101a] border-b border-white/5 text-[11px] text-slate-400 d-flex flex-wrap justify-content-between align-items-center gap-2">
        <div className="d-flex align-items-center gap-2">
          <span className="fw-bold text-[#F4C542] text-uppercase">Prototype:</span>
          <button
            onClick={() => {
              playSound.click();
              onTriggerLevelUp();
            }}
            className="px-2 py-0.5 rounded bg-[#F4C542]/15 text-[#F4C542] hover:bg-[#F4C542]/25 font-medium transition-colors d-flex align-items-center gap-1 border-0"
          >
            <Sparkles className="w-3 h-3" />
            Test Level-Up
          </button>
          <button
            onClick={() => {
              playSound.click();
              onQuickAddXP();
            }}
            className="px-2 py-0.5 rounded bg-purple-500/15 text-purple-300 hover:bg-purple-500/25 font-medium transition-colors border-0"
          >
            +200 XP Boost
          </button>
        </div>

        <div className="d-flex align-items-center gap-2">
          <div className="d-flex align-items-center gap-1 bg-[#191c2b] p-0.5 rounded border border-white/5">
            {['normal', 'loading', 'empty', 'error'].map((state) => (
              <button
                key={state}
                onClick={() => {
                  playSound.click();
                  onSetUiState(state);
                }}
                className={`px-2 py-0.5 rounded text-capitalize text-[10px] font-medium transition-colors border-0 ${
                  uiState === state ? 'bg-[#F4C542] text-dark fw-bold' : 'text-slate-400 bg-transparent'
                }`}
              >
                {state}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              playSound.click();
              onToggleMobilePreview();
            }}
            className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors d-flex align-items-center gap-1 border-0"
          >
            {isMobilePreview ? <Monitor className="w-3 h-3" /> : <Smartphone className="w-3 h-3" />}
            <span className="d-none d-sm-inline">{isMobilePreview ? 'Desktop' : 'Mobile'}</span>
          </button>

          <button
            onClick={() => {
              playSound.click();
              onResetDemo();
            }}
            title="Reset default values"
            className="p-1 text-slate-400 hover:text-white transition-colors bg-transparent border-0"
          >
            <RefreshCw className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Main Top Header matching Page 33 */}
      <div className="container-fluid max-w-7xl px-3 py-2 d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-3">
          <button
            onClick={() => {
              playSound.click();
              setShowDemoMenu(!showDemoMenu);
            }}
            className="w-10 h-10 rounded-xl bg-[#191C2B] border border-white/10 d-flex align-items-center justify-center text-slate-300 hover:text-white transition-all active:scale-95"
            aria-label="Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <h1 className="text-base sm:text-lg font-bold text-white tracking-tight d-flex align-items-center gap-1 mb-0 font-display">
              {getGreeting()}, <span className="gold-gradient-text">VeLooper!</span>
            </h1>
            <p className="text-xs text-slate-400 d-none d-sm-block mb-0">
              Level up your journey and unlock epic rewards every day.
            </p>
          </div>
        </div>

        <div className="d-flex align-items-center gap-2">
          <div className="relative">
            <button
              onClick={() => {
                playSound.click();
                setShowNotifications(!showNotifications);
              }}
              className="w-10 h-10 rounded-xl bg-[#191C2B] border border-white/10 d-flex align-items-center justify-center text-slate-300 hover:text-white transition-all relative active:scale-95"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="position-absolute top-2 end-2 w-2 h-2 rounded-circle bg-[#F4C542]" />
              )}
            </button>

            {showNotifications && (
              <div className="position-absolute end-0 mt-2 w-72 rounded-2xl bg-[#191C2B] border border-white/10 shadow-2xl p-3 z-50 animate-in fade-in">
                <div className="d-flex justify-content-between align-items-center pb-2 border-bottom border-white/5 mb-2">
                  <span className="text-xs fw-bold text-white text-uppercase">Notifications</span>
                  <span className="text-[10px] text-[#F4C542]">2 New</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="p-2 rounded-xl bg-white/5 border border-white/5">
                    <p className="fw-semibold text-slate-200 mb-0">Level 05 Perks Unlocked!</p>
                    <p className="text-slate-400 text-[11px] mb-0">You are 80.25% through Level 05.</p>
                  </div>
                  <div className="p-2 rounded-xl bg-white/5 border border-white/5">
                    <p className="fw-semibold text-slate-200 mb-0">Daily Streak Maintained 🔥</p>
                    <p className="text-slate-400 text-[11px] mb-0">7-day active streak reached!</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="px-3 pb-2 d-sm-none">
        <p className="text-xs text-slate-400 mb-0">
          Level up your journey and unlock epic rewards every day.
        </p>
      </div>
    </header>
  );
};
