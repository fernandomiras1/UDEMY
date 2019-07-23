// Routes.js - Módulo de rutas
var express = require('express');
var router = express.Router();



const mensajes = [
  {
    _id: 'xxx',
    user: 'Spiderman',
    mensaje: 'hola Mundo'
  },
  {
    _id: 'xxx',
    user: 'wolverine',
    mensaje: 'hola wolverine'
  },
  {
    _id: 'xxx',
    user: 'ironman',
    mensaje: 'hola ironman'
  }

];


// Get mensajes
router.get('/', function (req, res) {
  res.json(mensajes);
});

// Get mensajes
router.post('/', function (req, res) {

  const mensaje = {
    mensaje: req.body.mensaje,
    user: req.body.user
  };

  mensajes.push( mensaje );

  res.json({
    ok: true,
    
  })

  res.json(mensajes);
});




module.exports = router;