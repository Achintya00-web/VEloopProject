import React from 'react';

export const BadgeIcon = ({
  level,
  size = 'md',
  glow = false,
  className = '',
  showLevelText = true,
}) => {
  const tierPalettes = [
    { rim: '#35D89B', light: '#D5FFF0', dark: '#117A58', number: '#9FFFD8', wing: '#26BD87' },
    { rim: '#D98C43', light: '#FFE0B5', dark: '#794015', number: '#FFC27A', wing: '#B86D2B' },
    { rim: '#B9C4D2', light: '#FFFFFF', dark: '#5D6878', number: '#E4ECF5', wing: '#9BA8BA' },
    { rim: '#F4C542', light: '#FFF4C2', dark: '#A96813', number: '#FFD56E', wing: '#E9A92E' },
    { rim: '#A987FF', light: '#EEE6FF', dark: '#633DA6', number: '#D2BFFF', wing: '#8D67E8' },
    { rim: '#4BD7EF', light: '#D9FBFF', dark: '#147A9A', number: '#9BEEFF', wing: '#32B5D3' },
    { rim: '#F08ED7', light: '#FFE4F7', dark: '#8B3F77', number: '#FFC3EE', wing: '#D36DBA' },
  ];
  const palette = tierPalettes[(Math.max(1, level) - 1) % tierPalettes.length];
  const dimensions = {
    sm: { w: 34, h: 39 },
    md: { w: 54, h: 62 },
    lg: { w: 76, h: 87 },
    xl: { w: 112, h: 128 },
  }[size] || { w: 54, h: 62 };

  const formattedLevel = level < 10 ? `0${level}` : `${level}`;
  const gradientId = `level-badge-${React.useId().replace(/:/g, '')}`;

  return (
    <div
      className={`level-badge relative inline-flex items-center justify-center shrink-0 ${
        glow ? 'level-badge--glow' : ''
      } ${className}`}
      style={{ width: dimensions.w, height: dimensions.h }}
    >
      <svg
        viewBox="0 0 100 114"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id={`${gradientId}-rim`} x1="4" y1="4" x2="92" y2="108" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={palette.light} />
            <stop offset="32%" stopColor={palette.rim} />
            <stop offset="68%" stopColor={palette.dark} />
            <stop offset="100%" stopColor={palette.light} />
          </linearGradient>

          <linearGradient id={`${gradientId}-face`} x1="50" y1="12" x2="50" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#252536" />
            <stop offset="100%" stopColor="#11131D" />
          </linearGradient>

          <linearGradient id={`${gradientId}-number`} x1="50" y1="43" x2="50" y2="84" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={palette.light} />
            <stop offset="48%" stopColor={palette.number} />
            <stop offset="100%" stopColor={palette.rim} />
          </linearGradient>
        </defs>

        <path
          d="M20 42 4 29l6 17-6 7 19 3 9-9-6-7Zm60 0 16-13-6 17 6 7-19 3-9-9 6-7Z"
          fill={palette.wing}
          stroke={`url(#${gradientId}-rim)`}
          strokeWidth="2"
          strokeLinejoin="round"
          opacity="0.9"
        />
        <path d="m13 43 12 4m-13 1 11 4m64-9-12 4m13 1-11 4" stroke={palette.light} strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
        <polygon
          points="50,4 82,23 82,75 50,106 18,75 18,23"
          fill={`url(#${gradientId}-rim)`}
        />
        <polygon
          points="50,9 77,27 77,72 50,99 23,72 23,27"
          fill="#0B0D14"
        />
        <polygon
          points="50,13 73,30 73,69 50,93 27,69 27,30"
          fill={`url(#${gradientId}-face)`}
          stroke={`url(#${gradientId}-rim)`}
          strokeWidth="1.5"
        />
        <polygon
          points="50,20 68,34 68,66 50,85 32,66 32,34"
          fill="none"
          stroke={palette.rim}
          strokeWidth="1"
          opacity="0.62"
        />
        <path d="M29 32L50 20L71 32" stroke={palette.light} strokeOpacity="0.4" strokeWidth="1" />
        <circle cx="26" cy="31" r="1.5" fill={palette.light} />
        <circle cx="74" cy="31" r="1.5" fill={palette.light} />
        {showLevelText && (
          <text x="50" y="44" textAnchor="middle" fill="#FFD47A" fontSize="9" fontWeight="800" letterSpacing="2" fontFamily="'Outfit', sans-serif">
            LEVEL
          </text>
        )}
        <text
          x="50"
          y={showLevelText ? '78' : '70'}
          textAnchor="middle"
          fill={`url(#${gradientId}-number)`}
          fontSize={showLevelText ? '39' : '43'}
          fontWeight="800"
          fontFamily="'Outfit', sans-serif"
          style={{
            filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.85))',
          }}
        >
          {formattedLevel}
        </text>
        <path d="M42 89L50 94L58 89" stroke={palette.rim} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
};
