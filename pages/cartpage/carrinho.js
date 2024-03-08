function updateQuantity(index, amount) {
    fetch("http://localhost:8000/produtos/"+index+"/carrinho/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token '+localStorage.getItem('token'),
        },
        body: JSON.stringify({quantidade: amount})
    })
    .then(async response => {
        if(response.status != 200){
            const errorData = await response.json();
            throw new Error(errorData.error);
        } else {
            return response.json();
        }
    })
    .then(data => {
        if (data.error) {
            console.error('Erro do backend:', data.error);
        } else {
            renderCart(data);
        }
    })
    .catch(error => {
        showPopUp(error);
    });
}

function removeItem(index) {
    fetch("http://localhost:8000/produtos/"+index+"/carrinho/", {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token '+localStorage.getItem('token')
        }
    }).then(async response => {
        if(response.status != 200){
            const errorData = await response.json();
            throw new Error(errorData.error);
        } else {
            return response.json();
        }
    })
    .then(data => {
        if (data.error) {
            console.error('Erro do backend:', data.error);
        } else {
            renderCart(data);
        }
    })
    .catch(error => {
        console.error('Erro na solicitação ao backend:', error.message);
    });
    
}

function updateCart(CartItem){
    document.getElementById('total').textContent = CartItem.total;
    document.getElementById('item-count').textContent = CartItem.qtdItens;
}

function renderCart(cartData) {
    const cartList = document.getElementById('cart-list');
    const checkoutButton = document.getElementById('checkout-button');
    if (cartData.itensDoCarrinho.length === 0) {
        checkoutButton.disabled = true;
        checkoutButton.style.backgroundColor = 'grey';
    }

    cartList.innerHTML = '';
    cartData.itensDoCarrinho.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.classList.add('cart-item');
        produto = item.produto;
        listItem.innerHTML = `
            <div class="item-info">
                <img class="item-image" src="${produto.foto}" alt="${produto.nome}">
                <div>
                    <h3>${produto.nome}</h3>
                    <p>${produto.descricao}</p>
                    <p>Cada: R$ ${produto.preco}</p>
                </div>
            </div>
            <div class="item-controls">
                <button class="btn-minus" onclick="updateQuantity(${produto.id}, -1)">-</button>
                <span>${item.quantidade}</span>
                <button class="btn-plus" onclick="updateQuantity(${produto.id}, 1)">+</button>
                <button class="btn-remove" onclick="removeItem(${produto.id})">x</button>
                <span class="error-message"></span>
            </div>
            <div class="item-total">Total: R$ ${(produto.preco * item.quantidade).toFixed(2)}</div>
        `;
        cartList.appendChild(listItem);
    });
    updateCart(cartData);
}

function processarCompra() {
    const loadingIcon = document.getElementById("loading");
    loadingIcon.style.display = "inline-block";
    setTimeout(function() {
        loadingIcon.style.display = "none";
    }, 2000);
}

document.addEventListener('DOMContentLoaded', ()=>{
    fetch("http://localhost:8000/carrinho/", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + localStorage.getItem('token'),
        }
    })
    .then(response => {
        if(response.status === 401){
            window.location.href = 'login.html';
        } else if (!response.ok) {
            throw new Error("Erro na requisição ao backend");
        }
        return response.json();
    })
    .then(data => {
        renderCart(data);
        updateCart(data);
    });
});

function showSpinner() {
    var spinner = document.getElementById('spinner');
    document.getElementById('checkout-button').hidden = true;
    spinner.hidden = false;

    fetch("http://localhost:8000/checkout/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + localStorage.getItem('token'),
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Erro na requisição ao backend");
        }
        return response.json();
    });

    setTimeout(()=>{
        spinner.hidden = true;
        document.getElementById('cart-summary').hidden = true;
        document.getElementById('cart-list').innerHTML = `
        <div class="pagamento-aprovado">
            <h2>Pagamento Aprovado!</h2>
            <p>O seu pagamento foi processado com sucesso!</p>
            <div class="botoes">
                <button onclick="redirectHome()">Voltar para a Página Inicial</button>
                <button onclick="redirectMinhasCompras()">Minhas Compras</button>
            </div>
        </div>
        `;
        }, 2000); 
    }

redirectHome = ()=>{
    window.location.href = 'loja.html';    
}

redirectMinhasCompras = ()=>{
    window.location.href = 'minhas-compras.html';
}