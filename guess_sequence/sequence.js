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

for (let i = 0; i < sequenceLength; i++) {
  answer += Math.trunc(Math.random() * 10);
}

answerEls.forEach((el, i) => {
  el.textContent = answer[i];
});

document.querySelector('.check').addEventListener('click', function () {
  guess = document.querySelector('.input').value;

  if (guess === '' || guess.length !== 4) displayErrorMessage();
  else messageEl.classList.add('hidden');

  console.log(guess);
});
