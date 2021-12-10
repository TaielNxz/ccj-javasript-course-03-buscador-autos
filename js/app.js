/* =========================================
                Variables
========================================= */
// Campos del buscador
const marca       = document.querySelector('#marca');
const year        = document.querySelector('#year');
const minimo      = document.querySelector('#minimo');
const maximo      = document.querySelector('#maximo');
const puertas     = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color       = document.querySelector('#color');

// Contenedor para los resultados
const resultado   = document.querySelector('#resultado');

// Generar un objeto con la busqueda
const datosBusqueda = {
    marca       : '',
    year        : '',
    minimo      : '',
    maximo      : '',
    puertas     : '',
    transmision : '',
    color       : '',
};


/* =========================================
              EventListeners
========================================= */
document.addEventListener('DOMContentLoaded', () => {
    // Mostrar autos en el HTML ( la variable autos viene de db.js )
    mostrarAutos(autos);

    // Llenamos el select de 'year'
    llenarSelectYear();
});

marca.addEventListener('change', e => {
    // Asigna el valor del select a 'datos busqueda'
    datosBusqueda.marca = e.target.value;

    filtrarAuto();
});

year.addEventListener('change', e => {
    // Asigna el valor del select a 'datos busqueda'
    datosBusqueda.year = e.target.value;

    filtrarAuto();
});

minimo.addEventListener('change', e => {
    // Asigna el valor del select a 'datos busqueda'
    datosBusqueda.minimo = e.target.value;

    filtrarAuto();
});

maximo.addEventListener('change', e => {
    // Asigna el valor del select a 'datos busqueda'
    datosBusqueda.maximo = e.target.value;

    filtrarAuto();
});

puertas.addEventListener('change', e => {
    // Asigna el valor del select a 'datos busqueda'
    datosBusqueda.puertas = e.target.value;

    filtrarAuto();
});

transmision.addEventListener('change', e => {
    // Asigna el valor del select a 'datos busqueda'
    datosBusqueda.transmision = e.target.value;

    filtrarAuto();
});

color.addEventListener('change', e => {
    // Asigna el valor del select a 'datos busqueda'
    datosBusqueda.color = e.target.value;

    filtrarAuto();
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


function filtrarAuto() {
    console.log(datosBusqueda);
};


function llenarSelectYear() {
    /* 
     ? Queremos obtener los 10 ultimos años en base al año actual. 
     ? ejemplo: si estamos en 2020 el año mínimo será 2011:
     * <select>
     *    <option>2020</option>
     *    <option>2019</option>
     *    <option>2018</option>
     *    ...
     *    <option>2011</option>
     * </select>
    */

    // Obtener Año actual
    const max = new Date().getFullYear();
    const min = max - 10;

    // Generar contenido del select 'year'
    for( let i = max; i > min; i-- ) {
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;

        // Agrega las opciones de año al select
        year.appendChild(opcion);
    };
};
