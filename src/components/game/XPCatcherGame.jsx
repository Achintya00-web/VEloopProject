import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowLeft, Info, Play, RotateCcw, Trophy, Sparkles } from 'lucide-react';
import { VECoin, XPOrb, GemIcon } from '../common/GameAssets.jsx';
import { playSound } from '../../utils/audio.js';

const ROUND_DURATION = 20;
const BASKET_WIDTH_PX = 88;
const BASKET_HEIGHT_PX = 44;
const BASKET_BOTTOM_PX = 16;
const BASKET_RIM_OFFSET_PX = 7;

const ITEM_CONFIGS = {
  orb: {
    type: 'orb',
    points: 10,
    veValue: 0,
    size: 36,
    vyMin: 84,
    vyMax: 104,
    gravity: 68,
    drag: 0.28,
    swayAmp: 10,
    swayFreqMin: 1.5,
    swayFreqMax: 2.3,
    spinRange: 20,
    color: '#C084FC',
  },
  coin: {
    type: 'coin',
    points: 15,
    veValue: 5,
    size: 32,
    vyMin: 98,
    vyMax: 118,
    gravity: 94,
    drag: 0.22,
    swayAmp: 4,
    swayFreqMin: 1.2,
    swayFreqMax: 1.8,
    spinRange: 64,
    color: '#F4C542',
  },
  gem: {
    type: 'gem',
    points: 25,
    veValue: 0,
    size: 34,
    vyMin: 108,
    vyMax: 126,
    gravity: 110,
    drag: 0.2,
    swayAmp: 3,
    swayFreqMin: 1.4,
    swayFreqMax: 2.0,
    spinRange: 80,
    color: '#70D68B',
  },
};

export const XPCatcherGame = ({ onBack, onFinishGame, onInfoClick }) => {
  const [gameState, setGameState] = useState('start');
  const [timeLeft, setTimeLeft] = useState(ROUND_DURATION);
  const [score, setScore] = useState(0);
  const [vesCollected, setVesCollected] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [frameEntities, setFrameEntities] = useState({
    items: [],
    floats: [],
    particles: [],
  });

  const containerRef = useRef(null);
  const basketElRef = useRef(null);
  const requestRef = useRef(null);

  const itemsRef = useRef([]);
  const floatsRef = useRef([]);
  const particlesRef = useRef([]);
  const spawnCooldownRef = useRef(0.15);
  const elapsedRef = useRef(0);
  const nextEntityId = useRef(1);

  const keysRef = useRef({ left: false, right: false });
  const basketRef = useRef({
    xPct: 50,
    targetXPct: 50,
    vxPct: 0,
    tiltDeg: 0,
    catchPulse: 0,
  });

  const scoreRef = useRef(0);
  const vesRef = useRef(0);
  const comboRef = useRef(0);
  const multiplierRef = useRef(1);
  const maxMultiplierRef = useRef(1);
  const caughtRef = useRef(0);
  const missedRef = useRef(0);

  const applyBasketTransform = useCallback(() => {
    const el = basketElRef.current;
    if (!el) return;
    const { xPct, tiltDeg, catchPulse } = basketRef.current;
    const dipPx = catchPulse * 4.5;
    const scaleX = 1 + catchPulse * 0.075;
    const scaleY = 1 - catchPulse * 0.08;
    el.style.left = `${xPct}%`;
    el.style.transform = `translate3d(-50%, ${dipPx}px, 0) rotate(${tiltDeg.toFixed(2)}deg) scale(${scaleX.toFixed(3)}, ${scaleY.toFixed(3)})`;
  }, []);

  const getHorizontalBoundsPct = useCallback(() => {
    const width = containerRef.current?.clientWidth || 640;
    const marginPx = BASKET_WIDTH_PX * 0.56;
    const minPct = Math.min(22, (marginPx / width) * 100);
    return { minPct, maxPct: 100 - minPct, width };
  }, []);

  const startGame = () => {
    playSound.click();
    scoreRef.current = 0;
    vesRef.current = 0;
    comboRef.current = 0;
    multiplierRef.current = 1;
    maxMultiplierRef.current = 1;
    caughtRef.current = 0;
    missedRef.current = 0;

    itemsRef.current = [];
    floatsRef.current = [];
    particlesRef.current = [];
    spawnCooldownRef.current = 0.14;
    elapsedRef.current = 0;
    keysRef.current = { left: false, right: false };
    basketRef.current = {
      xPct: 50,
      targetXPct: 50,
      vxPct: 0,
      tiltDeg: 0,
      catchPulse: 0,
    };

    setScore(0);
    setVesCollected(0);
    setTimeLeft(ROUND_DURATION);
    setMultiplier(1);
    setFrameEntities({ items: [], floats: [], particles: [] });
    applyBasketTransform();
    setGameState('playing');
  };

  useEffect(() => {
    if (gameState !== 'playing') return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        keysRef.current.left = true;
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        keysRef.current.right = true;
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        keysRef.current.left = false;
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        keysRef.current.right = false;
      }
    };

    const handleBlur = () => {
      keysRef.current = { left: false, right: false };
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('blur', handleBlur);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('blur', handleBlur);
    };
  }, [gameState]);

  const setTargetFromClientX = useCallback(
    (clientX) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      if (!rect.width) return;
      const { minPct, maxPct } = getHorizontalBoundsPct();
      const relativePct = ((clientX - rect.left) / rect.width) * 100;
      basketRef.current.targetXPct = Math.max(minPct, Math.min(maxPct, relativePct));
    },
    [getHorizontalBoundsPct]
  );

  const handlePointerDown = (e) => {
    if (gameState !== 'playing') return;
    if (e.pointerType !== 'mouse' && e.currentTarget.setPointerCapture) {
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {
        // Ignore capture failure on unsupported browsers
      }
    }
    setTargetFromClientX(e.clientX);
  };

  const handlePointerMove = (e) => {
    if (gameState !== 'playing') return;
    if (e.pointerType === 'mouse' || e.buttons > 0) {
      setTargetFromClientX(e.clientX);
    }
  };

  const handlePointerUp = (e) => {
    if (e.currentTarget.releasePointerCapture) {
      try {
        if (e.currentTarget.hasPointerCapture?.(e.pointerId)) {
          e.currentTarget.releasePointerCapture(e.pointerId);
        }
      } catch {
        // Ignore release errors
      }
    }
  };

  useEffect(() => {
    if (gameState !== 'playing') return;

    const timer = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(timer);
          setGameState('ended');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [gameState]);

  useEffect(() => {
    if (gameState === 'ended') {
      const finishTimeout = window.setTimeout(() => {
        const totalSettled = caughtRef.current + missedRef.current;
        const accuracy = totalSettled > 0 ? Math.round((caughtRef.current / totalSettled) * 100) : 100;
        onFinishGame(scoreRef.current, {
          vesCollected: vesRef.current,
          itemsCaught: caughtRef.current,
          maxMultiplier: maxMultiplierRef.current,
          accuracy,
        });
      }, 450);
      return () => window.clearTimeout(finishTimeout);
    }
  }, [gameState, onFinishGame]);

  useEffect(() => {
    if (gameState !== 'playing') return;

    let prevTimestamp = performance.now();

    const spawnItem = () => {
      const { minPct, maxPct } = getHorizontalBoundsPct();
      const safeMin = Math.max(minPct + 1, 10);
      const safeMax = Math.min(maxPct - 1, 90);
      const rand = Math.random();
      const cfg =
        rand > 0.84
          ? ITEM_CONFIGS.gem
          : rand > 0.54
          ? ITEM_CONFIGS.coin
          : ITEM_CONFIGS.orb;

      const xPct = safeMin + Math.random() * Math.max(10, safeMax - safeMin);
      const vy = cfg.vyMin + Math.random() * (cfg.vyMax - cfg.vyMin);
      const omega = (Math.random() * 2 - 1) * cfg.spinRange;
      const swayFreq = cfg.swayFreqMin + Math.random() * (cfg.swayFreqMax - cfg.swayFreqMin);

      itemsRef.current.push({
        id: nextEntityId.current++,
        type: cfg.type,
        points: cfg.points,
        veValue: cfg.veValue,
        size: cfg.size,
        color: cfg.color,
        xPct,
        baseXPct: xPct,
        y: -cfg.size - 6,
        vx: 0,
        vy,
        gravity: cfg.gravity,
        drag: cfg.drag,
        swayAmp: cfg.swayAmp,
        swayFreq,
        phase: Math.random() * Math.PI * 2,
        angle: (Math.random() - 0.5) * 16,
        omega,
        age: 0,
        deflected: false,
      });
    };

    const spawnCatchBurst = (xPct, yPx, color) => {
      const burstCount = 5;
      for (let i = 0; i < burstCount; i += 1) {
        const angle = -Math.PI * (0.18 + (i / (burstCount - 1)) * 0.64) + (Math.random() - 0.5) * 0.2;
        const speed = 52 + Math.random() * 55;
        particlesRef.current.push({
          id: nextEntityId.current++,
          xPct,
          xOffset: 0,
          y: yPx,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 4 + Math.random() * 3,
          color,
          age: 0,
          life: 0.44,
        });
      }
    };

    const loop = (timestamp) => {
      const dt = Math.min(Math.max((timestamp - prevTimestamp) / 1000, 0.001), 0.04);
      prevTimestamp = timestamp;
      elapsedRef.current += dt;

      const containerHeight = containerRef.current?.clientHeight || 430;
      const { minPct, maxPct, width: containerWidth } = getHorizontalBoundsPct();

      // 1. Update Basket Controls & Damped Spring Motion
      const basket = basketRef.current;
      const keyDirection = (keysRef.current.right ? 1 : 0) - (keysRef.current.left ? 1 : 0);
      if (keyDirection !== 0) {
        basket.targetXPct = Math.max(
          minPct,
          Math.min(maxPct, basket.targetXPct + keyDirection * 74 * dt)
        );
      } else {
        basket.targetXPct = Math.max(minPct, Math.min(maxPct, basket.targetXPct));
      }

      const prevBasketXPct = basket.xPct;
      const followRate = 1 - Math.exp(-20 * dt);
      basket.xPct += (basket.targetXPct - basket.xPct) * followRate;
      const instantVxPct = (basket.xPct - prevBasketXPct) / dt;
      basket.vxPct = basket.vxPct + (instantVxPct - basket.vxPct) * (1 - Math.exp(-18 * dt));

      const targetTilt = Math.max(-8.5, Math.min(8.5, basket.vxPct * 0.09));
      basket.tiltDeg += (targetTilt - basket.tiltDeg) * (1 - Math.exp(-15 * dt));
      basket.catchPulse = Math.max(0, basket.catchPulse - dt * 5.2);
      applyBasketTransform();

      // 2. Spawn Items at a calm, steady cadence (slight ramp in final seconds)
      spawnCooldownRef.current -= dt;
      if (spawnCooldownRef.current <= 0) {
        spawnItem();
        const ramp = Math.min(1, elapsedRef.current / ROUND_DURATION);
        spawnCooldownRef.current = 0.64 - ramp * 0.14 + (Math.random() * 0.08 - 0.04);
      }

      // 3. Pixel-Accurate Basket Collision (counts center & outer rim/edge touches!)
      const basketTopY = containerHeight - BASKET_BOTTOM_PX - BASKET_HEIGHT_PX;
      const basketBottomY = containerHeight - BASKET_BOTTOM_PX;
      const rimY = basketTopY + BASKET_RIM_OFFSET_PX;
      const basketXPx = (basket.xPct / 100) * containerWidth;
      // Outer rim SVG rx=46 + stroke 3 => ~42px outer visual half-width on an 88px wide basket
      const basketOuterHalfW = 43;

      let hudDirty = false;
      const nextItems = [];

      for (let i = 0; i < itemsRef.current.length; i += 1) {
        const item = itemsRef.current[i];
        const prevY = item.y;
        item.age += dt;

        // Gravity minus fluid drag: vy += (g - drag * vy) * dt
        item.vy += (item.gravity - item.drag * item.vy) * dt;
        item.y += item.vy * dt;

        // Gentle sinusoidal air sway inside playable horizontal bounds
        const swayPx = Math.sin(item.age * item.swayFreq + item.phase) * item.swayAmp;
        item.xPct = Math.max(
          5,
          Math.min(95, item.baseXPct + (swayPx / containerWidth) * 100)
        );
        item.angle += item.omega * dt;

        const itemXPx = (item.xPct / 100) * containerWidth;
        const itemRadius = item.size * 0.5;
        const prevBottom = prevY + item.size;
        const currBottom = item.y + item.size;
        const currTop = item.y;
        const dxPx = itemXPx - basketXPx;
        const absDx = Math.abs(dxPx);

        // Catch whenever the falling item touches the rim mouth, outer rim edge, or upper basket side edge
        const touchesVertically =
          currBottom >= rimY - 4 &&
          prevBottom <= basketBottomY + 8 &&
          currTop <= basketBottomY - 4;
        const touchesHorizontally = absDx <= basketOuterHalfW + itemRadius + 2;

        if (touchesVertically && touchesHorizontally) {
          if (item.type === 'coin') {
            playSound.coin();
          } else if (item.type === 'gem') {
            playSound.gem();
          } else {
            playSound.orb();
          }

          const earnedPoints = item.points * multiplierRef.current;
          scoreRef.current += earnedPoints;
          caughtRef.current += 1;

          if (item.veValue > 0) {
            vesRef.current += item.veValue;
          }

          comboRef.current += 1;
          const nextMult = comboRef.current >= 8 ? 3 : comboRef.current >= 4 ? 2 : 1;
          multiplierRef.current = nextMult;
          if (nextMult > maxMultiplierRef.current) {
            maxMultiplierRef.current = nextMult;
          }

          basket.catchPulse = 1;
          hudDirty = true;

          const floatText = item.veValue > 0 ? `+${item.veValue} VEs` : `+${earnedPoints} XP`;
          floatsRef.current.push({
            id: nextEntityId.current++,
            xPct: Math.max(10, Math.min(90, item.xPct)),
            y: rimY - 12,
            text: floatText,
            color: item.color,
            age: 0,
            life: 0.72,
          });
          spawnCatchBurst(basket.xPct + (dxPx / containerWidth) * 65, rimY + 2, item.color);
          continue;
        }

        if (item.y < containerHeight + item.size) {
          nextItems.push(item);
        } else {
          missedRef.current += 1;
          if (comboRef.current !== 0 || multiplierRef.current !== 1) {
            comboRef.current = 0;
            multiplierRef.current = 1;
            hudDirty = true;
          }
        }
      }
      itemsRef.current = nextItems;

      // 4. Update dt-driven Floating Scores & Rim Particles
      const nextFloats = [];
      for (let i = 0; i < floatsRef.current.length; i += 1) {
        const f = floatsRef.current[i];
        f.age += dt;
        f.y -= 54 * dt;
        if (f.age < f.life) {
          nextFloats.push(f);
        }
      }
      floatsRef.current = nextFloats;

      const nextParticles = [];
      for (let i = 0; i < particlesRef.current.length; i += 1) {
        const p = particlesRef.current[i];
        p.age += dt;
        p.vy += 190 * dt;
        p.xOffset += p.vx * dt;
        p.y += p.vy * dt;
        if (p.age < p.life) {
          nextParticles.push(p);
        }
      }
      particlesRef.current = nextParticles;

      if (hudDirty) {
        setScore(scoreRef.current);
        setVesCollected(vesRef.current);
        setMultiplier(multiplierRef.current);
      }

      setFrameEntities({
        items: itemsRef.current.map((item) => ({
          id: item.id,
          type: item.type,
          size: item.size,
          xPct: item.xPct,
          y: item.y,
          angle: item.angle,
        })),
        floats: floatsRef.current.map((f) => ({
          id: f.id,
          xPct: f.xPct,
          y: f.y,
          text: f.text,
          color: f.color,
          opacity: Math.max(0, 1 - Math.pow(f.age / f.life, 1.8)),
        })),
        particles: particlesRef.current.map((p) => ({
          id: p.id,
          xPct: p.xPct,
          xOffset: p.xOffset,
          y: p.y,
          size: p.size,
          color: p.color,
          opacity: Math.max(0, 1 - p.age / p.life),
        })),
      });

      requestRef.current = requestAnimationFrame(loop);
    };

    requestRef.current = requestAnimationFrame(loop);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [gameState, applyBasketTransform, getHorizontalBoundsPct]);

  const formatTimer = (secs) => {
    const s = secs < 10 ? `0${secs}` : `${secs}`;
    return `00:${s}`;
  };

  return (
    <div className="w-100 max-w-6xl mx-auto min-h-150 d-flex flex-column justify-content-between user-select-none game-page">
      <div className="d-flex justify-content-between align-items-center px-2 py-3">
        <button
          onClick={() => {
            playSound.click();
            onBack();
          }}
          className="cosmic-icon-btn"
          aria-label="Back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="d-flex align-items-center gap-1">
          <h2 className="fs-6 fw-bold text-white text-uppercase tracking-wider font-display mb-0">
            XP Catcher
          </h2>
          <button
            onClick={() => {
              playSound.click();
              onInfoClick();
            }}
            className="text-purple-200/80 hover:text-white p-1 bg-transparent border-0"
            title="Rules"
            aria-label="Rules"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>

        <div className="badge rounded-pill bg-[#1b1035] border border-purple-400/35 px-3 py-1.5 text-xs font-mono fw-bold text-[#F4C542] d-flex align-items-center gap-1">
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{formatTimer(timeLeft)}</span>
        </div>
      </div>

      <div className="text-center px-3 mb-2">
        <p className="text-xs fw-semibold text-purple-100/80 mb-0">
          Slide or use arrow keys to catch falling XP orbs, VE coins &amp; emerald gems.
        </p>
        <p className="text-xs text-purple-200/70 mb-0">
          Build unbroken streaks up to 3X for boosted rewards!
        </p>
      </div>

      <div className="game-metrics">
        <div>
          <span className="game-metrics__icon">
            <RotateCcw size={14} />
          </span>
          <span>
            <small>TIME WINDOW</small>
            <strong>{formatTimer(timeLeft)}</strong>
          </span>
        </div>
        <div>
          <span>
            <small>TOTAL SCORE</small>
            <strong>
              {score} <small>PTS</small>
            </strong>
          </span>
        </div>
        <div>
          <span className="game-metrics__icon game-metrics__icon--purple">
            <Sparkles size={14} />
          </span>
          <span>
            <small>STREAK BUFF</small>
            <strong>{multiplier.toFixed(1)}x Active</strong>
          </span>
        </div>
        <div>
          <span>
            <small>ACQUIRED LOOT</small>
            <strong className="game-metrics__loot">
              +{vesCollected} VEs <i>/</i> +{score} XP
            </strong>
          </span>
        </div>
      </div>

      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="position-relative flex-1 w-100 min-h-95 sm:min-h-110 rounded-4 bg-linear-to-b from-[#1a1033] via-[#120b23] to-[#0a0714] border border-purple-400/30 overflow-hidden touch-none cursor-ew-resize shadow-2xl"
      >
        {gameState === 'start' && (
          <div className="position-absolute top-0 start-0 w-100 h-100 z-30 bg-[#140b26]/90 backdrop-blur-md d-flex flex-column align-items-center justify-content-center p-3 p-sm-4 text-center overflow-y-auto game-page__start-overlay">
            <div className="w-16 h-16 rounded-4 bg-linear-to-tr from-[#F4C542]/20 to-purple-500/25 border border-[#F4C542]/45 d-flex align-items-center justify-center mb-3 shrink-0">
              <Trophy className="w-8 h-8 text-[#F4C542]" />
            </div>

            <h3 className="fs-5 fw-bold text-white font-display mb-1">
              Ready for the Challenge?
            </h3>
            <p className="text-xs text-purple-100/80 max-w-xs mb-3">
              Guide your golden collector basket smoothly to catch cosmic orbs, coins, and gems in 20 seconds.
            </p>

            <div className="row g-2 w-100 max-w-xs p-2 rounded-3 bg-[#1d1038]/85 border border-purple-400/30 mb-3 text-center">
              <div className="col-4">
                <XPOrb size={26} />
                <span className="d-block fw-bold text-purple-300 text-[11px] mt-1">+10 XP</span>
              </div>
              <div className="col-4">
                <VECoin size={24} />
                <span className="d-block fw-bold text-[#F4C542] text-[11px] mt-1">+5 VEs</span>
              </div>
              <div className="col-4">
                <GemIcon size={24} />
                <span className="d-block fw-bold text-emerald-400 text-[11px] mt-1">+25 XP</span>
              </div>
            </div>

            <button
              onClick={startGame}
              className="cosmic-cta-gold w-100 max-w-xs min-h-[44px]"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Start Challenge</span>
            </button>
          </div>
        )}

        {gameState === 'playing' &&
          frameEntities.items.map((item) => (
            <div
              key={item.id}
              className="position-absolute pointer-events-none"
              style={{
                left: `${item.xPct}%`,
                top: 0,
                transform: `translate3d(-50%, ${item.y.toFixed(1)}px, 0) rotate(${item.angle.toFixed(1)}deg)`,
                willChange: 'transform',
              }}
            >
              {item.type === 'coin' ? (
                <VECoin size={item.size} />
              ) : item.type === 'gem' ? (
                <GemIcon size={item.size} />
              ) : (
                <XPOrb size={item.size} />
              )}
            </div>
          ))}

        {frameEntities.particles.map((p) => (
          <span
            key={p.id}
            className="position-absolute pointer-events-none rounded-circle"
            style={{
              left: `${p.xPct}%`,
              top: 0,
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: p.color,
              boxShadow: `0 0 8px ${p.color}`,
              opacity: p.opacity,
              transform: `translate3d(${p.xOffset.toFixed(1)}px, ${p.y.toFixed(1)}px, 0)`,
            }}
          />
        ))}

        {frameEntities.floats.map((f) => (
          <div
            key={f.id}
            className="position-absolute text-xs fw-bold font-display pointer-events-none"
            style={{
              left: `${f.xPct}%`,
              top: 0,
              opacity: f.opacity,
              transform: `translate3d(-50%, ${f.y.toFixed(1)}px, 0)`,
              color: f.color,
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.7)',
            }}
          >
            {f.text}
          </div>
        ))}

        {/* Golden Collector Basket */}
        <div
          ref={basketElRef}
          className="position-absolute bottom-4 pointer-events-none"
          style={{
            left: '50%',
            width: `${BASKET_WIDTH_PX}px`,
            height: `${BASKET_HEIGHT_PX}px`,
            transform: 'translate3d(-50%, 0, 0)',
            willChange: 'transform, left',
          }}
        >
          <svg
            viewBox="0 0 100 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-100 h-100 filter drop-shadow-[0_4px_12px_rgba(244,197,66,0.52)]"
          >
            <defs>
              <linearGradient id="basketGoldRimJs" x1="0" y1="0" x2="100" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FFF2B2" />
                <stop offset="50%" stopColor="#F5C744" />
                <stop offset="100%" stopColor="#B8871E" />
              </linearGradient>
            </defs>
            <ellipse cx="50" cy="8" rx="46" ry="6" fill="#1C1405" stroke="url(#basketGoldRimJs)" strokeWidth="3" />
            <path d="M 6 8 Q 18 45 50 48 Q 82 45 94 8" stroke="url(#basketGoldRimJs)" strokeWidth="2.5" fill="none" />
            <path d="M 18 10 L 40 46" stroke="#EAB308" strokeWidth="1.2" opacity="0.8" />
            <path d="M 32 12 L 50 48" stroke="#EAB308" strokeWidth="1.2" opacity="0.8" />
            <path d="M 50 14 L 60 48" stroke="#EAB308" strokeWidth="1.2" opacity="0.8" />
            <path d="M 68 12 L 50 48" stroke="#EAB308" strokeWidth="1.2" opacity="0.8" />
            <path d="M 82 10 L 60 46" stroke="#EAB308" strokeWidth="1.2" opacity="0.8" />
            <path d="M 12 20 Q 50 28 88 20" stroke="#FDE047" strokeWidth="1.2" fill="none" opacity="0.8" />
            <path d="M 22 34 Q 50 40 78 34" stroke="#FDE047" strokeWidth="1.2" fill="none" opacity="0.8" />
            <ellipse cx="50" cy="8" rx="40" ry="3" fill="#FACC15" opacity="0.4" />
          </svg>
        </div>
      </div>

      {/* Bottom HUD */}
      <div className="mt-3 px-3 py-2.5 rounded-4 bg-linear-to-r from-[#1b0e36] via-[#150c2b] to-[#110922] border border-purple-400/30 d-flex justify-content-between align-items-center shadow-lg">
        <div>
          <span className="text-[11px] fw-bold text-purple-200/75 text-uppercase d-block">
            Your Score
          </span>
          <span className="fs-4 fw-bolder text-white font-display tabular-nums">
            {score}
          </span>
        </div>

        <div className="d-flex align-items-center gap-2">
          <div className="d-flex align-items-center gap-1 px-2.5 py-1 rounded-3 bg-[#1d1138]/90 border border-[#F4C542]/30">
            <VECoin size={18} />
            <span className="text-xs fw-bold text-[#F4C542] tabular-nums">
              +{vesCollected} VEs
            </span>
          </div>

          <div className="d-flex align-items-center gap-1 px-2.5 py-1 rounded-3 bg-purple-500/20 border border-purple-400/35 text-purple-100">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="text-xs fw-bold font-display">
              {multiplier}X
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
