import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/_metronic/core/models/article.model';
import { AdvertisingService } from 'src/app/_metronic/core/services/advertising.service';
import { IFeaturedArticle } from 'src/app/_metronic/partials/content/dashboards/dashboard3/dashboard3.component';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss']
})
export class ArticleCardComponent implements OnInit {

  @Input() article: Article;
  public pattern = 'https://luxury-massages.com/article/'
  constructor(private router:Router, private advertisingService:AdvertisingService) { }

  ngOnInit(): void {
  }

  onClickMore(){
    this.advertisingService.currentArticleReadMoreStore = this.article;
    this.advertisingService.currentArticleReadMoreChanged.next(this.advertisingService.currentArticleReadMoreStore);
    this.router.navigate(['/dashboard/article/more']);
  }

}
