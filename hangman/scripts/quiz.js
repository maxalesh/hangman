// eslint-disable-next-line import/no-cycle,import/extensions
import { showModal } from './modal.js';

// eslint-disable-next-line import/prefer-default-export,no-use-before-define
export { restartGame };
const quiz = document.querySelector('.quiz');
const underlinesList = document.createElement('ul');
const hiddenLetters = document.createElement('ul');
const hiddenWord = document.createElement('div');
const hint = document.createElement('p');
const hintSubTitle = document.createElement('span');
const incorrectGuesses = document.createElement('p');
const incorrectGuessesCounter = document.createElement('span');
const quizInfo = document.createElement('div');
const keyboard = document.createElement('div');
const keysList = document.createElement('ul');
const listIndLetter = new Set();

let incorrectGuessesCount = 0;
const secretWords = [
  'JAYWALK',
  'CHEETAH',
  'GIRAFFE',
  'HYUNDAI',
  'TITANIC',
  'JOURNEY',
  'BICYCLE',
  'MADONNA',
  'JUMANJI',
  'PORSCHE',
];

const hintsList = {
  JAYWALK: 'Сrossing the road in violation of the rules',
  CHEETAH: 'The fastest animal',
  GIRAFFE: 'The tallest animal',
  HYUNDAI: 'South Korean car brand',
  TITANIC: 'The sunken ship with DiCaprio',
  JOURNEY: 'The band that created the Departure album',
  BICYCLE: 'A human-powered vehicle with two wheels',
  MADONNA: 'In Russia, she is compared to Alla Pugacheva',
  JUMANJI: 'A jungle movie with Dwayne Johnson',
  PORSCHE: 'German car brand',
};

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function randomInteger(min, max) {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function getRandomSecretWord() {
  const randomIndex = randomInteger(0, 9);
  return secretWords[randomIndex];
}

let currentSecretWord = getRandomSecretWord();

hiddenWord.className = 'quiz__hidden-word';
hiddenLetters.className = 'quiz__hidden-letters hidden-letters';
underlinesList.className = 'quiz__underline-list underline-list';
quiz.append(hiddenWord);

function setHiddenWord() {
  for (let i = 0; i < 7; i += 1) {
    const secretLettersList = currentSecretWord.split('');
    const itemUnderline = document.createElement('li');
    const itemLetter = document.createElement('li');
    itemLetter.textContent = secretLettersList[i];
    itemUnderline.className = 'underline-list__item';
    underlinesList.append(itemUnderline);
    itemLetter.className = 'hidden-letters__item';
    hiddenLetters.append(itemLetter);
  }

  hiddenWord.append(hiddenLetters);
  hiddenWord.append(underlinesList);
}

setHiddenWord();

quizInfo.className = 'quiz__info';
quiz.append(quizInfo);

// TODO: wrap of func
hintSubTitle.textContent = 'Hint: ';
hintSubTitle.className = 'quiz__subtitle';
hint.className = 'quiz__hint';
hint.append(hintSubTitle);
hint.append(hintsList[currentSecretWord]);

// TODO: wrap of func
incorrectGuesses.className = 'quiz__incorrect-guesses incorrect-guesses';
incorrectGuesses.textContent = 'Incorrect guesses: ';
incorrectGuessesCounter.className = 'incorrect-guesses__counter';
incorrectGuessesCounter.textContent = `${incorrectGuessesCount} / 6`;
incorrectGuesses.append(incorrectGuessesCounter);
quizInfo.append(hint);
quizInfo.append(incorrectGuesses);

// TODO: wrap of func
keyboard.className = 'quiz__keyboard keyboard';
keysList.className = 'keyboard__keys-list keys-list';
keyboard.append(keysList);
quiz.append(keyboard);

function showHiddenLetters() {
  // eslint-disable-next-line no-restricted-syntax
  for (const currInd of listIndLetter) {
    document
      .querySelector(`.hidden-letters__item:nth-child(${currInd + 1})`)
      .classList.add('hidden-letters__item--visible');

    document
      .querySelector(`.underline-list__item:nth-child(${currInd + 1})`)
      .classList.add('underline-list__item--hidden');
  }
}

function saveIndexesOfHiddenLetters(letter) {
  let pos = 0;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const foundPos = currentSecretWord.indexOf(letter, pos);
    if (foundPos === -1) break;
    listIndLetter.add(foundPos);
    pos = foundPos + 1;
  }
}

for (let i = 0; i < alphabet.length; i += 1) {
  const key = document.createElement('li');
  const button = document.createElement('button');
  button.className = 'key-list__btn';
  key.className = 'keys-list__item key';
  button.textContent = alphabet[i];
  key.append(button);
  // TODO: ?
  // key.addEventListener('', () => {});
  keysList.append(key);
}

// function disabledKey() {
//
// }

// Добавляю прослушивание на виртуальную клавиатуру
// eslint-disable-next-line no-restricted-syntax
for (const key of document.querySelectorAll('.key')) {
  // eslint-disable-next-line no-loop-func
  key.addEventListener('click', () => {
    if (
      currentSecretWord.includes(key.textContent) &&
      incorrectGuessesCount < 6 &&
      listIndLetter.size < 7
    ) {
      // TODO: apply DRY
      const btnKey = key.children[0];
      btnKey.setAttribute('disabled', 'disabled');
      key.classList.add('key--disabled');
      saveIndexesOfHiddenLetters(key.textContent);
      showHiddenLetters();

      if (listIndLetter.size === currentSecretWord.length) {
        showModal('You win!', currentSecretWord);
      }
    } else if (
      !currentSecretWord.includes(key.textContent) &&
      incorrectGuessesCount < 6 &&
      listIndLetter.size < 7
    ) {
      // TODO: apply DRY
      const btnKey = key.children[0];
      btnKey.setAttribute('disabled', 'disabled');
      key.classList.add('key--disabled');

      // TODO: wrap of func
      document
        .querySelector(`.man-part:nth-child(${incorrectGuessesCount + 1})`)
        .classList.add('gallows__man-part--visible');
      incorrectGuessesCount += 1;
      incorrectGuessesCounter.textContent = `${incorrectGuessesCount} / 6`;
      if (incorrectGuessesCount === 6) {
        showModal('Yow lose!', currentSecretWord);
      }
    }
  });
}

function hiddenManParts() {
  const visibleManParts = document.querySelectorAll('.man-part');
  // eslint-disable-next-line no-restricted-syntax
  for (const visiblePart of visibleManParts) {
    visiblePart.classList.remove('gallows__man-part--visible');
  }
}

function resetHiddenWord() {
  const visibleHiddenLetters = document.querySelectorAll('.hidden-letters__item--visible');
  // eslint-disable-next-line no-restricted-syntax
  for (const visibleLetter of visibleHiddenLetters) {
    visibleLetter.classList.remove('hidden-letters__item--visible');
  }
  const hiddenUnderlines = document.querySelectorAll('.underline-list__item--hidden');
  // eslint-disable-next-line no-restricted-syntax
  for (const hiddenUnderline of hiddenUnderlines) {
    hiddenUnderline.classList.remove('underline-list__item--hidden');
  }
  hiddenLetters.innerHTML = '';
  underlinesList.innerHTML = '';
  hiddenWord.innerHTML = '';
  setHiddenWord();
}

function resetKeyboard() {
  const disableKeys = document.querySelectorAll('.key--disabled');
  const disableButtons = document.querySelectorAll('button:disabled');
  for (const key of disableKeys) {
    key.classList.remove('key--disabled');
  }
  for (const btn of disableButtons) {
    btn.removeAttribute('disabled');
  }
}

function restartGame() {
  currentSecretWord = getRandomSecretWord();
  incorrectGuessesCount = 0;
  listIndLetter.clear();
  const modal = document.querySelector('.modal');
  modal.innerHTML = '';
  hint.textContent = hintsList[currentSecretWord];
  incorrectGuessesCounter.textContent = `${incorrectGuessesCount} / 6`;
  hiddenManParts();
  resetHiddenWord();
  resetKeyboard();
  console.log('New secret word: ', currentSecretWord);
}

document.addEventListener('keydown', event => {
  const keyValue = event.code[event.code.length - 1];
  // let listIndLetter = [];
  if (
    // TODO: put in variable
    currentSecretWord.includes(keyValue) &&
    keyValue !== keyValue.toLowerCase() &&
    incorrectGuessesCount < 6 &&
    listIndLetter.size < 7
  ) {
    // TODO: apply DRY
    const keyNumb = alphabet.indexOf(keyValue);
    const pressKey = document.querySelector(`.key:nth-child(${keyNumb + 1})`);
    const pressBtnKey = pressKey.children[0];
    pressBtnKey.setAttribute('disabled', 'disabled');
    pressKey.classList.add('key--disabled');
    saveIndexesOfHiddenLetters(keyValue);
    showHiddenLetters();

    if (listIndLetter.size === currentSecretWord.length) {
      showModal('You win!', currentSecretWord);
    }
  } else if (
    // TODO: put in variable
    !currentSecretWord.includes(keyValue) &&
    keyValue !== keyValue.toLowerCase() &&
    incorrectGuessesCount < 6 &&
    listIndLetter.size < 7
  ) {
    // TODO: apply DRY
    const keyNumb = alphabet.indexOf(keyValue);
    const pressKey = document.querySelector(`.key:nth-child(${keyNumb + 1})`);
    const pressBtnKey = pressKey.children[0];
    pressBtnKey.setAttribute('disabled', 'disabled');
    pressKey.classList.add('key--disabled');

    // TODO: wrap of func
    document
      .querySelector(`.man-part:nth-child(${incorrectGuessesCount + 1})`)
      .classList.add('gallows__man-part--visible');
    incorrectGuessesCount += 1;
    incorrectGuessesCounter.textContent = `${incorrectGuessesCount} / 6`;
    if (incorrectGuessesCount === 6) {
      showModal('Yow lose!', currentSecretWord);
    }
    console.log('There is no such letter!');
  }
});

console.log('Secret word:', currentSecretWord);
