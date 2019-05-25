import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableModule, SharedModule, DialogModule,DropdownModule ,CheckboxModule,OverlayPanelModule} from 'primeng/primeng'; 
import {MdTabsModule} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { SumsPipe } from '../pipe/sums.pipe';
import {FilterPipe,LabFilterPipe,ExpenseFilterPipe} from '../pipe/filter.pipe';
import {DoctorMonthFilterPipe} from '../pipe/doctormonth.filter.pipe';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { TxComponent } from './tx/tx.component';
import { LabComponent } from './lab/lab.component';
import { BaseComponent } from './base/base.component';
import { DoctorComponent } from './doctor/doctor.component';
import { GovComponent } from './gov/gov.component';
import { HomeComponent } from './home/home.component';
import { ExpenseComponent } from './expense/expense.component';
import { CbmonthsComponent } from './tools/cbmonths/cbmonths.component';
import { DoctormonthComponent } from './doctormonth/doctormonth.component';
import { DoctorpayComponent } from './doctorpay/doctorpay.component';
import { LabpayComponent } from './labpay/labpay.component';
import { GisComponent } from './gis/gis.component';
import { MapComponent } from './map/map.component';
import { TooltipComponent } from './tooltip/tooltip.component';
import { ClinicComponent } from './clinic.component';
import { LeafletComponent } from './leaflet/leaflet.component';
@NgModule({
  imports: [LeafletModule.forRoot(),
 
  CommonModule,DataTableModule,SharedModule,DialogModule,FormsModule,DropdownModule,CheckboxModule,MdTabsModule,OverlayPanelModule
  ],
  declarations: [
    DoctormonthComponent, DoctorMonthFilterPipe, ExpenseFilterPipe, LabFilterPipe, LeafletComponent,
    FilterPipe,SumsPipe,TxComponent, LabComponent, BaseComponent, DoctorComponent, GovComponent, HomeComponent, 
    ExpenseComponent,CbmonthsComponent, DoctorpayComponent, LabpayComponent, GisComponent, MapComponent, TooltipComponent, ClinicComponent
  ]
  ,
  exports:[DataTableModule,SharedModule,DialogModule,FormsModule,CheckboxModule,MdTabsModule]})
export class ClinicModule { }
