document.addEventListener('DOMContentLoaded', function() {
    // FUNCION PARA MINIMIZAR CONTENEDOR
    document.body.addEventListener('click', function(event) {
        if (event.target.closest('section > button')) {
            var seccion = event.target.closest('section');
            seccion.classList.toggle('minimizado');
        }
    });
    // FUNCION PARA ACTIVAR BOTONES
    document.body.addEventListener('click', function(event) {
        if (event.target.closest('.boton')) {
            event.target.closest('.boton').classList.toggle('activo');
        }
    });

    // FUNCION PARA ASIGNAR FONDO A CADA TEMA 
    const coloresElementos = document.querySelectorAll('.tema > div');

    coloresElementos.forEach(element => {
        const gradienteValor = element.getAttribute('data-fondo');
        if (gradienteValor) {
            element.style.backgroundImage = gradienteValor;
        }
    });

    // FUNCION PARA ASIGNAR COLOR A CADA CASILLA DE COLOR
    const colorCasillas = document.querySelectorAll('input[type="color"]');
    const colorMuestras = document.querySelectorAll('.casilla.color > div');

    colorCasillas.forEach((colorCasilla, index) => {
        colorCasilla.addEventListener('input', function() {
        const color = this.value;
        colorMuestras[index].style.backgroundColor = color;
        });
    });
    // FUNCION PARA MOSTRAR CONTRASEÑA 
    const casillasClave = document.querySelectorAll('input[type="password"]');

    casillasClave.forEach(function(casilla) {
        const icono = casilla.parentElement.querySelector('img');
        icono.addEventListener('click', function() {
            if (casilla.type === 'password') {
                casilla.type = 'text';
            } else {
                casilla.type = 'password';
            }
        });
    });
    // FUNCION PARA SELECCIONAR OPCION DE CASILLA
    document.querySelectorAll('.casilla.seleccion').forEach(seleccion => {
        const casillaSeleccion = seleccion.querySelector('select');
        seleccion.querySelectorAll('div[data-valor]').forEach(opcion => {
            opcion.addEventListener('click', () => {
                const valor = opcion.getAttribute('data-valor');
                casillaSeleccion.value = valor;
                
                const evento = new Event('change', { bubbles: true });
                
                casillaSeleccion.dispatchEvent(evento);
            });
        });
    });
    // FUNCION PARA SELECCIONAR ARCHIVOS
    const archivosCasilla = document.querySelectorAll('.archivo > input');

    archivosCasilla.forEach(archivo => {
        archivo.addEventListener('change', function() {
            const archivosLista = this.parentElement.querySelector('p');
            archivosLista.innerHTML = '';

            const archivos = this.files;
            const archivosCantidad = archivos.length;
            if (archivosCantidad > 0) {
                const pronombre = archivosCantidad === 1 ? 'archivo' : 'archivos';
                const elementoCuenta = document.createElement('p');
                elementoCuenta.textContent = `${archivosCantidad} ${pronombre}`;
                archivosLista.appendChild(elementoCuenta);
            } else {
                archivosLista.textContent = 'ningun archivo seleccionado';
            }
        });
    });
});