### Operadores RxJS en Angular

**merge**: Esta función recibe uno o más observables y el resultado será el producto de todos los observables combinados simultáneamente.

**startWith**: Especifica con qué valor deseas que comience la emisión. Puedes enviar cualquier argumento y siempre comenzará la emisión con ese valor.

**endWith**: Especifica con qué valor deseas que termine la emisión.

**concat**: Crea un Observable de salida que emite secuencialmente todos los valores de un Observable dado y luego pasa al siguiente.

**combineLatest**: Combina múltiples observables para crear un observable cuyos valores se calculan a partir de los últimos valores de cada uno de sus observables de entrada.

**forkJoin**: Acepta un array de observables o un diccionario de objetos de ObservableInput y devuelve un Observable que emite una matriz de valores en el mismo orden exacto que el array pasado, o un diccionario de valores en la misma forma que el diccionario pasado.

**from**: Función para generar arreglos.

**take**: Este operador es sumamente útil cuando deseas limitar la cantidad de emisiones que un observador puede tener.

**first**: Se completa en la primera suscripción, sin importar que después tengamos otras emisiones de diferentes valores.

**takeWhile**: Permite recibir valores mientras la condición se cumpla.

**distinct**: Sólo deja pasar las emisiones cuyos valores no han sido previamente emitidos.

**distinctUntilChanged**: Emite valores siempre y cuando la emisión anterior no sea la misma.

**debounceTime**: Cuando escribimos en un input, después de 3 segundos va a emitir el resultado escrito.

**switchMap**: Sólo mantiene una suscripción interna activa, mientras que el mergeMap puede mantener todas.

**concatMap**: Sirve para concatenar los observables resultantes que pueden fluir a través de ese operador. Es decir, hasta que no se termine el observable actual, no pasa al siguiente, poniéndolo en una cola.
