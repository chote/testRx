import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../base/base.component';
import { Lab } from '../clinic.model';
import { LabFilterPipe } from '../../pipe/filter.pipe';
import * as a from '../../action/app.actions';
import * as moment from 'moment';
import * as _ from 'lodash';
@Component({
  selector: 'app-lab',
  templateUrl: './lab.component.html',
  styleUrls: ['./lab.component.css']
})

export class LabComponent extends BaseComponent implements OnInit {

  lab: any;
  sqlStr = "";
  act = "";
  display = false;
  sqllablist = "";
  cbDoctors: any = []; cbMonths: any = [];
  ptFilters: any = [];
  pts: any = [];
  txlistPtname: any = [];
  paydate = "";
  doctorname = "";
  doctorimg = "";
  monthshort = new Array("มค", "กพ", "มีค",
    "เมย", "พค", "มิย", "กค", "สค", "กย",
    "ตค", "พย", "ธค");
  thmonth = new Array("มกราคม", "กุมภาพันธ์", "มีนาคม",
    "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน",
    "ตุลาคม", "พฤศจิกายน", "ธันวาคม");
  selectedmonth: number;
  searchYear = moment().year();
  setTxdoctorid(i) {
    this.doctorid = i.doctorid;
    this.doctorname = i.doctorname;
    this.store.dispatch({ type: a.SETACTIONDOCTORID, payload: i.doctorid });

    //console.log(i); set payload
    //this.setactivedate();
    this.doctorimg = "assets/doctoricon/d" + this.doctorid + ".png";
  }
  calTotalPriceMonth(para) {
    let total = 0;
 this.lablist$.subscribe(r => {
      for (let car of r) {
        let check = moment(car.paydate, 'YYYY/MM/DD');
        if (this.selectedmonth == +check.format('M') && car.doctorid == this.doctorid) {
          total += +car.labprice;
//console.log(total);

        }
      }
      
    }); 
    //console.log(total);
    
    if (para == 'total') { return total; } else { return total / 2; }
  }
  showM(m) {
    //console.log(m);
    this.selectedmonth = m + 1;
    //  console.log(this.thmonth[m]);

  }
  searchHn(str: string) {
    this.ptFilters = _.filter(this.pts, function (o) {
      if(o.hn==null){o.hn="***";}
      let hn: string = o.hn;
      if (hn.includes(str)) { return o; }

    });
  }

  setPtname(pt: any) {
    this.lab.hn = pt.hn;
    this.lab.ptname = pt.ptname;
    this.lab.ptsurname = pt.ptsurname;
  }
  filterPt(txt: string) {
    
    if (txt.length >1) {  //console.log("fff"+txt);
      this.txlist$.subscribe(res => this.txlistPtname = res);
      this.ptFilters = _.filter(this.txlistPtname, function (o) {
        let ptname: string = o.ptname;
        let ptsurname: string = o.ptname;
        if(o.hn==null){o.hn="***";}
        let hn: string = o.hn;

        if (txt.charAt(0) <= '9' && txt.charAt(0) >= '0') {
          if (hn.includes(txt)) { return o; }

        } else {
          //  console.log(txt);
if(ptname==null){ptname="***";}if(ptsurname==null){ptsurname="***";}
          if (ptname.includes(txt) || ptsurname.includes(txt)) {
            //console.log(o);

            return o;

          } else {
            //  console.log("xxx");

          }
       
        }
        //  return !o.active;
      });
    }
  }

  doInit() {
    this.flag$ = this.store.select('flag');
    this.lablist$ = this.store.select('lablist');
    this.txlist$ = this.store.select('txlist');
    this._productService.getStoreTable(this.store, a.GETTXLIST, this.txlist$, 'txlist');
    this._productService.getStoreTable(this.store, a.GETLBLIST, this.lablist$, 'lablist');
    /*  this.lablist$.subscribe(ln => { 
     lns = ln.length; 
     if(lns==0){
       this._productService.getTlist('lablist').subscribe(res=>{
         this.sqllablist = res[0]['sqlstr'];
         sql={sql:this.sqllablist};
         this._productService.getSql(sql).subscribe(resp => {
           this.store.dispatch({ type: a.GETLBLIST, payload: resp });
           
         });
       });
     }
     
     }); */
  }
  officeid = 0;
  doctorid = 0;
  doAdd() {
    this.act = 'add';
    this.lab = new Lab();
    this.lab.labofficeid = this.officeid;
    //console.log(this.lab.labofficeid);

    //console.log("OK");



    this.lab.doctorid = this.doctorid;

    this.lab.paydate = this.paydate;
    //console.log(this.lab.paydate);
    this.flag$.subscribe(res => {
      this.lab.doctorid = res['activeDoctorid'];

    });
    this.display = true;
  }
  doEdit(dt: any) {
    //console.log(dt);
    this.act = "edit";
    let p1 = Object.assign({}, dt);
    this.lab = p1;
    // for (let y in dt) { 
    //   this.tx[y] = dt[y];
    // }
    this.display = true;
  }
  doAddSave() {
    // console.log(this.lab);
    this.officeid = this.lab.labofficeid;
    this.doctorid = this.lab.doctorid;
    this.paydate = this.lab.paydate;


    if (this.act == "edit") { this.lab['updateId'] = ' labbillid=' + this.lab.labbillid } else { this.laboffices['updateId'] = 0; }
    this.display = false;
    if (this.act == "edit") {
      this._productService.getAdd(this.lab, 'labbill').subscribe(res => {


        let sql = { sql: this.sqlStr + ' and l.labbillid=' + this.lab.labbillid };

        this._productService.getSql(sql).subscribe(resp => {
          //   console.log(resp);
          this.store.dispatch({ type: a.EDITLB, payload: resp[0] });

        });
      });

    } else {
      //console.log("addSave");
      
      this._productService.getAddLab(this.lab, 'labbill').subscribe(res => {
                
            this.sqlStr ="select l.*, o.labofficename,d.doctorname from labbill l,laboffice o,doctor d where l.labofficeid=o.labofficeid and l.doctorid = d.doctorid ";// response[0]['sqlstr'];

            let sql = { sql: this.sqlStr + ' and l.labbillid=' + res[0].lastid }
//console.log(sql);

            this._productService.getSql(sql).subscribe(resp => {

      //           console.log(resp[0]);

              this.store.dispatch({ type: a.ADDLB, payload: resp[0] });
              //  this.txlist$.subscribe(storedata => { this.txlistDt = storedata; });
              this.display = false;
            });

         
        

      });
    }
  }
  doDelete(id) {
    // console.log(id);
    let st = { tbl: 'labbill', updateId: 'labbillid=' + id };
    this._productService.getDelete(st).subscribe(res => {

      this.store.dispatch({ type: a.DELLB, payload: id });
      //   this.txlist$.subscribe(storedata => { this.txlistDt = storedata; });
    });
    // this.store.dispatch({ type: a.DELDOCTOR,payload:dt });
  }
  laboffices = [];
  setini() {
    let sql = { sql: "select * from doctor" };
    this.doctorlist$ = this.store.select('doctorlist');
    this.doctorlist$.subscribe();
    if (0 == 0) {
      this._productService.getSql(sql).subscribe(res => {
        this.store.dispatch({ type: a.GETDOCTORLIST, payload: res });
      });
    }



    //  console.log(this.searchYear);

  }
  ngOnInit() {
    // this.txlist$ = this.store.select('txlist');
    moment().locale('th').format('LL');
    this.doInit();
    this.setini();
    let sql = { sql: "select doctorname as label,doctorid as value from doctor" };
    this._productService.getSql(sql).subscribe(resp => {
      this.cbDoctors = resp;
      sql = { sql: "select doctorname as label,doctorname as value,doctorid  from doctor" };
    });
    sql = { sql: "select * from laboffice" };
    this._productService.getSql(sql).subscribe(resp => {
      this.laboffices = resp;
     // console.log(resp);

    });
  }
}

