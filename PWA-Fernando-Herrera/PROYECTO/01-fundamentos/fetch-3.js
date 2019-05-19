
// Petición POST
// https://reqres.in/api/users


let usuario = {
    nombre: 'Fernando',
    edad: 32
};

fetch( 'https://reqres.in/api/users', {
    method: 'POST', // PUT
    body: JSON.stringify( usuario ), // data: JSON en forma de String
    headers: {
        'Content-Type': 'application/json'
    }
})
.then( resp => resp.json() ) // es una promesa
.then( console.log )
.catch( error => {
    console.log('Error en la petición');
    console.log(error);
});


