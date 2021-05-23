import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-featured-carousel',
  templateUrl: './featured-carousel.component.html',
  styleUrls: ['./featured-carousel.component.scss']
})
export class FeaturedCarouselComponent implements OnInit {

  images: IImages[] = [];

  constructor() { }

  ngOnInit(): void {
    this.images.push({
      src: "../../../../../assets/media/stock-900x600/1.jpg",
    });
    this.images.push({
      src: "../../../../../assets/media/stock-900x600/2.jpg",
    });
    this.images.push({
      src: "../../../../../assets/media/stock-900x600/3.jpg",
    });
    this.images.push({
      src: "../../../../../assets/media/stock-900x600/4.jpg",
    });
    this.images.push({
      src: "../../../../../assets/media/stock-900x600/5.jpg",
    });
    this.images.push({
      src: "../../../../../assets/media/stock-900x600/6.jpg",
    });
  }
}
interface IImages {
  src: string;
}
