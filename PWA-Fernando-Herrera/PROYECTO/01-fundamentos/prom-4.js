
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

        setTimeout( ()=> {
            
            // resolve( numero + 1 );
            reject( 'Error en sumar rápido' );

        }, 1000 );

    });

}

// Devuelve el valor de la funcion que responde mas rapdio en este caso el resulkado es 11
// Si demoran el mimso tiempo, la prioridad la va a teener la funcion de la izquierda
Promise.race( [ sumarLento(5), sumarRapido(10) ] )
        .then( respuesta => {
            console.log(respuesta);
        })
        .catch( console.log );

