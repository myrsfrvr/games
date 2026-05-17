import { Link } from 'react-router-dom';
import './MemoryCards.css';

export default function MemoryCardsMenu() {
  return (
    <section className="memory-game-menu">
      <div className="menu-content">
        <h1 className="memory-title">
          Memory <span>•Cards•</span>
        </h1>
        <div className="memory-menu-links">
          <Link to="/memory-cards/game" className="memory-menu-link">
            Play
          </Link>

          <div className="memory-menu-link">
            <p>Easy</p>
          </div>

          <div className="memory-menu-link">
            <p>Rules</p>
          </div>

          <Link to="/" className="memory-menu-link">
            Quit
          </Link>
        </div>
      </div>

      {/* Background decoration */}
      <div className="planet-glow"></div>
      <div className="stars stars-small"></div>
      <div className="stars stars-medium"></div>
      <div className="stars stars-big"></div>
    </section>
  );
}
