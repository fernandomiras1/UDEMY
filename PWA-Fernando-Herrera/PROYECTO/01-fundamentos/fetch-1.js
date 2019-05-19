
// Forma vieja , basica de JavaScript

var request = new XMLHttpRequest();

// true si es una peticion asincrona
request.open('GET', 'https://reqres.in/api/users', true);
// Por si necesito mandar algun arguemento, en este caso no. 
request.send(null);

request.onreadystatechange = function( state ) {
    // El estado 4 , quiere decir que la operacion termino.
    if ( request.readyState === 4 ) {
        // el objeto viene en texto plano. String
        var resp = request.response;
        // Lo trasformamaos a un objeto
        var respObj = JSON.parse( resp );

        console.log( respObj );
    }


};




