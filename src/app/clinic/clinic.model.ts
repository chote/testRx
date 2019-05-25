export class Tx {
    txrowid: number;
    hn: string;
    ptname: string;
    ptsurname: string;
    txnamestr: string;
    txdate: string;
    doctorid: number;
    txprice: number;
    isgov: string;
    isspec: string;
}
export class Doctor {
    doctorid: number;
    doctorname: string;
}
export class Lab {
    labbillid: number;
    hn: string;
    ptname: string;
    ptsurname: string;
    labofficeid:number;
   labwork: string;
    labsenddate: string;
    appointmentdate: string;
    doctorid: number;
    labprice: number;
    paydate:string;
    ispaid: string;
   labbillno: string;
   labreturndate: string;
   

}
export class Mat {
    labbillid: number;
    hn: string;
    ptname: string;
    ptsurname: string;
    labofficeid:number;
   labwork: string;
    labsenddate: string;
    appointmentdate: string;
    doctorid: number;
    labprice: number;
    paydate:string;
    ispaid: string;
   labbillno: string;
   labreturndate: string;
   

}