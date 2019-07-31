// Utilidades para grabar PouchDB
const db = new PouchDB('mensajes');


function guardarMensaje( mensaje ) {

    mensaje._id = new Date().toISOString();

    return db.put( mensaje ).then( () => {
        // Cuando tengas internet busca esta tarea aync y peticiona
        self.registration.sync.register('nuevo-post');
        // Creamos una respuesta para decirle al FrontEnd que estamos en offline
        const newResp = { ok: true, offline: true };

        return new Response( JSON.stringify(newResp) );

    });

}


// Postear mensajes a la API
function postearMensajes() {

    const posteos = [];
    // barremos todos los documentos que tenemos en la base de datos IndexDB
    return db.allDocs({ include_docs: true }).then( docs => {

        // recorremos cada una de las filas.
        docs.rows.forEach( row => {

            const doc = row.doc;

            const fetchPom =  fetch('api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( doc )
                }).then( res => {
                    // eliminamos el doc en IndexDB
                    return db.remove( doc );

                });
            // lo incertamos en el array a cada una de las promesas.
            posteos.push( fetchPom );


        }); // fin del foreach

        return Promise.all( posteos );

    });





}

