 console.log('SW');

self.addEventListener('fetch', event => {
    console.log(event);


    // podemos intercectar el style.css
    // if ( event.request.url.includes('style.css') ) {
    //     event.respondWith( null);
    // } else {
    //     event.respondWith( fetch( event.request ) );
    // }

    // Tarea Interceptar la pteticion de la img (main.jpg) y cambiarla por otra imagen. 
    // if ( event.request.url.includes('main.jpg') ) {
      
    //     let resp = fetch('img/main-patas-arriba.jpg');
    //     console.log(resp);
    //     event.respondWith( resp );
    // }

    // Manejo de erroers
    // en el DOM <img src="img/main3.jpg" alt="Vías del tren" class="img-fluid"> Agrege una imgen que no existe 
    // Con el resp puedo manejar el respuesta y manipular esa imagen. o cualquier cosa que sea res.ok = false.
    const resu = fetch( event.request ).then(resp => resp.ok ? resp : fetch('img/main.jpg'));
    event.respondWith( resu );


});