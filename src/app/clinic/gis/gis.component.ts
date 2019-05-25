import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import * as a from '../../action/app.actions';
import * as moment from 'moment';
import * as _ from 'lodash';
import * as L from 'leaflet';
@Component({
  selector: 'app-gis',
  templateUrl: './gis.component.html',
  styleUrls: ['./gis.component.css']
})
export class GisComponent extends BaseComponent implements OnInit {
  mapdisplay = false;
  imessage = "";
  getColors(x, sh = 'blue') {
    let blue = ['#eff3ff', '#bdd7e7', '#6baed6', '#3182bd', '#08519c'];
    let yb = ['#ffffcc', '#a1dab4', '#41b6c4', '#2c7fb8', '#253494'];
    let rdpu = ['#feebe2', '#fbb4b9', '#f768a1', '#c51b8a', '#7a0177'];
    let color = "";
    let y = [];
    if (sh == "blue") { y = blue; }
    if (sh == "yb") { y = yb; }
    if (sh == "rdpu") { y = rdpu; }
    switch (true) {
      case (x > 1000):
        color = y[0];
        break;
      case (x > 500):
        color = y[1];
        break;
      case (x > 200):
        color = y[2];
        break;
      case (x > 100):
        color = y[3];
        break;

      default:
        color = y[4];;
    }
    return color;
  }
  getColor(x) {
    let color = "";
    switch (true) {
      case (x > 1000):
        color = '#800026';
        break;
      case (x > 500):
        color = '#BD0026';
        break;
      case (x > 200):
        color = '#E31A1C';
        break;
      case (x > 100):
        color = '#FC4E2A';
        break;
      case (x > 50):
        color = '#FD8D3C';
        break;
      case (x > 20):
        color = '#FEB24C';
        break;
      case (x > 10):
        color = '#FED976';
        break;
      default:
        color = '#FFEDA0';
    }
    //  console.log(color);

    return color;

  }
  getnewColor(x) {
    let color = "";
    switch (true) {
      case (x > 1000):
        color = '#800026';
        break;
      case (x > 500):
        color = '#BD0026';
        break;
      case (x > 200):
        color = '#E31A1C';
        break;
      case (x > 100):
        color = '#FC4E2A';
        break;
      case (x > 50):
        color = '#FD8D3C';
        break;
      case (x > 20):
        color = '#FEB24C';
        break;
      case (x > 10):
        color = '#FED976';
        break;
      default:
        color = '#FFEDA0';
    }
    //console.log(color);

    return color;

  }
  style(feature) {
    let t = this;
    //console.log(feature);//feature.properties.color

    return {
      fillColor: '#E31A1C',
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
    };
  }
  geoJSON: any;
  options: any;
  layersControl: any;
  country = "";
  x: any;
  componentRef: any;
  domap() {
    this.getmymap();
    this.mapdisplay = true;

  }
  getmymap() {
    this.geoJSON = {
      id: 'geoJSON',
      name: 'Geo JSON Polygon',
      enabled: true,
      layer: L.geoJSON(
        (this.g3) as any,
        {
          style: (f) => (
            {
              fillColor: this.getColors(f.properties.density, 'yb'),//,'blue'),//f.properties.color,// f.properties.color, //this.getColor(f.properties.density),
              color: '#FFFFFF',
              opacity: 1,
              dashArray: '3',
              fillOpacity: 0.7
            }
          )
          , onEachFeature: onEachFeature
        }) //() => ({ color: '#ff7800' })

    };
    function onEachFeature(feature, layer) {
      layer.on({
        click: function () {
          console.log(layer.feature.properties.name);
          this.country = layer.feature.properties.name;
          // var idIW = L.popup();
          //  var content = '<span><b>Shape Name</b></span><br/><input id="shapeName" type="text"/><br/><br/><span><b>Shape Description<b/></span><br/><textarea id="shapeDesc" cols="25" rows="5"></textarea><br/><br/><input type="button" id="okBtn" value="Save" onclick="saveIdIW()"/>';
          //  idIW.setContent(content);
          //    idIW.setLatLng(latlng); //calculated based on the e.layertype
          //  idIW.openOn(map);
          this.imessage = layer.feature.properties.name;
          this.imessage = "aaa";
        },
        mouseover: function () {
          console.log(layer.feature.properties.density);
          layer.setStyle({
            opacity: 1,
            dashArray: '3',
            fillOpacity: 1
          });
        }
        ,
        mouseout: function () {
          console.log(layer.feature.properties.density);
          layer.setStyle({
            opacity: 1,
            dashArray: '3',
            fillOpacity: 0.7
          });
        }
      })
    }

  
    this.options = {
      layers: [
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
      ],
      zoom: 5,
      center: L.latLng([13, 100])
    };

    this.layersControl = {

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
  }

  getarea() {
    let sql = { sql: "select * from geojson g,ampall a where g.areacode = a.code and left(g.areacode,2) in('36') and g.hcode='00000' " };
    this._productService.getSql(sql).subscribe(res => {
      this.items = res;
      let f; let r;
      let i = 0;
      let o: object;
      let co = "";
      this.items.forEach(el => {
        i++; r = Math.floor(Math.random() * 1000) + 10;

        f = { "type": "Feature", "id": i, "properties": { "name": el['name'], "density": r, "color": this.getColor(r) }, "geometry": JSON.parse(el['geojson']) };
        this.amarea.push(f);
        // console.log(r);

      });

      this.g3 = { "type": "FeatureCollection", "features": this.amarea };



    });
  }
  ngOnInit() {

    this.getarea();




  }

}
