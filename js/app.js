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
    datosBusqueda.year = parseInt( e.target.value );

    filtrarAuto();
});

minimo.addEventListener('change', e => {
    // Asigna el valor del select a 'datos busqueda'
    datosBusqueda.minimo = parseInt( e.target.value );

    filtrarAuto();
});

maximo.addEventListener('change', e => {
    // Asigna el valor del select a 'datos busqueda'
    datosBusqueda.maximo = parseInt( e.target.value );

    filtrarAuto();
});

puertas.addEventListener('change', e => {
    // Asigna el valor del select a 'datos busqueda'
    datosBusqueda.puertas = parseInt( e.target.value );

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


function filtrarAuto() {
    // Filtrar Autos y Asignar el nuevo array a la variable 'resultado'
    const resultado = autos
        .filter( filtrarMarca )
        .filter( filtrarYear )
        .filter( filtrarMinimo )
        .filter( filtrarMaximo )
        .filter( filtrarPuertas )
        .filter( filtrarTransmision )
        .filter( filtrarColor );

    // Si el array 'resultado' contiene autos
    if( resultado.length ) {
        // Mostrar autos en el html
        mostrarAutos(resultado);
    } else {
        // Mostrar alerta
        noResultado();
    }
}

function filtrarMarca(auto) {
    // extraer 'marca' de datosBusqueda
    const { marca } = datosBusqueda;

    /*
      si 'marca' existe en 'datosBusqueda': 
      retornamos un auto cuya 'marca' sea igual 
      a la que recibimos de 'datosBusqueda' 
    */
    if( marca ) {
        return auto.marca === marca;
    }
    return auto;
}

function filtrarYear(auto) {
    // extraer 'year' de datosBusqueda
    const { year } = datosBusqueda;

    /*
      si 'year' existe en 'datosBusqueda': 
      retornamos un auto cuyo 'year' sea igual 
      al que recibimos de 'datosBusqueda' 
    */
    if( year ) {
        return auto.year === year;
    }
    return auto;
}

function filtrarMinimo(auto) {
    // extraer informacion de datosBusqueda
    const { minimo } = datosBusqueda;

    /*
      si 'minimo' existe en 'datosBusqueda':
      retornamos un auto cuyo precio sea mayor 
      al valor ('minimo') que recibimos de 'datosBusqueda' 
    */
    if( minimo ) {
        return auto.minimo >= minimo;
    }
    return auto;
}

function filtrarMaximo(auto) {
    // extraer informacion de datosBusqueda
    const { maximo } = datosBusqueda;

    /*
      si 'maximo' existe en 'datosBusqueda':
      retornamos un auto cuyo precio sea menor 
      al valor ('maximo') que recibimos de 'datosBusqueda' 
    */
    if( maximo ) {
        return auto.maximo <= maximo;
    }
    return auto;
}

function filtrarPuertas(auto) {
    // extraer informacion de datosBusqueda
    const { puertas } = datosBusqueda;

    /*
      si 'puertas' existe en 'datosBusqueda': 
      retornamos un auto cuyo numero de 'puertas' sea igual 
      al que recibimos de 'datosBusqueda' 
    */
    if( puertas ) {
        return auto.puertas === puertas;
    }
    return auto;
}

function filtrarTransmision(auto) {
    // extraer informacion de datosBusqueda
    const { transmision } = datosBusqueda;

    /*
      si 'transmision' existe en 'datosBusqueda':
      retornamos un auto cuya 'transmision' sea igual 
      a la que recibimos de 'datosBusqueda' 
    */
    if( transmision ) {
        return auto.transmision === transmision;
    }
    return auto;
}

function filtrarColor(auto) {
    // extraer informacion de datosBusqueda
    const { color } = datosBusqueda;

    /*
      si 'color' existe en 'datosBusqueda':
      retornamos un auto cuto 'color' sea igual
      al que recibimos de 'datosBusqueda' 
    */
    if( color ) {
        return auto.color === color;
    }
    return auto;
}

function noResultado() {
    // Eliminar el HTML previo
    limpiarHTML();

    // Crear alerta
    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = 'No hay resultado, intenta con otros terminos de busqueda';

    // Agregar alerta al HTML
    resultado.appendChild(noResultado)
}