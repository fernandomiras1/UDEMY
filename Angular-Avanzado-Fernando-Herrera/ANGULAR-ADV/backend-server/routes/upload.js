// Requires (Librerias que va a tener el proyecto)
var express = require('express');
var enumConfig = require('../ui/enum');
var fileUpload = require('express-fileupload');
// FileSystem: Manipulas archivos en windows, en este caso tenemos que borrar la imagen en el explorador
var fs = require('fs');

var app = express();

var Usuario = require('../models/usuario');
var Medico = require('../models/medico');
var Hospital = require('../models/hospital');

// default options
app.use(fileUpload());

app.put('/:tipo/:id', (req, res, next) => {

    var tipo = req.params.tipo;
    var id = req.params.id;

   

    if (enumConfig.tiposValidos.indexOf(tipo) < 0) {
        return  res.status(400).json({
            ok: false,
            mensaje: 'Tipo de colección no es válida',
            error: { mensaje: 'Tipo de colección no es válida'}
        });
    }

    // Si vienen archivos
    if (!req.files) {
        return  res.status(500).json({
            ok: false,
            mensaje: 'No selecciono ningun archivo',
            error: { mensaje: 'Debe de seleccionar una imagen'}
        });
    }

    // Obtener nombre del archivo
    var archivo = req.files.imagen;
    // Obtenemos la extencion del arcivo (.jpg) Lo ultimo es la extencion del archivo
    var nombreCortado = archivo.name.split('.');
    var extensionArchivo = nombreCortado[nombreCortado.length -1];

    // Solo estas extensiones aceptamos
    var extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'];

    if (extensionesValidas.indexOf(extensionArchivo) < 0) {

        return  res.status(500).json({
            ok: false,
            mensaje: 'Extension no válida',
            error: { mensaje: 'Las extensiones válidas son ' + extensionesValidas.join(', ')}
        });

    }

    // Nombre de archivo personalizado ( id_Usuario-nombreimg.png)
    var nombreArchivo = `${ id }-${ new Date().getMilliseconds() }.${ extensionArchivo }`;
    
    // Mover el Archivo del temporal a un path
    var path = `./uploads/${tipo}/${nombreArchivo}`;

    //Movemos el Archivo a la ruta
    archivo.mv(path, err => {
        if (err) {
            return  res.status(500).json({
                ok: false,
                mensaje: 'Error al mover archivo',
                error: err
            });
        }

        subirPorTipo(tipo, id, nombreArchivo, res);

    });
});


function subirPorTipo(tipo, id, nombreArchivo, res) {

    if (tipo === 'usuarios') {

      Usuario.findById(id, (err, usuario) => {


        if (!usuario) {
            return  res.status(400).json({
                ok: false,
                mensaje: 'Usuario no encotrado',
                error: { mensaje: 'Usuario no encotrado'}
            });
        }

        if (err) {

            return  res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar el usuario',
                error: err
            });

        }

        var pathViejo = './uploads/usuarios/' + usuario.img;

        // Si existe, elimina la imagen anterior
        if (fs.existsSync(pathViejo)) {
            fs.unlink(pathViejo);
        }

        //Guardo el nombre del Archivo en la base de datos. 
        usuario.img = nombreArchivo;

        usuario.save( (err, usuarioActualizado) => {

            if (err) {

                return  res.status(500).json({
                    ok: false,
                    mensaje: 'Error al actualizar un archivo',
                    error: err
                });

            }

         usuarioActualizado.password = 'null';
        return res.status(200).json({
            ok: true,
            mensaje: 'Imagen de usuario actualizada',
            usuario: usuarioActualizado
          });

        });

      
      });
        
    }

    if (tipo === 'medicos') {

        Medico.findById(id, (err, medico) => {

            if (!medico) {
                return  res.status(400).json({
                    ok: false,
                    mensaje: 'Medico no encotrado',
                    error: { mensaje: 'Medico no encotrado'}
                });
            }

            if (err) {
    
                return  res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar el medico',
                    error: err
                });
    
            }
    
            var pathViejo = './uploads/medicos/' + medico.img;
    
            // Si existe, elimina la imagen anterior
            if (fs.existsSync(pathViejo)) {
                fs.unlink(pathViejo);
            }
    
            //Guardo el nombre del Archivo en la base de datos. 
            medico.img = nombreArchivo;
    
            medico.save( (err, medicoActualizado) => {
    
                if (err) {
    
                    return  res.status(500).json({
                        ok: false,
                        mensaje: 'Error al actualizar un archivo',
                        error: err
                    });
    
                }
    
            return res.status(200).json({
                ok: true,
                mensaje: 'Imagen del medico actualizada',
                medico: medicoActualizado
              });
    
            });
    
          
          });

    }

    if (tipo === 'hospitales') {

        Hospital.findById(id, (err, hospital) => {

            if (!hospital) {
                return  res.status(400).json({
                    ok: false,
                    mensaje: 'Hospital no encotrado',
                    error: { mensaje: 'Hospital no encotrado'}
                });
            }

            if (err) {
    
                return  res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar el hospital',
                    error: err
                });
    
            }
    
            var pathViejo = './uploads/hospitales/' + hospital.img;
    
            // Si existe, elimina la imagen anterior
            if (fs.existsSync(pathViejo)) {
                fs.unlink(pathViejo);
            }
    
            //Guardo el nombre del Archivo en la base de datos. 
            hospital.img = nombreArchivo;
    
            hospital.save( (err, hospitalActualizado) => {
    
                if (err) {
    
                    return  res.status(500).json({
                        ok: false,
                        mensaje: 'Error al actualizar un archivo',
                        error: err
                    });
    
                }
    
            return res.status(200).json({
                ok: true,
                mensaje: 'Imagen del hospital actualizado',
                hospital: hospitalActualizado
              });
    
            });
    
          
          });

    }

}

// Exportamos para poderlo utilizar en otros archivos
module.exports = app;