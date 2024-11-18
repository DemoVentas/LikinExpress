class Ampliador {
    constructor(contenedor) {
        this.contenedor = contenedor;
        this.imagen = contenedor.querySelector('img');
        this.lente = contenedor.querySelector('div:nth-of-type(1)');
        this.previaContenedor = contenedor.querySelector('div:nth-of-type(2)');
        this.previa = contenedor.querySelector('div:nth-of-type(2) > img');

        this.iniciarLente();
    }

    iniciarLente() {
        this.contenedor.addEventListener('mousemove', this.moverLente.bind(this));
        this.contenedor.addEventListener('mouseleave', () => {
            this.lente.classList.remove('activo');
            this.previaContenedor.classList.remove('activo');
        });
        this.contenedor.addEventListener('mouseenter', () => {
            this.lente.classList.add('activo');
            this.previaContenedor.classList.add('activo');
        });
    }

    moverLente(evento) {
        const rect = this.imagen.getBoundingClientRect();

        let x = evento.clientX - rect.left - (this.lente.offsetWidth / 2);
        let y = evento.clientY - rect.top - (this.lente.offsetHeight / 2);

        x = Math.max(0, Math.min(x, rect.width - this.lente.offsetWidth));
        y = Math.max(0, Math.min(y, rect.height - this.lente.offsetHeight));

        this.lente.style.left = `${x}px`;
        this.lente.style.top = `${y}px`;

        this.actualizarVistaPrevia(x, y);
    }

    actualizarVistaPrevia(x, y) {
        const acercamientoFactorX = this.previa.clientWidth / this.imagen.clientWidth;
        const acercamientoFactorY = this.previa.clientHeight / this.imagen.clientHeight;

        const compensacionX = x * acercamientoFactorX;
        const compensacionY = y * acercamientoFactorY;

        this.previa.style.left = `-${compensacionX}px`;
        this.previa.style.top = `-${compensacionY}px`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const contenedorAmpliador = document.querySelector('.ampliador');
    new Ampliador(contenedorAmpliador);
});
