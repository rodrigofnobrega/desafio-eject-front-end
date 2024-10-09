// Função para carregar o conteúdo HTML e o CSS específico
function loadPage(page) {
    // Carregar conteúdo HTML
    fetch(`pages/${page}.html`)
        .then(response => response.text())
        .then(html => {
            document.getElementById('content').innerHTML = html;

            loadFlickity();
        });

    // Carregar o CSS específico da página
    const cssLink = document.getElementById('page-css');
    cssLink.href = `/assets/css/${page}.css`; // Atualiza o link do CSS de acordo com a página
}

// Função para carregar o navbar e o footer
function loadComponents() {
    fetch('/assets/components/navbar.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('navbar').innerHTML = html;
        });

    fetch('/assets/components/footer.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('footer').innerHTML = html;
        });
}

function loadFlickity() {
    // Carregar o CSS do Flickity
    const flickityCSS = document.createElement('link');
    flickityCSS.rel = 'stylesheet';
    flickityCSS.href = 'https://cdnjs.cloudflare.com/ajax/libs/flickity/2.3.0/flickity.min.css';
    document.head.appendChild(flickityCSS);

    // Carregar o JS do Flickity
    const flickityJS = document.createElement('script');
    flickityJS.src = 'https://cdnjs.cloudflare.com/ajax/libs/flickity/2.3.0/flickity.pkgd.min.js';
    flickityJS.onload = function() {
        // Selecionar todos os carrosséis na página
        const carousels = document.querySelectorAll('.carousel');
        
        // Aplicar o Flickity em cada carrossel
        carousels.forEach(function(carousel) {
            new Flickity(carousel, {
                cellAlign: 'left',
                contain: true,
                wrapAround: true,
                autoPlay: 3000,
                pauseAutoPlayOnHover: false,
                pageDots: false,
                prevNextButtons: false
            });
        });
    };
    document.body.appendChild(flickityJS);
}

// Inicializar a SPA com a página inicial
window.addEventListener('load', () => {
    loadComponents();
    loadPage('home');
});

// função para trocar de página (chamada ao clicar nos links da navbar)
function navigate(page) {
    loadPage(page);
}
