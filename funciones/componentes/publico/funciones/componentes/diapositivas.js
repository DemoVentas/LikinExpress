
const contenedor = document.querySelector('.diapositivas');
const deslizador = document.querySelector('.diapositivas > div');
const diapositivas = document.querySelectorAll('.diapositivas > div > div');
const rango = 5;

function inicializarDeslizador() {
    const espacio = window.innerWidth * 0.01;
    const cantidadDiapositivas = diapositivas.length - 1;
    $('.diapositivas > div').css('width','calc((20vw + 1%) * '+cantidadDiapositivas+'');
    diapositivas.forEach((diapositiva, indice) => {
        if (indice === 0) return;
        const leftPosition = (indice * (diapositiva.offsetWidth/5 + espacio));
    
        diapositiva.style.left = `${leftPosition}px`;
    });
}

inicializarDeslizador();
window.addEventListener('resize', inicializarDeslizador);
document.addEventListener('DOMContentLoaded', inicializarDeslizador);    

const manipularPresionar = e => {
    deslizador.dataset.mouseDownAt = e.clientX.toString();
    deslizador.dataset.startX = e.clientX.toString();
    deslizador.dataset.isDragging = "false";
};

const manipularSoltar = e => {
    if (deslizador.dataset.isDragging === "false") {
        // $('.diapositivas').removeClass('activo');
    }
    deslizador.dataset.mouseDownAt = "0";
    deslizador.dataset.prevPercentage = deslizador.dataset.percentage;
    deslizador.dataset.isDragging = "false";
};

const manipularMovimiento = e => {
    if (deslizador.dataset.mouseDownAt === "0") {
        // $('.contenido').addClass('activo');
        return;
    }

    const mouseDownAt = parseFloat(deslizador.dataset.mouseDownAt);
    const mouseDelta = mouseDownAt - e.clientX;

    if (deslizador.dataset.isDragging === "false" && Math.abs(mouseDelta) > rango) {
        deslizador.dataset.isDragging = "true";
    }

    if (deslizador.dataset.isDragging === "true") {
        $('.diapositivas > ul').removeClass('activo');
        $('.diapositivas > div > div').removeClass('activo');
        const maxDelta = window.innerWidth / 2;

        const percentage = (mouseDelta / maxDelta) * -100,
              nextPercentageUnconstrained = parseFloat(deslizador.dataset.prevPercentage) + percentage,
              nextPercentage = isNaN(nextPercentageUnconstrained) ? 0 : Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

        deslizador.dataset.percentage = nextPercentage;

        deslizador.animate({
            transform: `translate(${nextPercentage}%, -50%)`
        }, { duration: 300, fill: "forwards" });

        const imagenes = deslizador.querySelectorAll('.diapositivas > div > div > img');
        for (const imagen of imagenes) {
            imagen.animate({
                objectPosition: `${100 + nextPercentage}% center`
            }, { duration: 300, fill: "forwards" });
        }
    }
};
const centrarDeslizadorEnImagen = index => {
    const totalImagenes = deslizador.querySelectorAll('.diapositivas > div > div > img').length - 1;
    const anchoImagen = (100 / totalImagenes);
    const porcentaje = -(index  * anchoImagen);

    deslizador.dataset.percentage = porcentaje;
    deslizador.animate({
        transform: `translate(${porcentaje}%, -50%)`
    }, { duration: 300, fill: "forwards" });
};
const alternarPantallaCompleta = e => {
    $('.diapositivas > ul').addClass('activo');
    const img = e.target;
        img.animate({
            objectPosition: `50% center`
        }, { duration: 300, fill: "forwards" });
    const contenedorImagen = img.closest('.diapositivas > div > div'); 
    const index = Array.from(deslizador.querySelectorAll('.diapositivas > div > div > img')).indexOf(img);
    contenedorImagen.classList.add('activo');
  centrarDeslizadorEnImagen(index);
};

const agregarInteracciones = () => {
    const imagenes = deslizador.querySelectorAll('.diapositivas > div > div > img');
    imagenes.forEach(imagen => {
        imagen.addEventListener('click', alternarPantallaCompleta);
    });
};

agregarInteracciones();

contenedor.onmouseup = e => manipularSoltar(e);
contenedor.onmousemove = e => manipularMovimiento(e);
contenedor.onmousedown = e => manipularPresionar(e);

contenedor.ontouchstart = e => manipularPresionar(e.touches[0]);
contenedor.ontouchmove = e => manipularMovimiento(e.touches[0]);
contenedor.ontouchend = e => manipularSoltar(e.touches[0]);
$('.contenido').click(function(){
    $(this).removeClass('activo');
    $(this).children('div').removeClass('activo');
});
$('.diapositivas span').click(function(){
    $('.contenido').addClass('activo');
    $('.contenido').children('div').children('div').removeClass('activo');
    $('.contenido').children('div').children('div').eq($(this).parent().index()).addClass('activo');
});
$('.cronologia > div').mouseover(function(){
    $('.cronologia > div').removeClass('activo');
    $(this).parents().eq(1).children('img').removeClass('activo');
    $(this).parents().eq(1).children('img').eq($(this).index()).addClass('activo');
    $(this).addClass('activo');
});
$('.diapositivas > ul > li').on('click', function(){
    $('.diapositivas > div > div').removeClass('activo');
    $('.diapositivas > div').children('div').eq($(this).index()).find('img').click();
});
$('header').click(function(){
    $('.diapositivas > ul').removeClass('activo');
    $('.diapositivas > div > div').removeClass('activo');
    $('.contenido').removeClass('activo');
    $('.contenido').children('div').removeClass('activo');
});