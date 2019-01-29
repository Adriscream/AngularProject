import { Component, OnInit } from '@angular/core';
import { Image } from '../shared/image.shared';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.sass']
})
export class CarouselComponent implements OnInit {
   
  images = [
    new Image( '../../assets/images/carousel-home-movil.jpg', 'Movil', true ),
    new Image( '../../assets/images/carousel-home-cabeza.jpg', 'Cabeza', false ),
    new Image( '../../assets/images/carousel-home-lapiz.jpg', 'Lapiz', false ),
  ];
  texto = 'Pruebababababababababa'
  indicatorActiveindex = 0;
  carouselLength = this.images.length
  constructor() { }

  ngOnInit() {
  }

  public next (){
    if (this.indicatorActiveindex < 3){
      this.indicatorActiveindex = 0
    } else {
      this.indicatorActiveindex++
    }
  }

  public prev (){
    if (this.indicatorActiveindex === 0){
      this.indicatorActiveindex = this.carouselLength
    } else {
      this.indicatorActiveindex--
    }
  }
}
