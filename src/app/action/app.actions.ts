import { ActionReducer, Action as NgAction } from '@ngrx/store';

export const ADDTX = 'ADDTX';
export const GETTXLIST = 'GETTXLIST';
export const EDITTX = 'EDITTX';
export const DELTX = 'DELTX';

export const ADDGOV = 'ADDGOV';
export const GETGOVLIST = 'GETGOVLIST';
export const EDITGOV = 'EDITGOV';
export const DELGOV = 'DELGOV';


export const ADDLAB = 'ADDLAB';
export const GETLABLIST = 'GETLABLIST';
export const EDITLAB = 'EDITLAB';
export const DELLAB = 'DELLAB';

export const ADDLABOFFICE = 'ADDLABOFFICE';
export const GETLABOFFICELIST = 'GETLABOFFICELIST';
export const EDITLABOFFICE = 'EDITLABOFFICE';
export const DELLABOFFICE = 'DELLABOFFICE';

export const ADDEXPENSE = 'ADDEXPENSE';
export const GETEXPENSELIST = 'GETEXPENSELIST';
export const EDITEXPENSE = 'EDITEXPENSE';
export const DELEXPENSE = 'DELEXPENSE';

export const ADDMDOCTOR = 'ADDMDOCTOR';
export const GETMDOCTORLIST = 'GETMDOCTORLIST';
export const EDITMDOCTOR = 'EDITMDOCTOR';
export const DELMDOCTOR = 'DELMDOCTOR';
export const SETACTIONDOCTORID = 'SETACTIONDOCTORID';
export interface Action extends NgAction {
    id?: number;
    payload?: any;
}



export const ADDDOCTOR = 'ADDDOCTOR';
export const GETDOCTORLIST = 'GETDOCTORLIST';
export const EDITDOCTOR = 'EDITDOCTOR';
export const DELDOCTOR = 'DELDOCTOR';
