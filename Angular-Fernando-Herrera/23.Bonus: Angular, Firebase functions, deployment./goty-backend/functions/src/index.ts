import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';

const serviceAccount = require('./serviceAccountKey.json');
// tenemos configruado nuestra base de datos.
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://firestore-grafica-4990a.firebaseio.com"
});
// va hacer referencia a mi base de datos de firebase
const db = admin.firestore();
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.json("Hola mundo desde Funciones de Firebase");
});

export const getGOTY = functions.https.onRequest( async (request, response) => {
 
    // const nombre = request.query.nombre || 'Sin nombre';
    const gotyRef  = db.collection('goty');
    const docsSnap = await gotyRef.get();
    const juegos   = docsSnap.docs.map(doc => doc.data());

    response.json(juegos);

});

// Express
const app = express();
app.use( cors({ origin: true })); // permitimos cualquier peticion de otros dominos

app.get('/goty', async (req, res) => {

    const gotyRef  = db.collection('goty');
    const docsSnap = await gotyRef.get();
    const juegos   = docsSnap.docs.map(doc => doc.data());

    res.json(juegos);

});

app.post('/goty/:id', async (req, res) => {

    const id = req.params.id;
    const gameRef = db.collection('goty').doc(id);
    const gameSnap = await gameRef.get();

    if ( !gameSnap.exists ) {
        res.status(404).json({
            ok: false,
            mensaje: 'No existe un juego con ese ID' + id
        });
    } else {
        const antes = gameSnap.data() || {votos: 0};
        await gameRef.update({
            votos: antes.votos + 1 // ingremetamos el voto de ese jugador
        });

        res.json({
            ok: true,
            mensaje: 'Gracias por tu voto ' + antes.name
        });
    }

});



// le decimos a firevase que tenemos un serv express coriendo.
export const api = functions.https.onRequest(app);