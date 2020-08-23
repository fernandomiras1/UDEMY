import { Router, Response } from 'express';
import { verificaToken } from '../middlewares/autenticacion';
import { Post } from '../models/post.model';
import { FileUpload } from '../interfaces/file-upload';
import FileSystem from '../classes/file-system';



const postRoutes = Router();
const fileSystem = new FileSystem();

// Obtener POST paginados
postRoutes.get('/', async (req: any, res: Response) => {

    let pagina = Number(req.query.pagina) || 1; // obtenemos el numero de pagina
    let skip = pagina - 1;
    skip = skip * 10;

    const posts = await Post.find()
                            .sort({ _id: -1 }) // ordenamos de forma desc. (el ultimo primero)
                            .skip( skip ) // Quiero que se salte n registros. que van a ser de 10 en 10. (paginacion)
                            .limit(10) // solo 10 registros
                            .populate('usuario', '-password') // muestra la info del usuario sin password.
                            .exec(); // ejecuta la consulta.

    res.json({
        ok: true,
        pagina,
        posts
    });


});



// Crear POST
postRoutes.post('/', [ verificaToken ], (req: any, res: Response) => {

    const body = req.body;
    body.usuario = req.usuario._id;

    const imagenes = fileSystem.imagenesDeTempHaciaPost( req.usuario._id );
    body.imgs = imagenes;


    // Guardamos en la base de datos. 
    Post.create( body ).then( async postDB => {

        // que devuela todo el objeto del usaurio, menos su password.
        // populate: obtiene la relacion del modelo 
        await postDB.populate('usuario', '-password').execPopulate();

        res.json({
            ok: true,
            post: postDB
        });

    }).catch( err => {
        res.json(err)
    });

});



// Servicio para subir archivos ( Cualquier tipo de archivos nos sirver este codigo)
postRoutes.post( '/upload', [ verificaToken ], async (req: any, res: Response) => {
    
    // Si no exite en la requesq de tipo files. No se mando nada de tipo file.
    if ( !req.files ) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No se subió ningun archivo'
        });
    }

    // obtenemos el archivo
    const file: FileUpload = req.files.image;

    if ( !file ) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No se subió ningun archivo - image'
        });
    }

    // verificamos que solo sea imagenes.
    if ( !file.mimetype.includes('image') ) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Lo que subió no es una imagen'
        }); 
    }

    await fileSystem.guardarImagenTemporal( file, req.usuario._id );

    res.json({
        ok: true,
        file: file.mimetype
    });

});


// para poder mostrar las imagenes.
postRoutes.get('/imagen/:userid/:img', (req: any, res: Response) => {

    const userId = req.params.userid;
    const img    = req.params.img;

    const pathFoto = fileSystem.getFotoUrl( userId, img );

    // mandamos la imagen. 
    res.sendFile( pathFoto );

});




export default postRoutes;