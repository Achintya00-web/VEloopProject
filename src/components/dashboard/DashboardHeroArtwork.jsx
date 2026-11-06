import React, { useId } from 'react';

export const DashboardHeroArtwork = () => {
  const id = `dashboard-art-${useId().replace(/:/g, '')}`;

  return (
    <svg className="dashboard-welcome__artwork" viewBox="0 0 640 260" role="img" aria-label="A voyager standing before the VELOOP galaxy portal">
      <defs>
        <linearGradient id={`${id}-v`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#F8D8FF" />
          <stop offset=".34" stopColor="#C14EFF" />
          <stop offset=".7" stopColor="#7624E8" />
          <stop offset="1" stopColor="#3B0E8A" />
        </linearGradient>
        <linearGradient id={`${id}-mountain`} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#8F3DEB" />
          <stop offset="1" stopColor="#140A31" />
        </linearGradient>
        <radialGradient id={`${id}-portal`}>
          <stop stopColor="#D778FF" stopOpacity=".76" />
          <stop offset=".55" stopColor="#6F18D4" stopOpacity=".28" />
          <stop offset="1" stopColor="#3B087C" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="474" cy="170" rx="190" ry="116" fill={`url(#${id}-portal)`} />
      <path d="M383 216 445 28h39l-76 188h-25Zm58 0 85-188h38l-87 188h-36Zm-80-30h176v18H361v-18Z" fill={`url(#${id}-v)`} opacity=".95" />
      <path d="M401 215h177" stroke="#EBC5FF" strokeOpacity=".8" strokeWidth="2" />
      <ellipse cx="481" cy="225" rx="117" ry="17" fill="#822EFF" fillOpacity=".23" stroke="#D18BFF" strokeOpacity=".55" />
      <path d="m0 220 75-44 35 17 61-89 56 85 48-37 52 66 44-31 45 45H0Z" fill="#35105F" />
      <path d="m0 240 86-47 60 33 67-73 56 57 51-38 75 55 42-32 84 45H0Z" fill={`url(#${id}-mountain)`} />
      <path d="M0 247h640v13H0z" fill="#10091F" />
      <path d="M255 208c-9-18-1-37 12-51l4-16 5 15 13 6-10 5 4 15c7 5 14 17 13 26h-41Z" fill="#090914" />
      <path d="m271 146 5-13 6 13-5 5-6-5Z" fill="#E8CEFF" />
      <path d="M240 215h70" stroke="#F0BE5E" strokeOpacity=".72" strokeWidth="2" />
      <path d="M196 234h285M356 242h231" stroke="#A54CFF" strokeOpacity=".42" />
      <g fill="#FFF1C2">
        <circle cx="87" cy="53" r="1.5" /><circle cx="187" cy="79" r="1.2" /><circle cx="287" cy="42" r="1.4" />
        <circle cx="363" cy="57" r="1.1" /><circle cx="541" cy="51" r="1.6" /><circle cx="595" cy="94" r="1.1" />
        <circle cx="141" cy="122" r="1.1" /><circle cx="323" cy="103" r="1.4" /><circle cx="510" cy="128" r="1.2" />
      </g>
      <path d="M76 85h38M95 66v38M551 157h25M563 145v25" stroke="#F4CA64" strokeOpacity=".64" strokeWidth="1.3" />
    </svg>
  );
};
