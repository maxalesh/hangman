import { restartGame } from './quiz.js';

export { showModal };
const page = document.querySelector('.page');
const modal = document.createElement('div');
const overlay = document.createElement('div');
overlay.className = 'overlay';
modal.className = 'page__modal modal';
page.append(modal);
page.append(overlay);

function showModal(message, secretWord) {
  const resultGame = document.createElement('h2');
  resultGame.className = 'modal__title';
  resultGame.textContent = message;
  const currHiddenWord = document.createElement('h3');
  currHiddenWord.className = 'modal__secret-word';
  currHiddenWord.textContent = `Secret word: ${secretWord}`;
  const playAgainBtn = document.createElement('button');
  playAgainBtn.className = 'modal__btn';
  playAgainBtn.textContent = 'play again';
  playAgainBtn.addEventListener('click', () => {
    modal.classList.remove('modal--show');
    overlay.classList.remove('overlay--visible');
    restartGame();
  });

  modal.append(resultGame);
  modal.append(currHiddenWord);
  modal.append(playAgainBtn);

  modal.classList.add('modal--show');
  overlay.classList.add('overlay--visible');
}
