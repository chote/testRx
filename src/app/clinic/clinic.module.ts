import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableModule, SharedModule, DialogModule } from 'primeng/primeng'; 
import { FormsModule } from '@angular/forms';
import { SumsPipe } from '../pipe/sums.pipe';
import { TxComponent } from './tx/tx.component';
import { LabComponent } from './lab/lab.component';
import { BaseComponent } from './base/base.component';
import { DoctorComponent } from './doctor/doctor.component';
import { GovComponent } from './gov/gov.component';
import { HomeComponent } from './home/home.component';
import { ExpenseComponent } from './expense/expense.component';

@NgModule({
  imports: [
    CommonModule,DataTableModule,SharedModule,DialogModule,FormsModule
  ],
  declarations: [SumsPipe,TxComponent, LabComponent, BaseComponent, DoctorComponent, GovComponent, HomeComponent, ExpenseComponent]
  ,
  exports:[DataTableModule,SharedModule,DialogModule,FormsModule]})
export class ClinicModule { }
