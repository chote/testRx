import { ActionReducer, Action as NgAction } from '@ngrx/store';
import { Doctor } from './model/doctor.model';
export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const RESET = 'RESET';

export const INCREMENT2 = 'INCREMENT2';
export const DECREMENT2 = 'DECREMENT2';
export const RESET2 = 'RESET2';

export const ADDDOCTOR = 'ADDDOCTOR';
export const GETDOCTORLIST = 'GETDOCTORLIST';
export const EDITDOCTOR = 'EDITDOCTOR';
export const DELDOCTOR = 'DELDOCTOR';
export interface Action extends NgAction {
    id?: number;
    payload?: any;
}

export function doctorReducer(state: any= [], action: Action) {
    switch (action.type) {
        case ADDDOCTOR:
            state = [...state, action.payload];
            return state;   
        case EDITDOCTOR:
        let index = state.map(doctor => doctor.doctorid).indexOf(action.payload.doctorid);
            return [
                ...state.slice(0, index),
                Object.assign({}, state[index], action.payload),
                ...state.slice(index + 1)
            ];
            case DELDOCTOR:
            return state.filter(item => {
                return item.doctorid !== action.payload.doctorid;
                });
        case GETDOCTORLIST:
            state = action.payload;
            return state;
        default:
            return state;
    }
}


export function counterReducer(state: number = 0, action: Action) {
    switch (action.type) {
        case INCREMENT:
            return state + 1;

        case DECREMENT:
            return state - 1;

        case RESET:
            return 0;

        default:
            return state;
    }
}

export function doubleReducer(state: number = 0, action: Action) {
    switch (action.type) {
        case INCREMENT2:
            return state + 2;

        case DECREMENT2:
            return state - 2;

        case RESET2:
            return 0;

        default:
            return state;
    }
}