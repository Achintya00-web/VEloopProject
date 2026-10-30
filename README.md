# VELOOP Rewards – Level-Up Dashboard & Gamified Progression Hub (Task 16)

A premium, production-grade fintech rewards web application built with **React.js, Vite, TypeScript, Tailwind CSS, and Web Audio API**, designed directly from the 33-page specification and the final Page 33 reference design.

---

## 1. Project Overview

The VELOOP Rewards Level-Up Dashboard transforms the user's progression into an interactive, motivating, and gamified experience. It answers five core questions immediately:

1. **Where am I now?** → Current Level (`Level 05`) with custom metallic gold hexagonal badge.
2. **How far have I progressed?** → Current XP (`6,420 XP / 8,000 XP`, dynamically calculated to `80.25%`).
3. **What do I need next?** → Remaining XP needed (`1,580 XP`) to reach `Level 06`.
4. **What will I receive?** → Next-level reward (`500 VEs + 25 Gems` inside the Level 05 Reward Vault).
5. **How can I get there faster?** → Interactive **Earn More** activities and the **XP Catcher** arcade mini-game.

---

## 2. Key Features

- **Page 33 Visual Parity**: Recreated according to the Page 33 reference design:
  - Deep dark fintech canvas (`#161827`, `#191C2B`, `#090A10`).
  - Metallic gold gradients (`#F4C542`, `#D9A52C`).
  - Purple XP accents (`#8B5CF6`).
  - Emerald completion indicators (`#70D68B`).
  - Tactile typography using `Outfit` and `Plus Jakarta Sans`.
- **Dynamic XP & Progress Math**:
  - `progress = (currentXP / requiredXP) * 100` (computed dynamically at 80.25%, with animated shimmer progress fill).
  - `remainingXP = requiredXP - currentXP` (1,580 XP remaining).
- **Today's Boost Trio**:
  - `XP Earned`: 215 XP with gold star icon.
  - `Tasks Done`: 4/8 with progress tracker.
  - `Streak`: 7 Days with orange flame icon.
- **Earn More Shortcuts Grid (6 Activities)**:
  - Watch & Earn (+50 XP)
  - Daily Missions (+30 XP)
  - Refer & Earn (+100 XP)
  - XP Catcher Mini-Game (+10 XP)
  - Mini Games (+75 XP)
  - Streak Bonus (+25 XP)
- **Level 05 Rewards Vault**:
  - Glowing treasure chest overflowing with gold coins and purple gems.
  - "View Rewards" modal detailing active and locked tier benefits.
- **Level Progression Roadmap**:
  - Visual timeline from Level 01 to Level 07.
  - Distinct visual states: `✓ Completed` (Levels 01–04), `YOU ARE HERE` (Level 05), `NEXT GOAL` (Level 06), and `Locked` (Level 07).
- **Mandatory Mini-Game: XP Catcher**:
  - 60 FPS responsive arcade game.
  - 20-second countdown timer.
  - Falling purple XP orbs (+10 XP), golden VE coins (+5 VEs), and emerald gems (+25 XP).
  - Golden woven wire basket collector with touch drag, mouse tracking, and keyboard arrow controls (`ArrowLeft` / `ArrowRight` / `A` / `D`).
  - Multiplier combo system (2X at 4 catches, 3X at 8 catches).
  - Synthesized Web Audio API sound effects (crystal chime for orbs, metallic coin chime, double-tone gem chime).
- **Challenge Complete Achievement Screen**:
  - Golden laurel wreath trophy with 5-star emblem.
  - Final score with "New Best!" badge.
  - Experience gained (`+30 XP`) and reward received (`+12 VEs`).
  - Dynamic mini level progression bar.
  - "Play Again" and "Back to Dashboard" CTAs.
- **Level-Up Celebration Modal**:
  - Giant metallic gold hexagonal badge with radiant rim.
  - Unlocked rewards: `+500 VEs` and `+25 Gems`.
  - Unlocked perks list: Higher daily XP limit, access to new challenges, better reward opportunities.
  - Interactive confetti and celebratory fanfare.
- **Recent Activity Log & Today's Summary**:
  - Activity feed with filtering by `All`, `XP`, or `VEs`.
  - Today's Summary card showing total XP (`215 XP`) and total VEs (`35 VEs`).
- **Comprehensive UI States**:
  - Loading skeleton state.
  - Empty state with "Start Earning XP" CTA.
  - Error state with "Try Again" network recovery handler.

---

## 3. Technology Stack

- **Core Framework**: React.js 19 (Simple functional components, React Hooks)
- **Build Tool**: Vite 8
- **Language**: JavaScript (JSX / ES modules)
- **Styling**: Bootstrap 5 + custom dark metallic gold fintech CSS & animations
- **Package Management**: npm
- **Icons**: Lucide React (`lucide-react`)
- **Audio Synthesizer**: Web Audio API (zero external sound dependencies, zero latency)
- **Celebration Effects**: Canvas Confetti
- **Typography**: Plus Jakarta Sans & Outfit

---

## 4. Component Architecture

```
src/
├── assets/                  # Visual assets & SVG definitions
├── components/
│   ├── common/
│   │   ├── BadgeIcon.tsx    # Multi-layer metallic gold hexagonal badge (Levels 1–6)
│   │   ├── BottomNav.tsx    # Mobile fixed bottom tab navigation (Home, Earn, Game, Rewards, Activity)
│   │   ├── GameAssets.tsx   # Vector assets: VE Coin, XP Orb, Emerald Gem, Trophy, Treasure Chest
│   │   ├── Header.tsx       # Top bar, greeting, notifications, and evaluation prototype controls
│   │   └── InfoModal.tsx    # Level & Reward transparent rule popovers
│   ├── dashboard/
│   │   ├── CurrentLevelCard.tsx # Level 05 badge, XP counter, and animated progress bar
│   │   ├── TodaysBoost.tsx      # Trio metric cards (XP, Tasks, Streak)
│   │   ├── EarnMoreGrid.tsx     # 6 shortcut cards in responsive grid
│   │   ├── LevelRewardChest.tsx # Treasure chest spotlight with "View Rewards" trigger
│   │   └── LevelRoadmap.tsx     # Interactive progression timeline
│   ├── game/
│   │   ├── XPCatcherGame.tsx    # Playable 20s canvas/DOM game with physics & collision detection
│   │   └── ChallengeComplete.tsx# Trophy, score reveal, reward summary, and level update
│   ├── earn/
│   │   └── EarnActivitiesPage.tsx # Vertical list of 6 earning cards with task simulations
│   ├── activity/
│   │   └── RecentActivityPage.tsx # Filterable activity history & Today's Summary card
│   ├── modals/
│   │   ├── LevelUpModal.tsx     # Full celebration modal with confetti and claim action
│   │   └── RewardDetailsModal.tsx # Level 05 chest breakdown & locked tier preview
│   └── states/
│       ├── LoadingSkeleton.tsx  # Skeleton UI for dashboard cards
│       ├── EmptyState.tsx       # Zero-activity empty state
│       └── ErrorState.tsx       # Error recovery state
├── data/
│   └── levelData.ts         # Centralized data model for user state, tiers, and quests
├── hooks/
│   └── useLevelProgress.ts  # State management hook for XP math, game sessions, and modals
├── utils/
│   └── audio.ts             # Web Audio API sound generator
├── App.tsx                  # Root layout & view coordinator
├── main.tsx                 # React entry point
└── index.css                # Tailwind CSS v4 imports, theme tokens, and custom keyframes
```

---

## 5. Development & Testing Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run TypeScript typecheck / lint
npm run lint

# Build production bundle
npm run build
```

---

## 6. Evaluation Prototype Tools

Located in the top toolbar of the application:

1. **Test Level-Up**: Instantly triggers the high-impact Level-Up celebration modal with confetti and reward claim handlers.
2. **+200 XP Boost**: Instantly grants XP to test live progress bar advancement and auto-leveling at 8,000 XP.
3. **UI State Switcher**: Switch between `Normal`, `Loading`, `Empty`, and `Error` states to test resilience.
4. **Mobile Frame Toggle**: Switch between full fluid desktop layout and 390px mobile phone preview.

---

## 7. Backend Integration Architecture

All state mutations in `src/hooks/useLevelProgress.ts` interface with clean TypeScript definitions (`UserLevelState`, `LevelTier`, `EarningActivity`, `ActivityRecord`). To replace dummy data with live backend endpoints:

1. Replace `initialLevelState` with `fetch('/api/user/level')`.
2. Connect `addXP` to `POST /api/user/xp/credit`.
3. Connect `completeActivity` to `POST /api/activities/claim`.
4. Connect `handleGameComplete` to `POST /api/games/xp-catcher/submit-score`.
