import { useState, useCallback } from 'react';
import confetti from 'canvas-confetti';
import {
  initialLevelState,
  initialEarningActivities,
  initialRecentActivities,
  levelRoadmap,
} from '../data/levelData.js';
import { playSound } from '../utils/audio.js';

const celebrationColors = ['#FFB52E', '#A855F7', '#50D89A', '#FFFFFF'];

export function useLevelProgress() {
  const [userState, setUserState] = useState(initialLevelState);
  const [activities, setActivities] = useState(initialEarningActivities);
  const [history, setHistory] = useState(initialRecentActivities);
  const [roadmap] = useState(levelRoadmap);
  const [currentView, setCurrentView] = useState('dashboard');
  const [uiState, setUiState] = useState('normal');
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);
  const [isRewardModalOpen, setIsRewardModalOpen] = useState(false);
  const [infoModalContent, setInfoModalContent] = useState(null);
  const [gameResult, setGameResult] = useState(null);

  // Dynamic calculations as specified in the PDF
  const remainingXP = Math.max(0, userState.requiredXP - userState.currentXP);
  const progressPercent = Math.min(100, Math.max(0, (userState.currentXP / userState.requiredXP) * 100));

  // Add XP and handle potential level-up
  const addXP = useCallback((xpAmount, sourceName, veAmount = 0) => {
    setUserState((prev) => {
      const newXP = prev.currentXP + xpAmount;
      const newVEs = prev.vesBalance + veAmount;
      const newBoostXP = prev.todaysBoost.xpEarned + xpAmount;
      const newTotalXP = prev.todaySummary.totalXPEarned + xpAmount;
      const newTotalVEs = prev.todaySummary.totalVEsEarned + veAmount;

      // Check level-up condition (>= requiredXP)
      if (newXP >= prev.requiredXP) {
        setTimeout(() => {
          playSound.levelUp();
          setIsLevelUpModalOpen(true);
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: celebrationColors,
          });
        }, 400);
      }

      return {
        ...prev,
        currentXP: newXP,
        vesBalance: newVEs,
        todaysBoost: {
          ...prev.todaysBoost,
          xpEarned: newBoostXP,
        },
        todaySummary: {
          totalXPEarned: newTotalXP,
          totalVEsEarned: newTotalVEs,
        },
      };
    });

    const newRecord = {
      id: `act-${Date.now()}`,
      title: sourceName,
      type: sourceName.toLowerCase().includes('catcher')
        ? 'catcher'
        : sourceName.toLowerCase().includes('game')
        ? 'game'
        : sourceName.toLowerCase().includes('referral')
        ? 'referral'
        : 'task',
      rewardType: veAmount > 0 ? 'VE' : 'XP',
      amount: veAmount > 0 ? veAmount : xpAmount,
      timestamp: 'Just now',
      category: veAmount > 0 ? 'VEs' : 'XP',
    };

    setHistory((prev) => [newRecord, ...prev]);
  }, []);

  // Complete an earning activity
  const completeActivity = useCallback((activityId) => {
    const act = activities.find((a) => a.id === activityId);
    if (!act || act.status === 'completed') return;

    playSound.celebration();
    confetti({
      particleCount: 65,
      spread: 70,
      startVelocity: 38,
      origin: { y: 0.72 },
      colors: celebrationColors,
    });
    addXP(act.rewardXP, act.title, act.rewardVEs || 0);

    setActivities((prev) =>
      prev.map((item) => (item.id === activityId ? { ...item, status: 'completed' } : item))
    );

    setUserState((prev) => ({
      ...prev,
      todaysBoost: {
        ...prev.todaysBoost,
        tasksDone: Math.min(prev.todaysBoost.totalTasks, prev.todaysBoost.tasksDone + 1),
      },
    }));
  }, [activities, addXP]);

  // Complete a game session in XP Catcher
  const handleGameComplete = useCallback((score) => {
    const xpReward = Math.max(15, Math.min(50, Math.floor(score * 0.35)));
    const vesReward = Math.max(5, Math.min(25, Math.floor(score * 0.14)));
    const isNewBest = score >= 90;

    setGameResult({
      score,
      xpEarned: xpReward,
      vesEarned: vesReward,
      isNewBest,
    });

    playSound.celebration();
    confetti({
      particleCount: 100,
      spread: 82,
      startVelocity: 45,
      origin: { y: 0.62 },
      colors: celebrationColors,
    });
    addXP(xpReward, 'XP Catcher Game Challenge', vesReward);
  }, [addXP]);

  // Claim Level-Up rewards
  const claimLevelUp = useCallback(() => {
    playSound.gem();
    setUserState((prev) => ({
      ...prev,
      currentLevel: prev.currentLevel + 1,
      currentXP: prev.currentXP >= prev.requiredXP ? prev.currentXP - prev.requiredXP + 6420 : 6420,
      requiredXP: prev.requiredXP + 4000,
      vesBalance: prev.vesBalance + 500,
      gemsBalance: prev.gemsBalance + 25,
    }));
    setIsLevelUpModalOpen(false);
  }, []);

  // Manual test trigger for Level-Up modal demonstration
  const triggerManualLevelUp = useCallback(() => {
    playSound.levelUp();
    setIsLevelUpModalOpen(true);
    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#F4C542', '#8B5CF6', '#70D68B'],
    });
  }, []);

  // Reset demo
  const resetDemo = useCallback(() => {
    setUserState(initialLevelState);
    setActivities(initialEarningActivities);
    setHistory(initialRecentActivities);
    setGameResult(null);
    setUiState('normal');
  }, []);

  return {
    userState,
    activities,
    history,
    roadmap,
    currentView,
    setCurrentView,
    uiState,
    setUiState,
    remainingXP,
    progressPercent,
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
  };
}
