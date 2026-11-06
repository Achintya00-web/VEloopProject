import React from 'react';
import { SolidRewardIcon } from './SolidRewardIcon.jsx';

export const RewardIconTile = ({ name, tone = 'purple', size = 'regular' }) => (
  <span className={`reward-icon-tile reward-icon-tile--${tone} reward-icon-tile--${size}`}>
    <SolidRewardIcon name={name} />
  </span>
);
