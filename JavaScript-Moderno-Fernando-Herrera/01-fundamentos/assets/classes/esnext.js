

class Rectangulo {

    // Solo funciona en Google Crhome ( es algo muy nuevo )
    // https://caniuse.com/#feat=mdn-javascript_classes_private_class_fields
    // propiedad pribada para que no sea modificada fuera de esta clase
    #area = 0;

    constructor(base = 0, altura = 0) {
        this.base   = base;
        this.altura = altura;

        this.#area = base * altura;
    }

    calgularArea() {
        console.log( this.#area * 2 );
    }
}

const rectangulo = new Rectangulo(10, 15);
// rectangulo.#area  = 100;
rectangulo.calgularArea();

console.log(rectangulo);



