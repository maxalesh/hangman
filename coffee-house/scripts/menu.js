let currentUrl = window.location.href;
const coffeeMenuLink = document.querySelector('.coffee-menu__link');

function showUnderline() {
    let currentUrl = window.location.href;
    if (currentUrl.split('/').at(-1) === 'menu.html') {
        coffeeMenuLink.classList.toggle('coffee-menu__link_current');
    }
};

showUnderline()
