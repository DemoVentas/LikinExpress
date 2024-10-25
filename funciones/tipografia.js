class Tipografia {
    constructor() {
        this.atributoDatos = 'data-tipografia-escalable';
        this.prefijoVariableCSS = '--';
    }
    actualizarAnchos() {
        const elementos = document.querySelectorAll(`[${this.atributoDatos}="1"]`);

        elementos.forEach(elemento => {
            const contenedor = elemento.classList.length > 0 ? elemento : elemento.closest('[class]');
            if (contenedor) {
                const ancho = elemento.offsetWidth;
                const nombreClase = contenedor.className.split(' ')[0];
                const nombreVariable = `${this.prefijoVariableCSS}${nombreClase}-ancho`;
                contenedor.style.setProperty(nombreVariable, `${ancho}px`);
            }
        });
    }
    inicializar() {
        this.actualizarAnchos();
        window.addEventListener('resize', () => this.actualizarAnchos());
    }
}

const tipografia = new Tipografia();
tipografia.inicializar();