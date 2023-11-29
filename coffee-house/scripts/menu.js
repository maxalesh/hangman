const coffeeMenuLink = document.querySelector('.coffee-menu__link');
const tabCoffeeBtn = document.querySelector('.tab-coffee');
const tabTeaBtn = document.querySelector('.tab-tea');
const tabDessertBtn = document.querySelector('.tab-dessert');
let tabInd = 0;
const tabsBtn = [tabCoffeeBtn, tabTeaBtn, tabDessertBtn];
const cupsCards = Array.from(document.querySelector('.menu__container').children);

tabCoffeeBtn.addEventListener('click', () => switchTabs(0));
tabTeaBtn.addEventListener('click', () => switchTabs(1));
tabDessertBtn.addEventListener('click', () => switchTabs(2));

function showUnderline() {
    let currentUrl = window.location.href;
    if (currentUrl.split('/').at(-1) === 'menu.html') {
        coffeeMenuLink.classList.toggle('coffee-menu__link_current');
    }
};

function switchTabs(cupInd = 0) {
    tabInd = cupInd;
    cupsCards.forEach((item, ind) => {
        if (ind === tabInd) {
            item.style.display = 'flex';
            tabsBtn[ind].classList.add('active');
        } else {
            item.style.display = 'none';
            tabsBtn[ind].classList.remove('active');
        }
    })
}

showUnderline()
switchTabs()
