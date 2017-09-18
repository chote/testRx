import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './clinic/home/home.component';
import { LabComponent } from './clinic/lab/lab.component';
import { TxComponent } from './clinic/tx/tx.component';
import { DoctorComponent } from './clinic/doctor/doctor.component';
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
        path: 'tx',
        component: TxComponent
      },
     { path: 'doctor',
      component: DoctorComponent
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