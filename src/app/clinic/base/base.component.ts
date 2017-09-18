import { Component, OnInit } from '@angular/core';
import { ClinicModule } from '../../../app/clinic/clinic.module';
import { Store } from '@ngrx/store';
import { AppState} from '../../../app/store/store.model';
import { ProductService } from '../../../app/service/psc_server';
import { Router, ActivatedRoute, Params } from '@angular/router';
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

  constructor( public store: Store<AppState>,public _productService: ProductService, public route: ActivatedRoute,
    public router: Router) { }

  ngOnInit() {
  }

}
