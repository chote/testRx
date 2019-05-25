
import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
@Pipe({
    name: 'txfilter'
})
export class FilterPipe implements PipeTransform {
    transform(value: any, args: any): any {
        let filter = args;
        let doctorid = filter.doctorid;
        let year = filter.year;
        let mymonth = filter.month;
        let mydate = filter.mydate;
        let check: any;
        //console.log(filter);
        //let check = moment(value.txdate, 'YYYY/MM/DD');
        return value.filter(movie => {
            check = moment(movie.txdate, 'YYYY/MM/DD');
            //console.log("mydate="+ mydate);

            if (mydate == 0) {
                if (doctorid == movie.doctorid && mymonth == check.format('M') && year == check.format('YYYY')) {

                    return movie;
                }
            }
            else {
                if (doctorid == movie.doctorid && mymonth == check.format('M') && mydate == check.format('D') && year == check.format('YYYY')) {

                    return movie;
                }
            }
        });

    }
}



@Pipe({
    name: 'labfilter'
})
export class LabFilterPipe implements PipeTransform {
    transform(value: any, args: any): any {
        let filter = args;
        let doctorid = filter.doctorid;
        let year = filter.year;
        let mymonth = filter.month;
        let check: any;
        //console.log(filter);
        //let check = moment(value.txdate, 'YYYY/MM/DD');
        return value.filter(movie => {
            check = moment(movie.paydate, 'YYYY/MM/DD');
            //console.log("mydate="+ mydate);

            if (doctorid == movie.doctorid && mymonth == check.format('M') && year == check.format('YYYY')) {

                return movie;
            }

        });

    }

}
@Pipe({
    name: 'labfilter2'
})
export class LabFilterPipe2 implements PipeTransform {
    transform(value: any, args: any): any {
        let filter = args;
        let doctorid = filter.doctorid;
        let year = filter.year;
        let mymonth = filter.month;
        let check: any;
        //console.log(filter);
        //let check = moment(value.txdate, 'YYYY/MM/DD');
        return value.filter(movie => {
            check = moment(movie.paydate, 'YYYY/MM/DD');
            //console.log("mydate="+ mydate);

            if (doctorid == movie.doctorid && mymonth == check.format('M') && year == check.format('YYYY')) {

                return movie;
            }

        });

    }

}
@Pipe({
    name: 'expensefilter'
})
export class ExpenseFilterPipe implements PipeTransform {
    transform(value: any, args: any): any {
        let filter = args;
        let doctorid = filter.doctorid;
        let year = filter.year;
        let mymonth = filter.month;
        let check: any;
        //console.log(filter);
        //let check = moment(value.txdate, 'YYYY/MM/DD');
        return value.filter(movie => {
            check = moment(movie.expdate, 'YYYY/MM/DD');
            //console.log("mydate="+ mydate);

            if (mymonth == check.format('M')) {

                return movie;
            }

        });

    }
}