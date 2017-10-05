import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../base/base.component';
import { Tx } from '../clinic.model';
import * as a from '../../action/app.actions';
import * as moment from 'moment';
import * as _ from 'lodash';
@Component({
  selector: 'app-tx',
  templateUrl: './tx.component.html',
  styleUrls: ['./tx.component.css']
})
export class TxComponent extends BaseComponent implements OnInit {

 
  txlistDt: any = [];
  tx: any;
  txnamelist: any = [];
  display = false;
  cbDoctors: any = []; cbMonths: any = [];
  act: string;
  ptFilters: any = [];
  pts: any = [];
  selectedTab: number;
  valdoctors: any = [];
  acDoctorid = 0;
  txlistPtname: any = [];
  sqlStr = '';//select t.*,d.doctorname,if(isgov =1 ,0,txprice) as cashpay ,if(isgov =1 ,txprice,0) as govpay from tx t , doctor d where t.doctorid=d.doctorid ';
  thday = new Array("อาทิตย์", "จันทร์",
  "อังคาร", "พุธ", "พฤหัส", "ศุกร์", "เสาร์");
thmonth = new Array("มกราคม", "กุมภาพันธ์", "มีนาคม",
  "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน",
  "ตุลาคม", "พฤศจิกายน", "ธันวาคม");
  getHn(n1, n2) {
    this.tx.hn = this._productService.getencodeHn(n1, n2);
    this.selectedTab = 1;
  }
  doChangeDoctor(dt: any, e: any, col: any) {
    dt.filter(e.value, col.field, col.filterMatchMode);
    console.log(e);
    let xx = _.find(this.valdoctors, function (o) { return o.label == e.value; });
    this.store.dispatch({ type: a.SETACTIONDOCTORID, payload: xx.doctorid });
  }
  searchHn(str: string) {

    this.ptFilters = _.filter(this.pts, function (o) {
      let hn: string = o.hn;
      if (hn.includes(str)) { return o; }

    });
  }
  filterTable(t: any) {
    this.txlist$.subscribe(ss => {

      _.filter(ss, function (o) {
        if (o.doctorid == t) {
          console.log(o);
          return o;
        }
      });
    });


  }
  doInit() {
    for (let i = 0; i < this.thmonth.length; i++) {
      let g = {label:this.thmonth[i],value: i + 1 }
      this.cbMonths.push(g);
     }
    this.getTxnamelist();
    this.flag$ = this.store.select('flag');
    this.doctorlist$ = this.store.select('doctorlist');
    let lns = 0;
    let sql = {};
    this.txlist$.subscribe(ln => { lns = ln.length; });
    if (lns == 0) {
      this._productService.getTlist('txlist').subscribe(response => {
        this.sqlStr = response[0]['sqlstr'];
        sql = { sql: this.sqlStr };
        this._productService.getSql(sql).subscribe(resp => {
          this.store.dispatch({ type: a.GETTXLIST, payload: resp });
          this.txlistDt = resp;
        });
      });
    }
    sql = { sql: "select * from doctor" };
    this.doctorlist$.subscribe(ln => { lns = ln.length; });
    if (0 == 0) {
      this._productService.getSql(sql).subscribe(res => {
        this.store.dispatch({ type: a.GETDOCTORLIST, payload: res });
      });
    }
  }
  setNow() {
    this.tx.txdate = moment().format('YYYY-MM-DD');
  }
  setTxnamestr(name) {
    this.tx.txnamestr = name;
  }
  getTxnamelist() { 
    let sql = { sql: "select distinct txnamestr as name from tx order by txnamestr" };
    this._productService.getSql(sql).subscribe(resp => {
      this.txnamelist = resp;
    });
  }
  setPtname(pt: any) {
    this.tx.hn = pt.hn;
    this.tx.ptname = pt.ptname;
    this.tx.ptsurname = pt.ptsurname;
  }
  setName() {
    let sql = { sql: "select * from tx order by txrowid desc limit 1" };
    this._productService.getSql(sql).subscribe(resp => {
      // let txlast = resp;
      this.tx.ptname = resp[0]['ptname'];
      this.tx.ptsurname = resp[0]['ptsurname'];
      this.tx.hn = resp[0]['hn'];
      this.tx.txdate = resp[0]['txdate'];
    });
  }
  doAdd() {
    this.act = 'add';
    this.tx = new Tx();
    this.flag$.subscribe(res => {
      this.tx.doctorid = res['activeDoctorid'];

    });
    this.display = true;
  }
  doAddSave() {

    this._productService.getAdd(this.tx, 'tx').subscribe(addresult => {
      this._productService.getLastId('tx', 'txrowid').subscribe(res => {
        let sql = { sql: this.sqlStr + ' and t.txrowid=' + res[0].lastid };
        this._productService.getSql(sql).subscribe(resp => {
          this.store.dispatch({ type: a.ADDTX, payload: resp });
          this.txlist$.subscribe(storedata => { this.txlistDt = storedata; });
        });

      });


    });
  }
  doEdit(dt: any) {
    console.log(dt);
    this.act = "edit";
    let p1 = Object.assign({}, dt);
    this.tx = p1;
    // for (let y in dt) { 
    //   this.tx[y] = dt[y];
    // }
    this.display = true;
  }
  doDelete(id) {
    console.log(id);
    let st = { tbl: 'tx', updateId: 'txrowid=' + id };
    this._productService.getDelete(st).subscribe(res => {

      this.store.dispatch({ type: a.DELTX, payload: id });
      this.txlist$.subscribe(storedata => { this.txlistDt = storedata; });
    });
    // this.store.dispatch({ type: a.DELDOCTOR,payload:dt });
  }

  doSave() {
    if (this.act == "edit") { this.tx['updateId'] = ' txrowid=' + this.tx.txrowid; } else { this.tx['updateId'] = 0; }
    this.display = false;
    if (this.act == "edit") {
      this._productService.getAdd(this.tx, 'tx').subscribe(res => {
        let sql = { sql: this.sqlStr + ' and t.txrowid=' + this.tx.txrowid };
        this._productService.getSql(sql).subscribe(resp => {
          this.store.dispatch({ type: a.EDITTX, payload: resp[0] });
          this.txlist$.subscribe(storedata => { this.txlistDt = storedata; });
        });
      });
    } else { 
      this._productService.getAdd(this.tx, 'tx').subscribe(res => {
        let sql = { sql: this.sqlStr + ' order by txrowid desc limit 1 ' }; 
        this._productService.getSql(sql).subscribe(resp => {
          this.store.dispatch({ type: a.ADDTX, payload: resp[0] });
          this.txlist$.subscribe(storedata => { this.txlistDt = storedata; });
        });
      });

    }

  }
  showDialog() {
    this.display = true;
  }

  filterPt(txt: string) {
    console.log(txt);
    if (this.act == 'add') {
      this.txlist$.subscribe(res=>this.txlistPtname = res);
      this.ptFilters = _.filter(this.txlistPtname, function (o) {
        let ptname: string = o.ptname;
        let ptsurname: string = o.ptname;
        let hn: string = o.hn;
        if (txt.charAt(0) <= '9' && txt.charAt(0) >= '0') {
          if (hn.includes(txt)) { return o; }

        } else {
          if (ptname.includes(txt) || ptsurname.includes(txt)) {
            return o;
          }
        }
        //  return !o.active;
      });
    }
  }
  ngOnInit() {
    moment().locale('th').format('LL');
    this.txlist$ = this.store.select('txlist');
    this.doInit();
    this.tx = new Tx();
    let sql = { sql: "select doctorname as label,doctorid as value from doctor" };
    this._productService.getSql(sql).subscribe(resp => {
      this.cbDoctors = resp;
      sql = { sql: "select doctorname as label,doctorname as value,doctorid  from doctor" };
      this._productService.getSql(sql).subscribe(resp2 => {
        this.valdoctors = resp2;
      });



      // this.valdoctors = Object.assign({}, this.cbDoctors);
      console.log(this.valdoctors);

    });


  }

}
