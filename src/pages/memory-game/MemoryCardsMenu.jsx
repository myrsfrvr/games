import { Link } from 'react-router-dom';
import './MemoryCards.css';

export default function MemoryCardsMenu() {
  return (
    <section className="memory-game-menu">
      <h1>(Memory_cards)</h1>
      <div className="memory-menu-links">
        <Link to="/memory-cards/game" className="memory-menu-link">
          Play
        </Link>

        <div className="memory-menu-link">
          <p>Easy</p>
        </div>

        <Link to="/" className="memory-menu-link">
          Quit
        </Link>
      </div>
    </section>
  );
}
