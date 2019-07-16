const CACHE_STATIC_NAME  = 'static-v1';
const CACHE_DYNAMIC_NAME = 'dynamic-v1';
const CACHE_INMUTABLE_NAME = 'inmutable-v1';

const APP_SHELL = [
    '/',
    'index.html',
    'style/base.css',
    'js/base.js',
    'js/app.js',
    'style/bg.png'
];

// Todo lo que no se va a modificar.
const APP_SHELL_INMUTABLE = [
    'https://cdn.jsdelivr.net/npm/pouchdb@7.1.1/dist/pouchdb.min.js'
];

self.addEventListener('install', e => {
    const cacheStatic = caches.open( CACHE_STATIC_NAME )
        .then( cache => cache.addAll( APP_SHELL ));

    const cacheInmutable = caches.open( CACHE_INMUTABLE_NAME )
        .then( cache => cache.addAll( APP_SHELL_INMUTABLE ));


    e.waitUntil( Promise.all([cacheStatic, cacheInmutable]) );

});

self.addEventListener('activate', e => {
    // Borrar los caches que ya no me sirven
    const resupuesta = caches.keys().then( keys => {
        keys.forEach( key => {

            if ( key !== CACHE_STATIC_NAME && key.includes('static') ) {
                return caches.delete(key);
            }
           
            if ( key !== CACHE_DYNAMIC_NAME && key.includes('dynamic') ) {
                return caches.delete(key);
            }
        });
    })
    e.waitUntil(resupuesta);
});


// Guardar en el cache dinamico
function actualizarCacheDinamico( dynamicCache, req, res) {

    if (res.ok) {
        return caches.open( dynamicCache ).then( cache => {
            
            // Almacenamos en el cache
            cache.put(req, res.clone());

            return res.clone();
        })
    } else {
        return res;
    }
}

self.addEventListener('fetch', e =>{

    // 2- Cache with Network Fallback
    const respuesta = caches.match( e.request )
        .then( res => {
            // si existe trae todo y termina ahi.
            if ( res ) return res;

            // No existe el archivo
            // tengo que ir a la web
            return fetch( e.request ).then( newResp => {
                
                return actualizarCacheDinamico( CACHE_DYNAMIC_NAME, e.request, newResp);

            });

        });

    e.respondWith( respuesta );
});
