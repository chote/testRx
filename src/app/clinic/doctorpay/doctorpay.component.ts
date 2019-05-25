import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import * as a from '../../action/app.actions';
import * as moment from 'moment';
import * as _ from 'lodash';
import { Appvar } from '../../../app/service/psc_server';

@Component({
  selector: 'app-doctorpay',
  templateUrl: './doctorpay.component.html',
  styleUrls: ['./doctorpay.component.css']
})
export class DoctorpayComponent extends BaseComponent implements OnInit {
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


  ngOnInit() {
    this.selectedmonth = moment().month() + 1;
    this.searchYear = moment().year();
    this.txmonth = moment().month();
    this.doctorpaylist$ = this.store.select('doctorpaylist');
    this._productService.getStoreTable(this.store, a.GETDOCTORPAYLIST, this.doctorpaylist$, 'doctorpaylist');
  }

}
