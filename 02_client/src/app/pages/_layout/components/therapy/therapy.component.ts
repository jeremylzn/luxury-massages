import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, HostListener, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from 'src/app/_metronic/core/models/service.model';
import { ItemServiceService } from 'src/app/_metronic/core/services/item-service.service';

@Component({
  selector: 'app-therapy',
  templateUrl: './therapy.component.html',
  styleUrls: ['./therapy.component.scss'],
})
export class TherapyComponent implements OnInit {

  constructor(
    private renderer: Renderer2, private itemServiceService: ItemServiceService
  ) { }
  
  public allServices:Observable<Service[]>;
  therapies: ITherapy[] = [];
  therapyGridHeight = 850;  // therapy grid height in px
  therapyImgHeight = 250;   // init value. changes dynamically. in px
  leftImgSize = 75; // size in % of the total width
  gridGap = 10; // grid gap in px
  therapyCount = 6;
  effectiveSize = this.therapyGridHeight * (this.leftImgSize / 100);
  allData: any = []

  ngOnInit(): void {
    this.allServices = this.itemServiceService.serviceActif; // subscribe to entire collection
    this.itemServiceService.getAllServicesActif();

    this.populateTherapyList();
    this.setImgHeight();
  }

  public mouseEnter(index: number, el: Element) {
    this.renderer.setStyle(el, 'height', `${this.effectiveSize}px`);
    this.renderer.addClass(el, 'show-img');
  }

  public mouseLeave(therapy: ITherapy, el: ElementRef) {
    this.renderer.setStyle(el, 'height', `${this.therapyImgHeight}px`);
    this.renderer.removeClass(el, 'show-img');
  }

  private setImgHeight() {
    // calculate therapy items height dynamically
    let rowCount = Math.ceil(this.therapies.length / 2);
    this.effectiveSize = this.therapyGridHeight * (this.leftImgSize / 100);
    let gapToRemove = (this.gridGap * (rowCount - 1)) / rowCount;
    this.therapyImgHeight = (this.effectiveSize / rowCount) - gapToRemove;
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
    // this.therapies.push({
    //   url: '#',
    //   title: 'Therapy F',
    //   description: 'Therapy, also called psychotherapy or counseling, is the process of meeting with a therapist to resolve problematic behaviors, beliefs, feelings, relationship issues, and/or somatic responses (sensations in the body)',
    //   bgImage: 'https://www.hotelbtlv.co.il/wp-content/uploads/2019/04/m3.jpg'
    // });
    // this.therapies.push({
    //   url: '#',
    //   title: 'Therapy G',
    //   description: 'Therapy, also called psychotherapy or counseling, is the process of meeting with a therapist to resolve problematic behaviors, beliefs, feelings, relationship issues, and/or somatic responses (sensations in the body)',
    //   bgImage: 'https://www.hotelbtlv.co.il/wp-content/uploads/2019/04/m2.jpg'
    // });
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
