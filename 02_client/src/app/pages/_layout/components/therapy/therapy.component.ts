import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, HostListener, Input, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-therapy',
  templateUrl: './therapy.component.html',
  styleUrls: ['./therapy.component.scss'],
  animations: [
    trigger('dialog', [
      transition('void => *', [
        style({ opacity: 0}),
        animate(100, style({opacity: 1}))
      ]),
      transition('* => void', [
        animate(200, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class TherapyComponent implements OnInit {

  constructor(
    private renderer: Renderer2
  ) { }

  @ViewChild('therapyModal') therapyModalElementRef: ElementRef;
  @Input() pageBackdrop: ElementRef;
  
  showTherapyModal = false;
  therapies: ITherapy[] = [];
  therapyLimitForGridLayoutChange = 7;
  
  therapyObjectInModal: ITherapy;

  ngOnInit(): void {
    this.populateTherapyList();
  }


  public setModal(therapy: ITherapy) {
    this.therapyObjectInModal = therapy;
    this.showTherapyModal = true;
    this.renderer.addClass(this.pageBackdrop.nativeElement, 'backdrop-animation');
  }

  public closeModal() {
    if (this.showTherapyModal) {
      this.showTherapyModal = false;
      this.renderer.removeClass(this.pageBackdrop.nativeElement, 'backdrop-animation');
    }
  }

  private populateTherapyList() {
    this.therapies.push({
      url: '#',
      title: 'Therapy A',
      description: 'Therapy, also called psychotherapy or counseling, is the process of meeting with a therapist to resolve problematic behaviors, beliefs, feelings, relationship issues, and/or somatic responses (sensations in the body)',
      bgImage: 'https://www.hotelbtlv.co.il/wp-content/uploads/2019/04/m5c.jpg'
    });
    this.therapies.push({
      url: '#',
      title: 'Therapy B',
      description: 'Therapy, also called psychotherapy or counseling, is the process of meeting with a therapist to resolve problematic behaviors, beliefs, feelings, relationship issues, and/or somatic responses (sensations in the body)',
      bgImage: 'https://www.hotelbtlv.co.il/wp-content/uploads/2019/04/m3.jpg'
    });
    this.therapies.push({
      url: '#',
      title: 'Therapy C',
      description: 'Therapy, also called psychotherapy or counseling, is the process of meeting with a therapist to resolve problematic behaviors, beliefs, feelings, relationship issues, and/or somatic responses (sensations in the body)',
      bgImage: 'https://www.hotelbtlv.co.il/wp-content/uploads/2019/04/m2.jpg'
    });
    this.therapies.push({
      url: '#',
      title: 'Therapy D',
      description: 'Therapy, also called psychotherapy or counseling, is the process of meeting with a therapist to resolve problematic behaviors, beliefs, feelings, relationship issues, and/or somatic responses (sensations in the body)',
      bgImage: 'https://www.hotelbtlv.co.il/wp-content/uploads/2019/04/m4c.jpg'
    });
    this.therapies.push({
      url: '#',
      title: 'Therapy E',
      description: 'Therapy, also called psychotherapy or counseling, is the process of meeting with a therapist to resolve problematic behaviors, beliefs, feelings, relationship issues, and/or somatic responses (sensations in the body)',
      bgImage: 'https://www.hotelbtlv.co.il/wp-content/uploads/2019/04/m5c.jpg'
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
