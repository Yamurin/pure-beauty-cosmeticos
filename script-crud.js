const btnComprarProduto = document.querySelectorAll('.product__button-buy')
const ulProdutosCarrinho = document.querySelector('.header__shopping-list')
const btnCarrinhoCompras = document.querySelector('.button-cart')
const listaProdutosCarrinho = []

function adicionarProdutoCarrinho (produto) {
    listaProdutosCarrinho.push(produto)
    const li = document.createElement('li')
    li.classList.add('header__shopping-list-item')

    const div = document.createElement('div')
    div.classList.add('header__shoping-list-item-description-wrapper')

    const img = document.createElement('img')
    img.classList.add('shopping-list-item-image')
    img.setAttribute('src', `${produto.imagem.src}`)

    const pNomeProduto = document.createElement('p')
    pNomeProduto.classList.add('shopping-list-item-title')
    pNomeProduto.textContent = produto.nome.textContent

    const pValorProduto  = document.createElement('p')
    pValorProduto.classList.add('shopping-list-item-price')
    pValorProduto.textContent = produto.valor.textContent

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
            imagem: infoProduto.querySelector('.product__image'),
            nome: infoProduto.querySelector('.product__title'),
            valor: infoProduto.querySelector('.product__price'),
        }
        adicionarProdutoCarrinho(produto)
        alert('Produto adicionado ao carrinho!')
    })
})


btnCarrinhoCompras.addEventListener('click', () => {
    ulProdutosCarrinho.classList.toggle('open')
    if (listaProdutosCarrinho.length == 0) {
        ulProdutosCarrinho.textContent = 'O carrinho está vazio'
    }
})

