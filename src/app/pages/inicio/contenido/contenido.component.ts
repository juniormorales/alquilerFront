import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

interface Image {
  src: string;
  title?: string;
  alt?: string;
  text?:string;
}

@Component({
  selector: 'app-contenido',
  templateUrl: './contenido.component.html',
  styleUrls: ['./contenido.component.scss']
})
export class ContenidoComponent implements OnInit {

  imagesData: Image[] = [

    {
      src: 'assets/img/bg1.jpg',
      alt: 'image',
      title: 'image',
      text: 'imagen muestra'
    },
    {
      src: 'assets/img/bg3.jpg',
      alt: 'image',
      title: 'image',
      text: 'imagen muestra'
    },
    {
      src: 'assets/img/bg5.jpg',
      alt: 'image',
      title: 'image',
      text: 'imagen muestra'
    },
    {
      src: 'assets/img/bg13.jpg',
      alt: 'image',
      title: 'image'
    },
    {
      src: 'assets/img/bg14.jpg',
      alt: 'image',
      title: 'image',
      text: 'imagen muestra'
    },
    {
      src: 'assets/img/bg15.jpg',
      alt: 'image',
      title: 'image',
      text: 'imagen muestra'
    },
    {
      src: 'assets/img/bg16.jpg',
      alt: 'image',
      title: 'image',
      text: 'imagen muestra'
    }
  ]

  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplayTimeout: 3000,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['<div class=" icon icon-primary"><i class="tim-icons icon-minimal-left"></i></div>', 
              '<div class=" icon icon-primary"><i class="tim-icons icon-minimal-right"></i></div>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 2
      }
    },
    nav: true
  }

  constructor() { }

  ngOnInit() {
  }

}
