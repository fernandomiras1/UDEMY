// Variables
const listaTweets = document.getElementById('lista-tweets');


// Event Listeners
eventListener();

function eventListener() {
    // Cuando se envia el Formulario
    document.querySelector('#formulario').addEventListener('submit', agregarTweets);
    // Borrar Tweets
    listaTweets.addEventListener('click', borrarTweet);
    // Contenido Cargado en el onInit
    // Cuando el DOM renderizo todo recien ahi carga este Listener.
    document.addEventListener('DOMContentLoaded', localStorageListo);
}



// Funciones

// Añadir Tweets del Formulario
function agregarTweets(e) {
    e.preventDefault();
    
    // Leer el valor del text area
    const tweet = document.getElementById('tweet').value;
    // Creamos un nuevo <li> para insertarlo al DOM 
    agergarTweetalDOM(tweet);
    
    // Añadir al LocalStorage
    agregarTweetLocalStorage(tweet);
}

// Elimina el Tweet del DOM
function borrarTweet(e) {
    e.preventDefault();
    
    if ( e.target.className === 'borrar-tweet') {
        e.target.parentElement.remove();
        borrarTweetLocalStorage(e.target.parentElement.innerText);
    }
}

// Mostrar datos del localStrogae en la lista
function localStorageListo() {
    let tweets;
    tweets = obtenerTweetsLocalStorage();

    tweets.forEach( tweet => {
        agergarTweetalDOM(tweet);
    });
}
// Creamos un nuevo <li> para insertarlo al DOM
function agergarTweetalDOM(tweet) {
     // Crear Boton de eliminacion
     const botonBorrar = document.createElement('a');
     botonBorrar.className = 'borrar-tweet';
     botonBorrar.innerText = 'X';

     // Crear elemento y agregalo al contendio de la lista
     const li = document.createElement('li');
     li.innerText = tweet;
     // añade el boton de borrar al tweet 
     li.appendChild(botonBorrar);
     // Lo agregamos a la lista del Padre
     listaTweets.appendChild(li);
}

// Agrega Tweet al LocalStorage
function agregarTweetLocalStorage(tweet) {
    let tweets;
    tweets = obtenerTweetsLocalStorage();
    // Añadir el nuevo Tweet
    tweets.push(tweet);
    // Convertir de string a arreglo para el localStorage
    // stringify: de un objeto a un string
    localStorage.setItem('tweets', JSON.stringify(tweets) );
}

// Comprobar que haya elementos en el localStorage, retrona un arreglo.
function obtenerTweetsLocalStorage() {
    let tweets;

    // Revisamos los valores del LocalStorage
    if (localStorage.getItem('tweets') === null ) {
        tweets = [];
    } else {
        tweets = JSON.parse(localStorage.getItem('tweets'));
    }

    return tweets; 
}