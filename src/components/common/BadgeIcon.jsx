import React from 'react';

export const BadgeIcon = ({
  level,
  size = 'md',
  glow = false,
  premium = false,
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
      } ${premium ? 'level-badge--premium' : ''} ${className}`}
      style={{ width: dimensions.w, height: dimensions.h }}
    >
      <svg
        viewBox={premium ? '-6 -9 112 128' : '0 0 100 114'}
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
            <stop offset="0%" stopColor={premium ? '#2D2749' : '#252536'} />
            <stop offset="55%" stopColor={premium ? '#19172C' : '#1B1C2A'} />
            <stop offset="100%" stopColor={premium ? '#0D0E1A' : '#11131D'} />
          </linearGradient>

          <linearGradient id={`${gradientId}-number`} x1="50" y1="43" x2="50" y2="84" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="22%" stopColor={palette.light} />
            <stop offset="58%" stopColor={palette.number} />
            <stop offset="100%" stopColor={palette.rim} />
          </linearGradient>

          {premium && (
            <>
              <radialGradient id={`${gradientId}-core`} cx="50%" cy="42%" r="58%">
                <stop offset="0%" stopColor={palette.rim} stopOpacity="0.24" />
                <stop offset="65%" stopColor={palette.dark} stopOpacity="0.06" />
                <stop offset="100%" stopColor="#090A14" stopOpacity="0" />
              </radialGradient>

              <linearGradient id={`${gradientId}-sheen`} x1="20" y1="12" x2="82" y2="86" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.22" />
                <stop offset="45%" stopColor={palette.light} stopOpacity="0.06" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
              </linearGradient>

              <clipPath id={`${gradientId}-face-clip`}>
                <polygon points="50,13 73,30 73,69 50,93 27,69 27,30" />
              </clipPath>
            </>
          )}
        </defs>

        {premium ? (
          <>
            {/* Twin-tiered collector swept wings */}
            <path
              d="M21 40 -3 22 6 42 -2 50 20 55 30 47 24 40Zm58 0 24-18-9 20 8 8-22 5-10-8 6-7Z"
              fill={palette.wing}
              stroke={`url(#${gradientId}-rim)`}
              strokeWidth="2"
              strokeLinejoin="round"
              opacity="0.96"
            />
            <path
              d="M21 55 4 59 14 67 27 63Zm58 0 17 4-10 8-13-4Z"
              fill={palette.dark}
              stroke={`url(#${gradientId}-rim)`}
              strokeWidth="1.5"
              strokeLinejoin="round"
              opacity="0.92"
            />
            <path
              d="m8 38 15 6m-16 3 14 5m71-14-15 6m16 3-14 5"
              stroke={palette.light}
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.82"
            />

            {/* Royal crown crest & apex diamond jewel */}
            <path
              d="M36 12 L42 0 L50 6 L58 0 L64 12 Z"
              fill={`url(#${gradientId}-rim)`}
              stroke={palette.dark}
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
            <polygon
              points="50,-7 55,0 50,7 45,0"
              fill={palette.light}
              stroke={`url(#${gradientId}-rim)`}
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
          </>
        ) : (
          <>
            <path
              d="M20 42 4 29l6 17-6 7 19 3 9-9-6-7Zm60 0 16-13-6 17 6 7-19 3-9-9 6-7Z"
              fill={palette.wing}
              stroke={`url(#${gradientId}-rim)`}
              strokeWidth="2"
              strokeLinejoin="round"
              opacity="0.9"
            />
            <path d="m13 43 12 4m-13 1 11 4m64-9-12 4m13 1-11 4" stroke={palette.light} strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
          </>
        )}

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
          strokeWidth={premium ? '1.9' : '1.5'}
        />

        {premium && (
          <g clipPath={`url(#${gradientId}-face-clip)`}>
            <rect x="24" y="12" width="52" height="84" fill={`url(#${gradientId}-core)`} />
            <polygon points="24,12 76,12 52,58 24,45" fill={`url(#${gradientId}-sheen)`} />
          </g>
        )}

        <polygon
          points="50,20 68,34 68,66 50,85 32,66 32,34"
          fill="none"
          stroke={palette.rim}
          strokeWidth={premium ? '1.25' : '1'}
          opacity={premium ? '0.78' : '0.62'}
        />
        <path d="M29 32L50 20L71 32" stroke={palette.light} strokeOpacity={premium ? '0.65' : '0.4'} strokeWidth={premium ? '1.3' : '1'} />
        <circle cx="26" cy="31" r={premium ? '1.9' : '1.5'} fill={palette.light} />
        <circle cx="74" cy="31" r={premium ? '1.9' : '1.5'} fill={palette.light} />
        {showLevelText && (
          <text
            x="50"
            y="44"
            textAnchor="middle"
            fill={premium ? '#FFE29A' : '#FFD47A'}
            fontSize="9"
            fontWeight="800"
            letterSpacing="2"
            fontFamily="'Outfit', sans-serif"
          >
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
        <path d="M42 89L50 94L58 89" stroke={palette.rim} strokeWidth={premium ? '1.5' : '1.2'} strokeLinecap="round" strokeLinejoin="round" />
        {premium && (
          <polygon
            points="50,94 52.8,97.5 50,101 47.2,97.5"
            fill={palette.light}
            stroke={palette.dark}
            strokeWidth="0.6"
          />
        )}
      </svg>
    </div>
  );
};
