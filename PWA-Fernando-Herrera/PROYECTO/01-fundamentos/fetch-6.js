

// Obtenemos y leemos  todo el archivo de html  
fetch('no-encontrado.html')
    .then( resp => resp.text() )
    .then( html => {
        // te devuelve todo el texto (contenido) q tiene esa pag.
        console.log(html);
        let body = document.querySelector('body');

        // Reemplazamos el el body de mi pagina por el no-encontrado.html
        body.innerHTML = html;


    })
    .catch( error => {
        console.log('Error en la petición');
        console.log(error);
    });






