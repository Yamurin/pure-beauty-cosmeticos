// Lógica dos botões de navegação

const html = document.querySelector('html');
const navMenu = document.querySelector('.nav-list');
const navMenuButton = document.querySelectorAll('.button-menu i');
const searchBar = document.querySelector('.search-bar');
const searchBarButton = document.querySelector('.button-search i');

navMenuButton.forEach((button) => {
    button.onclick = function () {
        navMenu.classList.toggle('open');
    }
})

searchBarButton.onclick = function () {
    searchBarButton.classList.toggle('fa-x');
    searchBar.classList.toggle('open');
}
