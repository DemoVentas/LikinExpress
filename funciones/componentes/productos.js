class Productos {
    constructor() {
        this.contenedor = document.querySelector('#productos');
        this.productosContenedor = document.querySelector('#productos > div:nth-of-type(3)');
        this.botonVerMas = document.querySelector('#productos + nav > button');
        const contenedorBotones = document.querySelector('#productos > div:nth-of-type(1) > div');
        
        if (contenedorBotones) {
            const [botonMosaico, botonLista, botonPaginacion, botonArrastreInfinito] = contenedorBotones.children;

            botonMosaico.addEventListener('click', () => this.cambiarVista(botonMosaico,'lista', 'next'));
            botonLista.addEventListener('click', () => this.cambiarVista(botonLista,'lista', 'previous'));
            botonPaginacion.addEventListener('click', () => this.cambiarVista(botonPaginacion,'infinito', 'next'));
            botonArrastreInfinito.addEventListener('click', () => this.cambiarVista(botonArrastreInfinito,'infinito', 'previous'));
        }
        this.botonVerMas.addEventListener('click', () => this.verMas());
    }

    cambiarVista(boton, clase, direccion) {
        if (boton.classList.contains('activo')) {
            return;
        }

        boton.classList.add('activo');
        boton[`${direccion}ElementSibling`].classList.remove('activo');
        this.contenedor.classList.toggle(clase); 
    }
    verMas(){
        Array.from(this.productosContenedor.children).slice(0, 6).forEach(producto => {
            this.productosContenedor.appendChild(producto.cloneNode(true));
        });
    }
}

const productos = new Productos();