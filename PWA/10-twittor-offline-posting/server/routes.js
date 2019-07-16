// Routes.js - Módulo de rutas
var express = require('express');
var router = express.Router();







// Get mensajes
router.get('/', function (req, res) {
  res.json('Obteniendo mensajes');
});




module.exports = router;