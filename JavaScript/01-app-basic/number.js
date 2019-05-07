// Numeros en JavaScript

const numero1 = 30;
const numero2 = 20;
const numero3 = 20.20;
const numero4 = .1020;
const numero5 = -3;

let resultado;

// Suma
resultado = numero1 + numero2;
// Resta
resultado = numero1 - numero2;
// Multi
resultado = numero1 * 2;
// Dividir
resultado = numero1 / numero2;
// Modulo - te regresa el residuo 
resultado = numero1 % numero2;
// PI
resultado = Math.PI;
// Redondeo del 2.5 se redondea a 3
resultado = Math.round(2.5);
// Redondeo hacia arriba
resultado = Math.ceil(2.1);
// Redondeo hacia abajo, redondea a 2 
resultado = Math.floor(2.99);
// Raiz cuadrada
resultado = Math.sqrt(144);
// Absoluto - solo el numero entero
resultado = Math.abs(numero5);
// Potencia
resultado = Math.pow(8, 3);
// Minimo
resultado = Math.min(1,2,3,4,8,34);
// Maximo
resultado = Math.max(1,2,3,4,8,34);
// Aleatorio
resultado = Math.random();


console.log(resultado);
