import { Component, OnInit, ViewChild } from '@angular/core';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { MapMarker, MapInfoWindow, GoogleMap } from '@angular/google-maps';
import { MapsService } from 'src/app/services/apis/maps.service';
import { ISolicitudPropiedad } from 'src/models/ISolicitudPropiedad';
import { IUbicacionMaps } from 'src/models/IUbicacionMaps';
import { ModalPresentarPropiedadService } from 'src/app/services/common/modal-presentar-propiedad.service';

@Component({
  selector: 'app-presentacion-propiedades',
  templateUrl: './presentacion-propiedades.component.html'
})
export class PresentacionPropiedadesComponent implements OnInit {

  @ViewChild("placesRef") placesRef: GooglePlaceDirective;

  @ViewChild(GoogleMap, { static: false }) map: GoogleMap
  @ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow

  zoom = 12;
  center: google.maps.LatLngLiteral
  options: google.maps.MapOptions = {
    mapTypeId: 'terrain',
    maxZoom: 30,
    minZoom: 12,
    scrollwheel: false,
    
    
  }
  markers = [];
  lsPropiedadesUbicacion: IUbicacionMaps [] = [];

  infoContent = ''

  optionsSearch = {
    types: [],
    componentRestrictions: { country: 'PE'}
  }

  constructor(
    private mapsService: MapsService,
    private modalService: ModalPresentarPropiedadService,
  ){}

  ngOnInit() {
    navigator.geolocation.getCurrentPosition(position => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    });
    this.listarPropiedadesDisponibles();
  }

  openInfo(marker,propiedad) {
    this.infoContent = propiedad.info.descripcionDireccion;
    this.modalService.modalVerPropiedadInfo(propiedad.info).subscribe(resp=>{},err=>{},()=>{

    });
  }

  listarPropiedadesDisponibles(){
    this.mapsService.listarPropiedadesDisponibles().subscribe((resp:any)=>{
      this.lsPropiedadesUbicacion = resp.aaData;
      resp.aaData.forEach(element => {
        this.markers.push({
          position:{
            lat: element.latitud,
            lng: element.longitud
          },
          label: {
            color: 'red',
            text: element.propiedad.alias
          },
          options: {
            animation: google.maps.Animation.BOUNCE,
          },
          info: element
        })
      });
      console.log(this.lsPropiedadesUbicacion)
    })
  }

  public handleAddressChange(address: Address) {
    navigator.geolocation.getCurrentPosition(position => {
      this.center = {
        lat: address.geometry.location.lat(),
        lng: address.geometry.location.lng()
      }
    });
  }
}
