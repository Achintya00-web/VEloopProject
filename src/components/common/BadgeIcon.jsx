import React from 'react';

export const BadgeIcon = ({
  level,
  size = 'md',
  glow = false,
  className = '',
  showLevelText = true,
}) => {
  const dimensions = {
    sm: { w: 42, h: 48, textLevel: 8, textNum: 16 },
    md: { w: 68, h: 76, textLevel: 10, textNum: 24 },
    lg: { w: 96, h: 108, textLevel: 12, textNum: 34 },
    xl: { w: 140, h: 156, textLevel: 15, textNum: 52 },
  }[size] || { w: 68, h: 76, textLevel: 10, textNum: 24 };

  const formattedLevel = level < 10 ? `0${level}` : `${level}`;

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${
        glow ? 'filter drop-shadow-[0_0_18px_rgba(244,197,66,0.55)]' : 'filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]'
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
          <linearGradient id={`goldRim-${level}-${size}`} x1="0" y1="0" x2="100" y2="114" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFF4C2" />
            <stop offset="25%" stopColor="#F5C744" />
            <stop offset="50%" stopColor="#C99424" />
            <stop offset="75%" stopColor="#FDE382" />
            <stop offset="100%" stopColor="#8A5F12" />
          </linearGradient>

          <linearGradient id={`darkShield-${level}-${size}`} x1="50" y1="10" x2="50" y2="104" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#25211B" />
            <stop offset="35%" stopColor="#1B1D28" />
            <stop offset="100%" stopColor="#0E1019" />
          </linearGradient>

          <linearGradient id={`innerGold-${level}-${size}`} x1="20" y1="20" x2="80" y2="94" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFE07A" />
            <stop offset="50%" stopColor="#D9A52C" />
            <stop offset="100%" stopColor="#966A16" />
          </linearGradient>

          <linearGradient id={`goldNum-${level}-${size}`} x1="50" y1="35" x2="50" y2="95" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="30%" stopColor="#FFF1B0" />
            <stop offset="70%" stopColor="#F5C744" />
            <stop offset="100%" stopColor="#C99424" />
          </linearGradient>
        </defs>

        {/* Outer Hexagonal Shield Path */}
        <polygon
          points="50,2 96,28 96,86 50,112 4,86 4,28"
          fill={`url(#goldRim-${level}-${size})`}
        />

        {/* Outer Inset Ridge */}
        <polygon
          points="50,5 93,29 93,84 50,108 7,84 7,29"
          fill="#11131E"
        />

        {/* Beveled Gold Ridge */}
        <polygon
          points="50,8 90,31 90,82 50,105 10,82 10,31"
          fill={`url(#goldRim-${level}-${size})`}
        />

        {/* Center Dark Surface */}
        <polygon
          points="50,11 87,33 87,80 50,102 13,80 13,33"
          fill={`url(#darkShield-${level}-${size})`}
        />

        {/* Inner Fine Gold Hexagon Border */}
        <polygon
          points="50,17 82,36 82,77 50,96 18,77 18,36"
          stroke={`url(#innerGold-${level}-${size})`}
          strokeWidth="1.5"
          fill="none"
          opacity="0.85"
        />

        {/* Top Mini Stars / Accents */}
        <circle cx="50" cy="22" r="1.5" fill="#FFE899" />
        <circle cx="43" cy="23.5" r="1" fill="#C99424" />
        <circle cx="57" cy="23.5" r="1" fill="#C99424" />

        {/* Badge Text: LEVEL */}
        {showLevelText && (
          <text
            x="50"
            y="35"
            textAnchor="middle"
            fill="#FFE899"
            fontSize="8.5"
            fontWeight="700"
            letterSpacing="2.2"
            fontFamily="'Outfit', 'Plus Jakarta Sans', sans-serif"
          >
            LEVEL
          </text>
        )}

        {/* Badge Big Level Number */}
        <text
          x="50"
          y={showLevelText ? "76" : "66"}
          textAnchor="middle"
          fill={`url(#goldNum-${level}-${size})`}
          fontSize="44"
          fontWeight="800"
          fontFamily="'Outfit', sans-serif"
          style={{
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.8))',
          }}
        >
          {formattedLevel}
        </text>

        <line x1="38" y1="84" x2="62" y2="84" stroke={`url(#innerGold-${level}-${size})`} strokeWidth="1.5" strokeLinecap="round" opacity="0.75" />
      </svg>
    </div>
  );
};
