// Patrón módulo: es una funcion anotnima autoinvocada
const miModulo = (() => {
    'use strict' // le dice a javascirpt que sea mas estrico a la hora de evaluar el codigo

    /**
     * 2C = Two of Clubs (2 de treboles)
     * 2D = Two of Diamonds (2 de Diamante)
     * 2H = Two of Hearts (2 de Corazones)
     * 2S = Two of Spades (2 de Espada)
     */
    
    let deck         = []; // baraja de cartas
    const tipos      = ['C','D','H','S'], // tipos de cartas
          especiales = ['A','J','Q','K']; // el valor del juego es 10 puntos, menos es 'A' q vale 11
    
    let puntosJugadores = [];
    
    // Referencias del HTML
    const btnPedir   = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener'),
          btnNuevo   = document.querySelector('#btnNuevo');
    
    const divCartasJugadores = document.querySelectorAll('.divCartas'),
          puntosHTML       = document.querySelectorAll('small');
    
    // Esta función inicializa el juego
    const inicializarJuego = ( numJugadores = 2) => {
        deck = crearDeck();
        puntosJugadores = [];
        for ( let i = 0; i< numJugadores; i++) {
            puntosJugadores.push(0);
        }
        console.clear();
        puntosHTML.forEach(item => item.innerText = 0);
        divCartasJugadores.forEach(item => item.innerText = '');
    
        btnPedir.disabled   = false;
        btnDetener.disabled = false;
    }
    
    // Esta función crea una nueva baraja
    const crearDeck = () => {
        deck = [];
        // Recoremos los numeros
        for( let i = 2; i <= 10; i++ ) {
            for( let tipo of tipos ) {
                deck.push( i + tipo);
            }
        }
        // recoremos las letras
        for( let tipo of tipos ) {
            for( let esp of especiales ) {
                deck.push( esp + tipo);
            }
        }
        return _.shuffle( deck ); // devuele un array alatorio
    }
    
    // Esta función me permite tomar una carta
    const pedirCarta = () => {
    
        if ( deck.length === 0 ) {
            throw 'No hay cartas en la baraja';
        }
        return deck.pop(); // tomo la ultima carta
    }
    
    // Necesitamos saber cual es el valor de esa carta
    const valorCarta = ( carta ) => {
        // substring: voy a cortar de la posicion 0 y oviar la ultima letra
        const valor = carta.substring(0, carta.length - 1); // extraemos la primera letra o numero
        // isNaN = si es un numero, un true si no es un numero
        if (isNaN( valor )) {
            console.log('No es un numero');
        } else {
            console.log('Es un numero');
        }
        // valor * 1 = lo pasamos a un numero. porq esta en string
        return ( isNaN( valor ) ) ? 
                ( valor === 'A' ) ? 11 : 10
                : valor * 1;
    }
    // Turno: 0 = Primer jugador y el ultimo sera la computadora
    const acumularPuntos = ( carta, turno ) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta( carta );
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    const crearCarta = (carta, turno) => {
        // <img class="carta" src="assets/cartas/2C.png">
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${ carta }.png`; //3H, JD
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append(imgCarta);
    }
    
    // turno de la computadora
    const turnoComputadora = ( puntosMinimos ) => {
        let puntosComputadora = 0;

        do {
            const carta = pedirCarta();
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1 );
            crearCarta(carta, puntosJugadores.length - 1);
        
        } while(  (puntosComputadora < puntosMinimos)  && (puntosMinimos <= 21 ) );
    
        determinarGanador();
    }

    const determinarGanador = () => {
        const [puntosMinimos, puntosComputadora] = puntosJugadores;
        // ejecuta esto depues que termine de correr el hilo de do while
        setTimeout(() => {
            if( puntosComputadora === puntosMinimos ) {
                alert('Nadie gana :(');
            } else if ( puntosMinimos > 21 ) {
                alert('Computadora gana')
            } else if( puntosComputadora > 21 ) {
                alert('Jugador Gana');
            } else {
                alert('Computadora Gana')
            }
        }, 100 );
    }
    
    
    // Eventos
    btnPedir.addEventListener('click', () => {
    
        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta, 0 );
        crearCarta(carta, 0);

        if ( puntosJugador > 21 ) {
            console.warn('Lo siento mucho, perdiste');
            btnPedir.disabled   = true;
            btnDetener.disabled = true;
            turnoComputadora( puntosJugador );
    
        } else if ( puntosJugador === 21 ) {
            console.warn('21, genial!');
            btnPedir.disabled   = true;
            btnDetener.disabled = true;
            turnoComputadora( puntosJugador );
        }
    
    });
    
    
    btnDetener.addEventListener('click', () => {
        btnPedir.disabled   = true;
        btnDetener.disabled = true;
        
        turnoComputadora( puntosJugadores[0] );
    });
    
    btnNuevo.addEventListener('click', () => {
        inicializarJuego();
    });

    // todo lo que este dentro del return va a ser publico.
    return {
       nuevoJuego: inicializarJuego
    };

})();
