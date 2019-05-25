import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cbmonths',
  templateUrl: './cbmonths.component.html',
  styleUrls: ['./cbmonths.component.css']
})
export class CbmonthsComponent implements OnInit {
  @Input()
  expmonth:number;
  @Output()
	cbChangeEvent = new EventEmitter<Number>();
  thday = new Array("อาทิตย์", "จันทร์",
  "อังคาร", "พุธ", "พฤหัส", "ศุกร์", "เสาร์");
thmonth = new Array("มกราคม", "กุมภาพันธ์", "มีนาคม",
  "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน",
  "ตุลาคม", "พฤศจิกายน", "ธันวาคม");
  cbMonths:any=[];
  constructor() {

   
  }
  doCbChange(e){
    console.log('this is a ',this.expmonth);
    
    this.cbChangeEvent.emit(this.expmonth);
  }
  ngOnInit() {
    for (let i = 0; i < this.thmonth.length; i++) {
      let g = {label:this.thmonth[i],value: i + 1 }
      this.cbMonths.push(g);
   }
  }

}
