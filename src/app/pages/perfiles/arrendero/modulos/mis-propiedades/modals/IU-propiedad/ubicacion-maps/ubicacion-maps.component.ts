import { Component, OnInit, Input, ViewChild, Output,EventEmitter } from '@angular/core';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { MapMarker, GoogleMap, MapInfoWindow } from '@angular/google-maps';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { IMarkInfo } from 'src/models/IMarkInfo';

@Component({
  selector: 'app-ubicacion-maps',
  templateUrl: './ubicacion-maps.component.html',
  styles: [
  ]
})
export class UbicacionMapsComponent implements OnInit {

  @Output() event = new EventEmitter<any>();

  @ViewChild("placesRef") placesRef: GooglePlaceDirective;

  @ViewChild(GoogleMap, { static: false }) map: GoogleMap
  @ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow

  zoom = 18
  center: google.maps.LatLngLiteral
  options: google.maps.MapOptions = {
    mapTypeId: 'terrain',
    maxZoom: 30,
    minZoom: 12,
    scrollwheel: false
  }
  //markers : google.maps.MarkerOptions = []
  marker :any = null;
  infoContent: IMarkInfo = {};

  optionsSearch= {
    types: [],
    componentRestrictions: { country: 'PE'}
  }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition(position => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    })
  }

  openInfo(marker: MapMarker, info) {
    this.infoContent = info;
    this.info.open(marker)
  }

  public handleAddressChange(address: Address) {
    this.info.close();
    var image = {
      url :'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
      size: new google.maps.Size(20, 32),
    }
    navigator.geolocation.getCurrentPosition(position => {
      this.center = {
        lat: address.geometry.location.lat(),
        lng: address.geometry.location.lng()
      }
      this.marker = {
        position:{
          lat: address.geometry.location.lat(),
          lng: address.geometry.location.lng()
        },
        icon: image,
        label:{
          color: 'black',
          text: 'Propiedad seleccionada'
        },
        options: {
          animation: google.maps.Animation.BOUNCE,
        },
        address: address.formatted_address,
        info: {
          dir: address.formatted_address,
          url: address.url
        }
      };
    });
  }

  public confirmarDir(){
    this.event.emit(this.marker);
  }
}