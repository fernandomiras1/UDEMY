import { Router, Request, Response } from 'express';
import Server from '../class/server';
import { usuariosConectados } from '../sockets/socket';

const router = Router();

router.get('/mensajes', ( req: Request, res: Response ) => {

    const cuerpo = req.body.cuerpo;
    const de = req.body.de;

    const server = Server.instance;
    const payload = {
        de,
        cuerpo
    }
    server.io.emit('mensaje-nuevo', payload);

    res.json({
        ok: true,
        cuerpo,
        de
    });


  
});

router.post('/mensajes/:id', ( req: Request, res: Response ) => {

    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;

    // Llamamos a la instacia del Server. Como es sigleton, vamos a tener la misma intacia, q tenemos corriendo en nuestra app de node.
    const server = Server.instance;
    // Mandamos un mensaje a un usuario en particual. Se lo pasamos por el id.
     // Le mandamos el body ( cuerpo ' patload ');
    const payload = {
        de,
        cuerpo
    }
    server.io.in( id).emit( 'mensaje-privado', payload );

    // Para mandarecelos a todos los usuarios es simpleemtne quitamos el in(id): server.io.emit( 'mensaje-privado', payload );

    res.json({
        ok: true,
        cuerpo,
        de,
        id
    });
});

// Servicio para obtener todos los IDs de los usuarios
router.get('/usuarios', (  req: Request, res: Response ) => {

    const server = Server.instance;
    server.io.clients( ( err: any, clientes: string[] ) => {

        if (err) {
          return res.json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            clientes
        });

    } )

});

// Obtener usuarios y sus nombres
router.get('/usuarios/detalle', (  req: Request, res: Response ) => {

    res.json({
        ok: true,
        clientes: usuariosConectados.getLista()
    });  

});


export default router;