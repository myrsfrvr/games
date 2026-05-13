import { Link } from 'react-router-dom';
import './MemoryCards.css';

export default function MemoryCardsMenu() {
  const title = '(Memory_cards)';

  return (
    <section className="memory-game-menu">
      <div className="menu-content">
        <h1 className="casino-title">
          {title.split('').map((char, index) => (
            <span key={index} style={{ animationDelay: `${index * 0.06}s` }}>
              {char}
            </span>
          ))}
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
    </section>
  );
}
