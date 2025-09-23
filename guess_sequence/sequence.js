'use strict';

// VARIABLES
const sequenceLength = 4;
const answerEls = document.querySelectorAll('.sequence-num');
const messageEl = document.querySelector('.message');
const inputEl = document.querySelector('.input');
const guessTableEl = document.querySelector('.guess-table');
const tbodyEl = document.querySelector('.guess-table tbody');
let answer = '';
let guess;
let step = 1;

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

// создать функцию под вывод результата (следующей строки таблицы) на экран

// 854798
// 7c238c
// 7f95d1
// QUESTION: нужно ли запоминать правильные цифры?? чтобы потом их выделить? или выделение в принципе не важно и можно потом прокрутить таблицу и все??

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

  console.log(`correct: ${correctPosition}, incorrect: ${incorrectPosition}`);

  return [
    correctPosition === sequenceLength,
    correctPosition,
    incorrectPosition,
  ];
}

function addGuessToTable(guess, correct, incorrect) {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${step}</td>
    <td>${guess}</td>
    <td>${correct} correct, ${incorrect} incorrect</td>
  `;
  tbodyEl.appendChild(row);
  step++;
}

for (let i = 0; i < sequenceLength; i++) {
  answer += Math.trunc(Math.random() * 10);
}

// TODO: REMOVE LATER (shows answer in the beginning of the game)
answerEls.forEach((el, i) => {
  el.textContent = answer[i];
});

document.querySelector('.check').addEventListener('click', function () {
  guess = inputEl.value;

  if (!isValidGuess(guess)) displayErrorMessage();
  else {
    messageEl.classList.add('hidden');
    const [isCorrect, correctPosition, incorrectPosition] =
      isCorrectGuess(guess);
    console.log(isCorrect, correctPosition, incorrectPosition);

    guessTableEl.classList.remove('hidden');

    if (isCorrect) {
      displayWinningMessage();
    }

    addGuessToTable(guess, correctPosition, incorrectPosition);
  }
});
