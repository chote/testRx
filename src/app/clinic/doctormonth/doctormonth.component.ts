import { Component, OnInit,Renderer2, ElementRef, AfterViewInit,ViewChild } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { ComponentFactoryResolver } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState} from '../../../app/store/store.model';
import { Router, ActivatedRoute,Params } from '@angular/router';
import * as a from '../../action/app.actions';
import * as moment from 'moment';
import * as _ from 'lodash';
import {DoctorMonthFilterPipe} from '../../pipe/doctormonth.filter.pipe';
import { ProductService,Appvar } from '../../../app/service/psc_server';

@Component({
  selector: 'app-doctormonth',
  templateUrl: './doctormonth.component.html',
  styleUrls: ['./doctormonth.component.css']
})

export class DoctormonthComponent extends BaseComponent implements OnInit {

 
  constructor(
    resolver: ComponentFactoryResolver, store: Store<AppState>, _productService: ProductService, route: ActivatedRoute, router: Router, _appvar: Appvar,
    private renderer: Renderer2,private el:ElementRef) {
    super(resolver, store, _productService, route, router,_appvar);
  }
  @ViewChild('ss')
 ss:ElementRef;
  apptitle=Appvar.apptitle;
    logDoctorid:number;
    doctorname="";
    monthshort = new Array("มค", "กพ", "มีค",
    "เมย", "พค", "มิย", "กค", "สค", "กย",
    "ตค", "พย", "ธค");
    thmonth = new Array("มกราคม", "กุมภาพันธ์", "มีนาคม",
    "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน",
    "ตุลาคม", "พฤศจิกายน", "ธันวาคม");
    selectedmonth:number;
    searchYear=moment().year();
    txmonth=1;
    txlist:any=[];
    txcomment="";
    txrowid=0;
    display=false;
    txDoctorid=0;
    txDoctorname=" ทั้งหมด";
    
    dtNetIncome=0;
    doctordate=[];
    doctorIncome=0;
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
    showM(m) {
      //console.log(m);
      this.selectedmonth = m + 1;
    //  console.log(this.thmonth[m]);
    //this.doctorLab();
  
    }
    setTxdoctorid(i){
      this.txDoctorid  = i.doctorid;
      this.txDoctorname=i.doctorname;
      this.store.dispatch({ type: a.SETACTIONDOCTORID, payload: i.doctorid });

      //console.log(i); set payload
      this.setactivedate();
      this.doctorimg = "assets/doctoricon/d" + this.txDoctorid + ".png";
      
        }
        setactivedate(){
          //console.log(this.txDoctorid);
          
          this.txlist$.subscribe(ss => {
            this.doctordate=[];
            let did = this.txDoctorid;
            let mth =this.txmonth;
            let that = this;
         let dtdatearr =   _.filter(ss, function (o) {
            let  check = moment(o.txdate, 'YYYY/MM/DD');
            let mon = +check.format('M');
            let dte = check.format('D');
              if (o.doctorid == did && o.txdate && mon==mth) {
             //   console.log(o);
             if(that.doctordate.indexOf(dte)==-1){
          that.doctordate.push(parseInt(dte));
                return o;
              }}
            });
      
          });
       //  let myNewList =  Array.from(new Set(this.doctordate));
        //console.log(this.doctordate );
        
        }
        doctorLab(){
          this._productService.getTlist('lablist').subscribe(response => {
            this.sqlStr = response[0]['sqlstr'];

            let sql = { sql: this.sqlStr + ' and month(paydate)=' + this.selectedmonth +' and year(paydate)='+this.searchYear  }
           console.log(sql);

            this._productService.getSql(sql).subscribe(resp => {

              //  console.log(resp);

            //  this.store.dispatch({ type: a.ADDLB, payload: resp[0] });
              //  this.txlist$.subscribe(storedata => { this.txlistDt = storedata; });
              //this.display = false;
            });

          });

        }
        calTotalPriceMonth(para) {
          let objMoney;
          let total = 0;
          let docmoney = 0;
          let income = { total: 0, docmoney: 0 };
          //console.log(this.txlist);
          let txcashdoc = 0;
          if (this.txlist) {
            //this.doctorLab();
            for (let car of this.txlist) {
              let check = moment(car.txdate, 'YYYY/MM/DD');
              if (this.selectedmonth == +check.format('M') && car.doctorid == this.txDoctorid && this.searchYear == +check.format('YYYY')) {
                total += +car.txprice;
                if (car.isspec == 1) { txcashdoc = (+car.txprice) * 0.6; } else { txcashdoc = (+car.txprice) * 0.5; }
                docmoney += txcashdoc;
              }
            }
          }
          income.total = total;
          income.docmoney = docmoney;
          if (para == 'total') { return total; } else { 
            this.doctorIncome +=docmoney;
            return docmoney; }
          // return income;
        }
        labofdoctor:number=0.00;
        calTotalLabPrice() {
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
              if (this.selectedmonth == +car.m && car.doctorid == this.txDoctorid && this.searchYear == +car.y) {
                total += +car.price;
                      }
            }
          }
         this.labofdoctor = total/2;
        // console.log(this.doctorIncome);
       //  this.dtNetIncome =this.doctorIncome-this.labofdoctor;
        // console.log(this.doctorIncome);
         
         return total; 
          // return income;
        }
        calTotalPriceMonthSpec(para) {
          let objMoney;
          let total = 0;
          let docmoney = 0;
          let income = { total: 0, docmoney: 0 };
          //console.log(this.txlist);
          let txcashdoc = 0;
          if (this.txlist) {
      
            for (let car of this.txlist) {
              let check = moment(car.txdate, 'YYYY/MM/DD');
              if (this.selectedmonth == +check.format('M') && car.doctorid == this.txDoctorid && car.isspec==1  && this.searchYear == +check.format('YYYY')) {
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
         //console.log(tdate);
      
          if (this.txlist) {
            for (let car of this.txlist) {
              if (car.txdate == tdate && car.doctorid == this.txDoctorid ) {
                total += +car.txprice;
              }
            }
          }
          return total;
        }
        calculateGroupTotalSpec(tdate: string) {
          let total = 0;
         //console.log(tdate);
      
          if (this.txlist) {
            for (let car of this.txlist) {
              if (car.txdate == tdate && car.doctorid == this.txDoctorid && car.isspec==1 ) {
                total += +car.txprice;
              }
            }
          }
          return total;
        }
labdoctor:any=[];
    setini() {
    let  sql = { sql: "select * from doctor" };
      this.doctorlist$ = this.store.select('doctorlist');
      this.doctorlist$.subscribe();
      if (0 == 0) {
        this._productService.getSql(sql).subscribe(res => {
          this.store.dispatch({ type: a.GETDOCTORLIST, payload: res });
        });
      }

      this.txlist$ = this.store.select('txlist');
      this._productService.getStoreTable(this.store, a.GETTXLIST, this.txlist$, 'txlist');
      this.txlist$.subscribe(r => { this.txlist = r; });
  //console.log("yyy");
  
    //  console.log(this.searchYear);
     sql = { sql: "select sum(labprice) price, doctorid,month(paydate) m,year(paydate) y from labbill group by doctorid,month(paydate),year(paydate)" };
     this._productService.getSql(sql).subscribe(res => {
this.labdoctor = res;


      });
   
    }
    doctorimg = "";
    ngAfterViewInit() {
      //Called after every check of the component's view. Applies to components only.
      //Add 'implements AfterViewChecked' to the class.
     
    }

      ngOnInit() {
       // console.log(Appvar.apptitle);
    
        this.selectedmonth = moment().month() + 1;
        this.searchYear = moment().year();
        this.txmonth = moment().month();
    
        this.flag$ = this.store.select('flag');
        this.flag$.subscribe(res => {
       
        });
        this.setini();
      }
}
