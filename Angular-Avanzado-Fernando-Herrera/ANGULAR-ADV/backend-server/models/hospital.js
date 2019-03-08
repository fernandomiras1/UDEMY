var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var hospitalSchema = new Schema(
  {
    nombre: { type: String, required: [true, 'El nombre	es necesario'] },
    img: { type: String, required: false },
    // Obtenemos el id del usuario
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' }
  },
  // esto simplemente es para evitar que Mongoose coloque el nombre a la colección como	hospitals.
  { collection: 'hospitales' }
);

// Necesito poder usar este esquema  afuera del archivo
module.exports = mongoose.model('Hospital', hospitalSchema);
