const btnComprarProduto = document.querySelectorAll('.product__button-buy')
const ulProdutosCarrinho = document.querySelector('.header__shopping-list')
const btnCarrinhoCompras = document.querySelector('.button-cart')

const listaProdutosCarrinho = JSON.parse(localStorage.getItem('produtos')) || []

function atualizarCarrinho() {
    localStorage.setItem('produtos', JSON.stringify(listaProdutosCarrinho))
}

function criarElementoNoCarrinho (produto) {
    const li = document.createElement('li')
    li.classList.add('header__shopping-list-item')

    const div = document.createElement('div')
    div.classList.add('header__shoping-list-item-description-wrapper')

    const img = document.createElement('img')
    img.classList.add('shopping-list-item-image')
    img.src = produto.imagem

    const pNomeProduto = document.createElement('p')
    pNomeProduto.classList.add('shopping-list-item-title')
    pNomeProduto.textContent = produto.nome

    const pValorProduto  = document.createElement('p')
    pValorProduto.classList.add('shopping-list-item-price')
    pValorProduto.textContent = produto.valor

    ulProdutosCarrinho.append(li)
    li.append(img)
    li.append(div)
    div.append(pNomeProduto)
    div.append(pValorProduto)
}

btnComprarProduto.forEach((botao) => {
    botao.addEventListener('click', () => {
        botao.classList.add('active')
        const infoProduto = botao.parentElement

        const produto = {
            imagem: infoProduto.querySelector('.product__image').getAttribute('src'),
            nome: infoProduto.querySelector('.product__title').textContent,
            valor: infoProduto.querySelector('.product__price').textContent,
        }
        criarElementoNoCarrinho(produto)
        listaProdutosCarrinho.push(produto)
        atualizarCarrinho()
        alert('Produto adicionado ao carrinho!')
    })
})

listaProdutosCarrinho.forEach((produto) => {
    const elementoProduto = criarElementoNoCarrinho(produto)
})

btnCarrinhoCompras.addEventListener('click', () => {
    const quantidadeProdutosCarrinho = listaProdutosCarrinho.length || 'Não há'
    const carrinhoTexto = document.querySelector('.header__shopping-list-text') 

    if (quantidadeProdutosCarrinho.length != 0) {
        carrinhoTexto.textContent = `${quantidadeProdutosCarrinho} itens no carrinho`
    }

    ulProdutosCarrinho.classList.toggle('open')
})

