/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useLevelProgress } from './hooks/useLevelProgress.js';
import { Header } from './components/common/Header.jsx';
import { BottomNav } from './components/common/BottomNav.jsx';
import { InfoModal } from './components/common/InfoModal.jsx';
import { CurrentLevelCard } from './components/dashboard/CurrentLevelCard.jsx';
import { TodaysBoost } from './components/dashboard/TodaysBoost.jsx';
import { EarnMoreGrid } from './components/dashboard/EarnMoreGrid.jsx';
import { LevelRewardChest } from './components/dashboard/LevelRewardChest.jsx';
import { LevelRoadmap } from './components/dashboard/LevelRoadmap.jsx';
import { XPCatcherGame } from './components/game/XPCatcherGame.jsx';
import { ChallengeComplete } from './components/game/ChallengeComplete.jsx';
import { EarnActivitiesPage } from './components/earn/EarnActivitiesPage.jsx';
import { RecentActivityPage } from './components/activity/RecentActivityPage.jsx';
import { LevelUpModal } from './components/modals/LevelUpModal.jsx';
import { RewardDetailsModal } from './components/modals/RewardDetailsModal.jsx';
import { LoadingSkeleton } from './components/states/LoadingSkeleton.jsx';
import { EmptyState } from './components/states/EmptyState.jsx';
import { ErrorState } from './components/states/ErrorState.jsx';
import { Gamepad2 } from 'lucide-react';
import { playSound } from './utils/audio.js';

export default function App() {
  const {
    userState,
    activities,
    history,
    roadmap,
    currentView,
    setCurrentView,
    uiState,
    setUiState,
    isLevelUpModalOpen,
    setIsLevelUpModalOpen,
    isRewardModalOpen,
    setIsRewardModalOpen,
    infoModalContent,
    setInfoModalContent,
    gameResult,
    setGameResult,
    addXP,
    completeActivity,
    handleGameComplete,
    claimLevelUp,
    triggerManualLevelUp,
    resetDemo,
  } = useLevelProgress();

  const [isMobilePreview, setIsMobilePreview] = useState(false);

  const navigateTo = (view) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLevelInfoClick = () => {
    setInfoModalContent({
      title: 'Level Progression Rules',
      body: "XP helps you progress through VELOOP Rewards levels. As you reach new levels, you may unlock additional rewards and experiences according to the platform's level system.",
    });
  };

  const handleRewardInfoClick = () => {
    setInfoModalContent({
      title: 'Next-Level Reward Policy',
      body: 'The displayed reward is associated with the next level according to the current reward configuration.',
    });
  };

  return (
    <div className="min-vh-100 bg-[#161827] text-white d-flex flex-column font-sans selection:bg-[#F4C542]/30 selection:text-white">
      {/* Top Application Header */}
      <Header
        uiState={uiState}
        onSetUiState={setUiState}
        onTriggerLevelUp={triggerManualLevelUp}
        onQuickAddXP={() => addXP(200, 'Developer Boost Mission', 10)}
        onResetDemo={resetDemo}
        isMobilePreview={isMobilePreview}
        onToggleMobilePreview={() => setIsMobilePreview(!isMobilePreview)}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-100 px-3 px-sm-4 py-3 d-flex flex-column align-items-center">
        <div
          className={`w-100 transition-all duration-300 ${
            isMobilePreview
              ? 'max-w-[410px] my-3 rounded-[40px] border-4 border-slate-700 bg-[#161827] shadow-2xl p-3 ring-8 ring-black/40 overflow-hidden'
              : 'max-w-6xl'
          }`}
        >
          {uiState === 'loading' && <LoadingSkeleton />}
          {uiState === 'error' && <ErrorState onRetry={() => setUiState('normal')} />}
          {uiState === 'empty' && (
            <EmptyState
              onStartEarning={() => {
                setUiState('normal');
                navigateTo('earn');
              }}
            />
          )}

          {uiState === 'normal' && (
            <>
              {/* Desktop Navigation Tabs */}
              {!isMobilePreview && (
                <div className="d-none d-md-flex justify-content-between align-items-center gap-3 mb-4 border-bottom border-white/5 pb-3">
                  <div className="d-flex align-items-center gap-2 bg-[#191C2B] p-1 rounded-4 border border-white/10">
                    <button
                      onClick={() => navigateTo('dashboard')}
                      className={`btn btn-sm rounded-3 text-xs fw-bold px-3 py-1.5 border-0 ${
                        currentView === 'dashboard'
                          ? 'btn-warning gold-gradient-bg text-dark'
                          : 'text-slate-400 bg-transparent hover:text-white'
                      }`}
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={() => navigateTo('earn')}
                      className={`btn btn-sm rounded-3 text-xs fw-bold px-3 py-1.5 border-0 ${
                        currentView === 'earn'
                          ? 'btn-warning gold-gradient-bg text-dark'
                          : 'text-slate-400 bg-transparent hover:text-white'
                      }`}
                    >
                      Earn & Level Up
                    </button>
                    <button
                      onClick={() => {
                        setGameResult(null);
                        navigateTo('game');
                      }}
                      className={`btn btn-sm rounded-3 text-xs fw-bold px-3 py-1.5 border-0 d-flex align-items-center gap-1.5 ${
                        currentView === 'game'
                          ? 'btn-warning gold-gradient-bg text-dark'
                          : 'text-slate-400 bg-transparent hover:text-white'
                      }`}
                    >
                      <Gamepad2 className="w-3.5 h-3.5" />
                      XP Catcher Game
                    </button>
                    <button
                      onClick={() => navigateTo('activity')}
                      className={`btn btn-sm rounded-3 text-xs fw-bold px-3 py-1.5 border-0 ${
                        currentView === 'activity'
                          ? 'btn-warning gold-gradient-bg text-dark'
                          : 'text-slate-400 bg-transparent hover:text-white'
                      }`}
                    >
                      Recent Activity
                    </button>
                    <button
                      onClick={() => setIsRewardModalOpen(true)}
                      className="btn btn-sm rounded-3 text-xs fw-bold px-3 py-1.5 border-0 text-slate-400 bg-transparent hover:text-white"
                    >
                      Reward Vault
                    </button>
                  </div>

                  <div className="d-flex align-items-center gap-3 bg-[#191C2B] px-3 py-1.5 rounded-3 border border-white/5 text-xs">
                    <div className="d-flex align-items-center gap-1.5">
                      <span className="text-slate-400">Balance:</span>
                      <span className="fw-bolder text-[#F4C542] tabular-nums font-display">
                        {userState.vesBalance} VEs
                      </span>
                    </div>
                    <span className="text-slate-600">|</span>
                    <div>
                      <span className="fw-bolder text-purple-300 tabular-nums font-display">
                        {userState.gemsBalance} Gems
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* VIEW 1: Main Level Dashboard */}
              {currentView === 'dashboard' && (
                <div className="w-100">
                  <div className="row g-4 align-items-start">
                    <div className="col-12 col-lg-7 space-y-4">
                      <CurrentLevelCard
                        currentLevel={userState.currentLevel}
                        currentXP={userState.currentXP}
                        requiredXP={userState.requiredXP}
                        onInfoClick={handleLevelInfoClick}
                      />

                      <TodaysBoost
                        xpEarned={userState.todaysBoost.xpEarned}
                        tasksDone={userState.todaysBoost.tasksDone}
                        totalTasks={userState.todaysBoost.totalTasks}
                        streakDays={userState.todaysBoost.streakDays}
                        onCardClick={(metric) => {
                          if (metric === 'tasks') navigateTo('earn');
                          if (metric === 'xp') navigateTo('activity');
                        }}
                      />

                      <EarnMoreGrid
                        onSelectActivity={(id) => {
                          if (id === 'act-catcher') {
                            setGameResult(null);
                            navigateTo('game');
                          } else {
                            navigateTo('earn');
                          }
                        }}
                        onViewAllEarn={() => navigateTo('earn')}
                      />

                      <LevelRewardChest
                        level={userState.currentLevel}
                        onViewRewards={() => setIsRewardModalOpen(true)}
                        onRewardInfoClick={handleRewardInfoClick}
                      />
                    </div>

                    <div className="col-12 col-lg-5 space-y-4">
                      <div className="card rounded-4 bg-gradient-to-br from-[#231A3E] via-[#1A1D2F] to-[#121420] border border-purple-500/30 p-4 shadow-lg position-relative overflow-hidden">
                        <div className="d-flex align-items-center gap-2 mb-2">
                          <span className="badge bg-purple-900 text-purple-200 text-[10px] fw-bold text-uppercase">
                            Arcade Challenge
                          </span>
                          <span className="text-[11px] text-[#F4C542] fw-semibold">
                            20s Fast Play
                          </span>
                        </div>

                        <h3 className="fs-5 fw-bold text-white font-display mb-1">
                          XP Catcher Mini-Game
                        </h3>
                        <p className="text-xs text-slate-300 mb-3">
                          Collect falling purple XP orbs and VE coins in the woven gold basket to accelerate your level progression.
                        </p>

                        <button
                          onClick={() => {
                            playSound.click();
                            setGameResult(null);
                            navigateTo('game');
                          }}
                          className="btn btn-warning w-100 py-2.5 rounded-3 fw-bold text-xs d-flex align-items-center justify-center gap-2 gold-gradient-bg text-dark border-0 shadow-sm font-display"
                        >
                          <Gamepad2 className="w-4 h-4 fill-dark" />
                          <span>Play XP Catcher Now</span>
                        </button>
                      </div>

                      <LevelRoadmap
                        levels={roadmap}
                        currentLevel={userState.currentLevel}
                        onLevelSelect={(tier) => {
                          if (tier.level === userState.currentLevel) {
                            setIsRewardModalOpen(true);
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* VIEW 2: XP Catcher Mini-Game */}
              {currentView === 'game' && (
                <div className="w-100 d-flex justify-content-center py-2">
                  {gameResult ? (
                    <ChallengeComplete
                      score={gameResult.score}
                      xpEarned={gameResult.xpEarned}
                      vesEarned={gameResult.vesEarned}
                      isNewBest={gameResult.isNewBest}
                      currentLevel={userState.currentLevel}
                      currentXP={userState.currentXP}
                      requiredXP={userState.requiredXP}
                      onPlayAgain={() => setGameResult(null)}
                      onBackToDashboard={() => {
                        setGameResult(null);
                        navigateTo('dashboard');
                      }}
                    />
                  ) : (
                    <XPCatcherGame
                      onBack={() => navigateTo('dashboard')}
                      onFinishGame={handleGameComplete}
                      onInfoClick={() => {
                        setInfoModalContent({
                          title: 'XP Catcher Rules & Mechanics',
                          body: 'Move your basket horizontally to catch falling objects in 20 seconds. Purple XP orbs award +10 XP, Golden VE coins grant +5 VEs, and Emerald gems give +25 XP. Building combos boosts your multiplier up to 3X! Prototype rewards are credited to your demo session balance.',
                        });
                      }}
                    />
                  )}
                </div>
              )}

              {/* VIEW 3: Earn & Level Up Page */}
              {currentView === 'earn' && (
                <EarnActivitiesPage
                  activities={activities}
                  onBack={() => navigateTo('dashboard')}
                  onCompleteActivity={completeActivity}
                  onOpenGame={() => {
                    setGameResult(null);
                    navigateTo('game');
                  }}
                />
              )}

              {/* VIEW 4: Recent Activity Page */}
              {currentView === 'activity' && (
                <RecentActivityPage
                  history={history}
                  todayXP={userState.todaySummary.totalXPEarned}
                  todayVEs={userState.todaySummary.totalVEsEarned}
                  onBack={() => navigateTo('dashboard')}
                />
              )}

              {/* VIEW 5: Rewards Vault */}
              {currentView === 'rewards' && (
                <div className="w-100 max-w-md mx-auto py-3 space-y-4 animate-in fade-in">
                  <div className="d-flex justify-content-between align-items-center pb-2 border-bottom border-white/5">
                    <h2 className="fs-5 fw-bold text-white font-display mb-0">Rewards Vault</h2>
                    <button
                      onClick={() => navigateTo('dashboard')}
                      className="text-xs text-[#F4C542] fw-semibold bg-transparent border-0"
                    >
                      ← Back to Home
                    </button>
                  </div>
                  <LevelRewardChest
                    level={userState.currentLevel}
                    onViewRewards={() => setIsRewardModalOpen(true)}
                    onRewardInfoClick={handleRewardInfoClick}
                  />
                  <LevelRoadmap
                    levels={roadmap}
                    currentLevel={userState.currentLevel}
                    onLevelSelect={() => setIsRewardModalOpen(true)}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* Mobile Fixed Bottom Navigation Bar matching Page 33 */}
      <BottomNav
        currentView={currentView}
        onNavigate={(view) => {
          if (view === 'game') setGameResult(null);
          navigateTo(view);
        }}
      />

      {/* Level-Up Celebration Modal matching Page 33 */}
      <LevelUpModal
        isOpen={isLevelUpModalOpen}
        level={userState.currentLevel}
        onClaim={claimLevelUp}
        onClose={() => setIsLevelUpModalOpen(false)}
      />

      {/* Level 05 Reward Details Modal */}
      <RewardDetailsModal
        isOpen={isRewardModalOpen}
        onClose={() => setIsRewardModalOpen(false)}
        currentLevel={userState.currentLevel}
      />

      {/* Information Tooltip Modal */}
      {infoModalContent && (
        <InfoModal
          isOpen={!!infoModalContent}
          onClose={() => setInfoModalContent(null)}
          title={infoModalContent.title}
          body={infoModalContent.body}
        />
      )}
    </div>
  );
}
