import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CarouselImages } from 'src/models/ICarouselImages';
import { Lightbox } from 'ngx-lightbox';


@Component({
  selector: 'app-contenido',
  templateUrl: './contenido.component.html',
  styleUrls: ['./contenido.component.scss']
})
export class ContenidoComponent implements OnInit {

  private _album: Array<any> = [];

  imagesData: CarouselImages[] = [

    {
      src: 'assets/img/arrendatario_buscar_propiedades.jpg',
      alt: 'image',
      title: 'Arrendatario',
      text: 'Busca propiedades disponibles a alquilar en tu zona mas cercana'
      
    },
    {
      src: 'assets/img/arrendero_dashboard.jpg',
      alt: 'image',
      title: 'Arrendero',
      text: 'Visualiza mediante graficos tus ganancias y otros parametros de interes.'
    },
    {
      src: 'assets/img/arrendero_registrar_propiedades.jpg',
      alt: 'image',
      title: 'Arrendero',
      text: 'Registra tus propiedades con su N° de Partida Registral para que este a la vista de todos los que busquen un alquiler'
    },
    {
      src: 'assets/img/arrendatario_registrar_pago.jpg',
      alt: 'image',
      title: 'Arrendatario',
      text: 'Registra los pagos por renta con la posibilidad de hacerlo en partes mediante vouchers de deposito'
    }
  ]

  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplayTimeout: 4000,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 1000,
    navText: ['<div class="icon icon-lg icon-danger"><i class="tim-icons icon-minimal-left pt-2"></i></div>', 
              '<div class="icon icon-lg icon-danger"><i class="tim-icons icon-minimal-right pt-2"></i></div>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 2
      },
      940: {
        items: 2
      },
      1200: {
        items: 1
      }
    },
    nav: true,
    
  }

  constructor(
    private _lightbox: Lightbox
  ) { }

  ngOnInit() {
    this.imagesData.forEach( image => {
      const album = {
        src: image.src,
        caption: image.title + ".- " +image.text,
      };
      this._album.push(album);
    })
  }

  open(index): void {
    this._lightbox.open(this._album,index);
  }
 
  close(): void {
    this._lightbox.close();
  }

}
