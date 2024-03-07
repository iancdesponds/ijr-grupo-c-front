document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector("header");

    window.addEventListener("scroll", () => {
        header.classList.toggle("sticky", window.scrollY > 0);
    });
});


redirectCarrinho = ()=>{
    window.location.href = 'carrinho.html';
}