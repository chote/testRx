import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './clinic/home/home.component';
import { LabComponent } from './clinic/lab/lab.component';
import { TxComponent } from './clinic/tx/tx.component';
import { DoctormonthComponent } from './clinic/doctormonth/doctormonth.component';
import { DoctorComponent } from './clinic/doctor/doctor.component';
import { ChartComponent } from './chart/chart.component';
import { ExpenseComponent } from './clinic/expense/expense.component';
import { DoctorpayComponent } from './clinic/doctorpay/doctorpay.component';
import { LabpayComponent } from './clinic/labpay/labpay.component';
import { GisComponent } from './clinic/gis/gis.component';
@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent
          },
          {
            path: 'home',
            component: HomeComponent
          },
      {
        path: 'lab',
        component: LabComponent
      },
      {
        path: 'expense',
        component: ExpenseComponent
      },
      {
        path: 'gis',
        component: GisComponent
      },
      {
        path: 'tx',
        component: TxComponent
      },
     { path: 'doctor',
      component: DoctorComponent
      },
      { path: 'doctormonth',
      component: DoctormonthComponent
      },
      { path: 'doctorpay',
      component: DoctorpayComponent
      },
      { path: 'labpay',
      component: LabpayComponent
      },
      { path: 'chart',
      component: ChartComponent
    }, 
      {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
      }
    ])
  ],
  providers: [],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}