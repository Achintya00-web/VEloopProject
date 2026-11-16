import React, { useId } from 'react';

export const VeloopLogo = ({ size = 32, className = '' }) => {
  const uid = useId().replace(/:/g, '');
  const id = `veloop-logo-${uid}`;

  return (
    <span
      className={`veloop-logo inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id={`${id}-bg`} x1="6" y1="4" x2="58" y2="60" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#261348" />
            <stop offset="55%" stopColor="#140C29" />
            <stop offset="100%" stopColor="#090714" />
          </linearGradient>
          <linearGradient id={`${id}-rim`} x1="6" y1="6" x2="58" y2="58" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFE58F" />
            <stop offset="45%" stopColor="#C14EFF" />
            <stop offset="100%" stopColor="#F4C542" />
          </linearGradient>
          <linearGradient id={`${id}-v`} x1="16" y1="14" x2="48" y2="50" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFF7D1" />
            <stop offset="38%" stopColor="#F5C744" />
            <stop offset="72%" stopColor="#C06BFF" />
            <stop offset="100%" stopColor="#852DF0" />
          </linearGradient>
          <radialGradient id={`${id}-portal`} cx="50%" cy="46%" r="44%">
            <stop offset="0%" stopColor="#C14EFF" stopOpacity="0.46" />
            <stop offset="65%" stopColor="#7C2AE8" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#140C29" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect
          x="3"
          y="3"
          width="58"
          height="58"
          rx="16"
          fill={`url(#${id}-bg)`}
          stroke={`url(#${id}-rim)`}
          strokeWidth="2.4"
        />
        <rect
          x="7"
          y="7"
          width="50"
          height="50"
          rx="12.5"
          fill="none"
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth="1"
        />

        <circle cx="32" cy="31" r="21" fill={`url(#${id}-portal)`} />
        <ellipse
          cx="32"
          cy="43"
          rx="18"
          ry="4.2"
          fill="#8E3CFF"
          fillOpacity="0.18"
          stroke="#D79BFF"
          strokeOpacity="0.52"
          strokeWidth="1"
        />

        {/* Cosmic geometric V emblem */}
        <path
          d="M15 17H23.2L32 39.2L40.8 17H49L36.2 48H27.8L15 17Z"
          fill={`url(#${id}-v)`}
          stroke="#FFF4BF"
          strokeOpacity="0.65"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <path
          d="M27.6 17L32 28.4L36.4 17"
          stroke="#F4C542"
          strokeOpacity="0.48"
          strokeWidth="1.4"
          strokeLinecap="round"
        />

        {/* Portal star glint */}
        <path
          d="M32 10L33.2 13L36.2 14.2L33.2 15.4L32 18.4L30.8 15.4L27.8 14.2L30.8 13Z"
          fill="#FFF2B2"
        />
        <circle cx="15" cy="46" r="1.2" fill="#D8B4FE" opacity="0.8" />
        <circle cx="49" cy="45" r="1.2" fill="#FDE68A" opacity="0.8" />
      </svg>
    </span>
  );
};
