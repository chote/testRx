import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import * as a from '../../action/app.actions';
import * as moment from 'moment';
import * as _ from 'lodash';
import * as L from 'leaflet';

@Component({
  selector: 'app-leaflet',
  templateUrl: './leaflet.component.html',
  styleUrls: ['./leaflet.component.css']
})
export class LeafletComponent extends BaseComponent implements OnInit  {


  ngOnInit() {
    let map = new L.Map('map', {
      center: new L.LatLng(40.731253, -73.996139),
      zoom: 12,
    });
   /*  map.on('click', (e: LeafletMouseEvent) => {
      let marker = L.marker(e.latlng)
      .bindPopup('Popup')
      .addTo(map)
      .openPopup();
    });  */
  }

}
