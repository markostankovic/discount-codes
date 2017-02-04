import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapsLatLng,
  CameraPosition,
  GoogleMapsMarkerOptions,
  GoogleMapsMarker
} from 'ionic-native';

/*
  Generated class for the Map page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
  }

  // Load map only after view is initialize
  ngAfterViewInit() {
    this.loadMap();
  }

  loadMap() {
    // make sure to create following structure in your view.html file
    // and add a height (for example 100%) to it, else the map won't be visible
    // <ion-content>
    //  <div #map id="map" style="height:100%;"></div>
    // </ion-content>

    // create a new map by passing HTMLElement
    let element: HTMLElement = document.getElementById('map');

    let map = new GoogleMap(element);

    // listen to MAP_READY event
    map.one(GoogleMapsEvent.MAP_READY).then(() => {
      // create LatLng object
      let ionic: GoogleMapsLatLng = new GoogleMapsLatLng(44.81648932, 20.46079159);

      console.log('----', ionic);
      // create CameraPosition
      let position: CameraPosition = {
        target: ionic,
        zoom: 12,
        tilt: 30
      };

      // move the map's camera to position
      map.moveCamera(position);

      // create new marker
      let markerOptions: GoogleMapsMarkerOptions = {
        position: ionic,
        title: 'Marko Test'
      };

      map.addMarker(markerOptions)
          .then((marker: GoogleMapsMarker) => {
            marker.showInfoWindow();
          });
    });


  }
}
