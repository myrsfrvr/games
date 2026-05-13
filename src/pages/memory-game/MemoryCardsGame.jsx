import './MemoryCards.css';
import { ImSpades, ImHeart, ImDiamonds, ImClubs } from 'react-icons/im';

export default function MemoryCardsGame() {
  return (
    <section className="memory-game-menu">
      <Timer />
      {new Array(8).fill(null).map((_, i) => (
        <MemoryCard key={i} />
      ))}
      <MovesCounter />
    </section>
  );
}

function Timer() {
  return <div>Time</div>;
}

// function MemoryCard() {
//   return <div className="memory-card">Hello</div>;
// }

function MemoryCard() {
  return (
    <div className="memory-card">
      <div className="card-inner">
        <div className="card-corner top">
          <span>A</span>
          <span className="suit">
            <ImSpades />
          </span>
        </div>

        <div className="card-center">
          <ImSpades />
        </div>

        <div className="card-corner bottom">
          <span>A</span>
          <span className="suit">
            <ImSpades />
          </span>
        </div>
      </div>
    </div>
  );
}

function MovesCounter() {
  return <div>Moves</div>;
}
