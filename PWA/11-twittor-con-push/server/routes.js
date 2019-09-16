// Routes.js - Módulo de rutas
const express = require('express');
const router = express.Router();
const push = require('./push');

const mensajes = [

  {
    _id: 'XXX',
    user: 'spiderman',
    mensaje: 'Hola Mundo'
  }

];


// Get mensajes
router.get('/', function (req, res) {
  // res.json('Obteniendo mensajes');
  res.json( mensajes );
});


// Post mensaje
router.post('/', function (req, res) {
  
  const mensaje = {
    mensaje: req.body.mensaje,
    user: req.body.user
  };

  mensajes.push( mensaje );

  console.log(mensajes);


  res.json({
    ok: true,
    mensaje
  });
});

// Almacenar la suscipcion
router.post('/subscribe', function (req, res) {
  
  const suscripcion = req.body;

  push.addSubscription(suscripcion);

  res.json( 'subscribe' );
});

// Almacenar el key
router.get('/key', function (req, res) {

  const key = push.getKey();
  
  res.send( key );
});


// Enviar una notificacion PUSH a las personas 
// q nosotros queramos.
// Es ALGO que se controla del lado del server
router.post('/push', function (req, res) {
  
  res.json( 'key público' );
});



module.exports = router;