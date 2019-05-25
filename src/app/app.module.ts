import { BrowserModule, } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from "@angular/flex-layout";
import { NgModule } from '@angular/core';
import { StoreModule, } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
//import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { ProductService,Appvar } from './service/psc_server';
import {  doctorReducer,txReducer,flagReducer ,labReducer,labpayReducer,doctorpayReducer} from './reducer/app.reducers';
import { AppRoutingModule } from './app-routing.module';
import {MdToolbarModule,MdButtonModule} from '@angular/material';
import { ClinicModule } from './clinic/clinic.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { ChartComponent } from './chart/chart.component'; // Angular CLI environment
import {FlexDirective,LayoutDirective} from './directive/flex.directive';




@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,FlexDirective,LayoutDirective
  ],
  imports: [FlexLayoutModule,
    MdToolbarModule, BrowserModule,BrowserAnimationsModule,HttpModule,FormsModule,AppRoutingModule,MdButtonModule,
    ChartsModule,ClinicModule, StoreModule.forRoot({
       doctorlist: doctorReducer,txlist:txReducer,flag:flagReducer,
       lablist:labReducer,labpaylist:labpayReducer,doctorpaylist:doctorpayReducer
    }),
   // StoreDevtoolsModule.instrumentOnlyWithExtension()
    !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 50 }) : []

  ],
  providers: [ProductService,Appvar],
  bootstrap: [AppComponent]
})
export class AppModule { }
