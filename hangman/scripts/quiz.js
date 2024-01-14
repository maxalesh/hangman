const page = document.querySelector('.page');
const main = document.querySelector('.main');
const quiz = document.querySelector('.quiz');
const hiddenLetters = document.createElement('ul');
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

hiddenLetters.className = 'quiz__hidden-letters hidden-letters';
for (let i = 0; i < 7; i += 1) {
  const item = document.createElement('li');
  item.className = 'hidden-letters__item';
  hiddenLetters.append(item);
}
quiz.append(hiddenLetters);
quizInfo.className = 'quiz__info';
quiz.append(quizInfo);

hintSubTitle.textContent = 'Hint: ';
hintSubTitle.className = 'quiz__subtitle';
hint.className = 'quiz__hint';
hint.append(hintSubTitle);
const currentSecretWord = getRandomSecretWord();
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
  key.addEventListener('click', () => {});

  keysList.append(key);
}
