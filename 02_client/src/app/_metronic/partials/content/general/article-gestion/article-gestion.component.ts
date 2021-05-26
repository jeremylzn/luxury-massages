import { Component, OnInit } from '@angular/core';
import { AdvertisingService } from 'src/app/_metronic/core/services/advertising.service';
import { Article } from 'src/app/_metronic/core/models/article.model';
import Swal from 'sweetalert2/dist/sweetalert2.js';  
import { Observable } from 'rxjs';

@Component({
  selector: 'app-article-gestion',
  templateUrl: './article-gestion.component.html',
  styleUrls: ['./article-gestion.component.scss']
})
export class ArticleGestionComponent implements OnInit {
  public newPhoto;
  public pattern = 'https://luxury-massages.com/article/'
  public allArticles:Observable<Article[]>;
  constructor(private advertisingService:AdvertisingService) { }
  
  ngOnInit(): void {
    this.allArticles = this.advertisingService.articles; // subscribe to entire collection
    this.advertisingService.getAllArticle();
  }

  onClickCreate(){
      var steps = [
        {
          title: 'כותרת',
          input: 'text',
          inputValidator: (value) => {
          return !value && 'חסר נתון'
          }
        },
        {
          title: 'טקסט',
          input: 'textarea',
          inputValidator: (value) => {
            return !value && 'חסר נתון'
          }
        },
        {
          title: 'תמונה',
          input: 'file'
        }
      ];
      Swal.mixin({
        confirmButtonText: 'Next &rarr;',
        showCancelButton: true,
        progressSteps: ['1', '2', '3']
      }).queue(steps).then((result) => {
        if (result.value) {
          console.log(result)
          this.advertisingService.addArticle({title:result.value[0], body:result.value[1]}).subscribe((res:any)=>{
            console.log(res)
            if (result.value[2]) {
              console.log('IN IF')
              this.newPhoto = <File>result.value[2];
              console.log(this.newPhoto)
              console.log(this.newPhoto.name)
              let fd = new FormData();
              fd.append('newArticlePicture', this.newPhoto, this.newPhoto.name);
              this.advertisingService.addArticleImage(fd, res._id, this.newPhoto.name).subscribe((res)=>{
                this.allArticles = this.advertisingService.articles; // subscribe to entire collection
                this.advertisingService.getAllArticle();
              })
            } else {
              this.allArticles = this.advertisingService.articles; // subscribe to entire collection
              this.advertisingService.getAllArticle();
            }
          })

        }
      })
  }

  onChangeActif(value, id){
    this.advertisingService.updateActifArticle(id, value.target.checked).subscribe(res=>{})

  }
}
