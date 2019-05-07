// crear elementos, en este caso un nuevo enlace
const enlace = document.createElement('a');

// agregamos una clase
enlace.className = 'enlace';
// agregar un id
enlace.id = 'nuevo-id';
// atributo del href
enlace.setAttribute('href', '#');
// agregamos el texto
enlace.textContent = 'Nuevo Enlace desde JavaScript';
// agregarlo al HTML
document.querySelector('#secundaria').appendChild(enlace);
// console.log(enlace); 

// modificar Clases o Atributos
const primerLi = document.querySelector('.enlace');

let elemento;

// Obtener una clase de CSS
elemento = primerLi.className; // solo te da la clase en string
elemento = primerLi.classList; // Te lista las clases en un array
elemento = primerLi.classList.add('nueva-clase');
elemento = primerLi.classList.remove('nueva-clase');

// Leer Atributos y agregar atributos
elemento = primerLi.getAttribute('href');
primerLi.setAttribute('href', 'http://google.com.ar');
primerLi.setAttribute('data-id', 20);
// Verifico si tiene ese Attr ( booblean )
primerLi.hasAttribute('data-id');
// Eliminar un Attr 
primerLi.removeAttribute('data-id');
elemento = primerLi;
console.log(elemento);

// Event Listener click al buscador
document.querySelector('#submit-buscador').addEventListener('click', function(e) {
    e.preventDefault();
    console.log('click');
});
// Variables
const encabezado = document.querySelector('#encabezado');
const enlaces = document.querySelector('.enlaces');
const boton = document.querySelector('#vaciar-carrito');
// Click
boton.addEventListener('click', obtenerEvento);
// Doble Click
boton.addEventListener('dblclick', obtenerEvento);
// Mouse Entrer
boton.addEventListener('mouseenter', obtenerEvento);
// Mouse Leave
boton.addEventListener('mouseleave', obtenerEvento);
// Mouse Down ( Cuando precionas )
boton.addEventListener('mousedown', obtenerEvento);
// Mouse Up ( Cuando precionas y soltas)
boton.addEventListener('mouseup', obtenerEvento);
// Cuando te moves en el ENCABEZADO
encabezado.addEventListener('mousemove', obtenerEvento);
// INPUT - EVENT
const buscador = document.querySelector('#buscador');
// Se ejecuta conforme vallas escribiendo
buscador.addEventListener('keydown', obtenerEvento);
// Se ejecuta cuando sueltas la tecla
buscador.addEventListener('keyup', obtenerEvento);
// Cada ves que escribimos una tecla 
buscador.addEventListener('keypress', obtenerEvento);
// Cada vez que ingresamos al input
buscador.addEventListener('focus', obtenerEvento);
// Cada vez que salimos del input
buscador.addEventListener('blur', obtenerEvento);
// Cada vez que cortamos un texto del input
buscador.addEventListener('cut', obtenerEvento);
// Cada vez que copiamos un texto del input
buscador.addEventListener('copy', obtenerEvento);
// Cada vez que pegamos un texto del input
buscador.addEventListener('paste', obtenerEvento);
// TODO EN UNO, ingresa a todos los metodos mencionados
buscador.addEventListener('input', obtenerEvento);
// Se una mas en lo select. cuando cambie recien ingresa.
buscador.addEventListener('change', obtenerEvento);

function obtenerEvento(e) {
    console.log( buscador.value );
    document.querySelector('#encabezado').innerHTML = buscador.value;
    console.log(`EVENTO: ${e.type}` );
}

// Delegetion - Borrar cualquier contenido que este en una clase espesifica. 

// Vamos a escuchar a todo el BODY el evento CLICK
document.body.addEventListener('click', eliminarElemento);

function eliminarElemento(e) {
    e.preventDefault();

    // Si hay una clase llamada borrar-curso ingresa al IF
    if ( e.target.classList.contains('borrar-curso') ) {
        // Ingresamos dos veces al parentElement, para ir al <tr> compelto de la tabla, a si podemos elimnar el <tr>
        console.log(e.target.parentElement.parentElement.remove());
    }

    if ( e.target.classList.contains('agregar-carrito') ) {
        console.log('agregar-carrito');
    }
}
