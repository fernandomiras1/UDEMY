'use strict';

const rand = () => Math.random() * 100 | 0

const a = { 
    value: 1, 
    valueOf(){ return this.value++; }
};












if(a == 1 && a == 2 && a == 3){
    console.log('Esto es magia negra señores');
} else {
    console.info('Todo es como debería');
}
















a.valueOf = rand;

console.log(a + 3)
console.log(a + 3)



const bankAcc = ( nombre, apellido, edad, balance = 0 ) => {
    return {
        nombre, 
        apellido, 
        edad, 
        balance,
        valueOf() {
            return this.balance
        }}
};

const bankAccJoe = bankAcc('Joe', 'Smith', 54, 200);
console.log(bankAccJoe.balance);
const bankAccPepita = bankAcc('Pepita', 'Rodríguez', 24, 100);
console.log(bankAccPepita.balance);


console.log( bankAcc('PepiJoe', 'Rodríguez', 99, bankAccJoe + bankAccPepita) );





const fracciones = (n, d) => ({
    numerador: n, divisor:d,
    valueOf(){ return n / d}
});

const cosa = fracciones(10,2);
console.log(cosa);



const numero_uno = { name:  "uno" , valueOf(){ return 1}};

numero_uno * 2
(numero_uno + numero_uno )* 2
numero_uno.name;