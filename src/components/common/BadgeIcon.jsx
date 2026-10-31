import React from 'react';

export const BadgeIcon = ({
  level,
  size = 'md',
  glow = false,
  className = '',
  showLevelText = true,
}) => {
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
            <stop offset="0%" stopColor="#FFF4C2" />
            <stop offset="32%" stopColor="#FFC044" />
            <stop offset="68%" stopColor="#A96813" />
            <stop offset="100%" stopColor="#FFE091" />
          </linearGradient>

          <linearGradient id={`${gradientId}-face`} x1="50" y1="12" x2="50" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#252536" />
            <stop offset="100%" stopColor="#11131D" />
          </linearGradient>

          <linearGradient id={`${gradientId}-number`} x1="50" y1="43" x2="50" y2="84" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFF7D7" />
            <stop offset="48%" stopColor="#FFD56E" />
            <stop offset="100%" stopColor="#E69B24" />
          </linearGradient>
        </defs>

        <polygon
          points="50,2 94,26 94,78 50,112 6,78 6,26"
          fill={`url(#${gradientId}-rim)`}
        />
        <polygon
          points="50,7 89,28 89,75 50,105 11,75 11,28"
          fill="#0B0D14"
        />
        <polygon
          points="50,10 85,30 85,72 50,99 15,72 15,30"
          fill={`url(#${gradientId}-face)`}
          stroke={`url(#${gradientId}-rim)`}
          strokeWidth="1.5"
        />
        <polygon
          points="50,17 78,34 78,69 50,91 22,69 22,34"
          fill="none"
          stroke="#D49428"
          strokeWidth="1"
          opacity="0.62"
        />
        <path d="M22 32L50 17L78 32" stroke="#FFE6A5" strokeOpacity="0.34" strokeWidth="1" />
        <circle cx="18" cy="31" r="1.5" fill="#FFE08A" />
        <circle cx="82" cy="31" r="1.5" fill="#FFE08A" />
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
        <path d="M40 89L50 95L60 89" stroke="#D79B30" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
};
