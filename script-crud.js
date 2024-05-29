const btnComprarProduto = document.querySelectorAll('.product__button-buy')
const ulCarrinhoCompras = document.querySelector('.header__shopping-list')
const btnCarrinhoCompras = document.querySelector('.button-cart')

let listaProdutosCarrinho = JSON.parse(localStorage.getItem('produtos')) || []

function atualizarCarrinho() {
    localStorage.setItem('produtos', JSON.stringify(listaProdutosCarrinho))
}

function mostrarCarrinhoCompras(acao) {
    switch(acao) {
        case 'mostrar':
            ulCarrinhoCompras.classList.add('open')
            break
            case 'ocultar':
                ulCarrinhoCompras.classList.remove('open')
                break
    }
}

function adicionarQuantidadeProduto(produto) {
    for(let i = 0; i < listaProdutosCarrinho.length; i++) {
        if(listaProdutosCarrinho[i].nome == produto.nome) {
            listaProdutosCarrinho[i].quantidade++
            produto.quantidade = listaProdutosCarrinho[i].quantidade

            document.querySelector('.shopping-list-item-quantidade').textContent = `Quantidade: ${produto.quantidade}`
            return true
        } 
    }
    return false
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

    const pQuantidadeProduto = document.createElement('p')
    pQuantidadeProduto.classList.add('shopping-list-item-quantidade')
    pQuantidadeProduto.textContent = `Quantidade: ${produto.quantidade}`

    ulCarrinhoCompras.append(li)
    li.append(img)
    li.append(div)
    div.append(pNomeProduto)
    div.append(pValorProduto)
    div.append(pQuantidadeProduto)
}

btnComprarProduto.forEach((botao) => {
    botao.addEventListener('click', () => {
        botao.classList.add('active')
        const infoProduto = botao.parentElement

        const produto = {
            imagem: infoProduto.querySelector('.product__image').getAttribute('src'),
            nome: infoProduto.querySelector('.product__title').textContent,
            valor: infoProduto.querySelector('.product__price').textContent,
            quantidade: 1
        }

        alert('Produto adicionado ao carrinho!')
        
        if (adicionarQuantidadeProduto(produto)) {
            debugger
            atualizarCarrinho()
            return
        } 
        
        listaProdutosCarrinho.push(produto)
        criarElementoNoCarrinho(produto)
        atualizarCarrinho()
    })
})

listaProdutosCarrinho.forEach((produto) => {
    const elementoProduto = criarElementoNoCarrinho(produto)
})

btnCarrinhoCompras.addEventListener('mouseover', () => {
    const quantidadeProdutosCarrinho = listaProdutosCarrinho.length || 'Não há'
    const carrinhoTexto = document.querySelector('.header__shopping-list-text') 

    if (quantidadeProdutosCarrinho.length != 0) {
        carrinhoTexto.textContent = `${quantidadeProdutosCarrinho} itens no carrinho`
    }

    atualizarCarrinho()
    mostrarCarrinhoCompras('mostrar')
})

// TODO: SE viewport menor do que X, abrir carrinho em uma aba diferente

ulCarrinhoCompras.addEventListener('mouseover', () => { mostrarCarrinhoCompras('mostrar') })
ulCarrinhoCompras.addEventListener('mouseout', () => { mostrarCarrinhoCompras('ocultar') })

