renderCompras = (compras) => {
    const comprasContainer = document.getElementById('compras-container');
    compras.forEach(compra => {
        const compraElement = document.createElement('div');
        compraElement.className = 'compra';
        compraElement.innerHTML = `
            <div class="compra-header">
                <h2>Compra em ${new Date(compra.data).toLocaleDateString()}</h2>
                <p class="preco-total">Total: R$${compra.valor}</p>
            </div>
            <p>${compra.qtdItens > 1 ? "Itens" : "Item"}: ${compra.qtdItens}</p>
        `;
        compra.itensDaCompra.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'item';
            itemElement.innerHTML = `
                <img src="${item.produto.foto}" alt="${item.produto.nome}">
                <div class="item-info">
                    <p><strong>${item.produto.nome}</strong></p>
                    <p>${item.produto.descricao}</p>
                    <p>Quantidade: ${item.quantidade}</p>
                    <p>Preço: R$${item.produto.preco}</p>
                </div>
            `;
            compraElement.appendChild(itemElement);
        });
        comprasContainer.appendChild(compraElement);
    });
};

document.addEventListener('DOMContentLoaded', ()=>{
    fetch("http://localhost:8000/compras/", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + localStorage.getItem('token'),
        }
    })
    .then(response => {
        if(response.status === 401){
            window.location.href = 'login.html';
        } else if (!response.ok){
            throw new Error("Erro na requisição ao backend");
        }
        return response.json();
    })
    .then(data => {
        renderCompras(data);
    }); 
});
