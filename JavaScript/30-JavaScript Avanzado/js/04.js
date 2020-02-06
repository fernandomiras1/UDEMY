// Window Binding
function obtenerAuto() {
    console.log(`Mi auto es color ${this.color}`);
}
const color = 'Negro'; // undefined
window.color = 'Negro'; // Color Negro

obtenerAuto();