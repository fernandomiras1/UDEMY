import { Router, Request, Response } from 'express';
import Server from '../class/server';
import { usuariosConectados } from '../sockets/socket';
import { GraficaData } from '../class/grafica';
import { EncuestaData } from '../class/encuesta';
import { Mapa } from '../class/mapa';

const router = Router();

// MAPAS 
export const mapa = new Mapa();
const lugares = [
    {
      id: '1',
      nombre: 'Udemy',
      lat: 37.784679,
      lng: -122.395936
    },
    {
      id: '2',
      nombre: 'Bahía de San Francisco',
      lat: 37.798933,
      lng: -122.377732
    },
    {
      id: '3',
      nombre: 'The Palace Hotel',
      lat: 37.788578,
      lng: -122.401745
    }
  ];
 // Lo inicerta como elementos independientes
  mapa.marcadores.push(...lugares);

  // Get Obtener todos los marcadores
  router.get('/mapa', ( req: Request, res: Response ) => {
    res.json( mapa.getMarcadores() );
});

// FIN MAPAS

// Creamos una instancia para poder trabajar con los metodos de la grafica
const grafia = new GraficaData();
const encueta = new EncuestaData();

router.get('/grafica', ( req: Request, res: Response ) => {

    res.json( grafia.getDataGrafica() );
  
});

// router.post('/grafica', ( req: Request, res: Response ) => {

//     const mes = req.body.mes;
//     const unidades = Number(req.body.unidades);
//     console.log('mes', mes + 'uni', unidades);
//     grafia.incrementarValor( mes, unidades );

//     const server = Server.instance;
//     server.io.emit('cambio-grafica', grafia.getDataGrafica() ) 

//     res.json( grafia.getDataGrafica() );
// });


router.post('/encuesta', ( req: Request, res: Response ) => {

    const opcion = Number(req.body.opcion);
    const unidades = Number(req.body.unidades);

    encueta.incrementarValor( opcion, unidades );

    const server = Server.instance;
    server.io.emit('cambio-encuenta', encueta.getDataGrafica() ) 

    res.json( encueta.getDataGrafica() );
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