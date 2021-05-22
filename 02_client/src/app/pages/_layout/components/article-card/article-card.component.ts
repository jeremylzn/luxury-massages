import { Component, Input, OnInit } from '@angular/core';
import { IFeaturedArticle } from 'src/app/_metronic/partials/content/dashboards/dashboard3/dashboard3.component';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss']
})
export class ArticleCardComponent implements OnInit {

  @Input() article: IFeaturedArticle;

  constructor() { }

  ngOnInit(): void {

  }

}
