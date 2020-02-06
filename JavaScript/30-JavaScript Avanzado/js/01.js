// This con Implicit binding

const usuario = {
    nombre: 'Juan',
    edad: 20,
    presentacion() {
        console.log(`Mi nombre es ${this.nombre}  y tengo ${this.edad}`);
    }, 
    mascota: {
        nombre: 'Hook',
        edad: 1, 
        presentacion() {
            console.log(`Mi nombre es ${this.nombre}  y tengo ${this.edad}`);
        }
    }
}

usuario.presentacion();
usuario.mascota.presentacion();