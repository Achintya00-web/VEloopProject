import React, { useEffect, useRef } from 'react';

export const CursorAtmosphere = () => {
  const atmosphereRef = useRef(null);

  useEffect(() => {
    const atmosphere = atmosphereRef.current;
    if (!atmosphere || !window.matchMedia('(pointer: fine)').matches) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const layers = [...atmosphere.querySelectorAll('.cursor-atmosphere__orb')];
    const coins = [...atmosphere.querySelectorAll('.cursor-atmosphere__coin')];
    let frameId = 0;
    let pointerX = 0;
    let pointerY = 0;

    const updateAtmosphere = () => {
      atmosphere.style.opacity = '1';
      atmosphere.style.setProperty('--cursor-x', `${pointerX}px`);
      atmosphere.style.setProperty('--cursor-y', `${pointerY}px`);

      const offsetX = pointerX - window.innerWidth / 2;
      const offsetY = pointerY - window.innerHeight / 2;
      layers.forEach((layer, index) => {
        const depth = (index + 1) * 0.012;
        layer.style.transform = `translate3d(${offsetX * depth}px, ${offsetY * depth}px, 0)`;
      });

      coins.forEach((coin) => {
        const bounds = coin.getBoundingClientRect();
        const coinX = bounds.left + bounds.width / 2;
        const coinY = bounds.top + bounds.height / 2;
        const deltaX = pointerX - coinX;
        const deltaY = pointerY - coinY;
        const distance = Math.hypot(deltaX, deltaY);
        const influence = Math.max(0, 1 - distance / 260);

        coin.style.setProperty('--coin-x', `${deltaX * influence * 0.14}px`);
        coin.style.setProperty('--coin-y', `${deltaY * influence * 0.14}px`);
        coin.style.setProperty('--coin-scale', `${1 + influence * 0.14}`);
      });

      frameId = 0;
    };

    const handlePointerMove = (event) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (!frameId) frameId = window.requestAnimationFrame(updateAtmosphere);
    };

    const hideAtmosphere = () => {
      atmosphere.style.opacity = '0';
      coins.forEach((coin) => {
        coin.style.setProperty('--coin-x', '0px');
        coin.style.setProperty('--coin-y', '0px');
        coin.style.setProperty('--coin-scale', '1');
      });
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', hideAtmosphere);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      document.documentElement.removeEventListener('pointerleave', hideAtmosphere);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div ref={atmosphereRef} className="cursor-atmosphere" aria-hidden="true">
      <span className="cursor-atmosphere__orb cursor-atmosphere__orb--gold" />
      <span className="cursor-atmosphere__orb cursor-atmosphere__orb--violet" />
      <span className="cursor-atmosphere__orb cursor-atmosphere__orb--mint" />
      <span className="cursor-atmosphere__coin cursor-atmosphere__coin--one">V</span>
      <span className="cursor-atmosphere__coin cursor-atmosphere__coin--two">V</span>
      <span className="cursor-atmosphere__coin cursor-atmosphere__coin--three">V</span>
      <span className="cursor-atmosphere__coin cursor-atmosphere__coin--four">V</span>
      <span className="cursor-atmosphere__coin cursor-atmosphere__coin--five">V</span>
    </div>
  );
};
