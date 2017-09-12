import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule, } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ProductService } from './service/psc_server';
import { counterReducer, doubleReducer , doctorReducer} from './counter';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment'; // Angular CLI environment


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,HttpModule,FormsModule,
    StoreModule.forRoot({
      counter: counterReducer, double: doubleReducer, doctorlist: doctorReducer
    }),
   // StoreDevtoolsModule.instrumentOnlyWithExtension()
    !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 50 }) : []

  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
