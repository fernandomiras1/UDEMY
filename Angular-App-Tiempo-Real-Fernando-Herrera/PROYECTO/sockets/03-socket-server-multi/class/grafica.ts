export class GraficaData {

    private meses: string[] = ['enero', 'febrero', 'marzo', 'abril'];
    private valores: number[] = [0,0,0,0];

    constructor() {}

    getDataGrafica() {
        return [
            { data: this.valores, label: 'Ventas'}
        ];
    }

    incrementarValor( mes: string, valor: number) {
        // Manejamos todo en minuscula
        mes = mes.toLocaleLowerCase().trim();

        for( let i in this.meses) {
            if ( this.meses[i] === mes) {
                this.valores[i] += valor;
            }
        }

        return this.getDataGrafica();

    }

}