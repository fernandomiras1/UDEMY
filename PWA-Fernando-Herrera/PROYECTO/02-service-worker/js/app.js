// Confirmar si podemos usar el serviceWorker

if ( navigator.serviceWorker ) {
    //console.log('el navegador soporta el sw');


    // donde va a estar nuestro archivo de sw
    navigator.serviceWorker.register('sw.js');
}