
// Validamos si el navegador permite el SW 
if ( navigator.serviceWorker ) {
    navigator.serviceWorker.register('sw.js');
}
