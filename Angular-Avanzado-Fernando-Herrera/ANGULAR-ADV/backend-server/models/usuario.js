var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol permitido'
};

// Generamos el esquema que va a tener el Usuario. 
// Tiene que ser igual a la talba en la bd. (Menos el id)
var usuarioSchema = new Schema({
 
    nombre: { type: String, required: [true, 'El nombre es necesario']},
    email: { type: String, unique:true, required: [true, 'El correo es necesario']},
    password: { type: String, required: [true, 'La contraseña es necesario']},
    img: { type: String, required: false},
    role: { type: String, required: true, default: 'USER_ROLE', enum: rolesValidos},
    google: { type: Boolean, default: false }

});

usuarioSchema.plugin( uniqueValidator, { message: 'El {PATH} debe de ser único'});

// Necesito poder usar este esquema  afuera del archivo
module.exports = mongoose.model('Usuario', usuarioSchema);

