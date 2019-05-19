
function retornaTrue() {
    return true;
}


function sumarLento( numero ) {

    return new Promise(  function(resolve, reject){

        setTimeout( function() {

            resolve( numero + 1 );
            // reject( 'Sumar Lento falló' );

        }, 800 );

    });

}

let sumarRapido = (numero) => {

    return new Promise( (resolve, reject) => {

        setTimeout( ()=> resolve( numero + 1 ), 300 );

    });

}


let cosas = [ sumarLento(5), sumarRapido(10), true, 'hola mundo', retornaTrue() ];


// Devuelve un Array de las promesas. 
Promise.all( cosas )
        .then( respuestas => {
            console.log( respuestas );
        })
        .catch( console.log );


// sumarRapido( 10 ).then(  console.log );
// sumarLento( 5 ).then(  console.log );

