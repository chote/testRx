export interface AppState {
    doctorlist: any[];
    txlist: any[];
    lablist: any[];
    govlist: any[];
    expenselist: any[];
    mdSupplierlist: any[];
    mdLabofficelist: any[];
    mdDoctorlist: any[];
    acDoctorid: number;
    flag: {
        isDisplay: boolean;
        activeDoctorid: number;
    }
}
