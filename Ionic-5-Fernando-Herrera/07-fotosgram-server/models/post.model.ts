
import { Schema, Document, model } from 'mongoose';

const postSchema = new Schema({

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
        type: String   // -13.313123, 12.3123123
    },
    usuario: {
        type: Schema.Types.ObjectId, // mantenenmos la referencia a la tabla usuario.
        ref: 'Usuario', // referencia de la tabla usuario.
        required: [ true, 'Debe de existir una referencia a un usuario' ]
    }
});

// pre. antes del guardado (save).
postSchema.pre<IPost>('save', function( next ) {
    this.created = new Date(); // hacemos que la fecha se genere automaticamene cada vez que haga un posteo.
    next();
});

interface IPost extends Document {
    created: Date;
    mensaje: string;
    img: string[];
    coords: string;
    usuario: string;
}

export const Post = model<IPost>('Post', postSchema);
