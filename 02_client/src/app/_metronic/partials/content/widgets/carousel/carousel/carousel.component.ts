import { Component, OnInit } from '@angular/core';
import { SwiperComponent } from "swiper/angular";
// import Swiper core and required modules
import SwiperCore, { EffectFade, Navigation, Pagination } from "swiper/core";

// install Swiper modules
SwiperCore.use([EffectFade, Navigation, Pagination]);


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
