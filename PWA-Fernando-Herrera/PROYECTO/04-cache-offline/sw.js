const CACHE_STATIC_NAME = 'static-v1';
const CACHE_DYNAMIC_NAME = 'dinamic-v2';

// Guardamos en el Cahce los archivos q nunca van a cambiar 
const CACHE_INMUTABLE_NAME = 'inmutable-v1';

const CACHE_DYNAMIC_LIMIT = 50;

function limpiarCache( cahceName, numeroItems ) {

    caches.open( cahceName ).then( cache => {

        cache.keys().then( keys => {

            if ( keys.length > numeroItems ) {
                // Eliminamos el cache en la posicion 0
                cache.delete( keys[0] )
                    .then( limpiarCache(cahceName, numeroItems) );
            }
        });
    });

}

self.addEventListener('install', e => {

    const cacheStatic = caches.open( CACHE_STATIC_NAME ).then( cache => {
       return cache.addAll([
            '/',
            'index.html',
            'css/style.css',
            'img/main.jpg',
            'js/app.js'
        ]);
    });

    const cacheInmutable = caches.open( CACHE_INMUTABLE_NAME )
        .then( cache => cache.add('https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css'));

    // como la instalacion se hace muy rapido. 
    // Es importante esperar que termine de agregar todo al cache
     e.waitUntil( Promise.all([ cacheStatic, cacheInmutable ]) );

});

self.addEventListener('fetch', e => {

    // 1 - Cache Only: Todo sale desde el cahce. Nunca va a la srv.
    //e.respondWith( caches.match( e.request ) );

    // 2 - Cache with Network fallback: Intenta leer el cache si no ve a al red
    // const respuesta = caches.match( e.request )
    //     .then( resu => {
        
    //         if ( resu ) return resu;

    //         // No existe el Archivo
    //         // Tengo que ir a la web a buscaro
    //         console.log('No existe el archivo', e.request.url);
    //         return fetch( e.request ).then( newResp => {
    //             // Agregamos el Archivo faltante al Caches, para que no lo busque siempre
    //             // desde intenet

    //             // abrimos el cache, para agregarlo
    //             caches.open( CACHE_DYNAMIC_NAME ).then( cache => {
    //                 // dos valores: la url, y lo que contiene ese archivo
    //                 cache.put( e.request, newResp );
    //                 // Limpiamos el cache
    //                 limpiarCache( CACHE_DYNAMIC_NAME, CACHE_DYNAMIC_LIMIT );
    //             });

    //             // Le tengo que poner un clone, ya que estoy usando la peticion en el cache.put
    //             return newResp.clone();
    //         });
    //     });

    // e.respondWith( respuesta );

    // 3 - Network with cache fallback: primero vamos al srv y luego lo guardamos en el cache.
    fetch( e.request ).then( resp => {

        // si la respuesta no existe podemos hacer un return del caches
        if ( !resp ) return caches.match( e.request );
        // Almacenamos las respuestas en el cache dynamico
        caches.open( CACHE_DYNAMIC_NAME ).then( cache => {
            cache.put( e.request, resp );
            limpiarCache( CACHE_DYNAMIC_NAME, CACHE_DYNAMIC_LIMIT );
        });

        return resp.clone();
    }).catch( () => {
        // Si no encuentra en el srv va a buscar en la cache.
        return caches.match( e.request );
    });

    e.respondWith( respuesta );

});