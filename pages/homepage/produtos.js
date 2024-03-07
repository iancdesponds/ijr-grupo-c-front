document.addEventListener("DOMContentLoaded", ()=>{

    function showPopup() {
        const popup = document.getElementById('popup');
        if (popup) {
            popup.style.display = 'block';
            setTimeout(() => {
                popup.style.display = 'none';
            }, 2000);
        } else {
            console.error('Elemento popup não encontrado no DOM.');
        }
    }


    fetch("http://localhost:8000/produtos/")
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro na requisição ao backend");
            }
            return response.json();
        })
        .then(produtos => {
            var produtosContainer = document.getElementsByClassName("produto")[0];
            var produtosCount = document.getElementsByClassName("count")[0];

            produtos.forEach(produto => {
                var produtoDiv = document.createElement("div");
                produtoDiv.className = "produto";

                var boxDiv = document.createElement("div");
                boxDiv.className = "box";

                var imgElement = document.createElement("img");
                imgElement.src = produto.foto;
                imgElement.classList.add("img-container");

                var h5Element = document.createElement("h5");
                h5Element.textContent = produto.nome; 

                var h6Element = document.createElement("h6");
                h6Element.textContent = "R$" + produto.preco;

                var comprarDiv = document.createElement("div");
                comprarDiv.className = "comprar";

                var buttonElement = document.createElement("button");
                buttonElement.type = "button";
                buttonElement.textContent = produto.estoque > 0 ? "Comprar" : "Indisponível";
                buttonElement.disabled = produto.estoque <= 0;
                buttonElement.style.backgroundColor = produto.estoque <= 0 ? "grey" : "green";
                buttonElement.onclick = () => {
                    fetch("http://localhost:8000/produtos/"+produto.id+"/carrinho/", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Token ' + localStorage.getItem('token'),
                    },
                    body: JSON.stringify({quantidade: 1})
                    
                })
                .then(response => {
                    if (response.status === 401) {
                        window.location.href = 'login.html';
                    } else {
                        showPopup();
                        return response.json();
                    }
                })
                .then(data => {
                    produtosCount.textContent = data.qtdItens;
                    console.log('Resposta do backend:', data);
                })
                .catch(error => {
                    console.error('Erro na requisição:', error);
                });
            }

            comprarDiv.appendChild(buttonElement);
            boxDiv.appendChild(imgElement);
            boxDiv.appendChild(h5Element);
            boxDiv.appendChild(h6Element);
            boxDiv.appendChild(comprarDiv);
            produtoDiv.appendChild(boxDiv);

            produtosContainer.appendChild(produtoDiv);
            });
        })
        .catch(error => {
            console.error(error.message);
        });
});