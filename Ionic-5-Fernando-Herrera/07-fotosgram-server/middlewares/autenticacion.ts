import { Response, Request, NextFunction } from 'express';
import Token from '../classes/token';
 

export const verificaToken = ( req: any, res: Response, next: NextFunction  ) => {

    const userToken = req.get('x-token') || '';

    Token.comprobarToken( userToken )
        .then(  (decoded: any) => {
            console.log('Decoded', decoded );
            // le agregamos la info del usuario.
            req.usuario = decoded.usuario;
            next(); // mi token es correcro. llamaos puede continucar con el siguiente paso.
        })
        .catch( err => {

            res.json({
                ok: false,
                mensaje: 'Token no es correcto'
            });

        });




}


