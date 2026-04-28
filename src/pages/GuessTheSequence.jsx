import './GuessTheSequence.css';
// import confetti from 'canvas-confetti';

function GuessTheSequence() {
  // useEffect(() => {
  //   if (hasWon) {
  //     confetti({
  //       particleCount: 120,
  //       spread: 70,
  //       origin: { y: 0.6 },
  //     });
  //   }
  // }, [hasWon]);

  return (
    <section className="guess-page font-guess-sequence">
      <div className="main-content">
        <h1 className="guess-title">
          <span>Guess</span> the Sequence
        </h1>
        <div className="sides">
          <div className="left-side">
            <div className="sequence">
              <p className="sequence-num">?</p>
              <p className="sequence-num">?</p>
              <p className="sequence-num">?</p>
              <p className="sequence-num">?</p>
            </div>

            <p className="win-message hidden">Congratulations! 🎉 You won!</p>
            <p className="lose-message hidden">Oh no... You lost 😭</p>

            <table className="guess-table hidden">
              <thead>
                <tr>
                  <th>Step</th>
                  <th>Guess</th>
                  <th>Hint</th>
                </tr>
              </thead>
              <tbody>{/* New guesses here */}</tbody>
            </table>
          </div>

          <div className="right-side">
            <div className="info-box">
              <h2 className="guess-subtitle">How to play</h2>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="info-icon size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                />
              </svg>
            </div>
            <input type="number" className="input" />
            <p className="error-message hidden">Invalid guess</p>
            <p className="step-count hidden">
              <span className="step-count-num"></span> steps left
            </p>
            <div className="btns">
              <button className="btn check">Check</button>
              <button className="btn new-game">New game</button>
            </div>
          </div>
        </div>
      </div>

      <div className="popup-wrapper hidden">
        <div className="popup">
          <div className="popup-content">
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

            <button className="close-popup">
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
    </section>
  );
}

export default GuessTheSequence;
