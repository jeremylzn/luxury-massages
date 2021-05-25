import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { TherapyComponent } from 'src/app/pages/_layout/components/therapy/therapy.component';
import { Advertising } from 'src/app/_metronic/core/models/advertising.model';
import { Article } from 'src/app/_metronic/core/models/article.model';
import { AdvertisingService } from 'src/app/_metronic/core/services/advertising.service';
import { LayoutService } from '../../../../core';
import { ItemServiceService } from '../../../../core/services/item-service.service';



@Component({
  selector: 'app-dashboard3',
  templateUrl: './dashboard3.component.html',
  styleUrls: ['./dashboard3.component.scss'],
})
export class Dashboard3Component implements OnInit {
  
  @ViewChild('backdrop') pageBackdrop: ElementRef;
  @ViewChild(TherapyComponent) therapyComponent: TherapyComponent;

  allData: any = []
  isList: boolean = false;
  adsList: Observable<Advertising[]>;
  public allArticles:Observable<Article[]>;
  featuredArticles: IFeaturedArticle[] = [];
  featuredAds: IAds[] = [];
  constructor(private itemServiceService: ItemServiceService, private cd: ChangeDetectorRef, private advertisingService: AdvertisingService) { }

  ngOnInit(): void {
    this.allArticles = this.advertisingService.articlesActif; // subscribe to entire collection
    this.advertisingService.getAllArticleActif();

    this.itemServiceService.getAllServicesActif().subscribe((res) => {
      this.allData = res
      this.isList = true;
      this.therapyComponent.pageBackdrop = this.pageBackdrop;
      // this.refresh();
    });
    this.adsList = this.advertisingService.adsList; // subscribe to entire collection

    this.advertisingService.getAdsIds().subscribe((res: string[]) => {
      res.forEach(el => {
        this.featuredAds.push({
          title: '',
          img: `https://luxury-massages.com/ads/${el}`
        })
      })
      // this.populateAds();
      this.refresh();
    })

    this.populateFeaturedArticles();
  }

  // close Modal
  public closeModal() {
    this.therapyComponent.closeModal();
  }

  // use this to populate article details from server
  private populateFeaturedArticles() {
    this.featuredArticles.push({
      title: 'המהומות בערים הערביות',
      body: 'Some quick example text to build on the card title and make up the bulk of the card content.',
      img: '../../../../../assets/media/stock-600x400/img-1.jpg'
    });
    this.featuredArticles.push({
      title: 'מכריזים נצחון',
      body: 'Some quick example text to build on the card title and make up the bulk of the card content.',
      img: '../../../../../assets/media/stock-600x400/img-2.jpg'
    });
    this.featuredArticles.push({
      title: 'Title for Article 3',
      body: 'Some quick example text to build on the card title and make up the bulk of the card content.',
      img: '../../../../../assets/media/stock-600x400/img-3.jpg'
    });
    this.featuredArticles.push({
      title: 'Title for Article 4',
      body: 'Some quick example text to build on the card title and make up the bulk of the card content.',
      img: '../../../../../assets/media/stock-600x400/img-4.jpg'
    });
    this.featuredArticles.push({
      title: 'Title for Article 5',
      body: 'Some quick example text to build on the card title and make up the bulk of the card content.',
      img: '../../../../../assets/media/stock-600x400/img-5.jpg'
    });
    this.featuredArticles.push({
      title: 'Title for Article 6',
      body: 'Some quick example text to build on the card title and make up the bulk of the card content.',
      img: '../../../../../assets/media/stock-600x400/img-6.jpg'
    });
  }

  private populateAds() {
    this.featuredAds.push({
      title: 'Ad 1 from the server...',
      img: '../../../../../assets/media/stock-600x400/img-25.jpg'
    });
    this.featuredAds.push({
      title: 'Ad 2 from the server...',
      img: '../../../../../assets/media/stock-600x400/img-26.jpg'
    });
    this.featuredAds.push({
      title: 'Ad 3 from the server...',
      img: '../../../../../assets/media/stock-600x400/img-27.jpg'
    });
    this.featuredAds.push({
      title: 'Ad 4 from the server...',
      img: '../../../../../assets/media/stock-600x400/img-28.jpg'
    });
    this.featuredAds.push({
      title: 'Ad 5 from the server...',
      img: '../../../../../assets/media/stock-600x400/img-29.jpg'
    });
    this.featuredAds.push({
      title: 'Ad 6 from the server...',
      img: '../../../../../assets/media/stock-600x400/img-30.jpg'
    });

  }


  refresh() {
    this.cd.detectChanges();
  }

}

export interface IFeaturedArticle {
  title: string;
  body: string;
  img: string;
}
export interface IAds {
  title: string;
  img: string;
}
