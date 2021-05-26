import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/_metronic/core/models/article.model';
import { IFeaturedArticle } from 'src/app/_metronic/partials/content/dashboards/dashboard3/dashboard3.component';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss']
})
export class ArticleCardComponent implements OnInit {

  @Input() article: Article;
  public pattern = 'https://luxury-massages.com/article/'
  constructor() { }

  ngOnInit(): void {
  }

}
