import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-therapy',
  templateUrl: './therapy.component.html',
  styleUrls: ['./therapy.component.scss'],
})
export class TherapyComponent implements OnInit {

  constructor(
    private renderer: Renderer2
  ) { }

  showTherapyHero = 'hide';
  therapies: ITherapy[] = [];
  therapyGridHeight = 850;  // therapy grid height in px
  therapyImgHeight = 250;   // init value. changes dynamically. in px
  therapyCount = 6;

  ngOnInit(): void {
    this.populateTherapyList();
    this.setImgHeight();
  }

  public mouseEnter(index: number, el: ElementRef) {
    let translateX = '50%';
    let translateY = '50%';
    let scale = 2;
    let row = Math.floor(index / 2);

    if (index % 2 == 0) translateX = '-50%';
    if (row != 0) translateY = '-50%';
    if (this.therapies.length > this.therapyCount) scale = 2.5;

    console.log(index);
    this.renderer.setStyle(el, 'transform',`translate(${translateX}, ${translateY}) scale(${scale})`);
    this.renderer.addClass(el, 'show-img');
  }

  public mouseLeave(therapy: ITherapy, el: ElementRef) {
    this.renderer.removeStyle(el, 'transform');
    this.renderer.removeClass(el, 'show-img');
  }

  private setImgHeight() {
    // calculate therapy items height dynamically
    let rowCount = Math.ceil(this.therapies.length / 2);
    this.therapyImgHeight = this.therapyGridHeight / rowCount * 0.9; // 0.9 to leave space in grid for margin/padding
  }

  private populateTherapyList() {
    this.therapies.push({
      url: '#',
      title: 'Therapy A',
      description: 'Therapy, also called psychotherapy or counseling, is the process of meeting with a therapist to resolve problematic behaviors, beliefs, feelings, relationship issues, and/or somatic responses (sensations in the body)',
      bgImage: 'https://www.hotelbtlv.co.il/wp-content/uploads/2019/04/m5c.jpg',
    });
    this.therapies.push({
      url: '#',
      title: 'Therapy B',
      description: 'Therapy, also called psychotherapy or counseling, is the process of meeting with a therapist to resolve problematic behaviors, beliefs, feelings, relationship issues, and/or somatic responses (sensations in the body)',
      bgImage: 'https://www.hotelbtlv.co.il/wp-content/uploads/2019/04/m3.jpg',
    });
    this.therapies.push({
      url: '#',
      title: 'Therapy C',
      description: 'Therapy, also called psychotherapy or counseling, is the process of meeting with a therapist to resolve problematic behaviors, beliefs, feelings, relationship issues, and/or somatic responses (sensations in the body)',
      bgImage: 'https://www.hotelbtlv.co.il/wp-content/uploads/2019/04/m2.jpg',
    });
    this.therapies.push({
      url: '#',
      title: 'Therapy D',
      description: 'Therapy, also called psychotherapy or counseling, is the process of meeting with a therapist to resolve problematic behaviors, beliefs, feelings, relationship issues, and/or somatic responses (sensations in the body)',
      bgImage: 'https://www.hotelbtlv.co.il/wp-content/uploads/2019/04/m4c.jpg',
    });
    this.therapies.push({
      url: '#',
      title: 'Therapy E',
      description: 'Therapy, also called psychotherapy or counseling, is the process of meeting with a therapist to resolve problematic behaviors, beliefs, feelings, relationship issues, and/or somatic responses (sensations in the body)',
      bgImage: 'https://www.hotelbtlv.co.il/wp-content/uploads/2019/04/m5c.jpg',
    });
    this.therapies.push({
      url: '#',
      title: 'Therapy F',
      description: 'Therapy, also called psychotherapy or counseling, is the process of meeting with a therapist to resolve problematic behaviors, beliefs, feelings, relationship issues, and/or somatic responses (sensations in the body)',
      bgImage: 'https://www.hotelbtlv.co.il/wp-content/uploads/2019/04/m3.jpg'
    });
    this.therapies.push({
      url: '#',
      title: 'Therapy G',
      description: 'Therapy, also called psychotherapy or counseling, is the process of meeting with a therapist to resolve problematic behaviors, beliefs, feelings, relationship issues, and/or somatic responses (sensations in the body)',
      bgImage: 'https://www.hotelbtlv.co.il/wp-content/uploads/2019/04/m2.jpg'
    });
    // this.therapies.push({
    //   url: '#',
    //   title: 'Therapy H',
    //   description: 'Therapy, also called psychotherapy or counseling, is the process of meeting with a therapist to resolve problematic behaviors, beliefs, feelings, relationship issues, and/or somatic responses (sensations in the body)',
    //   bgImage: 'https://www.hotelbtlv.co.il/wp-content/uploads/2019/04/m4c.jpg'
    // });
    // this.therapies.push({
    //   url: '#',
    //   title: 'Therapy I',
    //   description: 'Therapy, also called psychotherapy or counseling, is the process of meeting with a therapist to resolve problematic behaviors, beliefs, feelings, relationship issues, and/or somatic responses (sensations in the body)',
    //   bgImage: 'https://www.hotelbtlv.co.il/wp-content/uploads/2019/04/m5c.jpg'
    // });
  }
}

export interface ITherapy {
  url: string;
  title: string;
  description: string;
  bgImage: string;
}
