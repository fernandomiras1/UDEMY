
// Ciclo de vida del SW


// Camptamos el evento de la instalacion del SW
self.addEventListener('install', event => {


    // podemos descargar assets
    // Creamos un cache
    console.log('SW: Instalando SW');


    const instalacion = new Promise( ( resolve, reject ) => {
        
        setTimeout(() => {
            console.log('SW: Instalaciones terminadas');
            self.skipWaiting();
            resolve();
        }, 1000);
    });

    // Para manejar lo asicronico usamos el waitUntil (Espera de cargar toda la instalacion )
    // Espera recibir una promesa
    event.waitUnitl( instalacion );

});


// Cuando el SW Toma el control de la Aplicacion
self.addEventListener('activate', event => {

    // Es un buen luegar para borrar cache viejo

    console.log('SW: Activo y listo para controlar la aplicacion ');

});


// FETCH: Manejo de Peticiones HTTP 
self.addEventListener('fetch', event => {

    // Aplicar estrategias de cache
    // console.log('SW', event.request.url );
}); 

// SYNC: Sirve cuando Recuperamos la concexion a Interent.
self.addEventListener('sync', event => {

    console.log('Recuperamos la concexion');
    console.log(event);
    console.log(event.tag);
});

// PUSH: Manejar las push notification
self.addEventListener('push', event => {

    console.log('Notificacion Recibida');
});