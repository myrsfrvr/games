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
const newGameBtn = document.querySelector('.new-game');
const popupWrapperEl = document.querySelector('.popup-wrapper');
const popupEl = document.querySelector('.popup');
const openInfoBtn = document.querySelector('.info-box');
const closeInfoBtn = document.querySelector('.close-popup');

const sequenceLength = 4;
let answer = '';
let guess;
let step = 1;
const maxSteps = 10;

/////////////////////////////////
// FUNCTIONS
/////////////////////////////////

function createNewSequence() {
  // Creates a random number from 0 to 9 four times and then just adds them together in a string
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
  // Browser automatically checks if it's a number (no spaces or letters allowed) so code only checks if that number is not negative or an integer
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

  // First, checks all correct positions. If there are any, marks that position as 'null'
  for (let i = 0; i < sequenceLength; i++) {
    if (guess[i] === answer[i]) {
      correctPosition += 1;
      answerArr[i] = null;
      guessArr[i] = null;
    }
  }

  // Second, checks all right numbers in incorrect positions, ignoring all the marked 'null' positions from previous step. Also marks already found numbers 'null' to avoid counting them twice
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

// Adds all guesses with results to the table in reverse order (last guess on top)
function addGuessToTable(guess, correct, incorrect) {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${step}</td>
    <td>${guess}</td>
    <td>${correct} correct, ${incorrect} incorrect</td>
  `;
  tbodyEl.insertBefore(row, tbodyEl.firstChild);

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

// Ensures the state of the endgame: disables Check button, shows correct sequence
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

// Initial state of the game
function init() {
  answer = '';
  createNewSequence();
  guess = '';
  step = 1;
  tbodyEl.innerHTML = '';

  answerEls.forEach(el => {
    el.textContent = '?';
  });
  checkBtn.disabled = false;
  document.querySelector('.win-message').classList.add('hidden');
  document.querySelector('.lose-message').classList.add('hidden');
  guessTableEl.classList.add('hidden');
  stepCountEl.classList.add('hidden');
}

/////////////////////////////////
// GAME LOGIC
/////////////////////////////////

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

openInfoBtn.addEventListener('click', function () {
  popupWrapperEl.classList.remove('hidden');
});

closeInfoBtn.addEventListener('click', function () {
  popupWrapperEl.classList.add('hidden');
});

popupWrapperEl.addEventListener('click', function (e) {
  if (e.target === popupEl) popupWrapperEl.classList.add('hidden');
});

newGameBtn.addEventListener('click', function () {
  init();
});
