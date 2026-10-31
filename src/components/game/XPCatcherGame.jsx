import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Info, Play, RotateCcw, Trophy, Sparkles } from 'lucide-react';
import { VECoin, XPOrb, GemIcon } from '../common/GameAssets.jsx';
import { playSound } from '../../utils/audio.js';

export const XPCatcherGame = ({ onBack, onFinishGame, onInfoClick }) => {
  const [gameState, setGameState] = useState('start');
  const [timeLeft, setTimeLeft] = useState(20);
  const [score, setScore] = useState(0);
  const [vesCollected, setVesCollected] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [basketX, setBasketX] = useState(50);
  const [fallingItems, setFallingItems] = useState([]);
  const [floatingScores, setFloatingScores] = useState([]);
  const [comboCount, setComboCount] = useState(0);

  const containerRef = useRef(null);
  const requestRef = useRef(null);
  const lastSpawnTime = useRef(0);
  const nextItemId = useRef(1);
  const nextFloatId = useRef(1);
  const isDragging = useRef(false);
  const basketXRef = useRef(basketX);
  const multiplierRef = useRef(multiplier);

  const BASKET_WIDTH_PCT = 22;

  const startGame = () => {
    playSound.click();
    setScore(0);
    setVesCollected(0);
    setTimeLeft(20);
    setMultiplier(1);
    setComboCount(0);
    setBasketX(50);
    setFallingItems([]);
    setFloatingScores([]);
    basketXRef.current = 50;
    multiplierRef.current = 1;
    lastSpawnTime.current = 0;
    setGameState('playing');
  };

  useEffect(() => {
    multiplierRef.current = multiplier;
  }, [multiplier]);

  useEffect(() => {
    if (gameState !== 'playing') return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        const nextX = Math.max(12, basketXRef.current - 6);
        basketXRef.current = nextX;
        setBasketX(nextX);
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        const nextX = Math.min(88, basketXRef.current + 6);
        basketXRef.current = nextX;
        setBasketX(nextX);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState]);

  const updateBasketPosition = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const relativeX = clientX - rect.left;
    const pct = Math.max(12, Math.min(88, (relativeX / rect.width) * 100));
    basketXRef.current = pct;
    setBasketX(pct);
  };

  const handlePointerDown = (e) => {
    if (gameState !== 'playing') return;
    isDragging.current = true;
    updateBasketPosition(e.clientX);
  };

  const handlePointerMove = (e) => {
    if (gameState !== 'playing') return;
    updateBasketPosition(e.clientX);
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    if (gameState !== 'playing') return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameState('ended');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState]);

  useEffect(() => {
    if (gameState === 'ended') {
      setTimeout(() => {
        onFinishGame(score);
      }, 500);
    }
  }, [gameState, onFinishGame, score]);

  useEffect(() => {
    if (gameState !== 'playing') return;

    let prevTimestamp = performance.now();

    const loop = (timestamp) => {
      const delta = (timestamp - prevTimestamp) / 1000;
      prevTimestamp = timestamp;

      const containerHeight = containerRef.current?.clientHeight || 450;
      const basketY = containerHeight - 80;

      if (timestamp - lastSpawnTime.current > 420) {
        lastSpawnTime.current = timestamp;

        const rand = Math.random();
        let type = 'orb';
        let points = 10;
        let veVal = 0;
        let itemSize = 36;

        if (rand > 0.85) {
          type = 'gem';
          points = 25;
          itemSize = 34;
        } else if (rand > 0.55) {
          type = 'coin';
          points = 15;
          veVal = 2;
          itemSize = 32;
        }

        const newItem = {
          id: nextItemId.current++,
          x: Math.random() * 76 + 12,
          y: -40,
          speed: 180 + Math.random() * 90,
          type,
          points,
          veValue: veVal,
          size: itemSize,
        };

        setFallingItems((prev) => [...prev, newItem]);
      }

      setFallingItems((prevItems) => {
        const nextItems = [];

        prevItems.forEach((item) => {
          const newY = item.y + item.speed * delta;
          const basketHalfWidth = BASKET_WIDTH_PCT / 2;
          const isColliding =
            newY >= basketY - 15 &&
            newY <= basketY + 35 &&
            Math.abs(item.x - basketXRef.current) < basketHalfWidth;

          if (isColliding) {
            if (item.type === 'coin') {
              playSound.coin();
            } else if (item.type === 'gem') {
              playSound.gem();
            } else {
              playSound.orb();
            }

            const earnedPoints = item.points * multiplierRef.current;
            setScore((s) => s + earnedPoints);
            if (item.veValue > 0) {
              setVesCollected((v) => v + item.veValue);
            }

            setComboCount((c) => {
              const newCombo = c + 1;
              if (newCombo >= 8) setMultiplier(3);
              else if (newCombo >= 4) setMultiplier(2);
              return newCombo;
            });

            const floatColor =
              item.type === 'coin'
                ? '#F4C542'
                : item.type === 'gem'
                ? '#70D68B'
                : '#C084FC';

            const floatText = item.veValue > 0 ? `+${item.veValue} VEs` : `+${earnedPoints} XP`;

            setFloatingScores((f) => [
              ...f,
              {
                id: nextFloatId.current++,
                x: item.x,
                y: basketY - 20,
                text: floatText,
                color: floatColor,
              },
            ]);
          } else if (newY < containerHeight + 20) {
            nextItems.push({ ...item, y: newY });
          } else {
            setComboCount(0);
            setMultiplier(1);
          }
        });

        return nextItems;
      });

      setFloatingScores((prevFloats) =>
        prevFloats
          .map((f) => ({ ...f, y: f.y - 2 }))
          .filter((f) => f.y > basketY - 80)
      );

      requestRef.current = requestAnimationFrame(loop);
    };

    requestRef.current = requestAnimationFrame(loop);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [gameState]);

  const formatTimer = (secs) => {
    const s = secs < 10 ? `0${secs}` : `${secs}`;
    return `00:${s}`;
  };

  return (
    <div className="w-100 max-w-6xl mx-auto min-h-150 d-flex flex-column justify-content-between user-select-none game-page">
      {/* Game Top Navigation Bar matching Page 33 */}
      <div className="d-flex justify-content-between align-items-center px-2 py-3">
        <button
          onClick={() => {
            playSound.click();
            onBack();
          }}
          className="w-10 h-10 rounded-3 bg-[#191C2B] border border-white/10 d-flex align-items-center justify-center text-slate-300 hover:text-white"
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
            className="text-slate-400 hover:text-white p-1 bg-transparent border-0"
            title="Rules"
            aria-label="Rules"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>

        <div className="badge rounded-pill bg-[#191C2B] border border-white/10 px-3 py-1.5 text-xs font-mono fw-bold text-[#F4C542] d-flex align-items-center gap-1">
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{formatTimer(timeLeft)}</span>
        </div>
      </div>

      <div className="text-center px-3 mb-2">
        <p className="text-xs fw-semibold text-slate-300 mb-0">
          Catch XP orbs & coins.
        </p>
        <p className="text-[11px] text-slate-400 mb-0">
          Score high for better rewards!
        </p>
      </div>

      <div className="game-metrics">
        <div><span className="game-metrics__icon"><RotateCcw size={14} /></span><span><small>TIME WINDOW</small><strong>{formatTimer(timeLeft)}</strong></span></div>
        <div><span><small>TOTAL SCORE</small><strong>{score} <small>PTS</small></strong></span></div>
        <div><span className="game-metrics__icon game-metrics__icon--purple"><Sparkles size={14} /></span><span><small>STREAK BUFF</small><strong>{multiplier.toFixed(1)}x Active</strong></span></div>
        <div><span><small>ACQUIRED LOOT</small><strong className="game-metrics__loot">+{vesCollected} VEs <i>/</i> +{score} XP</strong></span></div>
      </div>

      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className="position-relative flex-1 w-100 min-h-95 sm:min-h-110 rounded-4 bg-linear-to-b from-[#151726] via-[#10121D] to-[#0A0B12] border border-white/10 overflow-hidden touch-none cursor-ew-resize shadow-2xl"
      >
        {gameState === 'start' && (
          <div className="position-absolute top-0 inset-s-0 w-100 h-100 z-30 bg-[#161827]/90 backdrop-blur-md d-flex flex-column align-items-center justify-content-center p-4 text-center">
            <div className="w-16 h-16 rounded-4 bg-linear-to-tr from-[#F4C542]/20 to-purple-500/20 border border-[#F4C542]/40 d-flex align-items-center justify-center mb-3">
              <Trophy className="w-8 h-8 text-[#F4C542]" />
            </div>

            <h3 className="fs-5 fw-bold text-white font-display mb-1">
              Ready for the Challenge?
            </h3>
            <p className="text-xs text-slate-300 max-w-xs mb-3">
              Slide your collector basket to catch falling purple XP orbs and golden VE coins in 20 seconds.
            </p>

            <div className="row g-2 w-100 max-w-xs p-2 rounded-3 bg-[#191C2B] border border-white/5 mb-3 text-center">
              <div className="col-4">
                <XPOrb size={26} />
                <span className="d-block fw-bold text-purple-300 text-[10px] mt-1">+10 XP</span>
              </div>
              <div className="col-4">
                <VECoin size={24} />
                <span className="d-block fw-bold text-[#F4C542] text-[10px] mt-1">+5 VEs</span>
              </div>
              <div className="col-4">
                <GemIcon size={24} />
                <span className="d-block fw-bold text-emerald-400 text-[10px] mt-1">+25 XP</span>
              </div>
            </div>

            <button
              onClick={startGame}
              className="btn btn-warning w-100 max-w-xs py-2.5 rounded-3 fw-bold text-xs d-flex align-items-center justify-center gap-2 gold-gradient-bg text-dark border-0 shadow-lg"
            >
              <Play className="w-4 h-4 fill-dark" />
              <span>Start Challenge</span>
            </button>
          </div>
        )}

        {gameState === 'playing' &&
          fallingItems.map((item) => (
            <div
              key={item.id}
              className="position-absolute pointer-events-none"
              style={{
                left: `${item.x}%`,
                top: 0,
                transform: `translate3d(-50%, ${item.y}px, 0)`,
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

        {floatingScores.map((f) => (
          <div
            key={f.id}
            className="position-absolute text-xs fw-bold font-display"
            style={{
              left: `${f.x}%`,
              top: 0,
              transform: `translate3d(-50%, ${f.y}px, 0)`,
              color: f.color,
            }}
          >
            {f.text}
          </div>
        ))}

        {/* Golden Collector Basket */}
        <div
          className="position-absolute bottom-4 translate-middle-x pointer-events-none"
          style={{
            left: `${basketX}%`,
            width: '88px',
          }}
        >
          <svg viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-100 filter drop-shadow-[0_4px_10px_rgba(244,197,66,0.5)]">
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
      <div className="mt-3 px-3 py-2 rounded-4 bg-[#191C2B] border border-white/5 d-flex justify-content-between align-items-center">
        <div>
          <span className="text-[10px] fw-bold text-slate-400 text-uppercase d-block">
            Your Score
          </span>
          <span className="fs-4 fw-bolder text-white font-display tabular-nums">
            {score}
          </span>
        </div>

        <div className="d-flex align-items-center gap-2">
          <div className="d-flex align-items-center gap-1 px-2.5 py-1 rounded-3 bg-black/30 border border-white/5">
            <VECoin size={18} />
            <span className="text-xs fw-bold text-[#F4C542] tabular-nums">
              +{vesCollected} VEs
            </span>
          </div>

          <div className="d-flex align-items-center gap-1 px-2.5 py-1 rounded-3 bg-purple-500/10 border border-purple-500/20 text-purple-300">
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
