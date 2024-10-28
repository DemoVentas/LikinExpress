class Deslizador {
    constructor(deslizadorElemento) {
        this.deslizadorElemento = deslizadorElemento;
        this.anteriorBoton = this.deslizadorElemento.querySelector('button:nth-of-type(1)');
        this.siguienteBoton = this.deslizadorElemento.querySelector('button:nth-of-type(2)');
        this.deslizadorBotonesContenedor = this.deslizadorElemento.querySelector('div:nth-of-type(1)').querySelector('div');
        
        this.enMovimiento = false;
        this.arrastre = false;
        this.enfoque = false; 
        
        this.inicialX = 0;
        this.desplazamiento = 0;

        this.inicializarEnfoque(); 
        this.inicializarBotones();
        this.inicializarTeclas();
        this.inicializarArrastreEscritorio();
        this.inicializarArrastreTactil(); 
        this.inicializarArrastrePanel();
        this.inicializar(); 

        window.addEventListener('resize', () => this.inicializar());
    }

    inicializar() {
        this.borrarBotones();
        this.recalcularElementos();
        this.recalcularBotones();

        if (this.deslizadorBotones.length > 0) {
            this.irASeccion(0, this.deslizadorBotones[0]);
        }
    }

    borrarBotones() {
        this.deslizadorBotonesContenedor.innerHTML = ''; 
    }

    recalcularElementos() {
        this.deslizadorContenido = this.deslizadorElemento.querySelector('div:nth-of-type(2)');
        this.elementosDeslizador = Array.from(this.deslizadorContenido.children);
    }

    recalcularBotones() {
        if (!this.elementosDeslizador || this.elementosDeslizador.length === 0) return;
    
        const deslizadorAncho = this.deslizadorContenido.clientWidth;
        const elementoAncho = this.elementosDeslizador[0].clientWidth;
        const elementosVisibles = Math.floor(deslizadorAncho / elementoAncho);
        const totalSecciones = Math.ceil(this.elementosDeslizador.length / elementosVisibles);
    
        for (let i = 0; i < totalSecciones; i++) {
            const nuevoBoton = document.createElement('button');
            nuevoBoton.addEventListener('click', () => this.irASeccion(i, nuevoBoton));
            this.deslizadorBotonesContenedor.appendChild(nuevoBoton);
            
            if (i === 0) {
                nuevoBoton.classList.add('activo');
            }
        }
    
        this.deslizadorBotones = this.deslizadorBotonesContenedor.children;
    
        if (this.deslizadorBotones.length > 0) {
            this.irASeccion(0, this.deslizadorBotones[0]);
        }
    }

    obtenerBotonActivo() {
        return this.deslizadorElemento.querySelector('button.activo');
    }

    obtenerDeslizadorContenidoAncho() {
        return this.deslizadorContenido.offsetWidth;
    }

    actualizarBotonActivo(nuevoBoton) {
        const botonActivo = this.obtenerBotonActivo();
        if (botonActivo) {
            botonActivo.classList.remove('activo');
        }
        nuevoBoton.classList.add('activo');
    }

    ejecutarConMovimiento(funcion) {
        if (this.enMovimiento) return;
        this.enMovimiento = true;

        funcion();

        requestAnimationFrame(() => {
            setTimeout(() => {
                this.enMovimiento = false;
            }, 500);
        });
    }

    irASeccion(seccionIndice, boton) {
        this.ejecutarConMovimiento(() => {
            this.actualizarBotonActivo(boton);
    
            this.deslizadorContenido.scrollTo({
                left: this.obtenerDeslizadorContenidoAncho() * seccionIndice,
                behavior: 'smooth'
            });
        });
    }

    cambiarSeccion(direccion) {
        const botonActivo = this.obtenerBotonActivo();
        const botonCambio = direccion === 'anterior' ? botonActivo.previousElementSibling : botonActivo.nextElementSibling;
    
        if (botonCambio) {
            const seccionIndice = Array.from(this.deslizadorBotones).indexOf(botonCambio);
            this.irASeccion(seccionIndice, botonCambio);
        }
    }

    iniciarArrastre(e) {
        this.arrastre = true;
        this.inicialX = e.clientX || e.touches[0].clientX;
        this.deslizadorContenido.classList.add('arrastrando'); 
    }

    arrastrar(e) {
        if (!this.arrastre) return;
        e.preventDefault();  
    }

    terminarArrastre(e) {
        if (!this.arrastre) return;
        this.arrastre = false;
        this.deslizadorContenido.classList.remove('arrastrando'); 

        const finalX = e.clientX || e.changedTouches[0].clientX;
        const direccionX = finalX - this.inicialX;  

        const direccion = direccionX > 0 ? 'anterior' : 'siguiente';
        this.cambiarSeccion(direccion);
    }
    inicializarEnfoque() {
        this.deslizadorElemento.addEventListener('mouseenter', () => {
            this.enfoque = true;
        });
        this.deslizadorElemento.addEventListener('mouseleave', () => {
            this.enfoque = false;
        });
    }
    inicializarBotones() {
        if (this.anteriorBoton) {
            this.anteriorBoton.addEventListener('click', () => this.cambiarSeccion('anterior'));
        }
        if (this.siguienteBoton) {
            this.siguienteBoton.addEventListener('click', () => this.cambiarSeccion('siguiente'));
        }
        this.deslizadorBotones = this.deslizadorBotonesContenedor.children;
    }

    inicializarTeclas() {
        document.addEventListener('keydown', (event) => {
            if (!this.enfoque) return;

            if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
                event.preventDefault();
                const direccion = event.key === 'ArrowLeft' ? 'anterior' : 'siguiente';
                this.cambiarSeccion(direccion);
            }

            if (event.key >= '1' && event.key <= '9') {
                const seccionIndice = parseInt(event.key) - 1;
                if (seccionIndice < this.deslizadorBotones.length) {
                    this.irASeccion(seccionIndice, this.deslizadorBotones[seccionIndice]);
                }
                event.preventDefault();
            }
        });
    }

    inicializarArrastreEscritorio() {
        this.deslizadorContenido = this.deslizadorElemento.querySelector('div:nth-of-type(2)');
        if (this.deslizadorContenido) {
            this.deslizadorContenido.addEventListener('mousedown', (e) => this.iniciarArrastre(e));
            this.deslizadorContenido.addEventListener('mousemove', (e) => this.arrastrar(e));
            this.deslizadorContenido.addEventListener('mouseup', (e) => this.terminarArrastre(e));
        }
    }

    inicializarArrastreTactil() {
        if (this.deslizadorContenido) {
            this.deslizadorContenido.addEventListener('touchstart', (e) => {
                this.inicialX = e.touches[0].clientX;
                this.inicialY = e.touches[0].clientY; 
                this.iniciarArrastre(e);
            }, { passive: false });
    
            this.deslizadorContenido.addEventListener('touchmove', (e) => {
                const finalX = e.touches[0].clientX;
                const finalY = e.touches[0].clientY;
    
                const direccionX = finalX - this.inicialX;
                const direccionY = finalY - this.inicialY;
    
                if (Math.abs(direccionX) > Math.abs(direccionY)) {
                    e.preventDefault();
                    this.arrastrar(e); 
                } else {
                    this.terminarArrastre(e);
                }
            }, { passive: false });
    
            this.deslizadorContenido.addEventListener('touchend', (e) => {
                this.terminarArrastre(e);
            }, { passive: false });
        } else {
            console.warn('El contenido del deslizador no ha cargado.');
        }
    }
    inicializarArrastrePanel() {
        let pausaArrastre;
        let arrastreActivo = false;

        this.deslizadorContenido.addEventListener('wheel', (event) => {
            if (event.shiftKey && Math.abs(event.deltaY) > 0) {
                event.preventDefault();
                this.cambiarSeccion(event.deltaY > 0 ? 'siguiente' : 'anterior');
            }
        });

        this.deslizadorContenido.addEventListener('wheel', (event) => {
            if (Math.abs(event.deltaX) > 0) {
                event.preventDefault();
    
                if (!arrastreActivo) {
                    this.cambiarSeccion(event.deltaX > 0 ? 'siguiente' : 'anterior');
                    arrastreActivo = true; // Set flag to ignore additional triggers
                }

                clearTimeout(pausaArrastre);
                pausaArrastre = setTimeout(() => {
                    arrastreActivo = false;
                }, 50);
            }
        });
    }
}

document.querySelectorAll('.deslizador').forEach(deslizadorElemento => {
    new Deslizador(deslizadorElemento);
});
