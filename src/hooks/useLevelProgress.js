import { useState, useCallback, useMemo } from 'react';
import confetti from 'canvas-confetti';
import {
  initialLevelState,
  initialEarningActivities,
  initialRecentActivities,
  levelRoadmap,
} from '../data/levelData.js';
import { playSound } from '../utils/audio.js';

const celebrationColors = ['#FFB52E', '#A855F7', '#50D89A', '#FFFFFF'];

const getTierConfig = (level) =>
  levelRoadmap.find((tier) => tier.level === level) || null;

const getRequiredXPForLevel = (level) => {
  const tier = getTierConfig(level);
  if (tier) return tier.requiredXP;
  const lastTier = levelRoadmap[levelRoadmap.length - 1];
  return lastTier.requiredXP + Math.max(0, level - lastTier.level) * 6000;
};

const getTierBonusRewards = (level) => {
  const tier = getTierConfig(level);
  return {
    ves: tier?.ves ?? 500,
    gems: tier?.gems ?? 25,
  };
};

export function useLevelProgress() {
  const [userState, setUserState] = useState(initialLevelState);
  const [activities, setActivities] = useState(initialEarningActivities);
  const [history, setHistory] = useState(initialRecentActivities);
  const [currentView, setCurrentView] = useState('dashboard');
  const [uiState, setUiState] = useState('normal');
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);
  const [levelUpReward, setLevelUpReward] = useState(() => getTierBonusRewards(initialLevelState.currentLevel));
  const [isRewardModalOpen, setIsRewardModalOpen] = useState(false);
  const [infoModalContent, setInfoModalContent] = useState(null);
  const [gameResult, setGameResult] = useState(null);

  const roadmap = useMemo(
    () =>
      levelRoadmap.map((tier) => ({
        ...tier,
        status:
          tier.level < userState.currentLevel
            ? 'completed'
            : tier.level === userState.currentLevel
            ? 'current'
            : tier.level === userState.currentLevel + 1
            ? 'next'
            : 'locked',
      })),
    [userState.currentLevel]
  );

  const remainingXP = Math.max(0, userState.requiredXP - userState.currentXP);
  const progressPercent = Math.min(100, Math.max(0, (userState.currentXP / userState.requiredXP) * 100));

  // Add XP and automatically advance to the next level once full points are achieved
  const addXP = useCallback((xpAmount, sourceName, veAmount = 0) => {
    const safeXP = Math.max(0, Math.round(xpAmount));
    const safeVEs = Math.max(0, Math.round(veAmount));

    setUserState((prev) => {
      const newXP = prev.currentXP + safeXP;
      const newVEs = prev.vesBalance + safeVEs;
      const newBoostXP = prev.todaysBoost.xpEarned + safeXP;
      const newTotalXP = prev.todaySummary.totalXPEarned + safeXP;
      const newTotalVEs = prev.todaySummary.totalVEsEarned + safeVEs;

      let nextLevel = prev.currentLevel;
      let nextRequiredXP = prev.requiredXP;
      let accumulatedVesBonus = 0;
      let accumulatedGemsBonus = 0;

      while (newXP >= nextRequiredXP) {
        const currentTierBonus = getTierBonusRewards(nextLevel);
        accumulatedVesBonus += currentTierBonus.ves;
        accumulatedGemsBonus += currentTierBonus.gems;
        nextLevel += 1;
        nextRequiredXP = getRequiredXPForLevel(nextLevel);
      }

      if (nextLevel > prev.currentLevel) {
        setTimeout(() => {
          setLevelUpReward({
            ves: accumulatedVesBonus || 500,
            gems: accumulatedGemsBonus || 25,
          });
          playSound.levelUp();
          setIsLevelUpModalOpen(true);
          confetti({
            particleCount: 95,
            spread: 76,
            origin: { y: 0.6 },
            colors: celebrationColors,
          });
        }, 420);
      }

      return {
        ...prev,
        currentLevel: nextLevel,
        currentXP: newXP,
        requiredXP: nextRequiredXP,
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

    if (safeXP > 0 || safeVEs > 0) {
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
        rewardType: safeVEs > 0 && safeXP === 0 ? 'VE' : 'XP',
        amount: safeVEs > 0 && safeXP === 0 ? safeVEs : safeXP,
        timestamp: 'Just now',
        category: safeVEs > 0 && safeXP === 0 ? 'VEs' : 'XP',
      };

      setHistory((prev) => [newRecord, ...prev]);
    }
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

  // Complete a game session in XP Catcher: add full game score directly to current level XP
  const handleGameComplete = useCallback((score, stats = {}) => {
    const xpReward = Math.max(0, Math.round(score));
    const vesReward = Math.max(
      0,
      typeof stats.vesCollected === 'number' ? stats.vesCollected : 0
    );
    const isNewBest = score >= 90;

    setGameResult({
      score,
      xpEarned: xpReward,
      vesEarned: vesReward,
      isNewBest,
      itemsCaught: stats.itemsCaught ?? null,
      maxMultiplier: stats.maxMultiplier ?? null,
      accuracy: stats.accuracy ?? null,
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

  // Claim Level-Up bonus VEs & Gems (level itself already advances immediately on XP threshold)
  const claimLevelUp = useCallback(() => {
    playSound.gem();
    setUserState((prev) => ({
      ...prev,
      vesBalance: prev.vesBalance + (levelUpReward?.ves ?? 500),
      gemsBalance: prev.gemsBalance + (levelUpReward?.gems ?? 25),
    }));
    setIsLevelUpModalOpen(false);
  }, [levelUpReward]);

  // Manual test trigger for Level-Up modal demonstration
  const triggerManualLevelUp = useCallback(() => {
    setUserState((prev) => {
      const bonus = getTierBonusRewards(prev.currentLevel);
      const nextLevel = prev.currentLevel + 1;
      const nextRequiredXP = getRequiredXPForLevel(nextLevel);
      setLevelUpReward(bonus);
      return {
        ...prev,
        currentLevel: nextLevel,
        currentXP: Math.max(prev.currentXP, prev.requiredXP),
        requiredXP: nextRequiredXP,
      };
    });
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
    levelUpReward,
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
