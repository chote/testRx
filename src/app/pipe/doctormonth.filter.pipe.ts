import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
@Pipe({  name: 'doctormonthfilter'})
export class DoctorMonthFilterPipe implements PipeTransform {
    transform(value: any, args: any): any {
        let filter = args;
        let doctorid = filter.doctorid;
        let year = filter.year;
        let mymonth = filter.month;
        let check: any;
        return value.filter(movie => {
            check = moment(movie.txdate, 'YYYY/MM/DD');
            if (doctorid == movie.doctorid && mymonth == check.format('M') && year == check.format('YYYY')) {
                return movie;
            }

        });

    }
}
