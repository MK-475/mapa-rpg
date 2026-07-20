// ==============================
// ELEMENTOS DA PÁGINA
// ==============================

const mapa = document.getElementById("mapa");
const mapaContainer = document.getElementById("mapaContainer");
const marcadores = document.getElementById("marcadores");

const botaoMenu = document.getElementById("menu");
const menuLateral = document.getElementById("menuLateral");

const mapaWrapper = document.getElementById("mapaWrapper");
// ==============================
// VARIÁVEIS
// ==============================

let escala = 1;
let posX = 0;
let posY = 0;

let arrastando = false;
let inicioX = 0;
let inicioY = 0;

// ==============================
// MENU LATERAL
// ==============================

botaoMenu.addEventListener("click", () => {
    menuLateral.classList.toggle("menu-fechado");
});

// ==============================
// TROCAR MAPAS
// ==============================

function trocarMapa(tipo) {

    mapa.style.opacity = "0";
    marcadores.style.opacity = "0";

    // Volta o mapa ao estado inicial
    escala = 1;
    posX = 0;
    posY = 0;

    atualizarMapa();

    setTimeout(() => {

        switch (tipo) {

            case "principal":
                mapa.src = "img/mapa-principal.jpeg";
                marcadores.classList.add("oculto");
                break;

            case "cidades":
                mapa.src = "img/mapa-cidades.png";
                marcadores.classList.remove("oculto");
                break;

            case "territorios":
                mapa.src = "img/mapa-territorios.png";

                // Não mostra marcadores
                marcadores.classList.add("oculto");
                break;
        }

        mapa.style.opacity = "1";
        marcadores.style.opacity = "1";

    }, 200);

}

// ==============================
// TRANSFORMAÇÃO DO MAPA
// ==============================

function atualizarMapa() {

    mapaWrapper.style.transform =
        `translate(${posX}px, ${posY}px) scale(${escala})`;

    mapaWrapper.style.transformOrigin = "center center";

}
// ==============================
// ZOOM
// ==============================

mapaContainer.addEventListener("wheel", function (e) {

    e.preventDefault();

    if (e.deltaY < 0) {
        escala += 0.15;
    } else {
        escala -= 0.15;
    }

    if (escala < 1) {
        escala = 1;
    }

    if (escala > 5) {
        escala = 5;
    }

    atualizarMapa();

});

// ==============================
// ARRASTAR O MAPA
// ==============================

mapaContainer.addEventListener("mousedown", function (e) {

    if (escala <= 1) return;

    arrastando = true;

    inicioX = e.clientX - posX;
    inicioY = e.clientY - posY;

    mapaWrapper.style.cursor = "grabbing";

});

document.addEventListener("mousemove", function (e) {

    if (!arrastando) return;

    posX = e.clientX - inicioX;
    posY = e.clientY - inicioY;

    atualizarMapa();

});

document.addEventListener("mouseup", function () {

    arrastando = false;

    mapaWrapper.style.cursor = "grab";

});

// ==============================
// TOOLTIP
// ==============================

document.querySelectorAll(".ponto").forEach((ponto) => {

    ponto.addEventListener("mouseenter", function () {

        this.style.zIndex = "50";

    });

    ponto.addEventListener("mouseleave", function () {

        this.style.zIndex = "10";

    });

});

// ==============================
// IMPEDIR ARRASTAR A IMAGEM
// ==============================

mapa.addEventListener("dragstart", function (e) {

    e.preventDefault();

});

// ==============================
// ESTADO INICIAL
// ==============================

// Esconde os marcadores ao abrir o site
marcadores.classList.add("oculto");

// ==============================
// REDIMENSIONAMENTO DA JANELA
// ==============================

window.addEventListener("resize", () => {

    atualizarMapa();

});