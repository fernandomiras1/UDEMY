// Variables
const presupuestoUsuario = prompt('¿Cuál es tu presupuesto Semanal?');
let cantidadPresupuesto;
// Clases

//Presupuesto
class Presupuesto {
    constructor(presupuesto) {
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
    }

    // Metodo para ir restando del presupuesto actual
    presupuestoRestante(cantidad = 0) {
        return this.restante -= Number(cantidad);
    }
}

// Clase de Interfaz, maneja todo relacioando al HTML
class Interfaz {
    insertarPresupuesto(cantidad) {
        const presuSpan = document.querySelector('span#total');
        const restanteSpan = document.querySelector('span#restante');

        //Insertar al HTML
        presuSpan.innerHTML = `${cantidad}`;
        restanteSpan.innerHTML = `${cantidad}`;
    }
}

// Event Listener
document.addEventListener('DOMContentLoaded', () => {
    if ( presupuestoUsuario === null || presupuestoUsuario === '') {
        window.location.reload();
    } else {
        // Instancia un presupuesto.
        cantidadPresupuesto = new Presupuesto(presupuestoUsuario);
        // Instanciar la clase del Interfaz
        const ui = new Interfaz();
        ui.insertarPresupuesto(cantidadPresupuesto.presupuesto);
    }
});