import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { BaseComponent } from '../base/base.component';
import { Tx } from '../clinic.model';
import * as a from '../../action/app.actions';
@Component({
  selector: 'app-tx',
  templateUrl: './tx.component.html',
  styleUrls: ['./tx.component.css']
})
export class TxComponent extends BaseComponent implements OnInit {

  txlist$: Observable<any>; 
  tx: Tx;
 
  doInit() { 
    let lns = 0;
    let sql = {};
    this.txlist$.subscribe(ln => { lns = ln.length; });
    if ( lns == 0) {
       sql = { sql: 'select t.*,d.doctorname,if(isgov =1 ,0,txprice) as cashpay ,if(isgov =1 ,txprice,0) as govpay from tx t , doctor d where t.doctorid=d.doctorid' };
       this._productService.getSql(sql).subscribe(resp => {
        this.store.dispatch({ type: a.GETTXLIST, payload: resp });
      });
    }
  }
  ngOnInit() {
    this.txlist$ = this.store.select('txlist');
    this.doInit();
    this.tx = new Tx();

    console.log('this Base');
console.log(this.txlist$);

  }

}
