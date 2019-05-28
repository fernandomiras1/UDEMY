// Constructor para Seguro
function Seguro( marca, anio, tipo ) {
    this.marca = marca;
    this.anio = anio;
    this.tipo = tipo;
}

// Todo lo que se muestra 
function Interfaz() {}

const max = new Date().getFullYear(),
      min = max - 20;

console.log(max, min);


const selectAnio = document.getElementById('anio');
// creo el for para el select del año. del 2019 al 2000 
for ( let i = max; i > min; i--) {
    let option = document.createElement('option');
    option.value = i;
    option.innerHTML = i;
    selectAnio.appendChild( option );
} 