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

export const LaurelTrophy = ({ size = 156, className = '' }) => {
  const gradientId = `laurel-trophy-${useId().replace(/:/g, '')}`;

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: Math.round(size * 0.92) }}
    >
      <svg
        viewBox="0 0 180 166"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full filter drop-shadow-[0_10px_24px_rgba(244,197,66,0.48)]"
      >
        <defs>
          <linearGradient id={`${gradientId}-gold`} x1="20" y1="10" x2="160" y2="156" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFF9DB" />
            <stop offset="28%" stopColor="#FFE073" />
            <stop offset="58%" stopColor="#F2B92E" />
            <stop offset="84%" stopColor="#B87A14" />
            <stop offset="100%" stopColor="#FFE58F" />
          </linearGradient>
          <linearGradient id={`${gradientId}-gold-deep`} x1="40" y1="24" x2="140" y2="145" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F6CF58" />
            <stop offset="50%" stopColor="#C3831B" />
            <stop offset="100%" stopColor="#724408" />
          </linearGradient>
          <linearGradient id={`${gradientId}-wing`} x1="12" y1="36" x2="86" y2="108" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFF5C0" />
            <stop offset="35%" stopColor="#F4C542" />
            <stop offset="72%" stopColor="#B97B18" />
            <stop offset="100%" stopColor="#6D410A" />
          </linearGradient>
          <linearGradient id={`${gradientId}-wing-plume`} x1="18" y1="54" x2="72" y2="108" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#C084FC" />
            <stop offset="55%" stopColor="#7E22CE" />
            <stop offset="100%" stopColor="#3B0764" />
          </linearGradient>
          <linearGradient id={`${gradientId}-shield`} x1="90" y1="28" x2="90" y2="132" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#341B63" />
            <stop offset="48%" stopColor="#1B0E36" />
            <stop offset="100%" stopColor="#0C071B" />
          </linearGradient>
          <linearGradient id={`${gradientId}-gem`} x1="74" y1="42" x2="106" y2="90" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F5D0FE" />
            <stop offset="38%" stopColor="#C084FC" />
            <stop offset="75%" stopColor="#7E22CE" />
            <stop offset="100%" stopColor="#4C1D95" />
          </linearGradient>
          <radialGradient id={`${gradientId}-aura`} cx="50%" cy="48%" r="50%">
            <stop offset="0%" stopColor="#FFD86B" stopOpacity="0.42" />
            <stop offset="52%" stopColor="#A855F7" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#A855F7" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient radial energy burst */}
        <circle cx="90" cy="82" r="74" fill={`url(#${gradientId}-aura)`} />

        {/* Engraved heraldic outer ring */}
        <circle
          cx="90"
          cy="82"
          r="56"
          stroke={`url(#${gradientId}-gold)`}
          strokeOpacity="0.34"
          strokeWidth="1.4"
          strokeDasharray="4 4"
        />
        <circle
          cx="90"
          cy="82"
          r="49"
          stroke="#C084FC"
          strokeOpacity="0.32"
          strokeWidth="1"
        />

        {/* Grand Swept Victory Wings - Left */}
        <g>
          <path
            d="M52 62 C36 44, 16 32, 6 24 C10 42, 20 56, 36 68 L14 57 C19 70, 29 79, 44 84 L23 82 C29 93, 41 99, 55 100 L64 82 Z"
            fill={`url(#${gradientId}-wing)`}
            stroke="#FFF4BF"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <path
            d="M49 69 C36 55, 22 45, 13 38 C17 50, 26 60, 39 69 L21 63 C25 72, 34 78, 46 82 Z"
            fill={`url(#${gradientId}-wing-plume)`}
            opacity="0.9"
          />
          <path
            d="M14 33 L44 63 M20 62 L46 76 M28 84 L50 92"
            stroke="#FFF7D4"
            strokeOpacity="0.72"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </g>

        {/* Grand Swept Victory Wings - Right */}
        <g transform="translate(180, 0) scale(-1, 1)">
          <path
            d="M52 62 C36 44, 16 32, 6 24 C10 42, 20 56, 36 68 L14 57 C19 70, 29 79, 44 84 L23 82 C29 93, 41 99, 55 100 L64 82 Z"
            fill={`url(#${gradientId}-wing)`}
            stroke="#FFF4BF"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <path
            d="M49 69 C36 55, 22 45, 13 38 C17 50, 26 60, 39 69 L21 63 C25 72, 34 78, 46 82 Z"
            fill={`url(#${gradientId}-wing-plume)`}
            opacity="0.9"
          />
          <path
            d="M14 33 L44 63 M20 62 L46 76 M28 84 L50 92"
            stroke="#FFF7D4"
            strokeOpacity="0.72"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </g>

        {/* Sculpted Golden Laurels hugging shield base */}
        <g fill={`url(#${gradientId}-gold)`}>
          <path d="M51 124 C42 114, 38 99, 43 85 C47 93, 50 107, 56 121 Z" />
          <path d="M40 112 C33 107, 32 98, 38 93 C43 97, 44 105, 40 112 Z" />
          <path d="M46 122 C39 119, 37 111, 42 106 C47 109, 49 116, 46 122 Z" />
          <path d="M57 129 C50 129, 46 122, 50 117 C55 118, 59 124, 57 129 Z" />
        </g>
        <g fill={`url(#${gradientId}-gold)`} transform="translate(180, 0) scale(-1, 1)">
          <path d="M51 124 C42 114, 38 99, 43 85 C47 93, 50 107, 56 121 Z" />
          <path d="M40 112 C33 107, 32 98, 38 93 C43 97, 44 105, 40 112 Z" />
          <path d="M46 122 C39 119, 37 111, 42 106 C47 109, 49 116, 46 122 Z" />
          <path d="M57 129 C50 129, 46 122, 50 117 C55 118, 59 124, 57 129 Z" />
        </g>

        {/* Imperial Crown Crest & Apex Crystal */}
        <path
          d="M66 36 L71 17 L82 26 L90 12 L98 26 L109 17 L114 36 Z"
          fill={`url(#${gradientId}-gold)`}
          stroke="#FFF6C8"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <polygon
          points="90,4 96,12 90,20 84,12"
          fill={`url(#${gradientId}-gem)`}
          stroke="#FFF5CC"
          strokeWidth="1.2"
        />
        <circle cx="71" cy="17" r="2.6" fill="#FFF7D6" />
        <circle cx="109" cy="17" r="2.6" fill="#FFF7D6" />

        {/* Beveled Outer Championship Shield */}
        <polygon
          points="90,30 129,48 126,102 90,136 54,102 51,48"
          fill={`url(#${gradientId}-gold)`}
          stroke="#FFF8DB"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
        <polygon
          points="90,35 123,51 120,99 90,129 60,99 57,51"
          fill={`url(#${gradientId}-gold-deep)`}
        />
        {/* Recessed Cosmic Shield Plate */}
        <polygon
          points="90,39 118,54 115,96 90,123 65,96 62,54"
          fill={`url(#${gradientId}-shield)`}
          stroke={`url(#${gradientId}-gold)`}
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        {/* Diagonal Glass Sheen */}
        <polygon
          points="90,39 118,54 88,88 62,64 62,54"
          fill="#FFFFFF"
          opacity="0.08"
        />
        {/* Inner Filigree Frame */}
        <polygon
          points="90,45 112,57 110,93 90,116 70,93 68,57"
          fill="none"
          stroke="#C084FC"
          strokeOpacity="0.45"
          strokeWidth="1.1"
        />

        {/* Hero Golden Championship Chalice inside Shield */}
        <g>
          {/* Chalice Left & Right Handles */}
          <path
            d="M73 61 C65 61, 64 74, 74 77"
            fill="none"
            stroke={`url(#${gradientId}-gold)`}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M107 61 C115 61, 116 74, 106 77"
            fill="none"
            stroke={`url(#${gradientId}-gold)`}
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Chalice Cup Body */}
          <path
            d="M73 56 L107 56 L104 75 C102 84, 96 89, 90 90 C84 89, 78 84, 76 75 Z"
            fill={`url(#${gradientId}-gold)`}
            stroke="#FFF8D8"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          {/* Cup Inner Highlight */}
          <path
            d="M77 60 L86 60 L84 82 C80 79, 78 73, 77 60 Z"
            fill="#FFFDF0"
            opacity="0.45"
          />
          {/* Chalice Stem & Plinth */}
          <rect x="86.5" y="89" width="7" height="11" rx="2" fill={`url(#${gradientId}-gold-deep)`} />
          <path
            d="M77 100 L103 100 L106 107 L74 107 Z"
            fill={`url(#${gradientId}-gold)`}
            stroke="#FFF4C2"
            strokeWidth="1"
            strokeLinejoin="round"
          />
          {/* Faceted Amethyst Core Gem on Chalice */}
          <polygon
            points="90,61 97,70 90,79 83,70"
            fill={`url(#${gradientId}-gem)`}
            stroke="#FCE7F3"
            strokeWidth="1.1"
          />
          <polygon points="90,62 94,70 90,77" fill="#FAF5FF" opacity="0.38" />
        </g>

        {/* Sculpted Victory Ribbon Scroll at Base */}
        <g>
          <path
            d="M48 128 L66 123 L66 139 L44 142 L51 135 Z"
            fill={`url(#${gradientId}-gold-deep)`}
            stroke="#FFE58F"
            strokeWidth="1"
            strokeLinejoin="round"
          />
          <path
            d="M132 128 L114 123 L114 139 L136 142 L129 135 Z"
            fill={`url(#${gradientId}-gold-deep)`}
            stroke="#FFE58F"
            strokeWidth="1"
            strokeLinejoin="round"
          />
          <path
            d="M61 124 Q90 134 119 124 L117 141 Q90 150 63 141 Z"
            fill={`url(#${gradientId}-gold)`}
            stroke="#FFF7D6"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
          <polygon points="90,129 93.5,134.5 90,140 86.5,134.5" fill="#4C1D95" stroke="#FFF4C2" strokeWidth="0.9" />
        </g>

        {/* Crisp 4-Point Victory Sparkles */}
        <path d="M36 22 L38 28 L44 30 L38 32 L36 38 L34 32 L28 30 L34 28 Z" fill="#FFF6C4" />
        <path d="M145 24 L147 29.5 L152.5 31.5 L147 33.5 L145 39 L143 33.5 L137.5 31.5 L143 29.5 Z" fill="#FFD15A" />
        <path d="M150 108 L151.4 111.6 L155 113 L151.4 114.4 L150 118 L148.6 114.4 L145 113 L148.6 111.6 Z" fill="#E9D5FF" />
        <path d="M29 108 L30.4 111.6 L34 113 L30.4 114.4 L29 118 L27.6 114.4 L24 113 L27.6 111.6 Z" fill="#FFF6C4" />
      </svg>
    </div>
  );
};

export const TreasureChest = ({ size = 72, className = '' }) => {
  const gradientId = `treasure-chest-${useId().replace(/:/g, '')}`;

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: Math.round(size * 0.82) }}
    >
      <svg
        viewBox="0 0 180 148"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full filter drop-shadow-[0_8px_16px_rgba(12,7,26,0.55)]"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id={`${gradientId}-aura`} cx="50%" cy="46%" r="48%">
            <stop offset="0%" stopColor="#FFF0A6" stopOpacity="0.88" />
            <stop offset="40%" stopColor="#F4C542" stopOpacity="0.34" />
            <stop offset="72%" stopColor="#9333EA" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#9333EA" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`${gradientId}-shadow`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#05030C" stopOpacity="0.72" />
            <stop offset="100%" stopColor="#05030C" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`${gradientId}-gold`} x1="24" y1="16" x2="156" y2="132" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFF5BE" />
            <stop offset="28%" stopColor="#F8D254" />
            <stop offset="58%" stopColor="#D99B26" />
            <stop offset="86%" stopColor="#965D10" />
            <stop offset="100%" stopColor="#E6B23A" />
          </linearGradient>
          <linearGradient id={`${gradientId}-gold-bright`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFF9D6" />
            <stop offset="48%" stopColor="#F4C542" />
            <stop offset="100%" stopColor="#B87716" />
          </linearGradient>
          <linearGradient id={`${gradientId}-wood-front`} x1="34" y1="68" x2="122" y2="128" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#3B235E" />
            <stop offset="52%" stopColor="#221539" />
            <stop offset="100%" stopColor="#130C22" />
          </linearGradient>
          <linearGradient id={`${gradientId}-wood-side`} x1="120" y1="68" x2="154" y2="122" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#261740" />
            <stop offset="100%" stopColor="#0E091A" />
          </linearGradient>
          <linearGradient id={`${gradientId}-lid-top`} x1="40" y1="14" x2="136" y2="66" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#563585" />
            <stop offset="55%" stopColor="#2C1B49" />
            <stop offset="100%" stopColor="#170E29" />
          </linearGradient>
          <linearGradient id={`${gradientId}-lid-side`} x1="120" y1="20" x2="154" y2="68" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#321E52" />
            <stop offset="100%" stopColor="#130B23" />
          </linearGradient>
          <linearGradient id={`${gradientId}-amethyst`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FAE8FF" />
            <stop offset="38%" stopColor="#C084FC" />
            <stop offset="100%" stopColor="#6B21A8" />
          </linearGradient>
          <linearGradient id={`${gradientId}-emerald`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#D1FAE5" />
            <stop offset="45%" stopColor="#34D399" />
            <stop offset="100%" stopColor="#065F46" />
          </linearGradient>
        </defs>

        {/* Ground shadow & inner treasure aura */}
        <ellipse cx="92" cy="134" rx="64" ry="11" fill={`url(#${gradientId}-shadow)`} />
        <ellipse cx="90" cy="64" rx="74" ry="54" fill={`url(#${gradientId}-aura)`} />

        {/* Back Open Vaulted Lid (3/4 perspective) */}
        <g>
          {/* Main curved lid shell */}
          <path
            d="M27 65 C22 44, 30 22, 48 18 L119 15 C135 16, 146 31, 149 54 L145 64 L31 70 Z"
            fill={`url(#${gradientId}-lid-top)`}
            stroke={`url(#${gradientId}-gold)`}
            strokeWidth="3.2"
            strokeLinejoin="round"
          />
          {/* Lid right curved side panel */}
          <path
            d="M119 15 C135 16, 146 31, 149 54 L145 64 L123 65 C127 45, 123 26, 119 15 Z"
            fill={`url(#${gradientId}-lid-side)`}
            stroke={`url(#${gradientId}-gold)`}
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          {/* Subtle wood plank grooves on lid */}
          <path d="M31 36 Q78 30 124 31" stroke="#6D48A3" strokeOpacity="0.45" strokeWidth="1.2" />
          <path d="M29 50 Q78 44 125 45" stroke="#6D48A3" strokeOpacity="0.35" strokeWidth="1.2" />
          {/* Lid gold straps */}
          <path
            d="M52 18 C43 24, 39 42, 42 68 L51 67 C48 42, 52 24, 60 17 Z"
            fill={`url(#${gradientId}-gold)`}
            stroke="#FFF3B8"
            strokeWidth="0.8"
          />
          <path
            d="M99 16 C92 22, 90 40, 92 66 L101 66 C99 40, 102 22, 108 16 Z"
            fill={`url(#${gradientId}-gold)`}
            stroke="#FFF3B8"
            strokeWidth="0.8"
          />
          {/* Lid lower brass lip */}
          <path
            d="M26 65 Q78 58 148 56 L146 65 Q78 68 29 73 Z"
            fill={`url(#${gradientId}-gold)`}
            stroke="#FFF2B2"
            strokeWidth="1"
          />
        </g>

        {/* Dark Velvet Interior Cavity */}
        <path
          d="M31 69 Q82 59 144 62 L132 82 Q82 88 34 80 Z"
          fill="#140B24"
          stroke="#6A3FA0"
          strokeOpacity="0.65"
          strokeWidth="1.2"
        />

        {/* Overflowing Treasure Pile */}
        <g>
          {/* Back gold coin mound */}
          <ellipse cx="64" cy="67" rx="13" ry="6.5" fill={`url(#${gradientId}-gold-bright)`} stroke="#FFF6C4" strokeWidth="1" />
          <ellipse cx="90" cy="64" rx="15" ry="7" fill={`url(#${gradientId}-gold-bright)`} stroke="#FFF6C4" strokeWidth="1" />
          <ellipse cx="114" cy="67" rx="13" ry="6.5" fill={`url(#${gradientId}-gold-bright)`} stroke="#FFF6C4" strokeWidth="1" />

          {/* Left faceted amethyst cluster */}
          <polygon points="44,68 52,48 63,56 59,72" fill={`url(#${gradientId}-amethyst)`} stroke="#F5D0FE" strokeWidth="1" />
          <polygon points="52,48 56,62 63,56" fill="#FAF5FF" opacity="0.55" />
          <polygon points="59,70 67,50 77,60 71,73" fill={`url(#${gradientId}-amethyst)`} stroke="#F5D0FE" strokeWidth="1" />
          <polygon points="67,50 71,63 77,60" fill="#FFFFFF" opacity="0.5" />

          {/* Right faceted emerald crystal */}
          <polygon points="109,71 118,49 130,57 125,73" fill={`url(#${gradientId}-emerald)`} stroke="#A7F3D0" strokeWidth="1.1" />
          <polygon points="118,49 122,63 130,57" fill="#ECFDF5" opacity="0.6" />

          {/* Hero upright VE Gold Coin */}
          <g transform="translate(88, 56)">
            <circle cx="0" cy="0" r="15.5" fill={`url(#${gradientId}-gold-bright)`} stroke="#FFF7CE" strokeWidth="1.6" />
            <circle cx="0" cy="0" r="12" fill="none" stroke="#9E6510" strokeWidth="1" strokeDasharray="1.8 1.5" />
            <text
              x="0"
              y="5.5"
              textAnchor="middle"
              fill="#6E4406"
              fontSize="14.5"
              fontWeight="900"
              fontFamily="Outfit, Plus Jakarta Sans, sans-serif"
            >
              V
            </text>
          </g>

          {/* Front tilted coins */}
          <g transform="rotate(-18 52 72)">
            <ellipse cx="52" cy="72" rx="10.5" ry="5.5" fill={`url(#${gradientId}-gold-bright)`} stroke="#FFF6C4" strokeWidth="1.1" />
            <ellipse cx="52" cy="72" rx="7" ry="3.4" stroke="#B67716" strokeWidth="0.9" />
          </g>
          <g transform="rotate(16 112 72)">
            <ellipse cx="112" cy="72" rx="10.5" ry="5.5" fill={`url(#${gradientId}-gold-bright)`} stroke="#FFF6C4" strokeWidth="1.1" />
            <ellipse cx="112" cy="72" rx="7" ry="3.4" stroke="#B67716" strokeWidth="0.9" />
          </g>
          <g transform="rotate(-8 73 74)">
            <ellipse cx="73" cy="74" rx="10" ry="5" fill={`url(#${gradientId}-gold-bright)`} stroke="#FFF6C4" strokeWidth="1.1" />
          </g>

          {/* Small front violet jewel */}
          <polygon points="94,70 101,64 107,70 101,76" fill={`url(#${gradientId}-amethyst)`} stroke="#F5D0FE" strokeWidth="1" />
        </g>

        {/* Chest Base Box (Front + 3/4 Right Side) */}
        <g>
          {/* Main front recessed body */}
          <path
            d="M27 72 L120 80 L115 129 L33 118 Z"
            fill={`url(#${gradientId}-wood-front)`}
            stroke={`url(#${gradientId}-gold)`}
            strokeWidth="3.2"
            strokeLinejoin="round"
          />
          {/* Right 3/4 side wall */}
          <path
            d="M120 80 L152 67 L145 113 L115 129 Z"
            fill={`url(#${gradientId}-wood-side)`}
            stroke={`url(#${gradientId}-gold)`}
            strokeWidth="3.2"
            strokeLinejoin="round"
          />

          {/* Horizontal recessed wood panel lines */}
          <path d="M31 94 L117 103" stroke="#68439E" strokeOpacity="0.4" strokeWidth="1.2" />
          <path d="M33 107 L116 116" stroke="#68439E" strokeOpacity="0.35" strokeWidth="1.2" />
          <path d="M119 99 L148 86" stroke="#4D327A" strokeOpacity="0.45" strokeWidth="1.2" />

          {/* Vertical gold corner & front straps */}
          <path d="M47 75 L55 76 L57 121 L50 120 Z" fill={`url(#${gradientId}-gold)`} stroke="#FFF3B8" strokeWidth="0.6" />
          <path d="M97 79 L105 80 L102 127 L95 126 Z" fill={`url(#${gradientId}-gold)`} stroke="#FFF3B8" strokeWidth="0.6" />
          <path d="M134 74 L141 71 L136 118 L129 121 Z" fill={`url(#${gradientId}-gold)`} stroke="#FFF3B8" strokeWidth="0.6" />

          {/* Top gilded chest rim */}
          <path
            d="M24 68 L121 76 L154 63 L152 72 L120 85 L26 77 Z"
            fill={`url(#${gradientId}-gold)`}
            stroke="#FFF4BD"
            strokeWidth="1.1"
            strokeLinejoin="round"
          />

          {/* Bottom gilded base trim */}
          <path
            d="M31 114 L115 125 L146 109 L145 116 L115 132 L32 121 Z"
            fill={`url(#${gradientId}-gold)`}
            stroke="#FFE68C"
            strokeWidth="0.9"
            strokeLinejoin="round"
          />

          {/* Metallic rivets on straps */}
          <circle cx="52" cy="88" r="1.6" fill="#FFF8D6" />
          <circle cx="53" cy="110" r="1.6" fill="#FFF8D6" />
          <circle cx="100" cy="92" r="1.6" fill="#FFF8D6" />
          <circle cx="99" cy="114" r="1.6" fill="#FFF8D6" />
          <circle cx="136" cy="88" r="1.5" fill="#FFF8D6" />
          <circle cx="133" cy="107" r="1.5" fill="#FFF8D6" />

          {/* Ornate Center Lock Escutcheon */}
          <g transform="translate(76, 95)">
            <path
              d="M0 -14 L13 -9 L11 7 Q0 18 -11 7 L-13 -9 Z"
              fill={`url(#${gradientId}-gold)`}
              stroke="#FFF6C4"
              strokeWidth="1.4"
            />
            <path
              d="M0 -10 L9 -6.5 L7.5 5 Q0 13 -7.5 5 L-9 -6.5 Z"
              fill="#1E1334"
              stroke="#A36914"
              strokeWidth="1"
            />
            {/* Glowing inset diamond gem in lock */}
            <polygon points="0,-6 5.5,0 0,7 -5.5,0" fill={`url(#${gradientId}-amethyst)`} stroke="#FCE7F3" strokeWidth="0.9" />
            <polygon points="0,-5 0,6 -4.5,0" fill="#FAF5FF" opacity="0.7" />
          </g>
        </g>

        {/* Crisp Star Sparkles */}
        <path d="M36 22 L38 27 L43 29 L38 31 L36 36 L34 31 L29 29 L34 27 Z" fill="#FFF6C4" />
        <path d="M144 30 L145.8 34.2 L150 36 L145.8 37.8 L144 42 L142.2 37.8 L138 36 L142.2 34.2 Z" fill="#F4C542" />
        <path d="M128 11 L129.3 14.2 L132.5 15.5 L129.3 16.8 L128 20 L126.7 16.8 L123.5 15.5 L126.7 14.2 Z" fill="#E9D5FF" />
      </svg>
    </div>
  );
};
