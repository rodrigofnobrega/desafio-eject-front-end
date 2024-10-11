function loadPage(page) {
    fetch(`pages/${page}.html`)
        .then(response => response.text())
        .then(html => {
            document.getElementById('content').innerHTML = html;

            // Após o conteúdo ser carregado, inicialize os componentes necessários
            if (document.querySelector('.drawing-container')) {
                loadDrawingImages('drawing-container');
            }
            loadFlickity();

            // Se houver membros no perfil, inicializa a navegação entre eles
            const members = document.querySelectorAll('#profiles .profile');
            if (members.length > 0) {
                initProfileNavigation(members);
            }
        });

    // Carregar o CSS específico da página
    const cssLink = document.getElementById('page-css');
    cssLink.href = `/assets/css/${page}.css`;
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

// drawingComponent.js
function loadDrawingImages(containerId) {
    // Define the image data
    const images = [
        { id: "star-y", src: "/assets/imgs/videos/star-y.png", style: { left: '250px', top: '265px', width: '92px' } },
        { id: "ellipse-p", src: "/assets/imgs/videos/ellipse-p.png", style: { left: '100px', top: '55%', width: '28px' } },
        { id: "plus-p", src: "/assets/imgs/videos/plus-p.png", style: { left: '60px', width: '50px', top: '180px' } },
        { id: "star-p", src: "/assets/imgs/videos/star-p.png", style: { right: '60px', top: '320px', width: '92px' } },
        { id: "plus-y", src: "/assets/imgs/videos/plus-y.png", style: { bottom: '200px', right: '365px', width: '50px' } },
        { id: "ellipse-pp", src: "/assets/imgs/videos/ellipse-pp.png", style: { right: '17%', top: '200px', width: '28px' } }
    ];

    // Get the container element
    const container = document.querySelector(`.${containerId}`); // Use querySelector para selecionar a classe
    if (!container) {
        console.error(`Container with class ${containerId} not found.`);
        return;
    }

    // Create and append images
    images.forEach(imgData => {
        const img = document.createElement('img');
        img.className = 'drawing';
        img.id = imgData.id;
        img.src = imgData.src;
                
        Object.assign(img.style, imgData.style);
    
        container.appendChild(img);
    });
}

// Inicializar a SPA com a página inicial
window.addEventListener('load', () => {
    loadComponents();
    loadPage('parents');    
});

// função para trocar de página (chamada ao clicar nos links da navbar)
function navigate(page, element) {
    // Chama a função para carregar a página
    loadPage(page);
        
    const links = document.querySelectorAll('.navbar-nav .nav-link');
    links.forEach(link => {
        link.classList.remove('active');
    });
    
    element.classList.add('active');
}

function initProfileNavigation(members) {
    let currentIndex = 0;

    function showMember(index) {
        members.forEach(member => member.classList.remove('active'));
        members[index].classList.add('active');
    }

    // Mostra o primeiro membro
    showMember(currentIndex);

    // Chevrons (setas)
    const chevronLeft = document.getElementById('chevron-left');
    const chevronRight = document.getElementById('chevron-right');

    if (chevronLeft && chevronRight) {
        // Evento de clique para o chevron direito
        chevronRight.addEventListener('click', function () {
            currentIndex = (currentIndex + 1) % members.length;
            showMember(currentIndex);
        });

        // Evento de clique para o chevron esquerdo
        chevronLeft.addEventListener('click', function () {
            currentIndex = (currentIndex - 1 + members.length) % members.length;
            showMember(currentIndex);
        });
    } else {
        console.warn('Chevron elements not found.');
    }
}
