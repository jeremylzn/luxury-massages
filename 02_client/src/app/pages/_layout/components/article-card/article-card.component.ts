import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/_metronic/core/models/article.model';
import { AdvertisingService } from 'src/app/_metronic/core/services/advertising.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss']
})
export class ArticleCardComponent implements OnInit {

  @Input() article: Article;
  public pattern = 'https://luxury-massages.com/article/'
  public patternShare = 'https://luxury-massages.com/dashboard/article/more/'
  constructor(private router:Router, private advertisingService:AdvertisingService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

  onClickMore(id){
    this.router.navigate([`/dashboard/article/more/${id}`]);
  }

}
