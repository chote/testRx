import { ActionReducer, Action as NgAction } from '@ngrx/store';
import * as a from '../action/app.actions';
export function flagReducer(state: any={isDisplay:false,activeDoctorid:1}, action: a.Action) {
    switch (action.type) {
        case a.SETACTIONDOCTORID:
            state.activeDoctorid = action.payload; 
           return state;
              default:
            return state;
    }
}
export function doctorReducer(state: any= [], action: a.Action) {
    switch (action.type) {
        case a.ADDDOCTOR:
            state = [...state, action.payload];
            return state;
        case a.EDITDOCTOR:
            let index = state.map(doctor => doctor.doctorid).indexOf(action.payload.doctorid);
            console.log('show');
            console.log(  Object.assign({}, state[index], action.payload));
            return [
                ...state.slice(0, index),
                Object.assign({}, state[index], action.payload),
                ...state.slice(index + 1)
            ];
            case a.DELDOCTOR:
            return state.filter(item => {
                return item.doctorid !== action.payload.doctorid;
                });
        case a.GETDOCTORLIST:
            state = action.payload;
            console.log(state);
            
            return state;
         default:
            return state;
    }
}

export function txReducer(state: any= [], action: a.Action) {
    switch (action.type) {
        case a.ADDTX:
            state = [...state, action.payload];
            return state;
        case a.EDITTX:
            let index = state.map(tx => tx.txrowid).indexOf(action.payload.txrowid);

            return [
                ...state.slice(0, index),
                Object.assign({}, state[index], action.payload),
                ...state.slice(index + 1)
            ];
            case a.DELTX:
            return state.filter(item => {
                return item.txrowid !== action.payload;
                });
        case a.GETTXLIST:
            state = action.payload;
           // console.log(state);
            return state;
        default:
            return state;
    }
}



