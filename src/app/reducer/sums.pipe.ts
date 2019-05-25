import { Pipe, PipeTransform } from '@angular/core';
import * as _ from "lodash";

@Pipe({
  name: 'sums'
})
export class SumsPipe implements PipeTransform {

  transform(value: any, args: any): any {
    // console.log(value);
    // console.log(args);
    const total = _.sumBy(value, function (o: any) { return Number(o[args]); });
    // console.log(total);
    // let total2 =total.toFixed(2);
    return total;
  }



}

@Pipe({
  name: 'sums2'
})
export class SumsPipe2 implements PipeTransform {

  transform(value: any, args: any, args2: any): any {
    // console.log(value);
    // console.log(args);
    const total = _.sumBy(value, function (o: any) { return Number(o[args]); });
    const total2 = _.sumBy(value, function (o: any) { return Number(o[args2]); });
    // console.log(total);
    // let total2 =total.toFixed(2);
    const totals = Number(total) - Number(total2);
    return totals;
  }



}
