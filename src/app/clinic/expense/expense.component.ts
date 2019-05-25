import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../base/base.component';
import { Tx } from '../clinic.model';
import { ExpenseFilterPipe } from '../../pipe/filter.pipe';
import {CbmonthsComponent}  from '../tools/cbmonths/cbmonths.component';
import * as a from '../../action/app.actions';
import * as moment from 'moment';
import * as _ from 'lodash';
@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent extends BaseComponent {
  expense = new Expense();

  expenses: any = [];
  action: string;
  expnames: any = [];
  expdate = "";
  tmpExpenses:any=[];
  expmonth = moment().month();
  expensegroup:any=[];
  expfevname=new Array('จ่ายไก่','จ่ายมอส','จ่ายแนน','ค่าข้าว','ค่าหนังสือพิมพ์');
  expfevid=new Array(19,19,19,1,13);
  pricemenu=new Array(30,60,80,100,150,200,300,400,500,600,800,900,1000);

  monthshort = new Array("มค", "กพ", "มีค",
  "เมย", "พค", "มิย", "กค", "สค", "กย",
  "ตค", "พย", "ธค");
  thmonth = new Array("มกราคม", "กุมภาพันธ์", "มีนาคม",
  "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน",
  "ตุลาคม", "พฤศจิกายน", "ธันวาคม");
  selectedmonth:number;
  searchYear=moment().year();  

  
  showClearPrice(i){
    this.expense.expcost=0;
   }
  showPricePlus(i){
    this.expense.expcost=i+ this.expense.expcost;
   }
  doSelectMonth($event){
    console.log('ok');
    
console.log($event);

  }
  getExpfev(i){
   
    
    this.expense.expname = this.expfevname[i];
    this.expense.expgrp_id = this.expfevid[i];
    console.log(this.expense.expname);
    
  }
  getAddNew() {
    this.action = "add";
    this.saveExpense();
  }
  getEdit() {
    this.action = "edit";
    this.saveExpense();
  }
  update(array, newItem, atIndex) {
    return array.map((item, index) => index === atIndex ? newItem : item);
  }
  saveExpense() {
    let xx = this.expense.expgrp_id;
    this.expdate = this.expense.expdate;
    if (this.action == "edit") {
      this.expense["updateId"] = " expid =" + this.expense.expid;
    }
    let cc: any;
    console.log(this.action);

    this._productService.getAdd(this.expense, 'expense').subscribe(res => cc = res, err => {
      console.log('err');
    }, () => {
      if (this.action == "add") {
        let id: number;
        this._productService.getLastId("expense", "expid").subscribe(resp => {
          let lasts = resp;
          id = lasts[0]["lastid"];
          this.expense.expid = +id;
          console.log(this.expense);

          this.expenses = [... this.expenses, this.expense];
          this.tmpExpenses = [this.expense, ... this.tmpExpenses];
          console.log(this.expenses);
          this.expense = new Expense();
          this.expense.expdate = this.expdate;
        });
      }
      if(this.action=='edit'){
        let state = this.expenses;
      //  let index=_.indexOf(this.expenses,{'expid':this.expense.expid});
      console.log('expense1 =',this.expenses);
       // let index=  _.findIndex(this.expenses, { 'expid':this.expense.expid});
 //console.log(index);
 //Object.assign({}, state[index], action.payload),
    // this.expenses = Object.assign({}, this.expenses[index], this.expense);


     let index = state.map(tx => tx.expid).indexOf(this.expense.expid);
     console.log(index);
               this.expenses= [
                     ...this.expenses.slice(0, index),
                     Object.assign({}, this.expenses[index], this.expense),
                     ...this.expenses.slice(index + 1)
                 ];
                 console.log(this.expenses);
      }


    });
  }
  sqlexplist = "";
  display = false;
  act = "";
  getClear() {
    this.expense = new Expense();
  }
  setExpname(c) {
    this.expense.expname = c['expname'];
    this.expense.expcost = c['expcost'];
  }
  editExpense(c) {
    this.act = "edit";
    this.action = "edit";
    //editexpense(c){
    this.doEdit(c);
  }
  doEdit(dt: any) {
    //console.log(dt);
    this.act = "edit";
    let p1 = Object.assign({}, dt);
    this.expense = p1;
    // for (let y in dt) { 
    //   this.tx[y] = dt[y];
    // }
    this.display = true;
  }
  doDelete(id) {

    console.log(id);
    console.log('exp',this.expenses);
    
     let st = { tbl: 'expense', updateId: 'expid=' + id };
     this._productService.getDelete(st).subscribe(res => {
     this.expenses = this.expenses.filter(item => {
        return item.expid !== id;
        });
        console.log(this.expenses);
        
      // this.store.dispatch({ type: a.DELTX, payload: id });
      // this.txlist$.subscribe(storedata => { this.txlistDt = storedata; });
     });
     // this.store.dispatch({ type: a.DELDOCTOR,payload:dt });
   }
   epmons=[];
  ngOnInit() {
    let  sql = { sql: "select * from epmon" };
    this._productService.getSql(sql).subscribe(res => {this.epmons=res;});
    sql = { sql: "select * from expense order by expdate" };
    this._productService.getSql(sql).subscribe(resp => {
      this.expenses = resp;
    });
    sql = { sql: "select * from expensegroup " };
    this._productService.getSql(sql).subscribe(resp => {
      this.expensegroup = resp;


    });
    this._productService.getTlist('expnames').subscribe(res => {
      this.sqlexplist = res[0]['sqlstr'];
      sql = { sql: this.sqlexplist };
      this._productService.getSql(sql).subscribe(res => {
        //  this.store.dispatch({ type: a.GETLBLIST, payload: resp });
        this.expnames = res;
      });
    });
  }

}
class Expense {
  expid: number;
  expname: string;
  expdate: string;
  expcost=0;
  expmonth: string;
  expgrp_id=0;

}