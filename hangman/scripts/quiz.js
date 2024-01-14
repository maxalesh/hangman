const page = document.querySelector('.page');
const main = document.querySelector('.main');
const quiz = document.querySelector('.quiz');
const hiddenLetters = document.createElement('ul');
const hint = document.createElement('p');
const hintSubTitle = document.createElement('span');
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

hintSubTitle.textContent = 'Hint: ';
hintSubTitle.className = 'quiz__subtitle';
hint.className = 'quiz__hint';
hint.append(hintSubTitle);
const currentSecretWord = getRandomSecretWord();
hint.append(hintsList[currentSecretWord]);
quiz.append(hint);
