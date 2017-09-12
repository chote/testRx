import { Component,OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { INCREMENT, DECREMENT, RESET ,INCREMENT2, DECREMENT2, RESET2,ADDDOCTOR,GETDOCTORLIST} from './counter';
import { ProductService } from './service/psc_server';
import { Doctor } from './model/doctor.model';
interface AppState {
  counter: number;
  double: number;
  doctorlist: any[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',  


})
export class AppComponent implements OnInit {
  title = 'app'; lastDoctorID: any;
  counter$: Observable<number>;
  double$: Observable<number>;
  doctorlist$: Observable<any>; 
 doctors: any = [];
    constructor(private store: Store<AppState>, private _productService: ProductService){
      this.counter$ = store.select('counter');
      this.double$ = store.select('double');
      this.doctorlist$ = store.select('doctorlist');
    }
    addDoctor() {
      this.store.dispatch({ type: ADDDOCTOR });
    }
    increment() {
      this.store.dispatch({ type: INCREMENT });
    }
    decrement() {

      this.store.dispatch({ type: DECREMENT });
    }
    reset() {
      this.store.dispatch({ type: RESET });
    }
  
    increment2() {
      this.store.dispatch({ type: INCREMENT2 });
    }
    decrement2() {

      this.store.dispatch({ type: DECREMENT2 });
    }
    reset2() {
      this.store.dispatch({ type: RESET2 });
    }
    doAdd() {
      let x = { doctorname: "มดแดง" };
      let cc = [];
      this._productService.getAdd(x, 'doctor').subscribe(res =>  {  
        this._productService.getLastId('doctor', 'doctorid').subscribe(res => {
console.log(res);

          let doc = { label: "ทองม้วน", value: res[0].lastid };
          
            this.store.dispatch({ type: ADDDOCTOR, payload: doc }); 
         });
     

      });
    }
   
    ngOnInit() {
    //  console.log(this.doctorlist$);
      let lns: number;
      this.doctorlist$.subscribe(ln => { lns = ln.length;  console.log(lns+3); }
      );
      if (lns == 0) {
        console.log("ok");
        let sql = { sql: 'select doctorname as label,doctorid as value from doctor' };
        this._productService.getSql(sql).subscribe(resp => {
          this.doctors = resp;
          this.lastDoctorID = + this.doctors.slice(-1)[0].value + 1;
          this.store.dispatch({ type: GETDOCTORLIST, payload: this.doctors });
          //  console.log( this.lastDoctorID);
        
        });
      }  
    }
}
