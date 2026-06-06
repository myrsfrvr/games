import { Link } from 'react-router-dom';
import './MemoryCards.css';
import { useState } from 'react';

export default function MemoryCardsMenu() {
  const [showRules, setShowRules] = useState(false);

  return (
    <section className="memory-game-menu">
      <div className="memory-menu-content">
        <h1 className="memory-title">
          Memory <span>•Cards•</span>
        </h1>
        <div className="memory-menu-links">
          <Link to="/memory-cards/game" className="memory-menu-link">
            Play
          </Link>

          {/* <div className="memory-menu-link">
            <p>Easy</p>
          </div> */}

          <button
            className="memory-menu-link"
            onClick={() => setShowRules(true)}
          >
            Rules
          </button>

          <Link to="/" className="memory-menu-link">
            Quit
          </Link>
        </div>
      </div>

      {showRules && <RulesPopup onClose={() => setShowRules(false)} />}

      {/* Background decoration */}
      <div className="planet-glow"></div>
      <div className="stars stars-small"></div>
      <div className="stars stars-medium"></div>
      <div className="stars stars-big"></div>
    </section>
  );
}

function RulesPopup({ onClose }) {
  return (
    <div className="memory-popup-overlay" onClick={onClose}>
      <div
        className="memory-popup memory-rules-popup"
        onClick={e => e.stopPropagation()}
      >
        <button className="memory-popup-close" onClick={onClose}>
          ✕
        </button>

        <h2 className="memory-popup-title">Rules</h2>

        <div className="memory-rules-content">
          <p>Flip two cards and try to find a matching pair.</p>

          <p>If the cards match, they are removed from the board.</p>

          <p>If they don't match, they will flip back over.</p>

          <p>Match every pair before the timer reaches zero.</p>

          <p>Good luck, explorer.</p>
        </div>
      </div>
    </div>
  );
}
