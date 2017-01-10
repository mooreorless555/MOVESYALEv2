import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { NavController, Platform, NavParams } from 'ionic-angular';
import { NativeStorage } from 'ionic-native';
import { MovesService } from '../services/MovesService';

import { StatsPage } from '../stats/stats'

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

declare var google;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
  providers: [MovesService]
})
export class MapPage {

  //platform: any;

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  moves: Array<any>;
 

  constructor(public platform: Platform, public params: NavParams, public navCtrl: NavController, public movesService: MovesService) {
        this.platform = platform;
        this.moves = params.get("moves");
        //alert(this.moves);

        //this.listMoves();
        this.initializeMap();
        //this.initializeMap();    
  }

  listMoves() {
    var me = this;

    NativeStorage.getItem('user')
    .then(function(user) {
      //alert("Got token: " + user.token);
      return Promise.all([user, me.movesService.getMoves(user.token)]);
    })
    .then(function(results) {
      //alert(results[1]);
      me.moves = results[1];
      //alert("Got moves: " + me.moves);
    })
    .catch(function(err) {
      alert("Couldn't get tokens " + err);
    });
  }

  /*
  constructor(public navCtrl: NavController) {
    
  }

  ngOnInit() {
    //this.loadMap();
  }

  ionViewDidLoad(){
    //this.loadMap();
  }
 
  loadMap(){
 
    console.log("Loading Map!");
    let latLng = new google.maps.LatLng(-34.9290, 138.6010);
 
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
 
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    console.log("Map: " + this.map);
  }
  */

  initializeMap() {
 
    this.platform.ready()
    .then(() => {
        var minZoomLevel = 12;
 
        this.map = new google.maps.Map(document.getElementById('map'), {
            zoom: minZoomLevel,
            center: new google.maps.LatLng(41.3083, -72.9279),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#523735"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#c9b2a6"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#dcd2be"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#ae9e90"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#93817c"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#a5b076"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#447530"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#fdfcf8"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f8c967"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#e9bc62"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e98d58"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#db8555"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#806b63"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8f7d77"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#b9d3c2"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#92998d"
      }
    ]
  }
]
        });
    })
    .then(() => {
        for (let i=0; i < this.moves.length; i++) {

        	this.addMarker(this.moves[i]);
          //this.addMarker(this.moves[i].location.lat, this.moves[i].location.long);
        }
    })
  } 

  addMarker(move){
 
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: new google.maps.LatLng(move.location.lat, move.location.long)
    });

    //alert("move: " + move);

    marker.addListener('click', function() {
      //this.map.setCenter(marker.getPosition());
      //this.checkStats(move);
      let lmove = move;

      alert("In listener, move: " + move.info.name);
      this.navCtrl.push(StatsPage, {
      	firstPassed: move
      });
    });
 
    //let content = "<p>Information!</p>";          
 
    //this.addInfoWindow(marker, content);
 
  }

  addInfoWindow(marker, content){
 
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
 	

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
 
  }

  checkStats(move) {
  	alert("In check stats, move: " + move);
    this.navCtrl.push(StatsPage, { 
      firstPassed: move}
      );
  } 
}