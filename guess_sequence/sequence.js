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

// TODO: продумать как запоминать сколько мест и каких
// мб сделать 2 переменные глобальные и туда записывать сколько цифр правильных, сколько нет и тд
// ИЛИ не создавать глоб перем, а создать перем внутри функции, а затем возвращать сразу несколько переменных (true/false, сколько на прав месте, сколько на неправ)
// и им отдавать переменным с помощью spread operator
// const [isCorrect, correctPosition, incorrectPosition] = ... isCorrectGuess(guess);
// создать функцию под вывод результата (следующей строки таблицы) на экран

// 854798
// 7c238c
// 7f95d1
// QUESTION: нужно ли запоминать правильные цифры?? чтобы потом их выделить? или выделение в принципе не важно и можно потом прокрутить таблицу и все??
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
