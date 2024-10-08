// Função para carregar o conteúdo HTML e o CSS específico
function loadPage(page) {
    // Carregar conteúdo HTML
    fetch(`pages/${page}.html`)
        .then(response => response.text())
        .then(html => {
            document.getElementById('content').innerHTML = html;
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

// Inicializar a SPA com a página inicial
window.addEventListener('load', () => {
    loadComponents();
    loadPage('home');
});

// função para trocar de página (chamada ao clicar nos links da navbar)
function navigate(page) {
    loadPage(page);
}
