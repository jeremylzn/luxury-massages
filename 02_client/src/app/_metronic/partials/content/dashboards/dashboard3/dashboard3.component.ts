import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Advertising } from 'src/app/_metronic/core/models/advertising.model';
import { Article } from 'src/app/_metronic/core/models/article.model';
import { AdvertisingService } from 'src/app/_metronic/core/services/advertising.service';
import { ItemServiceService } from '../../../../core/services/item-service.service';



@Component({
  selector: 'app-dashboard3',
  templateUrl: './dashboard3.component.html',
  styleUrls: ['./dashboard3.component.scss'],
})
export class Dashboard3Component implements OnInit {
  allData: any = []
  isList: boolean = false;
  adsList: Observable<Advertising[]>;
  adsIdsList: Observable<string[]>;
  public allArticles:Observable<Article[]>;
  pattern = 'https://luxury-massages.com/ads/'
  constructor(private itemServiceService: ItemServiceService, private cd: ChangeDetectorRef, private advertisingService: AdvertisingService) { }

  ngOnInit(): void {
    this.allArticles = this.advertisingService.articlesActif; // subscribe to entire collection
    this.advertisingService.getAllArticleActif();
    this.adsList = this.advertisingService.adsList; // subscribe to entire collection

    this.adsIdsList = this.advertisingService.adsIds; // subscribe to entire collection
    this.advertisingService.getAdsIds();
    // this.advertisingService.getAdsIds().subscribe((res: string[]) => {
    //   res.forEach(el => {
    //     this.featuredAds.push({
    //       title: '',
    //       img: `https://luxury-massages.com/ads/${el}`
    //     })
    //   })
    //   // this.refresh();
    // })
  }

  refresh() {
    this.cd.detectChanges();
  }

}

