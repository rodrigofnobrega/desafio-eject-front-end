// Função para carregar o navbar e o footer
function loadComponents() {
    loadComponent('navbar', '/assets/components/navbar.html');
    loadComponent('footer', '/assets/components/footer.html');
}

// Carrega componentes genéricos como o navbar e o footer
function loadComponent(elementId, url) {
    fetch(url)
        .then(response => response.text())
        .then(html => {
            document.getElementById(elementId).innerHTML = html;
        })
        .catch(error => console.error(`Error loading ${elementId}:`, error));
}

// Função para inicializar a navegação entre perfis, se existirem
function initializeProfileNavigation() {
    const members = document.querySelectorAll('#profiles .profile');
    if (members.length > 0) {
        initProfileNavigation(members);
    }
}

// Função para inicializar a navegação de perfis
function initProfileNavigation(members) {
    let currentIndex = 0;

    function showMember(index) {
        members.forEach(member => member.classList.remove('active'));
        members[index].classList.add('active');
    }

    showMember(currentIndex);

    const chevronLeft = document.getElementById('chevron-left');
    const chevronRight = document.getElementById('chevron-right');

    if (chevronLeft && chevronRight) {
        chevronRight.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % members.length;
            showMember(currentIndex);
        });

        chevronLeft.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + members.length) % members.length;
            showMember(currentIndex);
        });
    } else {
        console.warn('Chevron elements not found.');
    }
}