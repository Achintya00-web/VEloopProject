import React, { useId } from 'react';

export const VECoin = ({ size = 32, className = '', text = 'V' }) => {
  const gradientId = `ve-coin-${useId().replace(/:/g, '')}`;

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full filter drop-shadow-[0_2px_6px_rgba(244,197,66,0.4)]"
      >
        <defs>
          <linearGradient id={`${gradientId}-rim`} x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFF2B2" />
            <stop offset="45%" stopColor="#F5C744" />
            <stop offset="80%" stopColor="#B8871E" />
            <stop offset="100%" stopColor="#75500A" />
          </linearGradient>
          <linearGradient id={`${gradientId}-face`} x1="5" y1="5" x2="35" y2="35" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FAD867" />
            <stop offset="60%" stopColor="#D9A52C" />
            <stop offset="100%" stopColor="#A87714" />
          </linearGradient>
        </defs>

        <circle cx="20" cy="20" r="19" fill={`url(#${gradientId}-rim)`} />
        <circle cx="20" cy="20" r="16.5" fill="none" stroke="#75500A" strokeWidth="0.8" strokeDasharray="1.5 1.5" />
        <circle cx="20" cy="20" r="15" fill={`url(#${gradientId}-face)`} />
        <path
          d="M10 12 C 14 7, 26 7, 30 12 C 26 10, 14 10, 10 12 Z"
          fill="#FFFFFF"
          opacity="0.45"
        />
        <text
          x="20"
          y="26"
          textAnchor="middle"
          fill="#5C3E05"
          fontSize="17"
          fontWeight="900"
          fontFamily="'Outfit', sans-serif"
          style={{ filter: 'drop-shadow(0 1px 1px rgba(255,255,255,0.4))' }}
        >
          {text}
        </text>
      </svg>
    </div>
  );
};

export const XPOrb = ({ size = 36, className = '' }) => {
  const gradientId = `xp-orb-${useId().replace(/:/g, '')}`;

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full filter drop-shadow-[0_0_10px_rgba(139,92,246,0.7)]"
      >
        <defs>
          <radialGradient id={`${gradientId}-face`} cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#F3E8FF" />
            <stop offset="25%" stopColor="#C084FC" />
            <stop offset="70%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#581C87" />
          </radialGradient>
          <radialGradient id={`${gradientId}-glow`} cx="50%" cy="50%" r="50%">
            <stop offset="80%" stopColor="#A855F7" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#A855F7" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="20" cy="20" r="19" fill={`url(#${gradientId}-glow)`} />
        <circle cx="20" cy="20" r="16" fill={`url(#${gradientId}-face)`} />
        <ellipse cx="14" cy="13" rx="5" ry="3" fill="#FFFFFF" opacity="0.65" transform="rotate(-30 14 13)" />
        <text
          x="20"
          y="25"
          textAnchor="middle"
          fill="#FFFFFF"
          fontSize="12.5"
          fontWeight="900"
          fontFamily="'Outfit', sans-serif"
          letterSpacing="0.5"
          style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.6))' }}
        >
          XP
        </text>
      </svg>
    </div>
  );
};

export const GemIcon = ({ size = 32, className = '' }) => {
  const gradientId = `reward-gem-${useId().replace(/:/g, '')}`;

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full filter drop-shadow-[0_0_8px_rgba(112,214,139,0.6)]"
      >
        <defs>
          <linearGradient id={`${gradientId}-top`} x1="10" y1="10" x2="30" y2="20" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#A7F3D0" />
            <stop offset="100%" stopColor="#34D399" />
          </linearGradient>
          <linearGradient id={`${gradientId}-bottom`} x1="10" y1="20" x2="30" y2="35" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#065F46" />
          </linearGradient>
        </defs>
        <polygon points="12,12 28,12 36,20 20,36 4,20" fill={`url(#${gradientId}-bottom)`} />
        <polygon points="12,12 28,12 36,20 20,20 4,20" fill={`url(#${gradientId}-top)`} />
        <polygon points="12,12 20,20 4,20" fill="#6EE7B7" opacity="0.8" />
        <polygon points="28,12 36,20 20,20" fill="#059669" opacity="0.9" />
        <polygon points="20,20 36,20 20,36" fill="#047857" />
        <polygon points="20,20 4,20 20,36" fill="#10B981" />
        <circle cx="16" cy="15" r="1.5" fill="#FFFFFF" />
      </svg>
    </div>
  );
};

export const LaurelTrophy = ({ size = 110, className = '' }) => {
  const gradientId = `laurel-trophy-${useId().replace(/:/g, '')}`;

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full filter drop-shadow-[0_0_20px_rgba(244,197,66,0.65)]"
      >
        <defs>
          <linearGradient id={`${gradientId}-gold`} x1="10" y1="10" x2="110" y2="110" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFF7D6" />
            <stop offset="40%" stopColor="#F5C744" />
            <stop offset="80%" stopColor="#C99424" />
            <stop offset="100%" stopColor="#8A5F12" />
          </linearGradient>
          <radialGradient id={`${gradientId}-glow`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F5C744" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#F5C744" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="60" cy="60" r="50" fill={`url(#${gradientId}-glow)`} />

        <g fill={`url(#${gradientId}-gold)`}>
          <path d="M 28 85 C 24 75, 22 55, 32 38 C 34 35, 35 38, 33 42 C 26 55, 27 72, 32 82 Z" />
          <path d="M 22 72 C 16 68, 14 60, 19 54 C 23 49, 27 57, 23 66 Z" />
          <path d="M 25 56 C 20 50, 19 42, 25 37 C 30 33, 33 41, 28 50 Z" />
          <path d="M 32 42 C 28 35, 30 26, 37 23 C 42 20, 43 30, 36 38 Z" />
          <path d="M 44 30 C 42 22, 47 15, 54 15 C 58 15, 57 24, 49 28 Z" />
        </g>

        <g fill={`url(#${gradientId}-gold)`} transform="translate(120, 0) scale(-1, 1)">
          <path d="M 28 85 C 24 75, 22 55, 32 38 C 34 35, 35 38, 33 42 C 26 55, 27 72, 32 82 Z" />
          <path d="M 22 72 C 16 68, 14 60, 19 54 C 23 49, 27 57, 23 66 Z" />
          <path d="M 25 56 C 20 50, 19 42, 25 37 C 30 33, 33 41, 28 50 Z" />
          <path d="M 32 42 C 28 35, 30 26, 37 23 C 42 20, 43 30, 36 38 Z" />
          <path d="M 44 30 C 42 22, 47 15, 54 15 C 58 15, 57 24, 49 28 Z" />
        </g>

        <polygon points="60,32 78,44 78,74 60,88 42,74 42,44" fill="#141724" stroke={`url(#${gradientId}-gold)`} strokeWidth="3" />
        <polygon points="60,36 74,46 74,71 60,82 46,71 46,46" fill="#1C2032" />

        <polygon
          points="60,46 64,56 75,56 66,63 69,73 60,67 51,73 54,63 45,56 56,56"
          fill={`url(#${gradientId}-gold)`}
          style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}
        />

        <path d="M 40 92 L 60 86 L 80 92 L 74 98 L 60 95 L 46 98 Z" fill={`url(#${gradientId}-gold)`} />
      </svg>
    </div>
  );
};

export const TreasureChest = ({ size = 72, className = '' }) => {
  const gradientId = `treasure-chest-${useId().replace(/:/g, '')}`;

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size * 0.85 }}
    >
      <svg
        viewBox="0 0 100 85"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full filter drop-shadow-[0_4px_12px_rgba(244,197,66,0.35)]"
      >
        <defs>
          <linearGradient id={`${gradientId}-wood`} x1="0" y1="20" x2="0" y2="85" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#854D0E" />
            <stop offset="50%" stopColor="#583101" />
            <stop offset="100%" stopColor="#301A01" />
          </linearGradient>
          <linearGradient id={`${gradientId}-gold`} x1="0" y1="0" x2="100" y2="85" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFF2B2" />
            <stop offset="40%" stopColor="#F5C744" />
            <stop offset="80%" stopColor="#B8871E" />
            <stop offset="100%" stopColor="#75500A" />
          </linearGradient>
          <radialGradient id={`${gradientId}-glow`} cx="50%" cy="35%" r="50%">
            <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#F5C744" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#F5C744" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="50" cy="30" r="30" fill={`url(#${gradientId}-glow)`} />
        <rect x="15" y="42" width="70" height="38" rx="4" fill={`url(#${gradientId}-wood)`} stroke={`url(#${gradientId}-gold)`} strokeWidth="2.5" />
        <line x1="16" y1="55" x2="84" y2="55" stroke="#3D2102" strokeWidth="2" />
        <line x1="16" y1="68" x2="84" y2="68" stroke="#3D2102" strokeWidth="2" />

        <rect x="15" y="42" width="10" height="38" fill={`url(#${gradientId}-gold)`} opacity="0.8" />
        <rect x="75" y="42" width="10" height="38" fill={`url(#${gradientId}-gold)`} opacity="0.8" />
        <rect x="44" y="42" width="12" height="38" fill={`url(#${gradientId}-gold)`} opacity="0.8" />

        <path d="M 12 36 Q 50 12 88 36 L 85 43 Q 50 22 15 43 Z" fill={`url(#${gradientId}-wood)`} stroke={`url(#${gradientId}-gold)`} strokeWidth="2.5" />
        <rect x="44" y="24" width="12" height="18" fill={`url(#${gradientId}-gold)`} opacity="0.8" />

        <circle cx="36" cy="38" r="7" fill="#FDE047" stroke="#CA8A04" strokeWidth="1.5" />
        <circle cx="48" cy="36" r="8" fill="#FACC15" stroke="#A16207" strokeWidth="1.5" />
        <circle cx="62" cy="39" r="7" fill="#FDE047" stroke="#CA8A04" strokeWidth="1.5" />
        <circle cx="42" cy="34" r="6" fill="#FEF08A" />
        <circle cx="56" cy="35" r="6.5" fill="#FDE047" stroke="#CA8A04" strokeWidth="1" />

        <polygon points="52,28 58,28 62,34 52,42 42,34" fill="#C084FC" stroke="#7E22CE" strokeWidth="1" />
        <polygon points="52,28 58,28 62,34 52,34 42,34" fill="#E9D5FF" />
        <polygon points="30,34 35,34 39,39 32,45 25,39" fill="#34D399" stroke="#047857" strokeWidth="1" />

        <circle cx="50" cy="52" r="6" fill={`url(#${gradientId}-gold)`} stroke="#3D2102" strokeWidth="1.5" />
        <circle cx="50" cy="52" r="2.5" fill="#1C1103" />
        <rect x="49" y="52" width="2" height="4" fill="#1C1103" />
      </svg>
    </div>
  );
};
