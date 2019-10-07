class Camara {

    constructor(videoNode) {
        this.videoNode = videoNode;
    }

    encender() {
        // Esto enciende la camara
        navigator.mediaDevices.getUserMedia({
            audio: false,
            // por defecto te va a mostrar la calidad maxima permitida por la camara
            // le ponemos que queremos que se vea en 300x300 
            video: {
                width: 300, height: 300
            }
        }).then( strem => {
            // muestra los datos.
            this.videoNode.srcObject = strem;
            this.strem = strem;
        });
    }

    apagar() {
        this.videoNode.pause();
        if (this.strem) {
            // Detenemos el video es el array 0
            this.strem.getTracks()[0].stop();
        }

    }

    tomarFoto() {

        // Crear un elemento canvas para renderizar ahi la foto
        let canvas = document.createElement('canvas');

        // Colocar las dimensiones igual al elemento del video
        canvas.setAttribute('width', 300);
        canvas.setAttribute('height', 300);

        // obtener el contexto del canvas
        let context = canvas.getContext('2d'); // una simple imagen

        // dibujar, la imagen dentro del canvas
        context.drawImage(this.videoNode, 0,0, canvas.width, canvas.height);

        // me lo va a generar en un string en base 64
        this.foto = context.canvas.toDataURL();

        // limpieza
        canvas = null;
        context = null;

        return this.foto;
    }
}