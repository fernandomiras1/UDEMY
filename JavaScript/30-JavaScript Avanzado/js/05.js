// JavaScript Event Loop

console.log('Yo me mostraré primero');

setTimeout(function() {
    console.log('Yo me mostraré segundo');
}, 0);


console.log('Yo me mostraré tercero');

setTimeout(function() {
    console.log('YO Cuarto');
}, 0);

new Promise(function(res) {
    res('Yo soy un promise')
}).then(console.log);


console.log('Yo 5to');