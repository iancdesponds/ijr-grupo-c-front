// Smooth scrolling
document.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll("#navbar-items a");

    links.forEach(link => {
        link.addEventListener("click", scrollToSection);
    });

    function scrollToSection(e) {
        e.preventDefault();
        const targetId = e.target.getAttribute("href").substring(1);
        const targetSection = document.getElementById(targetId);
        const offsetTop = targetSection.offsetTop;
        window.scrollTo({
            top: offsetTop,
            behavior: "smooth"
        });
    }
});

// Smooth scrolling
document.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll(".menu-menu li a");

    links.forEach(link => {
        link.addEventListener("click", scrollToSection);
    });

    function scrollToSection(e) {
        e.preventDefault();
        const targetId = e.target.getAttribute("href").substring(1);
        const targetSection = document.getElementById(targetId);
        const offsetTop = targetSection.offsetTop;
        window.scrollTo({
            top: offsetTop,
            behavior: "smooth"
        });
    }
});

// Sticky menu background
window.addEventListener("scroll", function () {
    if (window.scrollY > 150) {
        document.querySelector("#navbar").style.opacity = 0.9;
    } else {
        document.querySelector("#navbar").style.opacity = 1;
    }
});

// Tamanho da section about responsivo
document.addEventListener("DOMContentLoaded", function() {
    // Função para atualizar a altura da seção about2
    function updateAbout2Height() {
        const overlapSectionContentHeight = document.querySelector('.overlap-section').scrollHeight;
        document.getElementById('about').style.height = overlapSectionContentHeight*1.3 + 'px';
    }

    // Atualize a altura quando a página carregar e quando houver uma mudança no tamanho do conteúdo
    updateAbout2Height();
    window.addEventListener('resize', updateAbout2Height);
    window.addEventListener('load', updateAbout2Height);
});

// Menu mobile
const $menu = document.getElementById('menu');
const $menuTrigger = document.getElementById('menu-trigger');
let state = $menu.dataset.aberto;

$menuTrigger.addEventListener('click', () => {
  if(state == "false") {
    state = "true";
  } else {
    state = "false";
  }
  
  $menu.dataset.aberto = state;
})