import { Component, OnInit, ViewChild } from '@angular/core';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { MapInfoWindow, GoogleMap } from '@angular/google-maps';
import { MapsService } from 'src/app/services/apis/maps.service';
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
  lsPropiedadesUbicacion: IUbicacionMaps[] = [];

  infoContent = ''

  optionsSearch = {
    types: [],
    componentRestrictions: { country: 'PE' }
  }

  selectTarifa: any[] = [];
  selectPiso: any[] = [];
  selectHabitacion: any[] = [];
  //Dropdown Tarifa
  dataTarifa: any[] = [
    { id: '0', itemName: 'S/.0 - S/.500' },
    { id: '1', itemName: 'S/.500 - S/.1000' },
    { id: '2', itemName: 'S/.1000 - S/.1500' },
    { id: '3', itemName: 'S/.1500 - S/.2000' },
    { id: '4', itemName: 'S/.2000 - S/.3000' },
    { id: '5', itemName: 'S/.3000 - Más' }
  ]

  settingsTarifa = {
    singleSelection: true,
    text: 'Rango Tarifas',
    classes: 'selectpicker btn-danger',
    lazyLoading: true,
    maxHeight: 250,
    enableSearchFilter: true
  }

  //Dropdown N° habitaciones
  datahabitaciones: any[] = [
    { id: '0', itemName: '0 - 4 habitaciones' },
    { id: '1', itemName: '4 - 6 habitaciones' },
    { id: '2', itemName: '6 - 10 habitaciones' },
    { id: '3', itemName: '10 - 15 habitaciones' },
    { id: '4', itemName: '15 - 20 habitaciones' },
    { id: '5', itemName: '20 - Más habitaciones' },
  ]

  settingsHabitaciones = {
    singleSelection: true,
    text: 'N° Habitaciones',
    classes: 'selectpicker btn-danger',
    lazyLoading: true,
    maxHeight: 200,
    enableSearchFilter: true
  }

   //Dropdown N° Pisos
   datapisos: any[] = [
    { id: '0', itemName: '1 piso' },
    { id: '1', itemName: '2 pisos'},
    { id: '2', itemName: '3 pisos'},
    { id: '3', itemName: '4 pisos'},
    { id: '4', itemName: '5 pisos'},
    { id: '5', itemName: '6 a Más pisos'},
  ]

  settingsPisos = {
    singleSelection: true,
    text: 'N° Pisos',
    classes: 'selectpicker btn-danger',
    lazyLoading: true,
    maxHeight: 200,
    enableSearchFilter: true,
    searchAutofocus:true
  }

  constructor(
    private mapsService: MapsService,
    private modalService: ModalPresentarPropiedadService,
  ) { }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition(position => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    });
    this.listarPropiedadesDisponibles();
  }

  openInfo(marker, propiedad) {
    console.log(propiedad)
    propiedad.info.ver_detalle = false;
    this.infoContent = propiedad.info.descripcionDireccion;
    this.modalService.modalVerPropiedadInfo(propiedad.info).subscribe();
  }

  listarPropiedadesDisponibles() {
    this.mapsService.listarPropiedadesDisponibles().subscribe((resp: any) => {
      this.lsPropiedadesUbicacion = resp.aaData;
      this.llenarMarcadores(resp.aaData);
    })
  }

  private llenarMarcadores(marks: any []){
    this.markers = [];
    marks.forEach(element => {
      this.markers.push({
        position: {
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
  }

  public handleAddressChange(address: Address) {
    navigator.geolocation.getCurrentPosition(position => {
      this.zoom = 20;
      this.center = {
        lat: address.geometry.location.lat(),
        lng: address.geometry.location.lng()
      }
    });
  }


  onTarifaDeselect(event){
    this.selectTarifa = [];
  }

  onPisoDeselect(event){
    this.selectPiso = [];
  }
  
  onHabitacionDeselect(event){
    this.selectHabitacion = [];
  }

  filtrar(){
    var obj: any [] = [this.selectTarifa[0],this.selectPiso[0],this.selectHabitacion[0]];
    this.mapsService.filtrarPropiedadesDisponibles(obj).subscribe( (resp:any)=>{
      this.lsPropiedadesUbicacion = resp.aaData;
      this.llenarMarcadores(resp.aaData);
    });
  }
}
