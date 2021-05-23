import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LayoutService } from '../../../../core';
import { ItemServiceService } from '../../../../core/services/item-service.service';



@Component({
  selector: 'app-dashboard3',
  templateUrl: './dashboard3.component.html',
  styleUrls: ['./dashboard3.component.scss'],
})
export class Dashboard3Component implements OnInit {
  allData:any = []
  isList: boolean = false;
  featuredArticles: IFeaturedArticle[] = [];
  constructor(private itemServiceService:ItemServiceService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void { 
    console.log('HERE')
    this.itemServiceService.getAllServicesActif().subscribe((res) => {
      this.allData = res
      this.isList = true;
      this.refresh();
    });
    this.populateFeaturedArticles();
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


  refresh() {
    this.cd.detectChanges();
  }
  
}

export interface IFeaturedArticle {
  title: string;
  body: string;
  img: string;
}
