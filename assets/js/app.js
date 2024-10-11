// Inicializar a SPA com a página inicial
window.addEventListener('load', () => {
    loadComponents();    
    loadPage('home');    
});

function loadPage(page) {
    loadHTMLContent(page);
    loadCSS(page);
}

// Carrega o conteúdo HTML da página solicitada
function loadHTMLContent(page) {
    fetch(`pages/${page}.html`)
        .then(response => response.text())
        .then(html => {
            document.getElementById('content').innerHTML = html;
            initializeComponents();
        })
        .catch(error => console.error('Error loading page:', error));
}

// Carrega o CSS específico da página
function loadCSS(page) {
    const cssLink = document.getElementById('page-css');
    cssLink.href = `/assets/css/${page}.css`;
}

// Inicializa os componentes após o conteúdo da página ser carregado
function initializeComponents() {
    if (document.querySelector('.drawing-container')) {
        loadDrawingImages('drawing-container');
    }
    loadFlickity();
    initializeProfileNavigation();
}


// function loadPage(page) {
//     fetch(`pages/${page}.html`)
//         .then(response => response.text())
//         .then(html => {
//             document.getElementById('content').innerHTML = html;

//             // Após o conteúdo ser carregado, inicialize os componentes necessários
//             if (document.querySelector('.drawing-container')) {
//                 loadDrawingImages('drawing-container');
//             }
//             loadFlickity();

//             // Se houver membros no perfil, inicializa a navegação entre eles
//             const members = document.querySelectorAll('#profiles .profile');
//             if (members.length > 0) {
//                 initProfileNavigation(members);
//             }
//         });

//     // Carregar o CSS específico da página
//     const cssLink = document.getElementById('page-css');
//     cssLink.href = `/assets/css/${page}.css`;
// }

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


// Função para trocar a página ao clicar nos links da navbar
function navigate(page, element) {
    loadPage(page);
    updateActiveLink(element);
}

// Atualiza o link ativo na navbar
function updateActiveLink(element) {
    const links = document.querySelectorAll('.navbar-nav .nav-link');
    links.forEach(link => link.classList.remove('active'));
    element.classList.add('active');
}

// // função para trocar de página (chamada ao clicar nos links da navbar)
// function navigate(page, element) {
//     loadPage(page);
        
//     const links = document.querySelectorAll('.navbar-nav .nav-link');
//     links.forEach(link => {
//         link.classList.remove('active');
//     });
    
//     element.classList.add('active');
// }