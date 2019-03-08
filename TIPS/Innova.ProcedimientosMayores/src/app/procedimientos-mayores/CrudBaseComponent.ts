import { Input } from "@angular/core";

export abstract class CrudBaseComponent {

    @Input() parametrosInicializacion: any;
    public isView: boolean;
    public eventSubscriptions: Array<any> = new Array<any>();
    protected maxLengthAutoComplete: number = 3;

    constructor() {}

    public setMode(mode: boolean) {
        this.isView = mode
    }

    public numberOnly(event): boolean {
        const charCode = event.which ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
        }
        return true;
    }

    public imprimirDocumento(reporteEnBase64: any) {
        var winparams = 'dependent=yes,locationbar=no,scrollbars=yes,menubar=yes,resizable,screenX=10,screenY=10,width=850,height=1050';
        var popupWin = '<embed width=100% height=100% type="application/pdf" src="data:application/pdf;base64,' + reporteEnBase64 + '"></embed>';
        var printWindow = window.open("", "PDF", winparams);
        printWindow.document.write(popupWin);
    }

    protected isLengthValid( vale: string ): boolean {
        return (vale.length >= this.maxLengthAutoComplete) ? true : false;
    }

    public abstract ngOnDestroy(): void;
}
