import { Component,OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import * as a from '../../action/app.actions';
import { Appvar } from '../../../app/service/psc_server';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends BaseComponent implements OnInit  {
setini(){
  //this.txlist$ = this.store.select('txlist');
  //this._productService.getStoreTable(this.store,a.GETTXLIST,this.txlist$,'txlist');
}
isAdmin2:boolean;
  ngOnInit() {
    
    let lns = 0;
    let sql = {};
    //console.log('ff');
    sql = { sql: "select * from doctor" };
    this.doctorlist$ = this.store.select('doctorlist');
    this.doctorlist$.subscribe(ln => { lns = ln.length; });
    if (0 == 0) {
      this._productService.getSql(sql).subscribe(res => {
        this.store.dispatch({ type: a.GETDOCTORLIST, payload: res });
       // this.setini();
      });
    }
  }
  pin:string;
checklog(){
  console.log(this.pin);
  
if(this.pin=='pn'){
//console.log("ok");
Appvar.isAdmin = false;
this.store.dispatch({ type: a.SETLOGDOCTOR, payload: 3 });
this.store.dispatch({ type:  a.SETADMIN, payload: false});
this.router.navigateByUrl('/doctor');

}
if(this.pin=='oo'){
  this.store.dispatch({ type:  a.SETLOGDOCTOR, payload: 2 });
  this.store.dispatch({ type:  a.SETADMIN, payload: false});
  this.router.navigateByUrl('/doctor');
}
if(this.pin=='nch'){
  this.store.dispatch({ type:  a.SETLOGDOCTOR, payload: 1 });
  this.store.dispatch({ type:  a.SETADMIN, payload: false});
  this.router.navigateByUrl('/doctor');
}
if(this.pin=='dee'){

  this.store.dispatch({ type:  a.SETLOGDOCTOR, payload: 13 });
  this.store.dispatch({ type:  a.SETADMIN, payload: false});
  this.router.navigateByUrl('/doctor');
}
if(this.pin=='jn'){
  
    this.store.dispatch({ type:  a.SETLOGDOCTOR, payload: 14 });
    this.store.dispatch({ type:  a.SETADMIN, payload: false});
    this.router.navigateByUrl('/doctor');
  }
  if(this.pin=='mk'){
  
    this.store.dispatch({ type:  a.SETLOGDOCTOR, payload: 17 });
    this.store.dispatch({ type:  a.SETADMIN, payload: false});
    this.router.navigateByUrl('/doctor');
  } 
  if(this.pin=='dae'){
  
    this.store.dispatch({ type:  a.SETLOGDOCTOR, payload: 19 });
    this.store.dispatch({ type:  a.SETADMIN, payload: false});
    this.router.navigateByUrl('/doctor');
  } 
  if(this.pin=='iff'){
  
    this.store.dispatch({ type:  a.SETLOGDOCTOR, payload: 18 });
    this.store.dispatch({ type:  a.SETADMIN, payload: false});
    this.router.navigateByUrl('/doctor');
  } 
if(this.pin=='ad'){
Appvar.isAdmin = true;
  this.store.dispatch({ type:  a.SETADMIN, payload:true});
  this.router.navigateByUrl('/tx');
}
}
}
