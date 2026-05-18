import './MemoryCards.css';
import { Link } from 'react-router-dom';
import { CiPause1 } from 'react-icons/ci';
import {
  BsFillSuitSpadeFill,
  BsFillSuitHeartFill,
  BsFillSuitDiamondFill,
  BsFillSuitClubFill,
} from 'react-icons/bs';
import { useEffect, useState } from 'react';

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
  let newArray = [...array];
  let currentIndex = newArray.length;

  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [newArray[currentIndex], newArray[randomIndex]] = [
      newArray[randomIndex],
      newArray[currentIndex],
    ];
  }

  return newArray;
}

const cardsInit = [
  {
    id: 1,
    pairId: 'spade-A',
    value: 'A',
    suit: 'spade',
    isFlipped: true,
    isMatched: false,
  },
  {
    id: 2,
    pairId: 'spade-A',
    value: 'A',
    suit: 'spade',
    isFlipped: true,
    isMatched: false,
  },
  {
    id: 3,
    pairId: 'heart-6',
    value: '6',
    suit: 'heart',
    isFlipped: true,
    isMatched: false,
  },
  {
    id: 4,
    pairId: 'heart-6',
    value: '6',
    suit: 'heart',
    isFlipped: true,
    isMatched: false,
  },
  {
    id: 5,
    pairId: 'diamond-8',
    value: '8',
    suit: 'diamond',
    isFlipped: true,
    isMatched: false,
  },
  {
    id: 6,
    pairId: 'diamond-8',
    value: '8',
    suit: 'diamond',
    isFlipped: true,
    isMatched: false,
  },
  {
    id: 7,
    pairId: 'club-10',
    value: '10',
    suit: 'club',
    isFlipped: true,
    isMatched: false,
  },
  {
    id: 8,
    pairId: 'club-10',
    value: '10',
    suit: 'club',
    isFlipped: true,
    isMatched: false,
  },
];

// TODO:
// design: if card has  a number, then add that amount of symbols in the centre
// if card is a King, Queen or Jack, add pics or icons

export default function MemoryCardsGame() {
  const [cards, setCards] = useState(() => createCards());
  const [selectedCards, setSelectedCards] = useState([]);
  const [isChecking, setIsChecking] = useState(false);
  const [gameId, setGameId] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const isGameWon = cards.length > 0 && cards.every(card => card.isMatched);
  const isGameLost = timeLeft === 0;

  function createCards() {
    return shuffle(
      cardsInit.map(card => ({
        ...card,
      })),
    );
  }

  function startRound() {
    setCards(prev =>
      prev.map(el => {
        return { ...el, isFlipped: false };
      }),
    );
    setIsGameStarted(true);
  }

  useEffect(
    function () {
      const timer = setTimeout(() => {
        startRound();
      }, 1700);

      // If component unmounts before timeout finishes, remove the timeout.
      return () => clearTimeout(timer);
    },
    [gameId],
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isGameStarted]);

  function handleSelectCard(card) {
    if (isChecking) return;
    if (!isGameStarted) return;
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
      setCards(prev =>
        prev.map(el =>
          el.id === selected[0].id || el.id === selected[1].id
            ? { ...el, isFlipped: false }
            : el,
        ),
      );
    }
    setSelectedCards([]);
    setIsChecking(false);
  }

  function handleNewGame() {
    setCards(createCards());
    setSelectedCards([]);
    setIsChecking(false);
    setTimeLeft(15);
    setIsGameStarted(false);

    setGameId(prev => prev + 1);
  }

  return (
    <section className="memory-game-menu">
      <div className="memory-menu-bar">
        <Timer timeLeft={timeLeft} />
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
      {isGameLost && (
        <PausePopup onNewGame={handleNewGame}>Time's up!</PausePopup>
      )}
      {isGameWon && <PausePopup onNewGame={handleNewGame}>You won!</PausePopup>}

      {/* Background decoration */}
      <div className="stars stars-small"></div>
      <div className="stars stars-medium"></div>
      <div className="stars stars-big"></div>
    </section>
  );
}

function Timer({ timeLeft }) {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="memory-timer">
      <p className="">
        {minutes}:{String(seconds).padStart(2, '0')}
      </p>
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

function PausePopup({ onNewGame, children }) {
  return (
    <div className="memory-popup-overlay">
      <div className="memory-popup">
        <h2 className="memory-popup-title">{children}</h2>
        <button
          className="memory-popup-link memory-popup-play-again"
          onClick={onNewGame}
        >
          Play again
        </button>
        <Link to="/memory-cards" className="memory-popup-link">
          Menu
        </Link>
      </div>
    </div>
  );
}
