import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import * as a from '../../action/app.actions';
import * as moment from 'moment';
import * as _ from 'lodash';
import { DoctorMonthFilterPipe } from '../../pipe/doctormonth.filter.pipe';

import { Appvar } from '../../../app/service/psc_server';
import { LabFilterPipe2 } from '../../pipe/filter.pipe';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent extends BaseComponent implements OnInit {
  apptitle = Appvar.apptitle;
  logDoctorid: number;
  doctorname = "";
  monthshort = new Array("มค", "กพ", "มีค",
    "เมย", "พค", "มิย", "กค", "สค", "กย",
    "ตค", "พย", "ธค");
  thmonth = new Array("มกราคม", "กุมภาพันธ์", "มีนาคม",
    "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน",
    "ตุลาคม", "พฤศจิกายน", "ธันวาคม");
  selectedmonth: number;
  searchYear = moment().year();
  txmonth = 1;
  txlist: any = [];
  txcomment = "";
  txrowid = 0;
  display = false;

  showDialog(t) {
    this.txrowid = t['txrowid'];
    this.txcomment = t['txcomment'];
    this.display = true;
  }
  sqlStr = "";
  doSaveComment() {
    this.display = false;
    let tx = { txrowid: this.txrowid, txcomment: this.txcomment, updateId: "txrowid=" + this.txrowid };
    this._productService.getAdd(tx, 'tx').subscribe(addresult => {

      this.sqlStr = "select t.*,d.doctorname from tx t , doctor d where t.doctorid=d.doctorid";
      let sql = { sql: this.sqlStr + ' and t.txrowid=' + this.txrowid };
      //console.log(sql);
      this._productService.getSql(sql).subscribe(resp => {
        //   console.log(resp);
        this.store.dispatch({ type: a.EDITTX, payload: resp[0] });

      });

    });
  }
  labfilters=[];
  lfilter(){
    this.labfilters= this.lablist.filter(movie => {
      let check = moment(movie.paydate, 'YYYY/MM/DD');
      //console.log("mydate="+ mydate);

      if (this.logDoctorid == movie.doctorid && this.selectedmonth== parseInt(check.format('M')) && this.searchYear == parseInt(check.format('YYYY'))) {

          return movie;
      }

  });
  }
  labdoctor=[];
  setini() {
    this.txlist$ = this.store.select('txlist');
    this._productService.getStoreTable(this.store, a.GETTXLIST, this.txlist$, 'txlist');
    this.txlist$.subscribe(r => { this.txlist = r; });

    let sql = { sql: "select sum(labprice) price, doctorid,month(paydate) m,year(paydate) y from labbill group by doctorid,month(paydate),year(paydate)" };
     this._productService.getSql(sql).subscribe(res => {
this.labdoctor = res;


      });
this.getlab();
  }
  lablist=[];
  getlab(){
    let sql={sql:"select l.*, o.labofficename,d.doctorname from labbill l,laboffice o,doctor d where l.labofficeid=o.labofficeid and l.doctorid = d.doctorid "};
    this._productService.getSql(sql).subscribe(res => {
      this.lablist = res;
      
      
            });
  }
  calnet(){
  return  this.calTotalPriceMonth("doctor") - this.calTotalLabPrice(2);
  }
  calTotalLabPrice(n) {
    let objMoney;
    let total = 0;
    let docmoney = 0;
    let income = { total: 0, docmoney: 0 };
    //console.log(this.txlist);
    let txcashdoc = 0;
    if (this.labdoctor) {
      //this.doctorLab();
      for (let car of this.labdoctor) {
        let check = moment(car.paydate, 'YYYY/MM/DD');
        if (this.selectedmonth == +car.m && car.doctorid == this.logDoctorid && this.searchYear == +car.y) {
          total += +car.price;
                }
      }
    }
   //this.labofdoctor = total/2;
  // console.log(this.doctorIncome);
 //  this.dtNetIncome =this.doctorIncome-this.labofdoctor;
  // console.log(this.doctorIncome);
   
   return total/n; 
    // return income;
  }
  hilightdate(i) {


    if (this.monthshort.indexOf(i) != -1) {

      return true;
    } else {

      return false;
    }
  }
  showM(m) {
    //console.log(m);
    this.selectedmonth = m + 1;
    console.log(this.thmonth[m]);

  }

  calTotalPriceMonth(para) {
 
    
    let objMoney;
    let total = 0;
    let docmoney = 0;
    let income = { total: 0, docmoney: 0 };
    //console.log(this.txlist);
    let txcashdoc = 0;
    if (this.txlist) {
    
        
      for (let car of this.txlist) {
        let check = moment(car.txdate, 'YYYY/MM/DD');
       
        if (this.selectedmonth == +check.format('M') && car.doctorid == this.logDoctorid  && this.searchYear == +check.format('YYYY') ) {
          total += +car.txprice;


          if (car.isspec == 1) { txcashdoc = (+car.txprice) * 0.6; } else { txcashdoc = (+car.txprice) * 0.5; }
          docmoney += txcashdoc;
        }
      }
    }
    income.total = total;
    income.docmoney = docmoney;
    if (para == 'total') { return total; } else { return docmoney; }
    // return income;
  }
  doComment(comment) {
    console.log(comment);

  }
  calculateGroupTotal(tdate: string) {
    let total = 0;
    //console.log(this.txlist);

    if (this.txlist) {
      for (let car of this.txlist) {
        if (car.txdate == tdate && car.doctorid == this.logDoctorid) {
          total += +car.txprice;
        }
      }
    }
    return total;
  }
  doctorimg = "";

  ngOnInit() {
    console.log(Appvar.apptitle);

    this.selectedmonth = moment().month() + 1;
    this.searchYear = moment().year();
    this.txmonth = moment().month();

    this.flag$ = this.store.select('flag');
    this.flag$.subscribe(res => {
      console.log(res);

      this.logDoctorid = res['logDoctorid'];
      this.doctorimg = "assets/doctoricon/d" + this.logDoctorid + ".png";
      this.doctorlist$ = this.store.select('doctorlist');
      this.doctorlist$.subscribe(d => {
        //   console.log(d);
        console.log(d[this.logDoctorid]);
        let obj = { doctorid: 1, doctorname: 'นิติโชติ' };
        obj = d.find(o => o.doctorid == this.logDoctorid);

        this.doctorname = obj['doctorname'];
        this.setini();
      });
    });
  }

}
