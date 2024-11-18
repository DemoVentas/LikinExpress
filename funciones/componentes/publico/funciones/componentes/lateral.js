document.addEventListener('DOMContentLoaded', function() {
    // FUNCION PARA MINIMIZAR BARRA LATERAL
    document.body.addEventListener('click', function(event) {
        if (event.target.closest('aside > section > div > div')) {
            var seccion = event.target.closest('aside');
            seccion.classList.toggle('minimizado');
        }
    });
});