
// indexedDB: Reforzamiento

// crear base de datos
let request = window.indexedDB.open('mi-database', 1);

// se actaliza cuando se crea o se sube de version de la DB.
request.onupgradeneeded = event => {
    console.log('actalizacion de base de datos');
    // referencia de la base de datos
    let db = event.target.result;

    // creamos una tabla
    db.createObjectStore('heroes', {
        keyPath: 'id'
    });

}

// Manejo de errores
request.onerror = event => {
    console.log('DB error', event.target.error);
};

// Insertar datos
request.onsuccess = event => {
    // referencia de la base de datos
    let db = event.target.result;

    let heroesData = [
        {
            id: '11',
            herore: 'Spiderman',
            mensaje: 'Aqui su amigo Spiderman'
        },
        {
            id: '22',
            herore: 'Ironman',
            mensaje: 'Aqui su amigo Ironman'
        }
    ];

    // Grabar en la DB
    // Definimos la tabla donde guardamos la data.
    let heroesTransaction = db.transaction('heroes', 'readwrite');
    heroesTransaction.onerror = event => {
        console.log('Error guardando', event.target.error);
    };
    // Informa sobre el extito de la transaccion
    heroesTransaction.oncomplete = event => {
        console.log('Transaccion hecha', event);
    };
    // Referencia a donde voy a guardar la data
    let heroresStore = heroesTransaction.objectStore('heroes');
    // Incertamos los registros uno por uno
    for ( let heroe of heroesData ) {
        heroresStore.add( heroe );
    }

    heroresStore.onsuccess = event => {
        console.log('Nuevo item agregado a la base de datos');
    }

}



