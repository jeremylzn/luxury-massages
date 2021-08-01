import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Article } from 'src/app/_metronic/core/models/article.model';
import { AdvertisingService } from 'src/app/_metronic/core/services/advertising.service';

@Component({
  selector: 'app-article-more',
  templateUrl: './article-more.component.html',
  styleUrls: ['./article-more.component.scss']
})
export class ArticleMoreComponent implements OnInit {
  adsIdsList: Observable<string[]>;
  article:Observable<Article>;
  pattern = 'https://luxury-massages.com/ads/'
  patternArticle = 'https://luxury-massages.com/article/'
  public patternShare = 'https://luxury-massages.com/dashboard/article/more/'
  constructor(private advertisingService:AdvertisingService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.article = this.advertisingService.currentArticleReadMore; // subscribe to entire collection
    this.advertisingService.getArticleById(this.route.snapshot.paramMap.get('id'));

    this.adsIdsList = this.advertisingService.adsIds; // subscribe to entire collection
    this.advertisingService.getAdsIds();
  }

}
