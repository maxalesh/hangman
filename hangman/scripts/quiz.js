import { showModal } from './modal.js';

const page = document.querySelector('.page');
const main = document.querySelector('.main');
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

let incorrectGuesessCount = 0;
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

const currentSecretWord = getRandomSecretWord();

hiddenWord.className = 'quiz__hidden-word';
hiddenLetters.className = 'quiz__hidden-letters hidden-letters';
underlinesList.className = 'quiz__underline-list underline-list';

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
quiz.append(hiddenWord);
quizInfo.className = 'quiz__info';
quiz.append(quizInfo);

hintSubTitle.textContent = 'Hint: ';
hintSubTitle.className = 'quiz__subtitle';
hint.className = 'quiz__hint';
hint.append(hintSubTitle);
hint.append(hintsList[currentSecretWord]);

incorrectGuesses.className = 'quiz__incorrect-guesses incorrect-guesses';
incorrectGuesses.textContent = 'Incorrect guesses: ';
incorrectGuessesCounter.className = 'incorrect-guesses__counter';
incorrectGuessesCounter.textContent = `${incorrectGuesessCount} / 6`;
incorrectGuesses.append(incorrectGuessesCounter);
quizInfo.append(hint);
quizInfo.append(incorrectGuesses);

keyboard.className = 'quiz__keyboard keyboard';
keysList.className = 'keyboard__keys-list keys-list';
keyboard.append(keysList);
quiz.append(keyboard);

for (let i = 0; i < alphabet.length; i += 1) {
  const key = document.createElement('li');
  key.className = 'keys-list__item key';
  key.textContent = alphabet[i];
  key.addEventListener('', () => {});

  keysList.append(key);
}

function restartGame() {}

let listIndLetter = new Set();
document.addEventListener('keydown', event => {
  const keyValue = event.code[event.code.length - 1];
  // let listIndLetter = [];
  if (
    currentSecretWord.includes(keyValue) &&
    keyValue !== keyValue.toLowerCase() &&
    incorrectGuesessCount < 6
  ) {
    let pos = 0;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const foundPos = currentSecretWord.indexOf(keyValue, pos);
      if (foundPos === -1) break;
      listIndLetter.add(foundPos);
      pos = foundPos + 1;
    }

    // TODO: wrap of function
    for (let currInd of listIndLetter) {
      document
        .querySelector(`.hidden-letters__item:nth-child(${currInd + 1})`)
        .classList.add('hidden-letters__item--visible');

      document
        .querySelector(`.underline-list__item:nth-child(${currInd + 1})`)
        .classList.add('underline-list__item--hidden');
    }
    if (listIndLetter.size === currentSecretWord.length) {
      showModal('You win!', currentSecretWord);
    }
  } else if (
    !currentSecretWord.includes(keyValue) &&
    keyValue !== keyValue.toLowerCase() &&
    incorrectGuesessCount < 6
  ) {
    document
      .querySelector(`.man-part:nth-child(${incorrectGuesessCount + 1})`)
      .classList.add('gallows__man-part--visible');
    incorrectGuesessCount += 1;
    incorrectGuessesCounter.textContent = `${incorrectGuesessCount} / 6`;
    if (incorrectGuesessCount === 6) {
      showModal('Yow lose!', currentSecretWord);
    }
    console.log('Нет такой буквы!');
  }
});

console.log('Secret word:', currentSecretWord);
