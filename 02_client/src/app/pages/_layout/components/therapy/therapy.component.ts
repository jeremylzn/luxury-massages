import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, HostListener, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Service } from 'src/app/_metronic/core/models/service.model';
import { ItemServiceService } from 'src/app/_metronic/core/services/item-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-therapy',
  templateUrl: './therapy.component.html',
  styleUrls: ['./therapy.component.scss'],
})
export class TherapyComponent implements OnInit {

  constructor(
    private renderer: Renderer2, private itemServiceService: ItemServiceService, private router: Router
  ) { }
  
  public allServices:Observable<Service[]>;
  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;
  therapies: ITherapy[] = [];
  therapyGridHeight = 850;  // therapy grid height in px
  therapyImgHeight = 250;   // init value. changes dynamically. in px
  leftImgSize = 75; // size in % of the total width
  gridGap = 10; // grid gap in px
  therapyCount = 6;
  effectiveSize = this.therapyGridHeight * (this.leftImgSize / 100);
  allData: any = []
  pattern = 'https://luxury-massages.com/services/image/'
  details = false;

  // mobile settings
  screenWidth = 768; // default to mobile
  mobileBreakpoint = 768; // mobile breakpoint in px
  therapyImgHeightForMobile = 250;

  ngOnInit(): void {
    this.allServices = this.itemServiceService.serviceActif; // subscribe to entire collection
    this.itemServiceService.getAllServicesActif();

    this.screenWidth = window.innerWidth;
    console.log(this.screenWidth);

    // this.populateTherapyList();
    if (this.screenWidth > this.mobileBreakpoint)
      this.setImgHeight();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth > this.mobileBreakpoint)
      this.setImgHeight();
    else this.therapyImgHeight = this.therapyImgHeightForMobile;
  }

  public mouseEnter(index: number, el: Element, item:any) {
    if (!this.details){
      this.renderer.setStyle(el, 'height', `${this.effectiveSize}px`);
      this.renderer.addClass(el, 'show-img');
      this.details = true;
    } else {
      if (localStorage.getItem(this.authLocalStorageToken)){
        localStorage.setItem('_id_service', JSON.stringify({name:item.name, price:item.price, minutes: item.minutes}));
        return this.router.navigate(['/dashboard/booking']);
      } else this.router.navigate(['/auth/login']);
    }

  }

  public mouseLeave(therapy: ITherapy, el: ElementRef) {
    this.renderer.setStyle(el, 'height', `${this.therapyImgHeight}px`);
    this.renderer.removeClass(el, 'show-img');
    this.details = false;
  }

  public onClickService(item){
    console.log('IN ON CLICK')
    if (localStorage.getItem(this.authLocalStorageToken)){
      localStorage.setItem('_id_service', JSON.stringify({name:item.name, price:item.price, minutes: item.minutes}));
      return this.router.navigate(['/dashboard/booking']);
    } else this.router.navigate(['/auth/login']);
  }

  private setImgHeight() {
    // calculate therapy items height dynamically
    this.allServices.subscribe(
      result => {
        let rowCount = Math.ceil(result.length / 2);
        this.effectiveSize = this.therapyGridHeight * (this.leftImgSize / 100);
        let gapToRemove = (this.gridGap * (rowCount - 1)) / rowCount;
        this.therapyImgHeight = (this.effectiveSize / rowCount) - gapToRemove;
      }
    )
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
