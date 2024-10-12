// Função para carregar imagens dinâmicas de "drawing-container"
function loadDrawingImages(containerId) {
    const images = [
        { id: "star-y", src: "/assets/imgs/videos/star-y.png", style: { left: '250px', top: '265px', width: '92px', zIndex: -1 } },
        { id: "ellipse-p", src: "/assets/imgs/videos/ellipse-p.png", style: { left: '100px', top: '55%', width: '28px', zIndex: -1 } },
        { id: "plus-p", src: "/assets/imgs/videos/plus-p.png", style: { left: '60px', width: '50px', top: '180px', zIndex: -1 } },
        { id: "star-p", src: "/assets/imgs/videos/star-p.png", style: { right: '60px', top: '320px', width: '92px', zIndex: -1 } },
        { id: "plus-y", src: "/assets/imgs/videos/plus-y.png", style: { bottom: '200px', right: '365px', width: '50px', zIndex: -1 } },
        { id: "ellipse-pp", src: "/assets/imgs/videos/ellipse-pp.png", style: { right: '17%', top: '200px', width: '28px', zIndex: -1 } }
    ];

    const container = document.querySelector(`.${containerId}`);
    if (!container) {
        console.error(`Container with class ${containerId} not found.`);
        return;
    }

    images.forEach(imgData => {
        const img = document.createElement('img');
        img.className = 'drawing';
        img.id = imgData.id;
        img.src = imgData.src;
        Object.assign(img.style, imgData.style);
        container.appendChild(img);
    });
}
