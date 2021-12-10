/* =========================================
                Variables
========================================= */// Contenedor para los resultados
const resultado   = document.querySelector('#resultado');


/* =========================================
              EventListeners
========================================= */
document.addEventListener('DOMContentLoaded', () => {
    // Mostrar autos en el HTML ( la variable autos viene de db.js )
    mostrarAutos(autos);
});


/* =========================================
                Funciones
========================================= */
function mostrarAutos( autos ) {
    // Elimina el HTML previo
    limpiarHTML();

    // Iterar arreglo de autos
    autos.forEach( auto => {
        // Extraer informacion del auto
        const { marca, modelo, year, puertas, transmision, precio, color } = auto;

        // Crear parrafo con los datos
        const autoHTML = document.createElement('p');
        autoHTML.textContent = `
            ${marca} ${modelo} - ${year} - ${puertas} Puertas - Transmision: ${transmision} - Precio: ${precio} - Color: ${color}
        `;

       // Agregar al HTML
       resultado.appendChild(autoHTML)
    });
}

function limpiarHTML() {
    while( resultado.firstChild ) {
        resultado.removeChild(resultado.firstChild);
    }
}