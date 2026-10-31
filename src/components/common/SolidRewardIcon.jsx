import React from 'react';

const iconShapes = {
  activity: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M5.5 12h2.4l1.5-3.1 2.1 6.2 1.7-3.1h5.3" fill="none" stroke="var(--icon-cutout, #171a26)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </>
  ),
  coins: (
    <>
      <circle cx="9" cy="9" r="6.25" />
      <circle cx="15" cy="15" r="6.25" />
      <path d="M8 6.5h2M9 5.5v7M14 12.5h2M15 11.5v7" fill="none" stroke="var(--icon-cutout, #171a26)" strokeLinecap="round" strokeWidth="1.5" />
    </>
  ),
  earn: (
    <>
      <rect x="4" y="3.5" width="16" height="17" rx="3" />
      <path d="M8 8.5h8M8 12h5M8 15.5h3" fill="none" stroke="var(--icon-cutout, #171a26)" strokeLinecap="round" strokeWidth="1.8" />
    </>
  ),
  flame: <path d="M13.2 2.4c.5 3.2-.5 4.7-2 6.1-.6-1.6-1.8-2.7-3.2-3.4.3 2.2-.4 3.5-1.5 5.1A7.8 7.8 0 1 0 20 15.6c0-4.1-2.6-8.6-6.8-13.2ZM12 20a3.3 3.3 0 0 1-3.3-3.3c0-1.2.7-2.1 1.5-3.1.5 1 1.4 1.6 2.4 2 .3-.8.5-1.4.5-2.2 1.4 1.1 2.2 2.2 2.2 3.3A3.3 3.3 0 0 1 12 20Z" />,
  game: (
    <>
      <path d="M7.1 6.2h9.8a4.2 4.2 0 0 1 4.1 3.3l1 5.1a3 3 0 0 1-4.9 2.8l-2.5-2.1h-5l-2.5 2.1a3 3 0 0 1-4.9-2.8l1-5.1a4.2 4.2 0 0 1 3.9-3.3Z" />
      <path d="M8 9v4M6 11h4M16.5 10.2h.1M18.5 12.2h.1" fill="none" stroke="var(--icon-cutout, #171a26)" strokeLinecap="round" strokeWidth="1.8" />
    </>
  ),
  gem: (
    <>
      <path d="m7 3 10 0 5 6-10 12L2 9l5-6Z" />
      <path d="m7 3 5 18 5-18M2 9h20M7 3l-5 6M17 3l5 6" fill="none" stroke="var(--icon-cutout, #171a26)" strokeLinejoin="round" strokeWidth="1.1" />
    </>
  ),
  gift: (
    <>
      <path d="M3 10h18v11H3zM2 7h20v4H2zM11 7h2v14h-2z" />
      <path d="M12 7c-5.7 0-7.5-1.2-7.5-3.2 0-1.1.8-1.8 2-1.8C9.2 2 12 7 12 7Zm0 0c5.7 0 7.5-1.2 7.5-3.2 0-1.1-.8-1.8-2-1.8C14.8 2 12 7 12 7Z" />
    </>
  ),
  home: <path d="m3 10 9-7 9 7v10a1.5 1.5 0 0 1-1.5 1.5h-5v-7h-5v7h-5A1.5 1.5 0 0 1 3 20V10Z" />,
  play: <path d="M7 4.8a1.5 1.5 0 0 1 2.2-1.3l11 6.8a2 2 0 0 1 0 3.4l-11 6.8A1.5 1.5 0 0 1 7 19.2V4.8Z" />,
  spark: <path d="m12 2 2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4L12 2Zm7-1 .9 2.1L22 4l-2.1.9L19 7l-.9-2.1L16 4l2.1-.9L19 1Z" />,
  star: <path d="m12 2.2 2.9 6 6.6 1-4.8 4.7 1.1 6.7-5.8-3.2-5.8 3.2 1.1-6.7-4.8-4.7 6.6-1 2.9-6Z" />,
  tasks: (
    <>
      <path d="M7 3h10a2 2 0 0 1 2 2v16H5V5a2 2 0 0 1 2-2Z" />
      <path d="M9 3.5h6v3H9z" />
      <path d="m8 12 1.4 1.4L12 11M14 12h3M8 17l1.4 1.4L12 16M14 17h3" fill="none" stroke="var(--icon-cutout, #171a26)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.3" />
      <path d="M2.5 20v-1.2a6.5 6.5 0 0 1 13 0V20h-13ZM16 5a3 3 0 0 1 0 6M18 14a5 5 0 0 1 3.5 4.8V20h-4" />
    </>
  ),
  wallet: (
    <>
      <path d="M4 5h15a2 2 0 0 1 2 2v13H5a3 3 0 0 1-3-3V6a1 1 0 0 1 1-1h1Z" />
      <path d="M3 8h18v5h-5a2.5 2.5 0 0 1 0-5h5" />
      <circle cx="16" cy="10.5" r=".8" fill="var(--icon-cutout, #171a26)" />
    </>
  ),
  zap: <path d="M13.2 2 4 13h6l-.8 9L20 10.5h-6L13.2 2Z" />,
};

export const SolidRewardIcon = ({ name, size = 20, className = '' }) => (
  <svg
    aria-hidden="true"
    className={`solid-reward-icon ${className}`}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    {iconShapes[name] || iconShapes.spark}
  </svg>
);
