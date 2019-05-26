
// Validamos si el navegador permite usar el Cache
if ( window.caches ) {

    // creamos un caches con el nombre prueba-1
    caches.open('prueba-1');

    // Verificamos si existe ( Devuelve una Promesa con un boobleano)
    caches.has('prueba-1').then( console.log );

    // Eliminamos  ( Devuelve una Promesa con un boobleano). 
    // true: Lo elimina correcatemente.
    caches.delete('prueba-1').then( console.log );


    caches.open('cache-v1.1').then( cache => {

        // Vamos a guardar el index.html en la cache
        //cahce.add('/index.html');

        cache.addAll([
            'index.html',
            'css/style.css',
            'img/main.jpg'
        ]).then( () => {
            // Devuelve una promesa, y como el gravado es mas lento que el delete,
            // Primero neceisto grabar los datos para luego borrar un elemento del mismo
            // Borramos el CSS 
            cache.delete('css/style.css');


            // Remplazamos el index por otro,
            //Esto sirve para actualizar los archiso si hay en el servidor, una actualizacion del mismo.
            cache.put( 'index.html', new Response('hola mundo'));

        });

        // Leer un archivo en particular y lo imprimimos en consola
        cache.match('index.html')
            .then( resu => {
                resu.text().then( console.log );
            });

    });

    //Obtenemos todos los caches que tenemos 
    // Retorna un arreglo de todos los caches
    caches.keys().then( keys => {
        console.log(keys);
    })

}