import React, { useState } from 'react';
import { Check, Crown, Flame, Gift } from 'lucide-react';
import { VECoin } from '../common/GameAssets.jsx';
import { playSound } from '../../utils/audio.js';

const rewards = [
  { day: 1, amount: '+10 XP', state: 'collected' },
  { day: 2, amount: '+15 XP', state: 'collected' },
  { day: 3, amount: '+20 XP', state: 'collected' },
  { day: 4, amount: '+25 XP', state: 'claim' },
  { day: 5, amount: '+30 XP', state: 'locked' },
  { day: 6, amount: '+35 XP', state: 'locked' },
  { day: 7, amount: '+50 XP', state: 'locked', icon: 'crown' },
];

export const DailyRewards = ({ streakDays, onClaim }) => {
  const [claimed, setClaimed] = useState(false);

  const claimReward = () => {
    if (claimed) return;
    playSound.celebration();
    setClaimed(true);
    onClaim();
  };

  return (
    <section className="daily-rewards reward-section">
      <div className="reward-section__heading">
        <div className="reward-section__title"><Gift size={20} /><div><h2>Daily Rewards</h2><p>Log in daily and collect amazing rewards!</p></div></div>
        <span className="daily-rewards__reset">Resets in 12h 45m</span>
      </div>
      <div className="daily-rewards__layout">
        <div className="daily-rewards__days">
          {rewards.map((reward) => {
            const isClaimed = reward.state === 'collected' || (reward.state === 'claim' && claimed);
            const canClaim = reward.state === 'claim' && !claimed;
            return (
              <article key={reward.day} className={`daily-reward ${canClaim ? 'is-claimable' : ''} ${isClaimed ? 'is-collected' : ''}`}>
                <span className="daily-reward__day">Day {reward.day}</span>
                <div className="daily-reward__icon">
                  {isClaimed ? <Check size={18} /> : reward.icon === 'crown' ? <Crown size={20} /> : reward.state === 'claim' ? <Gift size={23} /> : <Gift size={19} />}
                </div>
                <strong>{reward.amount}</strong>
                {canClaim ? (
                  <button onClick={claimReward}>Claim Now</button>
                ) : (
                  <small>{isClaimed ? 'Collected' : 'Locked'}</small>
                )}
              </article>
            );
          })}
        </div>
        <aside className="streak-bonus">
          <div className="streak-bonus__icon"><Flame size={25} fill="currentColor" /></div>
          <strong>Streak Bonus</strong>
          <b>{streakDays} Days</b>
          <span>Keep your streak alive!</span>
          <div className="streak-bonus__coins"><VECoin size={18} /><VECoin size={22} /><VECoin size={18} /></div>
          <small>View Details <span>→</span></small>
        </aside>
      </div>
    </section>
  );
};
