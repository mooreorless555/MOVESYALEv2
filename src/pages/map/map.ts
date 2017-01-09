import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { NavController, Platform, NavParams } from 'ionic-angular';
import { NativeStorage } from 'ionic-native';
import { MovesService } from '../services/MovesService';
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
 

  constructor(public platform: Platform, public params: NavParams, public movesService: MovesService) {
        this.platform = platform;
        this.moves = params.get("moves");
        alert(this.moves);

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
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
    })
    .then(() => {
        for (let i=0; i < this.moves.length; i++) {

          this.addMarker(this.moves[i].location.lat, this.moves[i].location.long);
        }
    })
  } 

  addMarker(lat, lng){
 
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: new google.maps.LatLng(lat, lng)
    });

    marker.addListener('click', function() {
      this.map.setCenter(marker.getPosition());
    });
 
    let content = "<p>Information!</p>";          
 
    this.addInfoWindow(marker, content);
 
  }

  addInfoWindow(marker, content){
 
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
 
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
 
  }
}