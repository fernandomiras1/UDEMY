

// Detectar si podemos usar Service Workers
if ( navigator.serviceWorker ) {
    navigator.serviceWorker.register('sw.js')
        .then(sw => {
            // SYNC: mandamos datos al SRV cuando no hay internet
            // setTimeout(() => {
            //     sw.sync.register('post-gatitos');
            //     console.log('Se enviarion fotos de gatitos al server');
            // }, 3000);

            // PUSH: Mandamos un Push desde la app
            Notification.requestPermission().then( resu => {
                console.log(resu);
                sw.showNotification('Hola Mundo !');
            });
        });
}
