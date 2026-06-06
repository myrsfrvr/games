import './HomePage.css';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <main className="home-page font-home">
      <div className="home-container">
        <h1 className="home-title">Web Games Collection</h1>

        <div className="home-cards">
          <Link to="/guess-the-sequence" className="home-card guess-sequence">
            <span>Guess</span> the Sequence
          </Link>

          <Link to="/memory-cards" className="home-card memory-game">
            <p className="memory-card-title">
              Memory <span>•Cards•</span>
            </p>

            <div className="shooting-star">
              <div className="shooting-star-head"></div>
            </div>
          </Link>

          <a href="#" className="home-card tba">
            To be announced
          </a>
        </div>
      </div>
    </main>
  );
}

export default HomePage;
