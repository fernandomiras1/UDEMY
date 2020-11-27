
/**
 *  THIS: hace referencia al contexto contexto Actual
 * 
 * 
 */

const persona1 = {
  name: 'Fer',
  say() {
    console.log('Mi nombre es ' + this.name);
  },
  eat(food) {
    console.log(this.name + 'come ' + food );
  }
}


const persona2 = {
  name: 'Jose'
};

/**
 *
  llama al metodo say, pero le especificamos el contexto de persona2. 
  Porque cambiamos el contexto de este metodo.
 */
persona1.say.call(persona2);
// SALIDA: Mi nombre es Jose

// Con parametros 
persona1.eat.call(persona2, 'Hamburgesa');
// SALIDA: Mi nombre es Jose


/**
 *
    Hace casi exactamente lo mismo q el metodo call. La diferencia entre call y applay, es como reciven los parametros, en applay se pasa como un arreglo
    call: lo recibe como una lista de parametros separados por comas.
    apply: lo recibe como un arreglo de parametros.
    bin: crear una nueva funcion con el nuevo contexto.
 */
persona1.say.apply(persona2);
// SALIDA: Jose come Hamburgesa

// Con parametros
persona1.eat.apply(persona2, ['Hamburgesa', '']);
// SALIDA: Jose come Hamburgesa

// recibe el contexto. Lo que hace es retornanos una nueva funcion con el nuevo contexto.
const say = persona1.say.bind(persona2);
say('Hamburgesa');
// SALIDA: Jose come Hamburgesa
say('Pizza');
// SALIDA: Jose come Pizza
