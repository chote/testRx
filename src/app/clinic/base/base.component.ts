import { Component, OnInit } from '@angular/core';
import { ComponentFactoryResolver } from '@angular/core'
import { ClinicModule } from '../../../app/clinic/clinic.module';
import { Store } from '@ngrx/store';
import { AppState} from '../../../app/store/store.model';
import { ProductService,Appvar } from '../../../app/service/psc_server';
import { Router, ActivatedRoute,Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import * as a from '../../action/app.actions';
import * as _ from 'lodash';
@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit {
  txlist$: Observable<any>;
  lablist$: Observable<any>;
  acdoctor$: Observable<any>;
  doctorlist$: Observable<any>;
  labpatlist$:Observable<any>;
  doctorpaylist$:Observable<any>;
  flag$: Observable<any>;
  appvar:Appvar;
  items:any=[];
  amarea:any=[];
  a1:any;a2:any;
  g3:any;
  constructor( private resolver: ComponentFactoryResolver,public store: Store<AppState>,public _productService: ProductService, public route: ActivatedRoute,
    public router: Router,public _appvar:Appvar) { 
this.appvar = _appvar;

    }

  ngOnInit() {
    this.txlist$ = this.store.select('txlist');
    this.lablist$ = this.store.select('lablist');
    this.doctorlist$ = this.store.select('doctorlist');
    this.flag$ = this.store.select('flag');
  }

}
