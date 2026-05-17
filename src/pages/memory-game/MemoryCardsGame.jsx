import './MemoryCards.css';
import { CiPause1 } from 'react-icons/ci';
import {
  BsFillSuitSpadeFill,
  BsFillSuitHeartFill,
  BsFillSuitDiamondFill,
  BsFillSuitClubFill,
} from 'react-icons/bs';

const suits = {
  spade: {
    icon: <BsFillSuitSpadeFill />,
    color: '#b8dcff',
  },

  heart: {
    icon: <BsFillSuitHeartFill />,
    color: '#ff8bdc',
  },

  diamond: {
    icon: <BsFillSuitDiamondFill />,
    color: '#7be7ff',
  },

  club: {
    icon: <BsFillSuitClubFill />,
    color: '#c59cff',
  },
};

// TODO:
// массив со всеми картами
// если значение цифра, то должно быть столько же иконок посередине как и у цифры
// если значение аля Д К В то нужно найти иконки чтобы их заменить
// если пар 4, то: Т К Д В 10 8 6 4
// если пар 10, то: Т К Д В 10 9 8 7 6 5 4 3 2

export default function MemoryCardsGame() {
  return (
    <section className="memory-game-menu">
      <div className="memory-menu-bar">
        <Timer />
        <MemoryGameActions />
      </div>
      {/* {new Array(8).fill(null).map((_, i) => (
        <MemoryCard key={i} />
      ))} */}
      <div className="memory-grid grid-2x4">
        <MemoryCard value="A" suit="spade" />
        <MemoryCard value="6" suit="heart" />
        <MemoryCard value="8" suit="diamond" />
        <MemoryCard value="10" suit="club" />
        <MemoryCard value="6" suit="heart" />
        <MemoryCard value="10" suit="club" />
        <MemoryCard value="A" suit="spade" />
        <MemoryCard value="8" suit="diamond" />
      </div>

      {/* Background decoration */}
      <div class="stars stars-small"></div>
      <div class="stars stars-medium"></div>
      <div class="stars stars-big"></div>
    </section>
  );
}

function Timer() {
  return (
    <div className="memory-timer">
      <p className="">01:24</p>
    </div>
  );
}

function MemoryGameActions() {
  return (
    <div className="memory-actions">
      <CiPause1 />
    </div>
  );
}

function MemoryCard({ value, suit }) {
  const suitData = suits[suit];

  return (
    <div className="memory-card">
      <div className="memory-card-inner">
        <div className="card-corner top" style={{ color: suitData.color }}>
          <span>{value}</span>
          {suitData.icon}
        </div>

        <div className="card-center" style={{ color: suitData.color }}>
          {suitData.icon}
        </div>

        <div className="card-corner bottom" style={{ color: suitData.color }}>
          <span>{value}</span>
          {suitData.icon}
        </div>
      </div>
    </div>
  );
}
