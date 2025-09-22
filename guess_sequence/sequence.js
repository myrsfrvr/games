'use strict';

// VARIABLES
const sequenceLength = 4;
const answerEls = document.querySelectorAll('.sequence-num');
const messageEl = document.querySelector('.message');
let answer = '';
let guess;

function displayErrorMessage() {
  messageEl.classList.remove('hidden');
}

function isValidGuess(guess) {
  if (guess === '' || guess.length !== sequenceLength) return false;

  for (const num of guess) {
    if (num < '0' || num > '9') return false;
  }

  return true;
}

function isCorrectGuess(guess) {
  for (let i = 0; i < sequenceLength; i++) {
    if (guess[i] !== answer[i]) {
      return false;
    }
  }
  return true;
}

for (let i = 0; i < sequenceLength; i++) {
  answer += Math.trunc(Math.random() * 10);
}

// TODO: REMOVE LATER (shows answer in the beginning of the game)
answerEls.forEach((el, i) => {
  el.textContent = answer[i];
});

document.querySelector('.check').addEventListener('click', function () {
  guess = document.querySelector('.input').value;

  if (!isValidGuess(guess)) displayErrorMessage();
  else {
    messageEl.classList.add('hidden');
    console.log(isCorrectGuess(guess));
  }
});
