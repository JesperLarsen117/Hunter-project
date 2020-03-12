import { Component, OnInit } from '@angular/core';
import { Map, tileLayer, marker, LatLng } from 'leaflet';
import { Output } from '../../models/data'

import { DataService } from "../service/data.service";

import 'leaflet-routing-machine';
declare let L;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {
      coords;
    constructor(private dataService:DataService){

    }

    ionViewDidEnter(){
      this.loadMap();
    }

    loadMap() {
      const map = L.map('map');

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        maxZoom: 18,
        tileSize: 512,
        zoomOffset: -1,
        dragable: false
      }).addTo(map);
      
      function onLocationFound(e) {
        map.setView([e.latlng.lat, e.latlng.lng], 10)
        var radius = e.accuracy;
        L.Routing.control({
          draggableWaypoints: false,
          waypoints: [
            L.latLng(e.latlng.lat, e.latlng.lng),
            L.latLng(28.129313, -15.446677),
          ]
        }).addTo(map);
        L.circle(e.latlng, radius).addTo(map);
    }
    map.locate({setView: true, maxZoom: 16});
    map.on('locationfound', onLocationFound);

    }

    ngOnInit() {
      this.getDatabase();

    }

    getDatabase = () =>
      this.dataService
        .getData()
        .subscribe(res => (this.coords = res));
    


}
