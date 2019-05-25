import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store/store.model';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import * as a from './action/app.actions';

import { ProductService, Appvar } from './service/psc_server';
import { Doctor } from './model/doctor.model';
import * as L from 'leaflet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',


})
export class AppComponent implements OnInit {
  title = 'app'; lastDoctorID: any;
  doctorlist$: Observable<any>;
  lablist$: Observable<any>;
  flag$: Observable<any>;
  govlist$: Observable<any>;
  expenselist$: Observable<any>;
  mdSupplierlist$: Observable<any>;
  mdLabofficelist$: Observable<any>;
  mdDoctorlist$: Observable<any>;
  acDoctorid$: Observable<any>;
  isAdmin$: Observable<any>;
  doctors: any = [];
  display = false;
  states = [{
    "type": "Feature",
    "properties": { "party": "Republican" },
    "geometry": {
      "type": "Polygon",
      "coordinates": [[
        [-104.05, 48.99],
        [-97.22, 48.98],
        [-96.58, 45.94],
        [-104.03, 45.94],
        [-104.05, 48.99]
      ]]
    }
  }, {
    "type": "Feature",
    "properties": { "party": "Democrat" },
    "geometry": {
      "type": "Polygon",
      "coordinates": [[
        [-109.05, 41.00],
        [-102.06, 40.99],
        [-102.03, 36.99],
        [-109.04, 36.99],
        [-109.05, 41.00]
      ]]
    }
  }];
  geoJSON = {
    id: 'geoJSON',
    name: 'Geo JSON Polygon',
    enabled: true,
    layer: L.geoJSON(
      ({
        type: 'Polygon',
        coordinates: [[
          [102.048756377755083, 15.82793792918425],
          [102.047346022182879, 15.829740802998161],
          [102.04808108181075, 15.830121098210286],
          [102.048756377755083, 15.83038315528114],
          [102.049573159065559, 15.830601962666423]
        ]]
      }) as any,
      { style: () => ({ color: '#ff7800' }) })
  };
  options = {
    layers: [
      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 5,
    center: L.latLng([13, 100])
  };
  layersControl = {

    overlays: {
      GeoJSON: this.geoJSON.layer,
      'Big Circle': L.circle([15.17, 100.22], { radius: 5000 }),
      'mk': L.marker([15.07, 100.64]),
      'm': L.marker([44.0, 11.0], {
        icon: L.icon({
          iconSize: [48, 48],
          iconAnchor: [24, 48],
          iconUrl: '/assets/css/images/marker-icon.png'
        })
      })
    }
  }
  appvar: Appvar;
  constructor(private store: Store<AppState>, private _productService: ProductService, public _appvar: Appvar) {
    // 
    /*this.lablist$ = store.select('lablist');
      this.txlist$ = store.select('txlist');
     this.govlist$ = store.select('govlist');
     this.expenselist$ = store.select('expenselist');
     this.mdSupplierlist$ = store.select('mdSupplierlist');
     this.mdLabofficelist$ = store.select('mdLabofficelist');
     this.mdDoctorlist$ = store.select('mdDoctorlist');
     this.acDoctorid$ = store.select('acDoctorid');
       */
    this.appvar = _appvar;
    this.flag$ = store.select('flag');
  }
  // appvar:Appvar;
  isAdmin = false;
  getFlagIsAdmin() {
    let adm;
    this.flag$.subscribe(r => {
      adm = r.isAdmin;
    });
    return adm;

  }
  doInit() {
    this.flag$.subscribe(r => {
      this.isAdmin = r.isAdmin;
    });
    this.isAdmin
    let lns: number;

  }
  getAdmin() {
    return Appvar.isAdmin;
  }
  ngOnInit() {
    // console.log(Appvar.apptitle);
    // Appvar.apptitle=" ssj4.0";
    this.doInit();
  }
}

