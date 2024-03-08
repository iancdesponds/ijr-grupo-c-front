document.addEventListener("DOMContentLoaded", () => {
    var produtosContainer = document.getElementsByClassName("count")[0];
    var produtosContainer1 = document.getElementsByClassName("count1")[0];
    console.log(produtosContainer);
    fetch("http://localhost:8000/carrinho/", {
        method: 'GET',
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
    })
    .then(data => {
        produtosContainer.textContent = data.qtdItens;
        produtosContainer1.textContent = data.qtdItens;
    });
});