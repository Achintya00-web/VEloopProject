import React, { useState } from 'react';
import { ArrowLeft, Filter, ChevronRight } from 'lucide-react';
import { XPOrb, VECoin } from '../common/GameAssets.jsx';
import { RewardIconTile } from '../common/RewardIconTile.jsx';
import { playSound } from '../../utils/audio.js';

export const RecentActivityPage = ({
  history,
  todayXP,
  todayVEs,
  onBack,
}) => {
  const [filterType, setFilterType] = useState('All');
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  const getRecordIcon = (type) => {
    switch (type) {
      case 'referral':
        return 'users';
      case 'task':
        return 'tasks';
      case 'game':
        return 'game';
      case 'catcher':
        return 'spark';
      case 'streak':
      default:
        return 'flame';
    }
  };

  const filteredHistory = history.filter((item) => {
    if (filterType === 'All') return true;
    return item.category === filterType;
  });

  return (
    <div className="w-100 max-w-4xl mx-auto pb-5 user-select-none animate-in fade-in activity-page">
      <div className="d-flex justify-content-between align-items-center px-2 py-3 mb-1">
        <div className="d-flex align-items-center gap-3">
          <button
            onClick={() => {
              playSound.click();
              onBack();
            }}
            className="w-10 h-10 rounded-3 bg-[#191C2B] border border-white/10 d-flex align-items-center justify-center text-slate-300 hover:text-white"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <h2 className="fs-6 fw-bold text-white tracking-wider font-display text-uppercase mb-0">
            Recent Activity
          </h2>
        </div>

        <div className="position-relative">
          <button
            onClick={() => {
              playSound.click();
              setShowFilterMenu(!showFilterMenu);
            }}
            className={`w-10 h-10 rounded-3 border d-flex align-items-center justify-center ${
              filterType !== 'All'
                ? 'bg-[#F4C542]/20 border-[#F4C542] text-[#F4C542]'
                : 'bg-[#191C2B] border-white/10 text-slate-300 hover:text-white'
            }`}
            aria-label="Filter"
          >
            <Filter className="w-4 h-4" />
          </button>

          {showFilterMenu && (
            <div className="position-absolute end-0 mt-2 w-36 rounded-3 bg-[#191C2B] border border-white/10 shadow-2xl p-1 z-40 animate-in fade-in">
              {['All', 'XP', 'VEs'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => {
                    playSound.click();
                    setFilterType(filter);
                    setShowFilterMenu(false);
                  }}
                  className={`w-100 text-start px-3 py-1.5 rounded-2 text-xs fw-semibold border-0 ${
                    filterType === filter ? 'bg-[#F4C542] text-dark' : 'text-slate-300 bg-transparent'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2 px-2">
        {filteredHistory.length === 0 ? (
          <div className="p-4 text-center rounded-4 bg-[#191C2B] border border-white/5">
            <p className="text-xs text-slate-400 mb-0">No records found for this filter.</p>
          </div>
        ) : (
          filteredHistory.map((item) => {
            const icon = getRecordIcon(item.type);
            const isXP = item.rewardType === 'XP';

            return (
              <div
                key={item.id}
                className="card rounded-4 bg-[#191C2B] border border-white/5 p-3 d-flex flex-row justify-content-between align-items-center gap-3 shadow-sm"
              >
                <div className="d-flex align-items-center gap-3 min-w-0">
                  <RewardIconTile name={icon} tone={isXP ? 'purple' : 'gold'} />

                  <div className="min-w-0">
                    <span
                      className={`text-sm fw-bold d-block font-display tabular-nums ${
                        isXP ? 'text-purple-300' : 'text-[#F4C542]'
                      }`}
                    >
                      +{item.amount} {item.rewardType === 'VE' ? 'VEs' : 'XP'}
                    </span>
                    <span className="text-xs fw-semibold text-slate-300 text-truncate d-block">
                      {item.title}
                    </span>
                    <span className="text-[10px] text-slate-500 d-block">
                      {item.timestamp}
                    </span>
                  </div>
                </div>

                <div className="text-slate-600">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Today's Summary Card */}
      <div className="mt-4 mx-2 p-3 rounded-4 bg-gradient-to-r from-[#1A1D2F] via-[#20243C] to-[#1A1D2F] border border-white/10 shadow-lg">
        <h3 className="text-xs fw-bolder text-white text-uppercase tracking-wider font-display mb-2">
          Today's Summary
        </h3>

        <div className="row g-2">
          <div className="col-6">
            <div className="rounded-3 bg-[#161827] border border-white/5 p-2.5 d-flex align-items-center gap-2">
              <XPOrb size={28} />
              <div>
                <span className="fs-6 fw-bold text-white d-block font-display tabular-nums">
                  {todayXP} XP
                </span>
                <span className="text-[10px] text-slate-400">Total Earned</span>
              </div>
            </div>
          </div>

          <div className="col-6">
            <div className="rounded-3 bg-[#161827] border border-white/5 p-2.5 d-flex align-items-center gap-2">
              <VECoin size={26} />
              <div>
                <span className="fs-6 fw-bold text-white d-block font-display tabular-nums">
                  {todayVEs} VEs
                </span>
                <span className="text-[10px] text-slate-400">Total Earned</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
