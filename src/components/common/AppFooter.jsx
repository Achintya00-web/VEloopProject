import React from 'react';
import { Gamepad2 } from 'lucide-react';

export const AppFooter = ({ onNavigate }) => (
  <footer className="app-footer">
    <button className="app-footer__brand" onClick={() => onNavigate('dashboard')}>
      <span>V</span><strong>VELOOP<br /><b>REWARDS</b></strong>
    </button>
    <span className="app-footer__motto">Play · Earn · Grow</span>
    <nav aria-label="Footer navigation">
      <button onClick={() => onNavigate('activity')}>About</button>
      <button onClick={() => onNavigate('activity')}>Help</button>
      <button onClick={() => onNavigate('rewards')}>Terms</button>
      <button onClick={() => onNavigate('activity')}>Privacy</button>
    </nav>
    <span className="app-footer__arcade"><Gamepad2 size={16} /> VELOOP ARCADE</span>
  </footer>
);
