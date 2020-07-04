import { Component, OnInit, ViewChild } from '@angular/core';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { add } from 'ngx-bootstrap/chronos';
import { MapMarker, MapInfoWindow, GoogleMap } from '@angular/google-maps';

@Component({
  selector: 'app-presentacion-propiedades',
  templateUrl: './presentacion-propiedades.component.html',
  styles: [
  ]
})
export class PresentacionPropiedadesComponent implements OnInit {

  @ViewChild("placesRef") placesRef: GooglePlaceDirective;

  @ViewChild(GoogleMap, { static: false }) map: GoogleMap
  @ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow

  zoom = 18
  center: google.maps.LatLngLiteral
  options: google.maps.MapOptions = {
    mapTypeId: 'terrain',
    maxZoom: 25,
    minZoom: 12,
  }
  markers = []
  infoContent = ''

  optionsSearch = {
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

  click(event: google.maps.MouseEvent) {
    console.log(event);
    this.markers.push({
      position:{
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      },
      label: {
        color: 'red',
        text: 'Marker label ' + (this.markers.length + 1),
      },
      title: 'Marker title ' + (this.markers.length + 1),
      info: 'Marker info ' + (this.markers.length + 1),
      options: {
        animation: google.maps.Animation.BOUNCE,
      },
    })
  }


  openInfo(marker: MapMarker, content) {
    this.infoContent = content
    this.info.open(marker)
  }

  public handleAddressChange(address: Address) {

    this.center.lat = address.geometry.location.lat();
    this.center.lng = address.geometry.location.lng();
  }
}
