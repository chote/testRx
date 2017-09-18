import { ActionReducer, Action as NgAction } from '@ngrx/store';
import { Doctor } from '../model/doctor.model';
import * as a from '../action/app.actions';

export function doctorReducer(state: any= [], action: a.Action) {
    switch (action.type) {
        case a.ADDDOCTOR:
            state = [...state, action.payload];
            return state;
        case a.EDITDOCTOR:
            let index = state.map(doctor => doctor.value).indexOf(action.payload.doctorid);
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
            let index = state.map(tx => tx.txid).indexOf(action.payload.txid);
             console.log(  Object.assign({}, state[index], action.payload));
            return [
                ...state.slice(0, index),
                Object.assign({}, state[index], action.payload),
                ...state.slice(index + 1)
            ];
            case a.DELTX:
            return state.filter(item => {
                return item.txid !== action.payload.id;
                });
        case a.GETTXLIST:
            state = action.payload;
           // console.log(state);
            return state;
        default:
            return state;
    }
}

export function counterReducer(state: number = 0, action: a.Action) {
    switch (action.type) {
        case a.INCREMENT:
            return state + 1;

        case a.DECREMENT:
            return state - 1;

        case a.RESET:
            return 0;

        default:
            return state;
    }
}

export function doubleReducer(state: number = 0, action: a.Action) {
    switch (action.type) {
        case a.INCREMENT2:
            return state + 2;

        case a.DECREMENT2:
            return state - 2;

        case a.RESET2:
            return 0;

        default:
            return state;
    }
}