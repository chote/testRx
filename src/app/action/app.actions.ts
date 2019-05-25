import { ActionReducer, Action as NgAction } from '@ngrx/store';

export const ADDTX = 'ADDTX';
export const GETTXLIST = 'GETTXLIST';
export const EDITTX = 'EDITTX';
export const DELTX = 'DELTX';

export const ADDDOCTORPAY = 'ADDDOCTORPAY';
export const GETDOCTORPAYLIST = 'GETDOCTORPAYLIST';
export const EDITDOCTORPAY = 'EDITDOCTORPAY';
export const DELDOCTORPAY = 'DELDOCTORPAY';

export const ADDLABPAY = 'ADDLABPAY';
export const GETLABPAYLIST = 'GETLABPAYLIST';
export const EDITLABPAY = 'EDITLABPAY';
export const DELLABPAY = 'DELLABPAY';

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

export const ADDLB = 'Add new lab';
export const GETLBLIST = 'GETlabLIST';
export const EDITLB = 'EDITlab';
export const DELLB = 'DELlab';
export const SETLOGDOCTOR = 'Set DoctorId';
export const SETADMIN = 'Set Admin';