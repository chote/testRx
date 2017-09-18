import { Component,OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState} from './store/store.model';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import * as a from './action/app.actions';

import { ProductService } from './service/psc_server';
import { Doctor } from './model/doctor.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',


})
export class AppComponent implements OnInit {
  title = 'app'; lastDoctorID: any;
  counter$: Observable<number>;
  double$: Observable<number>;
  doctorlist$: Observable<any>; 
  lablist$: Observable<any>; 
 // txlist$: Observable<any>; 
  govlist$: Observable<any>; 
  expenselist$: Observable<any>;
  mdSupplierlist$: Observable<any>;
  mdLabofficelist$:Observable<any>;
  mdDoctorlist$: Observable<any>;
  acDoctorid$: Observable<any>;
  doctors: any = [];
  display = false; 
  iDoctor: Idoctor;
  
    constructor(private store: Store<AppState>, private _productService: ProductService){
      this.counter$ = store.select('counter');
      this.double$ = store.select('double');
      this.doctorlist$ = store.select('doctorlist');
      this.lablist$ = store.select('lablist');
    //  this.txlist$ = store.select('txlist');
      this.govlist$ = store.select('govlist');
      this.expenselist$ = store.select('expenselist');
      this.mdSupplierlist$ = store.select('mdSupplierlist');
      this.mdLabofficelist$ = store.select('mdLabofficelist');
      this.mdDoctorlist$ = store.select('mdDoctorlist');
      this.acDoctorid$ = store.select('acDoctorid');
      this.iDoctor = {  doctorid: 0, doctorname: ''  };
    }
    addDoctor() {
      this.store.dispatch({ type: a.ADDDOCTOR });
    }
    increment() {
    //  this.store.dispatch({ type: INCREMENT });
    }
    decrement() {

      this.store.dispatch({ type: a.DECREMENT });
    }
    reset() {
      this.store.dispatch({ type: a.RESET });
    }
  
    increment2() {
      this.store.dispatch({ type: a.INCREMENT2 });
    }
    decrement2(){

      this.store.dispatch({ type: a.DECREMENT2 });
    }
    reset2() {
      this.store.dispatch({ type: a.RESET2 });
    }
    editDoctor(dt: any) { 
      this.iDoctor.doctorname = dt.label;
      this.iDoctor.doctorid = dt.value;
      this.showDialog( this.iDoctor);

    //  this.store.dispatch({ type: EDITDOCTOR, payload: dt }
      
    }
   delDoctor(dt:any) { 
     console.log(dt);
     this.store.dispatch({ type: a.DELDOCTOR,payload:dt });
      
          }
    doAdd() {
      let x = { doctorname: "มดแดง" };
      let cc = [];
      this._productService.getAdd(x, 'doctor').subscribe(res =>  {  
        this._productService.getLastId('doctor', 'doctorid').subscribe(res => {
console.log(res);

          let doc = { label: "ทองม้วน", value: res[0].lastid };
          
            this.store.dispatch({ type: a.ADDDOCTOR, payload: doc }); 
         });
     

      });
    }
    
    doSave() {
      this.display = false;
      this.store.dispatch({ type: a.EDITDOCTOR, payload: this.iDoctor }); 
     console.log(this.iDoctor);
     
    }
        showDialog(dt:any) {
          this.display = true;
          
        }
        doInit() {
          let lns: number;
          let sql = {};
          this.doctorlist$.subscribe(ln => { lns = ln.length;}
          );
          if (lns == 0) {
             sql = { sql: 'select doctorname as label,doctorid as value from doctor' };
             this._productService.getSql(sql).subscribe(resp => {
              this.doctors = resp;
              this.lastDoctorID = + this.doctors.slice(-1)[0].value + 1;
              this.store.dispatch({ type: a.GETDOCTORLIST, payload: this.doctors });
            });
          }  
          
          
        }
    ngOnInit() {
      this.doInit();
    }
}
export interface Idoctor {
  doctorid?: number;
  doctorname: string;
}

