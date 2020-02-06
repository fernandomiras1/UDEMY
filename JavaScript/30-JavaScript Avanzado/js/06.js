/** Classes y Prototypes */
function Playlist(nombre) {
    this.nombre = nombre;
}
Playlist.prototype.play = function() {
    console.log(`Reproduciendo la playlist ${this.nombre}`)
}
Playlist.prototype.eliminar = function() {
    console.log(`Eliminando la playlist ${this.nombre}`)
}
const playlist = new Playlist('Rock 90s');
const playlist2 = new Playlist('Punk 90s');

console.log(playlist);
console.log(playlist2);

playlist.play()
playlist2.play()

playlist.eliminar()
playlist2.eliminar()