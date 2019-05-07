// Variables
const listaTweets = document.getElementById('lista-tweets');


// Event Listeners
eventListener();

function eventListener() {
    // Cuando se envia el Formulario
    document.querySelector('#formulario').addEventListener('submit', agregarTweets);
    // Borrar Tweets
    listaTweets.addEventListener('click', borrarTweet);
    
}



// Funciones

// Añadir Tweets del Formulario
function agregarTweets(e) {
    e.preventDefault();
    
    // Leer el valor del text area
    const tweet = document.getElementById('tweet').value;

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
    
    // Añadir al LocalStorage
    agregarTweetLocalStorage(tweet);
}

// Elimina el Tweet del DOM
function borrarTweet(e) {
    e.preventDefault();
    
    if ( e.target.className === 'borrar-tweet') {
        e.target.parentElement.remove();
    }
}

// Agrega Tweet al LocalStorage
function agregarTweetLocalStorage(tweet) {
    let tweets;

    localStorage.setItem('tweets', tweet);

}

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