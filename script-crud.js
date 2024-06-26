const btnComprarProduto = document.querySelectorAll('.product__button-buy')
const ulCarrinhoCompras = document.querySelector('.header__shopping-list')
const carrinhoTexto = document.querySelector('.header__shopping-list-text') 
const btnCarrinhoCompras = document.querySelector('.button-cart')
const iconQuantidadeItensCarrinho = document.querySelector('#quantity-icon') 
const btnFinalizarCompra = document.querySelector('.shopping-list-button')
const btnLimparCarrinho = document.querySelector('.shopping-list-button__clear')
let textoValorTotalCarrinho = document.querySelector('.shopping-list-button__total-value')

let valorTotalCarrinho = JSON.parse(localStorage.getItem('valorTotalDaCompra')) || 0
let quantidadeProdutosCarrinho = JSON.parse(localStorage.getItem('quantidadeProdutos')) || 0
let listaProdutosCarrinho = JSON.parse(localStorage.getItem('produtos')) || []

function atualizarCarrinho() {
    atualizarQuantidadeIcon() 
    localStorage.setItem('produtos', JSON.stringify(listaProdutosCarrinho))
    localStorage.setItem('quantidadeProdutos', JSON.stringify(quantidadeProdutosCarrinho))
	localStorage.setItem('valorTotalDaCompra', JSON.stringify(valorTotalCarrinho))
	
	textoValorTotalCarrinho.textContent = valorTotalCarrinho.toFixed(2)
}

atualizarCarrinho()

function mostrarCarrinhoCompras(acao) {
    switch(acao) {
        case 'mostrar':
            ulCarrinhoCompras.classList.add('open')
			
			if (quantidadeProdutosCarrinho != 0) {
				carrinhoTexto.textContent = `${quantidadeProdutosCarrinho} itens no carrinho`
				btnFinalizarCompra.classList.remove('hidden')
				btnLimparCarrinho.classList.remove('hidden')
			} else {
				carrinhoTexto.textContent = 'O carrinho está vazio'
				btnFinalizarCompra.classList.add('hidden')
				btnLimparCarrinho.classList.add('hidden')
			}

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
            
            location.reload()
            atualizarQuantidadeIcon()
            return true
        } 
    }
    return false
}

function atualizarQuantidadeIcon() {
    iconQuantidadeItensCarrinho.textContent = quantidadeProdutosCarrinho
}

function criarElementoNoCarrinho (produto) {
    const li = document.createElement('li')
    li.classList.add('header__shopping-list-item')

    const div = document.createElement('div')
    div.classList.add('header__shoping-list-item-description-wrapper')

    const img = document.createElement('img')
    img.classList.add('shopping-list-item-image')
    img.src = produto.imagem

    const aNomeProduto = document.createElement('a')
    aNomeProduto.classList.add('shopping-list-item-title')
    aNomeProduto.textContent = produto.nome
    aNomeProduto.setAttribute('href', '#')

    const pValorProduto  = document.createElement('p')
    pValorProduto.classList.add('shopping-list-item-price')
	pValorProduto.classList.add('price')
    pValorProduto.textContent = produto.valor

    const pQuantidadeProduto = document.createElement('p')
    pQuantidadeProduto.classList.add('shopping-list-item-quantidade')
    pQuantidadeProduto.textContent = `Quantidade: ${produto.quantidade}`
	
	const wrapper = document.querySelector('.shopping-list__wrapper')
    wrapper.append(li)
    li.append(img)
    li.append(div)
    div.append(aNomeProduto)
    div.append(pValorProduto)
    div.append(pQuantidadeProduto)
}

function calcularValorFinal(produto, evento) {
	const valorProduto = parseFloat(produto.valor.replace(/,/, '.'))
	
	if(evento == 'adicionar') {
		valorTotalCarrinho += parseFloat(valorProduto)
	} else if (evento == 'remover') {
		valorTotalCarrinho -= parseFloat(valorProduto)
	}
	
	valorTotalCarrinho = parseFloat(valorTotalCarrinho)
}

btnComprarProduto.forEach((botao) => {
    botao.addEventListener('click', () => { 
        botao.classList.add('active')
        quantidadeProdutosCarrinho++

        const infoProduto = botao.parentElement

        const produto = {
            imagem: infoProduto.querySelector('.product__image').getAttribute('src'),
            nome: infoProduto.querySelector('.product__title').textContent,
            valor: infoProduto.querySelector('.product__price').textContent,
            quantidade: 1
        }
		
		calcularValorFinal(produto, 'adicionar')
        alert('Produto adicionado ao carrinho!')
        
        if (adicionarQuantidadeProduto(produto)) {
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

btnCarrinhoCompras.addEventListener('mouseover' || 'click', () => {
    atualizarCarrinho()
    mostrarCarrinhoCompras('mostrar')
})

btnLimparCarrinho.addEventListener('click', () => {
	console.log('limpando')
	document.querySelectorAll('.header__shopping-list-item').forEach((produto) => {
		produto.remove()
	})
	listaProdutosCarrinho = []
	valorTotalCarrinho = 0
	quantidadeProdutosCarrinho = 0
	atualizarCarrinho()
})


ulCarrinhoCompras.addEventListener('mouseover', () => { mostrarCarrinhoCompras('mostrar') })
ulCarrinhoCompras.addEventListener('mouseout', () => { mostrarCarrinhoCompras('ocultar') })

