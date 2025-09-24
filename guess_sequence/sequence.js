'use strict';

// VARIABLES
const sequenceEl = document.querySelector('.sequence');
const answerEls = document.querySelectorAll('.sequence-num');
const guessTableEl = document.querySelector('.guess-table');
const tbodyEl = document.querySelector('.guess-table tbody');
const inputEl = document.querySelector('.input');
const stepCountEl = document.querySelector('.step-count');
const stepCountNumEl = document.querySelector('.step-count-num');
const messageEl = document.querySelector('.error-message');
const checkBtn = document.querySelector('.check');

const sequenceLength = 4;
let answer = '';
let guess;
let step = 1;
const maxSteps = 10;

function createNewSequence() {
  for (let i = 0; i < sequenceLength; i++) {
    answer += Math.trunc(Math.random() * 10);
  }

  // TODO: remove later
  console.log(answer);
}

function displayErrorMessage() {
  messageEl.classList.remove('hidden');
  stepCountEl.classList.add('hidden');
}

function isValidGuess(guess) {
  if (guess === '' || guess.length !== sequenceLength) return false;

  for (const num of guess) {
    if (num < '0' || num > '9') return false;
  }

  return true;
}

function isCorrectGuess(guess) {
  let correctPosition = 0;
  let incorrectPosition = 0;

  let answerArr = answer.split('');
  let guessArr = guess.split('');

  for (let i = 0; i < sequenceLength; i++) {
    if (guess[i] === answer[i]) {
      correctPosition += 1;
      answerArr[i] = null;
      guessArr[i] = null;
    }
  }

  for (let i = 0; i < sequenceLength; i++) {
    if (guessArr[i] !== null) {
      let index = answerArr.indexOf(guessArr[i]);
      if (index !== -1) {
        incorrectPosition += 1;
        answerArr[index] = null;
      }
    }
  }

  return [
    correctPosition === sequenceLength,
    correctPosition,
    incorrectPosition,
  ];
}

// QUESTION: is it possible to add rows to the top of the table? (so user can view it without scrolling)
function addGuessToTable(guess, correct, incorrect) {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${step}</td>
    <td>${guess}</td>
    <td>${correct} correct, ${incorrect} incorrect</td>
  `;
  tbodyEl.appendChild(row);
  stepCountNumEl.textContent = maxSteps - step;
  step++;
}

function displayWinningMessage() {
  document.querySelector('.win-message').classList.remove('hidden');

  answerEls.forEach(el => el.classList.add('win'));
  launchConfetti();
}

function displayLosingMessage() {
  document.querySelector('.lose-message').classList.remove('hidden');
}

function endGame() {
  checkBtn.disabled = true;
  stepCountEl.classList.add('hidden');

  answerEls.forEach((el, i) => {
    el.textContent = answer[i];
  });
}

function launchConfetti() {
  const rect = sequenceEl.getBoundingClientRect();
  const x = (rect.left + rect.width / 2) / window.innerWidth;
  const y = (rect.top + rect.height / 2) / window.innerHeight;

  confetti({
    particleCount: 100,
    spread: 70,
    origin: { x, y },
  });
}

createNewSequence();

checkBtn.addEventListener('click', function () {
  guess = inputEl.value;

  if (!isValidGuess(guess)) displayErrorMessage();
  else {
    messageEl.classList.add('hidden');
    stepCountEl.classList.remove('hidden');

    const [isCorrect, correctPosition, incorrectPosition] =
      isCorrectGuess(guess);

    guessTableEl.classList.remove('hidden');

    // QUESTION: after game ended, should i show user with colours what digits were in correct and incorrect positions?
    if (isCorrect) {
      endGame();
      displayWinningMessage();
    } else {
      // FIXME: fix the 3rd column text. '1 correct, 3 incorrect' is a bit weird. maybe do colours? red for incorrect positions, green for correct
      addGuessToTable(guess, correctPosition, incorrectPosition);
      stepCountEl.classList.remove('hidden');
    }

    if (step > 10) {
      endGame();
      displayLosingMessage();
    }
  }

  // TODO: add later, now it's annoying
  // inputEl.value = '';
});

// TODO: make a pop up window with game rules, opens when click on icon in 'How to play'

// TODO: new game button:
// 1. new guess
// 2. new step
// 3. new answer
// 4. should hide sequence with ???? again
// 5. remove winning message
// 6. remove all rows from table
// 7. hide table
// 8. new game btn should work in every scenario: after player won, after player lost (if implemented max guesses), while player playing, before game started

// QUESTION: can i clear the input after user guesses? of after 'new game' is hit
