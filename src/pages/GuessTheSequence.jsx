import { useEffect, useState } from 'react';
import './GuessTheSequence.css';
import confetti from 'canvas-confetti';

function GuessTheSequence() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [guess, setGuess] = useState('');
  const [showError, setShowError] = useState(false);
  const [message, setMessage] = useState('');
  const [guessHistory, setGuessHistory] = useState([]);

  const sequenceLength = 4;

  const [answer, setAnswer] = useState(() =>
    generateRandomSequence(sequenceLength),
  );

  function handleOpenPopup() {
    setIsPopupOpen(true);
  }

  function handleClosePopup() {
    setIsPopupOpen(false);
  }

  function handleGuessChange(e) {
    const value = e.target.value;
    const digitsOnly = value.replace(/\D/g, '');
    const limitedGuess = digitsOnly.slice(0, 4);

    setGuess(limitedGuess);
    setShowError(false);
  }

  function handleGuessCheck() {
    if (guess.length !== 4) {
      setShowError(true);
      return;
    }

    setShowError(false);

    const hint = isGuessCorrect(guess, answer, sequenceLength);

    if (hint.correctPositions === 4) {
      setMessage('success');
      return;
    } else {
      const newEntry = {
        step: guessHistory.length + 1,
        guess,
        hint: hint,
      };

      setGuessHistory([...guessHistory, newEntry]);

      if (guessHistory.length === 9) {
        setMessage('fail');
      }
    }
  }

  function handleNewGame() {
    setAnswer(generateRandomSequence(sequenceLength));
    setGuess('');
    setShowError(false);
    setMessage('');
    setGuessHistory([]);
  }

  useEffect(() => {
    if (message === 'success') {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6, x: 0.3 },
      });
    }
  }, [message]);

  return (
    <section className="guess-page">
      <div className="main-content">
        <h1 className="guess-title font-guess-sequence">
          <span>Guess</span> the Sequence
        </h1>
        <div className="sides">
          <div className="left-side">
            <div className="sequence">
              {message
                ? answer.split('').map((digit, i) => (
                    <p className="sequence-num font-guess-sequence-seq" key={i}>
                      {digit}
                    </p>
                  ))
                : new Array(4).fill(null).map((_, i) => (
                    <p className="sequence-num font-guess-sequence-seq" key={i}>
                      ?
                    </p>
                  ))}
              {/* {answer.split('').map((digit, i) => (
                <p className="sequence-num font-guess-sequence-seq" key={i}>
                  {digit}
                </p>
              ))} */}
            </div>

            {message && <ResultMessage message={message} />}

            {guessHistory.length > 0 && (
              <GuessTable guessHistory={guessHistory} />
            )}
          </div>

          <div className="right-side">
            <div className="info-box" onClick={handleOpenPopup}>
              <h2 className="guess-subtitle">How to play</h2>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="info-icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                />
              </svg>
            </div>

            {isPopupOpen && <HowToPlayPopup onClosePopup={handleClosePopup} />}

            <input
              type="text"
              className="input"
              value={guess}
              onChange={handleGuessChange}
              onKeyDown={e => {
                if (e.key === 'Enter') handleGuessCheck();
              }}
              inputMode="numeric"
              maxLength={4}
              placeholder="1234"
            />

            <div className="guess-btns">
              <button
                className="btn check"
                onClick={handleGuessCheck}
                disabled={message}
              >
                Check
              </button>
              <button className="btn new-game" onClick={handleNewGame}>
                New game
              </button>
            </div>

            {showError && <p className="error-message">Invalid guess</p>}

            {guessHistory.length > 0 &&
              guessHistory.length < 10 &&
              message !== 'success' && (
                <p className="step-count">
                  <span className="step-count-num">
                    {10 - guessHistory.length}
                  </span>{' '}
                  {guessHistory.length === 9 ? 'step' : 'steps'} left
                </p>
              )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default GuessTheSequence;

function isGuessCorrect(guess, answer, sequenceLength = 4) {
  let guessArr = guess.split('');
  let answerArr = answer.split('');

  let correctPositions = 0;
  let incorrectPositions = 0;

  // checking corrrect positions, marking correct digits as null (to avoid checking them again)
  for (let i = 0; i < sequenceLength; i++) {
    if (guessArr[i] === answerArr[i]) {
      correctPositions++;
      guessArr[i] = null;
      answerArr[i] = null;
    }
  }

  // checking incorrect positions, marking right digits at incorrect positions as null
  for (let i = 0; i < sequenceLength; i++) {
    if (guessArr[i] !== null) {
      let index = answerArr.indexOf(guessArr[i]);

      if (index !== -1) {
        incorrectPositions++;
        answerArr[index] = null;
      }
    }
  }

  return { correctPositions, incorrectPositions };
}

function generateRandomSequence(length = 4) {
  let digits = [];

  for (let i = 0; i < length; i++) {
    digits.push(Math.trunc(Math.random() * 10));
  }
  console.log(digits);
  return digits.join('');
}

function HowToPlayPopup({ onClosePopup }) {
  return (
    <div className="popup-wrapper">
      <div className="popup" onClick={onClosePopup}>
        <div className="popup-content" onClick={e => e.stopPropagation()}>
          <h2 className="h2">How to play</h2>
          <p className="rules">
            Guess the 4-digit sequence. You have 10 tries to find the correct
            number combination. After each guess, you'll get feedback:
          </p>

          <table className="rules-table">
            <thead>
              <tr>
                <th>Guess</th>
                <th>Hint</th>
                <th>Meaning</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1234</td>
                <td className="hints">
                  <span className="badge correct">2</span>
                  <span className="badge incorrect">1</span>
                </td>
                <td>
                  2 digits are in the correct position,
                  <br />1 digit is in the sequence but in the wrong position
                </td>
              </tr>
              <tr>
                <td>5678</td>
                <td>
                  <span className="badge correct">0</span>
                  <span className="badge incorrect">2</span>
                </td>
                <td>
                  No digits are in the correct position,
                  <br />2 digits are in the sequence but in the wrong position
                </td>
              </tr>
            </tbody>
          </table>

          <p>
            Keep guessing until you either find the sequence or run out of
            tries. Good luck!
          </p>

          <button className="close-popup" onClick={onClosePopup}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="close-icon size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

function ResultMessage({ message }) {
  return (
    <p className="guess-message">
      {message === 'success'
        ? 'Congratulations! 🎉 You won!'
        : 'Oh no... You lost 😭'}
    </p>
  );
}

function GuessTable({ guessHistory }) {
  return (
    <table className="guess-table">
      <thead>
        <tr>
          <th>Step</th>
          <th>Guess</th>
          <th>Hint</th>
        </tr>
      </thead>
      <tbody>
        {guessHistory.map(cur => (
          <GuessTableRow key={cur.step} curGuess={cur} />
        ))}
      </tbody>
    </table>
  );
}

function GuessTableRow({ curGuess }) {
  return (
    <tr>
      <td>{curGuess.step}</td>
      <td>{curGuess.guess}</td>
      <td>
        <span className="badge correct">{curGuess.hint.correctPositions}</span>
        <span className="badge incorrect">
          {curGuess.hint.incorrectPositions}
        </span>
      </td>
    </tr>
  );
}
