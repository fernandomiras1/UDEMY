 
 import * as fromUI from './ui.accions';

 export interface State {
     isLoading: boolean;
 }
 
 const initState : State = {
     isLoading: false
 };

 export function uiReducer( state = initState, accion: fromUI.acciones ): State {
     
    switch( accion.type ) {


        case fromUI.ACTIVAR_LOADING:
            return {
                isLoading: true
            };

        case fromUI.DESACTIVAR_LOADING:
            return {
                isLoading: false
            };

        default:
            return state;
    }
 }