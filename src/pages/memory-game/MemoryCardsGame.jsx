import './MemoryCards.css';
import { CiPause1 } from 'react-icons/ci';
import {
  BsFillSuitSpadeFill,
  BsFillSuitHeartFill,
  BsFillSuitDiamondFill,
  BsFillSuitClubFill,
} from 'react-icons/bs';
import { useState } from 'react';

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

function shuffle(array) {
  let currentIndex = array.length;

  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

const cardsInit = shuffle([
  {
    id: 1,
    pairId: 'spade-A',
    value: 'A',
    suit: 'spade',
    isFlipped: false,
    isMatched: false,
  },
  {
    id: 2,
    pairId: 'spade-A',
    value: 'A',
    suit: 'spade',
    isFlipped: false,
    isMatched: false,
  },
  {
    id: 3,
    pairId: 'heart-6',
    value: '6',
    suit: 'heart',
    isFlipped: false,
    isMatched: false,
  },
  {
    id: 4,
    pairId: 'heart-6',
    value: '6',
    suit: 'heart',
    isFlipped: false,
    isMatched: false,
  },
  {
    id: 5,
    pairId: 'diamond-8',
    value: '8',
    suit: 'diamond',
    isFlipped: false,
    isMatched: false,
  },
  {
    id: 6,
    pairId: 'diamond-8',
    value: '8',
    suit: 'diamond',
    isFlipped: false,
    isMatched: false,
  },
  {
    id: 7,
    pairId: 'club-10',
    value: '10',
    suit: 'club',
    isFlipped: false,
    isMatched: false,
  },
  {
    id: 8,
    pairId: 'club-10',
    value: '10',
    suit: 'club',
    isFlipped: false,
    isMatched: false,
  },
]);

// TODO:
// массив со всеми картами
// если значение цифра, то должно быть столько же иконок посередине как и у цифры
// если значение аля Д К В то нужно найти иконки чтобы их заменить
// если пар 4, то: Т К Д В 10 8 6 4
// если пар 10, то: Т К Д В 10 9 8 7 6 5 4 3 2

export default function MemoryCardsGame() {
  const [cards, setCards] = useState(cardsInit);
  const [selectedCards, setSelectedCards] = useState([]);
  const [isChecking, setIsChecking] = useState(false);

  function handleSelectCard(card) {
    if (isChecking) return;
    if (card.isFlipped || card.isMatched) return;

    setCards(prev => [
      ...prev.map(el => (el.id === card.id ? { ...el, isFlipped: true } : el)),
    ]);

    setSelectedCards(prev => {
      const updated = [...prev, card];

      if (updated.length === 2) {
        setIsChecking(true);
        setTimeout(() => {
          checkMatch(updated);
        }, 1000);
      }

      return updated;
    });
  }

  function checkMatch(selected) {
    if (selected[0].pairId === selected[1].pairId) {
      setCards(prev =>
        prev.map(el =>
          el.id === selected[0].id || el.id === selected[1].id
            ? { ...el, isMatched: true }
            : el,
        ),
      );
    } else {
      setCards(prev => [
        ...prev.map(el =>
          el.id === selected[0].id || el.id === selected[1].id
            ? { ...el, isFlipped: false }
            : el,
        ),
      ]);
    }
    setSelectedCards([]);
    setIsChecking(false);
  }

  return (
    <section className="memory-game-menu">
      <div className="memory-menu-bar">
        <Timer />
        <MemoryGameActions />
      </div>
      <div className="memory-grid grid-2x4">
        {cards.map(card => (
          <MemoryCard
            key={card.id}
            card={card}
            onSelectCard={handleSelectCard}
          />
        ))}
      </div>

      {/* Background decoration */}
      <div className="stars stars-small"></div>
      <div className="stars stars-medium"></div>
      <div className="stars stars-big"></div>
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

function MemoryCard({ card, onSelectCard }) {
  const suitData = suits[card.suit];

  return (
    <div
      className="memory-card"
      onClick={() => onSelectCard(card)}
      style={card.isMatched ? { opacity: 0 } : {}}
    >
      {card.isFlipped ? (
        <div className="memory-card-inner">
          <div className="card-corner top" style={{ color: suitData.color }}>
            <span>{card.value}</span>
            {suitData.icon}
          </div>

          <div className="card-center" style={{ color: suitData.color }}>
            {suitData.icon}
          </div>

          <div className="card-corner bottom" style={{ color: suitData.color }}>
            <span>{card.value}</span>
            {suitData.icon}
          </div>
        </div>
      ) : (
        <div className="memory-card-inner">
          <div className="card-center">?</div>
        </div>
      )}
    </div>
  );
}
