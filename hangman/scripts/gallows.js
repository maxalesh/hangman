const page = document.querySelector('.page');
const main = document.createElement('main');
const gallowsInner = document.createElement('div');
const gallows = document.createElement('div');
const rectangle1 = document.createElement('span');
const rectangle2 = document.createElement('span');
const rectangle3 = document.createElement('span');
const rectangle4 = document.createElement('span');
const rectangle5 = document.createElement('span');
const gallowsItems = [rectangle1, rectangle2, rectangle3, rectangle4, rectangle5];
const gallowsTitle = document.createElement('h1');
const quiz = document.createElement('div');

main.className = 'main';

gallowsItems.forEach(item => {
  // eslint-disable-next-line no-param-reassign
  item.className = 'gallows__item';
  gallowsInner.append(item);
});

gallows.className = 'gallows';
page.append(gallows);

gallowsInner.className = 'gallows__inner';
gallowsTitle.className = 'title gallows__title';
gallowsTitle.textContent = 'HANGMAN GAME';
gallows.append(gallowsInner);
gallows.append(gallowsTitle);

quiz.className = 'quiz';
page.append(quiz);

main.append(gallows);
main.append(quiz);
