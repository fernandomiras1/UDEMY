import { Store, createStore } from 'redux';
import { contadorReducer } from './contador/contador.reducer';
import { incrementadorAction } from './contador/contador.actions';


const store: Store = createStore( contadorReducer );

// Cuando cambie el store me notifica con un console.log
store.subscribe( () => {
    console.log('Sub:', store.getState() );
});

store.dispatch( incrementadorAction );
store.dispatch( incrementadorAction );
store.dispatch( incrementadorAction );
store.dispatch( incrementadorAction );
store.dispatch( incrementadorAction );
store.dispatch( incrementadorAction );