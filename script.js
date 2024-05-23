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

/* Produtos em destaque */
const linhaProdutosButtons = document.querySelectorAll('.linha-list__button');
const lilyButton = document.querySelector('#lily');
const makebButton = document.querySelector('#make-b');
const miniButton = document.querySelector('#mini');


lilyButton.addEventListener('click', () => {
    alterarListaDeProdutos();
    lilyButton.classList.add('active');
})

makebButton.addEventListener('click', () => {
    alterarListaDeProdutos();
    makebButton.classList.add('active');
})

miniButton.addEventListener('click', () => {
    alterarListaDeProdutos();
    miniButton.classList.add('active');
})

function alterarListaDeProdutos () {
    linhaProdutosButtons.forEach((linhaButton) => {
        linhaButton.classList.remove('active');
    })
}

