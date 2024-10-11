<h1 align="center"> Desafio front-end web - EJECT </h1>

![Imagem de capa - desafio front-end](https://github.com/user-attachments/assets/3f66cc3a-1468-4039-b59c-b57f10316f39)

Este projeto apresenta uma plataforma educacional que fornece informações sobre seus recursos e ferramentas. O projeto foi desenvolvido como parte do processo seletivo da Empresa Júnior da Escola de Ciências e Tecnologia da UFRN **(EJECT)**.

## 🔨 Funcionalidades do projeto

O site conta com quatro páginas principais:

- `Home`: É página inicial. Nela é apresentada a plataforma educacional, suas ferramentas, equipe e materiais
- `Vídeos`: A página de vídeos contém várias seções voltadas para diferentes tipos de conteúdo, como vídeos educativos e aulas interativas
- `Fórum`: No fórum, os usuários podem adicionar comentários e compartilhar seus interesses
- `Pais e profs`: Uma página voltada para pais e professores, onde estão disponíveis diversos materiais de apoio educativo para as crianças

<!-- ADICIONAR IMAGENS / UM GIF DEPOIS -->

## 📁 Acesso ao projeto

Você pode acessar o site fazendo o **download / clone** do projeto e abrir o arquivo **index.html** usando a extensão Live Server do VScode. O mockup da página pode ser acessado <a target="_blank" href="https://www.figma.com/design/VqQmVN9QCFyucIXSoZOaZ0/PS-2024.2-eject?node-id=0-1&node-type=canvas">aqui</a>.

## ✔️ Técnicas e tecnologias utilizadas

O site segue um modelo de SPA, possuindo quatro páginas principais, com navegação dinâmica gerenciada por **JavaScript**. Esse sistema permite que os componentes comuns, como o cabeçalho (header) e o rodapé (footer), permaneçam fixos, enquanto o conteúdo principal é renderizado dinamicamente conforme a página selecionada no menu de navegação (navbar).

### Funções principais
#### Inicialização e navegação do site
Quando a aplicação é iniciada, os componentes principais e a página inicial são automaticamente carregados na tela.
```javascript
// Inicializar a SPA com a página inicial
window.addEventListener('load', () => {
    loadComponents();
    loadPage('home');    
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
```

#### Função loadComponents
A função loadComponents carrega os componentes comuns a todas as páginas (navbar e footer). A função busca os arquivos html dos componentes e os carrega na tela. A estilização desses componentes globais está definida em `/assets/css/global.css`
```javascript
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
```

#### Carregamento de página
A loadPage recebe o nome da página e carrega toda sua estrutura e estilização para a aplicação, inicializando também os componentes necessários, como carrosséis e desenhos da tela.
```javascript
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
```

O projeto conta com as tecnologias:

- `Bootstrap`: criação de componentes e responsividade
- `Flickity`: carrosséis responsivos de componentes
- `HTML5`: estrutura dos componentes do site
- `CSS3`: estilização
- `JavaScript`: navegação e gerenciamento de componentes de página

# Autores

| [<img loading="lazy" src="https://avatars.githubusercontent.com/u/81655988?v=4" width=115><br><sub>Ângelo Miranda</sub>](https://github.com/angelomiray) | [<img loading="lazy" src="https://avatars.githubusercontent.com/u/92534145?v=4" width=115><br><sub>Rodrigo Nóbrega</sub>](https://github.com/rodrigofnobrega) | [<img loading="lazy" src="https://avatars.githubusercontent.com/u/97708606?v=4" width=115><br><sub>Thales Wendel</sub>](https://github.com/thaleswe) | [<img loading="lazy" src="https://avatars.githubusercontent.com/u/88515883?v=4" width=115><br><sub>Tiego Rafael</sub>](https://github.com/Tiegow)
| :---: | :---: | :---: | :---: |
