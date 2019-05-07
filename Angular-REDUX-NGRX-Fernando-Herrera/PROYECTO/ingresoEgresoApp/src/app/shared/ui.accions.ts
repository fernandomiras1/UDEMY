import { Action } from '@ngrx/store';

export const ACTIVAR_LOADING = '[UI Loading] Cargando...';
export const DESACTIVAR_LOADING = '[UI Loading] Fin de Carga';


export class ActivarLoadingAccion implements Action {
    readonly type = ACTIVAR_LOADING;
}

export class DesactivarLoadingAccion implements Action {
    readonly type = DESACTIVAR_LOADING ;
}

export type acciones = ActivarLoadingAccion | DesactivarLoadingAccion;