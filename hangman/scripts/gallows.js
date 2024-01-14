const page = document.querySelector('.page');
const main = document.createElement('main');
const gallowsInner = document.createElement('div');
const gallows = document.createElement('div');
const gallowsImg = document.createElement('img');
const gallowsTitle = document.createElement('h1');
const quiz = document.createElement('div');
const man = document.createElement('div');

const headMan = document.createElement('img');
headMan.setAttribute('src', 'pictures/head.svg');
const bodyMan = document.createElement('img');
bodyMan.setAttribute('src', 'pictures/body.svg');
const leftHand = document.createElement('img');
leftHand.setAttribute('src', 'pictures/hand-left.svg');
const rightHand = document.createElement('img');
rightHand.setAttribute('src', 'pictures/hand-right.svg');
const leftLeg = document.createElement('img');
leftLeg.setAttribute('src', 'pictures/leg-left.svg');
const rightLeg = document.createElement('img');
rightLeg.setAttribute('src', 'pictures/leg-right.svg');
const manParts = [headMan, bodyMan, leftHand, rightHand, leftLeg, rightLeg];

gallowsInner.append(gallowsImg);
gallowsImg.setAttribute('src', 'pictures/gallows.svg');
gallowsImg.className = 'quiz__hangman-img';
main.className = 'main';
page.prepend(main);
man.className = 'gallows__man man';
gallowsInner.append(man);

manParts.forEach(part => {
  // eslint-disable-next-line no-param-reassign
  part.className = 'gallows__man-part man-part';
  man.append(part);
});

gallows.className = 'gallows';
page.prepend(gallows);

gallowsInner.className = 'gallows__inner';
gallowsTitle.className = 'title gallows__title';
gallowsTitle.textContent = 'HANGMAN GAME';
gallows.append(gallowsInner);
gallows.append(gallowsTitle);

quiz.className = 'quiz';
gallows.after(quiz);

main.append(gallows);
main.append(quiz);
