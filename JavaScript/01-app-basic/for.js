const nombres = ['fer', 'fede', 'emi'];

const persona = {
    altura: '2m',
    peso: '80 kilos'
}

for ( let p in persona) {

    console.log(`objeto ${p}: propiedad: ${persona[p]}`);
}


for( let nombre of nombres.entries() ) {
    console.log(nombre);
}