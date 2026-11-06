/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useLevelProgress } from './hooks/useLevelProgress.js';
import { Header } from './components/common/Header.jsx';
import { BottomNav } from './components/common/BottomNav.jsx';
import { DesktopSidebar } from './components/common/DesktopSidebar.jsx';
import { AppFooter } from './components/common/AppFooter.jsx';
import { CursorAtmosphere } from './components/common/CursorAtmosphere.jsx';
import { InfoModal } from './components/common/InfoModal.jsx';
import { CurrentLevelCard } from './components/dashboard/CurrentLevelCard.jsx';
import { TodaysBoost } from './components/dashboard/TodaysBoost.jsx';
import { EarnMoreGrid } from './components/dashboard/EarnMoreGrid.jsx';
import { LevelRewardChest } from './components/dashboard/LevelRewardChest.jsx';
import { LevelRoadmap } from './components/dashboard/LevelRoadmap.jsx';
import { DashboardHeroArtwork } from './components/dashboard/DashboardHeroArtwork.jsx';
import { DailyRewards } from './components/dashboard/DailyRewards.jsx';
import { DashboardShowcase } from './components/dashboard/DashboardShowcase.jsx';
import { XPCatcherGame } from './components/game/XPCatcherGame.jsx';
import { ChallengeComplete } from './components/game/ChallengeComplete.jsx';
import { EarnActivitiesPage } from './components/earn/EarnActivitiesPage.jsx';
import { RecentActivityPage } from './components/activity/RecentActivityPage.jsx';
import { LevelUpModal } from './components/modals/LevelUpModal.jsx';
import { RewardDetailsModal } from './components/modals/RewardDetailsModal.jsx';
import { LoadingSkeleton } from './components/states/LoadingSkeleton.jsx';
import { EmptyState } from './components/states/EmptyState.jsx';
import { ErrorState } from './components/states/ErrorState.jsx';
import { Trophy } from 'lucide-react';
import { setSoundMuted } from './utils/audio.js';

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
  const [isSoundMuted, setIsSoundMuted] = useState(false);

  const handleToggleSound = () => {
    const nextMutedState = !isSoundMuted;
    setIsSoundMuted(nextMutedState);
    setSoundMuted(nextMutedState);
  };

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

  const handleOpenSettings = () => {
    setInfoModalContent({
      title: 'Settings',
      body: 'Manage your sound preference with the speaker control in the top bar. Prototype controls are available from the settings icon.',
    });
  };

  return (
    <div className={`app-shell min-vh-100 bg-[#161827] text-white d-flex flex-column font-sans selection:bg-[#F4C542]/30 selection:text-white ${isMobilePreview ? 'app-shell--mobile-preview' : ''}`}>
      <CursorAtmosphere />
      <DesktopSidebar currentView={currentView} onNavigate={navigateTo} onOpenSettings={handleOpenSettings} />
      {/* Top Application Header */}
      <Header
        uiState={uiState}
        onSetUiState={setUiState}
        onTriggerLevelUp={triggerManualLevelUp}
        onQuickAddXP={() => addXP(200, 'Developer Boost Mission', 10)}
        onResetDemo={resetDemo}
        isMobilePreview={isMobilePreview}
        onToggleMobilePreview={() => setIsMobilePreview(!isMobilePreview)}
        currentView={currentView}
        onNavigate={(view) => {
          if (view === 'game') setGameResult(null);
          navigateTo(view);
        }}
        currentLevel={userState.currentLevel}
        currentXP={userState.currentXP}
        requiredXP={userState.requiredXP}
        vesBalance={userState.vesBalance}
        gemsBalance={userState.gemsBalance}
        streakDays={userState.todaysBoost.streakDays}
        isSoundMuted={isSoundMuted}
        onToggleSound={handleToggleSound}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-100 px-3 px-sm-4 py-3 d-flex flex-column align-items-center app-main">
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
              {/* VIEW 1: Main Level Dashboard */}
              {currentView === 'dashboard' && (
                <div className="w-100 dashboard-page">
                  <section className="dashboard-welcome dashboard-welcome--cosmic">
                    <div className="dashboard-welcome__copy">
                      <div className="dashboard-welcome__eyebrow">
                        <span className="dashboard-welcome__greeting">Welcome Back, Achintya! <span>👋</span></span>
                      </div>
                      <h1>
                        Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 18 ? 'Afternoon' : 'Evening'},<br />
                        <span>VELOOPER!</span>
                      </h1>
                      <p>Keep playing, keep earning and unlock greater rewards<br className="d-none d-md-block" /> on your journey.</p>
                      <div className="dashboard-welcome__actions">
                        <button onClick={() => navigateTo('earn')}>View My Progress <span>→</span></button>
                        <button onClick={() => setIsRewardModalOpen(true)}><Trophy size={14} /> Explore Rewards</button>
                      </div>
                    </div>
                    <DashboardHeroArtwork />
                  </section>
                  <div className="row g-3 align-items-stretch dashboard-overview">
                    <div className="col-12 col-md-6">
                      <CurrentLevelCard
                        currentLevel={userState.currentLevel}
                        currentXP={userState.currentXP}
                        requiredXP={userState.requiredXP}
                        onInfoClick={handleLevelInfoClick}
                      />
                    </div>

                    <div className="col-12 col-md-6">
                      <TodaysBoost
                        tasksDone={userState.todaysBoost.tasksDone}
                        totalTasks={userState.todaysBoost.totalTasks}
                        streakDays={userState.todaysBoost.streakDays}
                        onCardClick={(metric) => navigateTo(metric === 'game' ? 'game' : 'earn')}
                      />
                    </div>
                  </div>

                  <DailyRewards
                    streakDays={userState.todaysBoost.streakDays}
                    onClaim={() => addXP(25, 'Daily Login Reward')}
                  />

                  <LevelRoadmap
                    levels={roadmap}
                    currentLevel={userState.currentLevel}
                    compact
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

                  <DashboardShowcase
                    onViewLeaderboard={() => navigateTo('activity')}
                    onViewAchievements={() => navigateTo('rewards')}
                  />
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
                  history={history}
                  todayXP={userState.todaySummary.totalXPEarned}
                  todayVEs={userState.todaySummary.totalVEsEarned}
                  onViewActivity={() => navigateTo('activity')}
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
                <div className="w-100 max-w-6xl mx-auto py-3 animate-in fade-in rewards-page">
                  <div className="d-flex justify-content-between align-items-center pb-2 border-bottom border-white/5 rewards-page__header">
                    <div>
                      <span className="reward-vault__rank">SEASON 04 PERKS</span>
                      <h2 className="fs-5 fw-bold text-white font-display mb-0">Rewards Vault</h2>
                    </div>
                    <button
                      onClick={() => navigateTo('dashboard')}
                      className="text-xs text-[#F4C542] fw-semibold bg-transparent border-0"
                    >
                      Back to Dashboard
                    </button>
                  </div>
                  <div className="row g-4 align-items-start">
                    <div className="col-12 col-lg-5">
                      <LevelRewardChest
                        level={userState.currentLevel}
                        onViewRewards={() => setIsRewardModalOpen(true)}
                        onRewardInfoClick={handleRewardInfoClick}
                      />
                    </div>
                    <div className="col-12 col-lg-7">
                      <LevelRoadmap
                        levels={roadmap}
                        currentLevel={userState.currentLevel}
                      />
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <AppFooter onNavigate={navigateTo} />

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
