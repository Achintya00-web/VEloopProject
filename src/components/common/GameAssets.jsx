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
      style={{ width: size, height: size * 0.75 }}
    >
      <svg
        viewBox="0 0 160 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full filter drop-shadow-[0_4px_12px_rgba(244,197,66,0.4)]"
      >
        <defs>
          <linearGradient id={`${gradientId}-gold`} x1="18" y1="10" x2="142" y2="112" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFF3B5" />
            <stop offset="24%" stopColor="#F9D45E" />
            <stop offset="56%" stopColor="#E7A92D" />
            <stop offset="82%" stopColor="#A96818" />
            <stop offset="100%" stopColor="#FFE28A" />
          </linearGradient>
          <linearGradient id={`${gradientId}-lid`} x1="39" y1="20" x2="120" y2="72" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#49306F" />
            <stop offset="48%" stopColor="#241938" />
            <stop offset="100%" stopColor="#100F20" />
          </linearGradient>
          <linearGradient id={`${gradientId}-body`} x1="40" y1="62" x2="105" y2="117" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#30213E" />
            <stop offset="50%" stopColor="#171625" />
            <stop offset="100%" stopColor="#0D101B" />
          </linearGradient>
          <linearGradient id={`${gradientId}-coin`} x1="61" y1="28" x2="100" y2="69" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFF6C7" />
            <stop offset="38%" stopColor="#FFD95C" />
            <stop offset="78%" stopColor="#E7A92D" />
            <stop offset="100%" stopColor="#A96517" />
          </linearGradient>
          <linearGradient id={`${gradientId}-gem`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F5D6FF" />
            <stop offset="32%" stopColor="#C56BFF" />
            <stop offset="100%" stopColor="#641BC2" />
          </linearGradient>
          <radialGradient id={`${gradientId}-glow`} cx="50%" cy="47%" r="50%">
            <stop offset="0%" stopColor="#FFE98A" stopOpacity="0.8" />
            <stop offset="48%" stopColor="#F5C744" stopOpacity="0.26" />
            <stop offset="100%" stopColor="#F5C744" stopOpacity="0" />
          </radialGradient>
        </defs>

        <ellipse cx="81" cy="61" rx="65" ry="48" fill={`url(#${gradientId}-glow)`} />

        <g transform="rotate(-27 28 43)">
          <ellipse cx="28" cy="43" rx="13" ry="7" fill={`url(#${gradientId}-gold)`} stroke="#FFF0A3" strokeWidth="1.5" />
          <ellipse cx="28" cy="43" rx="9" ry="4.5" stroke="#D18B20" strokeWidth="1" />
          <path d="M28 39 L30 42 L34 43 L30 44 L28 47 L26 44 L22 43 L26 42 Z" fill="#FFF2B2" />
        </g>
        <g transform="rotate(-22 137 55)">
          <ellipse cx="137" cy="55" rx="12" ry="6.5" fill={`url(#${gradientId}-gold)`} stroke="#FFF0A3" strokeWidth="1.4" />
          <ellipse cx="137" cy="55" rx="8" ry="4" stroke="#D18B20" strokeWidth="1" />
        </g>

        <path d="M31 69 L20 34 Q17 25 27 21 L112 11 Q122 10 127 19 L145 51 L135 70 Z" fill={`url(#${gradientId}-gold)`} stroke="#FFE28A" strokeWidth="1.5" />
        <path d="M36 64 L27 36 Q25 31 32 29 L109 20 Q116 19 119 26 L134 52 L128 65 Z" fill="#171323" />
        <path d="M39 59 L32 38 Q30 34 36 33 L107 24 Q113 23 115 29 L127 51 L122 61 Z" fill={`url(#${gradientId}-lid)`} stroke="#B77A26" strokeWidth="1.5" />
        <path d="M40 57 L35 39 Q33 36 38 35 L105 27 Q110 26 112 31 L122 50 L118 57 Z" stroke="#A66BDB" strokeOpacity="0.7" strokeWidth="1" />

        <path d="M48 53 L56 42 L64 52 L72 37 L80 49 L89 34 L97 47 L106 32 L116 51 Z" fill={`url(#${gradientId}-gem)`} stroke="#E4B7FF" strokeWidth="1" />
        <path d="M56 42 L64 52 L72 37 L80 49 L89 34 L97 47 L106 32" stroke="#FFE8A2" strokeOpacity="0.75" strokeWidth="1.3" />
        <path d="M69 51 L78 48 L83 53 L75 58 Z" fill={`url(#${gradientId}-gem)`} />
        <path d="M97 52 L105 46 L111 53 L105 59 Z" fill={`url(#${gradientId}-gem)`} />
        <path d="M48 36 L54 33 L57 38 L52 42 Z" fill={`url(#${gradientId}-gem)`} />

        <circle cx="81" cy="44" r="27" fill={`url(#${gradientId}-glow)`} />
        <circle cx="81" cy="43" r="19" fill={`url(#${gradientId}-coin)`} stroke="#FFF0A3" strokeWidth="2" />
        <circle cx="81" cy="43" r="15.5" stroke="#D89525" strokeWidth="1.2" />
        <path d="M81 30 L86 39 L97 43 L86 47 L81 57 L76 47 L65 43 L76 39 Z" fill="#FFF5C9" stroke="#F0B83B" strokeWidth="1" />
        <path d="M81 30 L81 43 L97 43 L86 47 Z" fill="#F7D45B" opacity="0.75" />

        <path d="M17 61 L30 55 L128 55 L144 62 L134 104 L80 118 L25 103 Z" fill={`url(#${gradientId}-body)`} stroke={`url(#${gradientId}-gold)`} strokeWidth="3" strokeLinejoin="round" />
        <path d="M17 61 L80 73 L80 118 L25 103 Z" fill="#211A2B" stroke="#B97820" strokeWidth="1.2" />
        <path d="M80 73 L144 62 L134 104 L80 118 Z" fill="#11131F" stroke="#B97820" strokeWidth="1.2" />
        <path d="M17 61 Q80 78 144 62 L141 72 Q80 88 20 72 Z" fill={`url(#${gradientId}-gold)`} stroke="#FFF0A3" strokeWidth="1" />
        <path d="M23 76 L30 78 L37 105 L29 102 Z" fill={`url(#${gradientId}-gold)`} />
        <path d="M127 76 L135 74 L129 102 L121 105 Z" fill={`url(#${gradientId}-gold)`} />
        <path d="M55 82 L65 84 L65 113 L56 111 Z" fill={`url(#${gradientId}-gold)`} />
        <path d="M48 83 L80 88 L80 112 L49 105 Z" fill="#141421" stroke="#9D6AC9" strokeWidth="1.2" />
        <path d="M80 88 L111 82 L106 106 L80 112 Z" fill="#171322" stroke="#9D6AC9" strokeWidth="1.2" />

        <path d="M80 82 L92 86 L92 99 Q80 111 68 99 L68 86 Z" fill="#251832" stroke={`url(#${gradientId}-gold)`} strokeWidth="2" />
        <path d="M80 86 L86 92 L80 102 L74 92 Z" fill={`url(#${gradientId}-gem)`} stroke="#F0C2FF" strokeWidth="1" />
        <path d="M80 87 L80 98 L74 92 Z" fill="#F5D6FF" opacity="0.9" />
        <path d="M41 69 L46 71 L52 106 L47 105 Z" fill="#F9D45E" opacity="0.55" />
        <path d="M116 69 L121 68 L114 103 L109 105 Z" fill="#F9D45E" opacity="0.55" />

        <path d="M52 13 L59 5 L66 13 L59 21 Z" fill={`url(#${gradientId}-gem)`} stroke="#FFE28A" strokeWidth="1.5" />
        <path d="M59 6 L59 18 L53 13 Z" fill="#F5D6FF" />
        <path d="M38 27 L40 32 L45 34 L40 36 L38 41 L36 36 L31 34 L36 32 Z" fill="#FFF4C2" />
        <path d="M131 34 L133 39 L138 41 L133 43 L131 48 L129 43 L124 41 L129 39 Z" fill="#FFF4C2" />
        <circle cx="26" cy="77" r="1.8" fill="#FFE994" />
        <circle cx="139" cy="79" r="1.8" fill="#FFE994" />
      </svg>
    </div>
  );
};
