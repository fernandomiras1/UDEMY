import { mensaje } from "./string";

// Agrupador de pruebas
describe('Pruebas de String', () => {

    // Prueba en espesifico
    it('Debe de regresar un string', () => {

        const resp = mensaje('Fernando');

        // Espera que esto sea un string.
        expect( typeof resp ).toBe('string');
    });
    
    it('Debe de retornar un saludo con el nombre enviado', () => {

        const nombre = 'Fer';
        const resp = mensaje( nombre );

        expect( resp ).toContain( nombre );
    });
});