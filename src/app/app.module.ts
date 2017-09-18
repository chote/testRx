import { BrowserModule, } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { StoreModule, } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ProductService } from './service/psc_server';
import { counterReducer, doubleReducer, doctorReducer,txReducer } from './reducer/app.reducers';
import { AppRoutingModule } from './app-routing.module';
import {MdToolbarModule,MdButtonModule} from '@angular/material';
import { ClinicModule } from './clinic/clinic.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment'; // Angular CLI environment


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    MdToolbarModule, BrowserModule,BrowserAnimationsModule,HttpModule,FormsModule,AppRoutingModule,MdButtonModule,
   ClinicModule, StoreModule.forRoot({
      counter: counterReducer, double: doubleReducer, doctorlist: doctorReducer,txlist:txReducer
    }),
   // StoreDevtoolsModule.instrumentOnlyWithExtension()
    !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 50 }) : []

  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
