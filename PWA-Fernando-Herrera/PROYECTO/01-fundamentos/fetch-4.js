
let img = document.querySelector('img');

fetch( 'superman.png' ) // podemos usar el fetch para almacenar imagens / pdf en el cache de mi navegador.
    .then( resp => resp.blob() )
    .then( imagen => {

        console.log(imagen);
        var imgPath = URL.createObjectURL( imagen );
        img.src = imgPath;

    });
    
