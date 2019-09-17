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

    }
}