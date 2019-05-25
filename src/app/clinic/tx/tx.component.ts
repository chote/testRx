import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../base/base.component';
import { Tx } from '../clinic.model';
import {FilterPipe} from '../../pipe/filter.pipe';
import * as a from '../../action/app.actions';
import * as moment from 'moment';
import * as _ from 'lodash';
@Component({
  selector: 'app-tx',
  templateUrl: './tx.component.html',
  styleUrls: ['./tx.component.css'],
  //pipes: [FilterPipe] 
})
export class TxComponent extends BaseComponent implements OnInit {
  numbers:any;
   
    

showcb(e){
  //console.log(e);
  //this.txday=e;
  this.setactivedate();
}
searchDoctorid=0;
searchMonth=moment().month()+1;
searchYear=moment().year();
txmonth = moment().month();
txday = moment().date();
txDoctorid=0;
txDoctorname=" ทั้งหมด";
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
  txdate="";
  sqlStr = '';//select t.*,d.doctorname,if(isgov =1 ,0,txprice) as cashpay ,if(isgov =1 ,txprice,0) as govpay from tx t , doctor d where t.doctorid=d.doctorid ';
  thday = new Array("อาทิตย์", "จันทร์",
  "อังคาร", "พุธ", "พฤหัส", "ศุกร์", "เสาร์");
thmonth = new Array("มกราคม", "กุมภาพันธ์", "มีนาคม",
  "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน",
  "ตุลาคม", "พฤศจิกายน", "ธันวาคม");
  txnamedoc:any=[];
  pricemenu=new Array(100,150,200,300,400,500,600,800,900,1000,1200,1500,1600,2000);
  getHn(n1, n2) {
    this.tx.hn = this._productService.getencodeHn(n1, n2);
    this.selectedTab = 1;
  }
gettabpt(){
  this.selectedTab=0;
}
dateconv(d: string) {
  return moment(d).locale('th').format('D');
}
showSelectDate(d: any) {
  return moment(d).locale('th').format('ll');
}
dayconv(d: string) {
  return moment(d).locale('th').format('dddd');
}
setNow() {
  this.tx.txdate = moment().format('YYYY-MM-DD');
}

  doChangeDoctor(dt: any, e: any, col: any) {
    dt.filter(e.value, col.field, col.filterMatchMode);
  //  console.log(e);
    let xx = _.find(this.valdoctors, function (o) { return o.label == e.value; });
    this.store.dispatch({ type: a.SETACTIONDOCTORID, payload: xx.doctorid });
  }
  searchHn(str: string) {

    this.ptFilters = _.filter(this.pts, function (o) {
      let hn: string = o.hn;
      if (hn.includes(str)) { return o; }

    });
  }
  setTxdoctorid(i){
this.txDoctorid  = i.doctorid;
this.txDoctorname=i.doctorname;
this.store.dispatch({ type: a.SETACTIONDOCTORID, payload: i.doctorid });
//console.log(i); set payload
this.setactivedate();

  }
  doctordate=[];
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
  hilightdate(i:number){
    
    if(this.doctordate.indexOf(i) !=-1){
  
      return true;
    }else {
    
      return false;}
  }
  filterTable(t: any) {
    this.txlist$.subscribe(ss => {
      _.filter(ss, function (o) {
        if (o.doctorid == t) {
       //   console.log(o);
          return o;
        }
      });
    });


  }
  showmonth(m:any){
    var check = moment(m, 'YYYY/MM/DD');
   // console.log(month);
    return check.format('M');
    
    
  }
  i=0;
  showd(i){
   //console.log(i);
    this.txday=i;
    
  }
  showClearPrice(i){
    //console.log(i);
    this.tx.txprice=0;
     
   }
   showPricePlus(i){
    // console.log(i);
     
    this.tx.txprice=i+ this.tx.txprice;
   
     
   }
   txlist:any=[];
   calculateGroupTotal(tdate: string) {
    let total = 0;
 //   console.log("tdate=",tdate);
    
    //console.log(this.txlist);
    this.txlist$.subscribe(r=>{
for(let c of r){
 // console.log("txdoctorid=",this.txDoctorid);
  
  if(c.txdate == tdate && c.doctorid==this.txDoctorid){ total += +c.txprice;}
} 
 //console.log(total);

    });
    
    return total;
}
  sqllablist="";
  
  doInit() {
    let sql ={sql:"select * from txnamemenu"};
    this._productService.getSql(sql).subscribe(r=>{
this.txnamedoc = r;
    });
    this._productService.getTlist('txlist').subscribe(response => {
      this.sqlStr = response[0]['sqlstr'];});
  this.txdate=moment().format("YYYY-MM-DD");

  this.numbers = _.fill(Array(31), 1);
  this.numbers.forEach(e => {this.i++;
  this.numbers[this.i]+=this.i;
 
  });
 
    //let numbers2 = _.mapKeys(this.numbers,(i,k)=>{return k+1; }); //this.numbers.map((i)=>{return i++}); 
    //console.log(numbers2);
    
   //console.log( moment().date());
   //console.log( moment().month())
   //console.log( moment().year())
 
    for (let i = 0; i < this.thmonth.length; i++) {
      let g = {label:this.thmonth[i],value: i + 1 }
      this.cbMonths.push(g);
     }
    this.getTxnamelist();
    this.flag$ = this.store.select('flag');
   
    let lns = 0;
    //let sql = {};
    this.lablist$ = this.store.select('lablist');
    this._productService.getStoreTable(this.store,a.GETLBLIST,this.lablist$,'lablist');
    /* this.lablist$.subscribe(ln => { 
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
    this.txlist$ = this.store.select('txlist');
    /* this.txlist$.subscribe(ln => { lns = ln.length; });
    if (lns == 0) {
      this._productService.getTlist('txlist').subscribe(response => {
        this.sqlStr = response[0]['sqlstr'];
        sql = { sql: this.sqlStr };
        this._productService.getSql(sql).subscribe(resp => {
          this.store.dispatch({ type: a.GETTXLIST, payload: resp });
        
        });
      });
    } */
    this._productService.getStoreTable(this.store,a.GETTXLIST,this.txlist$,'txlist');
    sql = { sql: "select * from doctor" };
    this.doctorlist$ = this.store.select('doctorlist');
    this.doctorlist$.subscribe(ln => { lns = ln.length; });
    if (0 == 0) {
      this._productService.getSql(sql).subscribe(res => {
        this.store.dispatch({ type: a.GETDOCTORLIST, payload: res });
      });
    }
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
  setLastWork() {
    let sql = { sql: "select * from tx order by txrowid desc limit 1" };
    this._productService.getSql(sql).subscribe(resp => {

      this.tx.txnamestr = resp[0]['txnamestr'];
      this.tx.isspec = resp[0]['isspec'];
      this.tx.txprice = resp[0]['txprice'];
      this.tx.txdate = resp[0]['txdate'];
    });
  }
  doAdd() {
    this.act = 'add';
    this.tx = new Tx();
    this.tx.txdate=this.txdate;
   this.tx.txprice=0;
   this.selectedTab = 0;
    this.flag$.subscribe(res => {
     
      
      this.tx.doctorid = res['activeDoctorid'];
this.tx.txdate = this.txdate;
    });
    this.display = true;
  }
  doAddSave() {
this.txdate = this.tx.txdate;

    this._productService.getAdd(this.tx, 'tx').subscribe(addresult => {
      
     
      this._productService.getLastId('tx', 'txrowid').subscribe(res => {
    //    let sql = { sql: this.sqlStr + ' and t.txrowid=' + res[0].lastid };
        let sql = { sql: " select * from tx order by txrowid desc limit 1" };
      //  console.log(sql);
        
        this._productService.getSql(sql).subscribe(resp => {
          this.store.dispatch({ type: a.ADDTX, payload: resp });
        //  this.txlist$.subscribe(storedata => { this.txlistDt = storedata; });
        });

      });


    });
  }
  doEdit(dt: any) {
    //console.log(dt);
    this.act = "edit";
    let p1 = Object.assign({}, dt);
    this.tx = p1;
    // for (let y in dt) { 
    //   this.tx[y] = dt[y];
    // }
    this.display = true;
  }
  doDelete(id) {
   // console.log(id);
    let st = { tbl: 'tx', updateId: 'txrowid=' + id };
    this._productService.getDelete(st).subscribe(res => {

      this.store.dispatch({ type: a.DELTX, payload: id });
      this.txlist$.subscribe(storedata => { this.txlistDt = storedata; });
    });
    // this.store.dispatch({ type: a.DELDOCTOR,payload:dt });
  }

  doSave() {
   //this.txmonth=this.
   let  check = moment(this.tx.txdate, 'YYYY/MM/DD');
this.txmonth= +check.format('M');
 this.txday= +check.format('D');
    if (this.act == "edit") { this.tx['updateId'] = ' txrowid=' + this.tx.txrowid; } else { this.tx['updateId'] = 0; }
    this.display = false;
    if (this.act == "edit") {  console.log("edit");
      this._productService.getAdd(this.tx, 'tx').subscribe(res => {

        let sql = { sql: this.sqlStr + ' and t.txrowid=' + this.tx.txrowid };
        //console.log(sql);
        this._productService.getSql(sql).subscribe(resp => {
       //   console.log(resp);
          this.store.dispatch({ type: a.EDITTX, payload: resp[0] });
          this.txlist$.subscribe(storedata => { this.txlistDt = storedata; });
        });
      });
    } else { 
  this.txdate = this.tx.txdate;
      
      this._productService.getAdd(this.tx, 'tx').subscribe(res => {
       // let sql = { sql: this.sqlStr + ' order by txrowid desc limit 1 ' }; 
       let sql = { sql: " select * from tx order by txrowid desc limit 1" };
        
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
   // console.log(txt);
    if (this.act == 'add') {
      this.txlist$.subscribe(res=>this.txlistPtname = res);
      if(this.txlistPtname.lenght==0){

        
      }
   if(txt.length>1){   this.ptFilters = _.filter(this.txlistPtname, function (o) {
        if(o.hn==null){o.hn="***";}
        if(o.ptname==null){o.ptname="***";}
        if(o.ptsurname==null){o.ptsurname="***";}
        let ptname: string = o.ptname;
        let ptsurname: string = o.ptsurname;
        let hn: string = o.hn;
        //
        
        if (txt.charAt(0) <= '9' && txt.charAt(0) >= '0') {
          if (hn && hn.indexOf(txt) !== -1) { return o; }

        } else {
         // if (ptname.includes(txt) || ptsurname.includes(txt)) {
          
         
          if ((ptname && ptname.indexOf(txt) !== -1) ||(ptsurname && ptsurname.indexOf(txt) !== -1)) {
            return o;
          }
        }
        //  return !o.active;
      });
    }
  }
  }

  ngOnInit() {
    moment().locale('th').format('LL');
   
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
     // console.log(this.valdoctors);

    });


  }

}
