
const fs = require('fs');
const vapid = require('./vapid.json');
const webpush = require('web-push');
const urlsafeBase64 = require('urlsafe-base64');
// cargamos el array de subcrivciones con los array del json.
let suscripciones = require('./subs-db.json');

webpush.setVapidDetails(
    'mailto:fernando.miras.pc@gmail.com',
    vapid.publicKey,
    vapid.privateKey
);

module.exports.getKey = () => {
 return  urlsafeBase64.decode(vapid.publicKey);   
};

module.exports.addSubscription = ( suscripcion ) => {
    suscripciones.push(suscripcion);
    // simulamos una base de datos, lo vamos a guadar en un archivo json
    fs.writeFileSync(`${ __dirname }/subs-db.json`, JSON.stringify(suscripciones));
};

module.exports.sendPush = ( post ) => {

    let notificacionesEnvidas = [];

    suscripciones.forEach( (suscripcion, index) => {

        const pushProm = webpush.sendNotification(suscripcion, JSON.stringify(post))
        .then( console.log('Notificacion Enviada'))
        .catch( err => {
            console.log('Notificaion Fallo');
            // Si no existe mas esa notificacion
            if ( err.statusCode === 410 ) {
                // Borramos esa suscripcion
                suscripciones[index].borrar = true;
            }
        });

        notificacionesEnvidas.push( pushProm );
    });

    // Borramos todos
    Promise.all(notificacionesEnvidas).then( () => {
        suscripciones = suscripciones.filter( subs => !subs.borrar );
        fs.writeFileSync(`${ __dirname }/subs-db.json`, JSON.stringify(suscripciones));
    });
}