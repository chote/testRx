export interface AppState {
    doctorlist: any[];
    txlist: any[];
    lablist: any[];
    labpaylist: any[];
    doctorpaylist: any[];
    expenselist: any[];
    mdSupplierlist: any[];
    mdLabofficelist: any[];
    mdDoctorlist: any[];
    acDoctorid: number;
    flag: {
        isDisplay: boolean;
        activeDoctorid: number;
        logDoctorid:number;
        isAdmin:boolean;
    }
}
