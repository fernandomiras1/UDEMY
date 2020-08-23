"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const mongoose_1 = require("mongoose");
const postSchema = new mongoose_1.Schema({
    created: {
        type: Date
    },
    mensaje: {
        type: String
    },
    // una coleccion de imagenes en Array
    imgs: [{
            type: String
        }],
    coords: {
        type: String // -13.313123, 12.3123123
    },
    usuario: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'Debe de existir una referencia a un usuario']
    }
});
// pre. antes del guardado (save).
postSchema.pre('save', function (next) {
    this.created = new Date(); // hacemos que la fecha se genere automaticamene cada vez que haga un posteo.
    next();
});
exports.Post = mongoose_1.model('Post', postSchema);
