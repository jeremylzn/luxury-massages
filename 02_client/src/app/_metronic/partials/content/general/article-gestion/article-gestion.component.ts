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
          html:this.textareaCreation(),
          preConfirm: function() {
            if ((<HTMLInputElement>document.getElementById('swal-body')).innerHTML){
              var text = (<HTMLInputElement>document.getElementById('swal-body')).innerHTML
              // if (text.indexOf('<img') != -1){
              //   text = text.slice(0, text.indexOf('<img') + 4) + ' style="width: 80%;" ' + text.slice(text.indexOf('<img') + 4);
              // }
              return text
            } else return ''
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
          this.advertisingService.addArticle({title:result.value[0], body:result.value[1]}).subscribe((res:any)=>{
            if (result.value[2]) {
              this.newPhoto = <File>result.value[2];
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


  onClickModif(title, text, id){
    var steps = [
      {
        title: 'כותרת',
        input: 'text',
        inputValue: title,
        inputValidator: (value) => {
        return !value && 'חסר נתון'
        }
      },
      {
        title: 'טקסט',
        html:this.textareaModification(text),
        preConfirm: function() {
          if ((<HTMLInputElement>document.getElementById('swal-body')).innerHTML){
            var text = (<HTMLInputElement>document.getElementById('swal-body')).innerHTML
            return text
          } else return ''
        }
      }
    ];
    Swal.mixin({
      confirmButtonText: 'Next &rarr;',
      showCancelButton: true,
      progressSteps: ['1', '2']
    }).queue(steps).then((result) => {
      if (result.value) {
        this.advertisingService.updateArticle(id, {title:result.value[0], body:result.value[1]}).subscribe((res:any)=>{
            this.allArticles = this.advertisingService.articles; // subscribe to entire collection
            this.advertisingService.getAllArticle();
        })

      }
    })
}

  onChangeActif(value, id){
    this.advertisingService.updateActifArticle(id, value.target.checked).subscribe(res=>{})
  }

  textareaCreation(){
    return `<div id="swal-body" dir="rtl" style="border: 3px inset grey; height: 100px; width: 100%; text-align: right; overflow-x: hidden; overflow-y: auto;" contenteditable="true">`+
            `</div>`+
            `<fieldset style="margin: 2px auto 15px;  width: 100%;">`+
            `<button style="width: 5ex; text-align: center; padding: 1px 3px;" onclick="document.execCommand('italic',false,null);" title="Italicize Highlighted Text"><i>I</i>`+
            `</button>`+
            `<button style="width: 5ex; text-align: center; padding: 1px 3px;" onclick="document.execCommand( 'bold',false,null);" title="Bold Highlighted Text"><b>B</b>`+
            `</button>`+
            `<button style="width: 5ex; text-align: center; padding: 1px 3px;" onclick="document.execCommand( 'underline',false,null);"><u>U</u>`+
            `</button>`+
            `</fieldset>`
  }

  textareaModification(text){
    return `<div id="swal-body" dir="rtl" style="border: 3px inset grey; height: 100px; width: 100%; text-align: right; overflow-x: hidden; overflow-y: auto;" contenteditable="true">`+
            `${text}</div>`+
            `<fieldset style="margin: 2px auto 15px;  width: 100%;">`+
            `<button style="width: 5ex; text-align: center; padding: 1px 3px;" onclick="document.execCommand('italic',false,null);" title="Italicize Highlighted Text"><i>I</i>`+
            `</button>`+
            `<button style="width: 5ex; text-align: center; padding: 1px 3px;" onclick="document.execCommand( 'bold',false,null);" title="Bold Highlighted Text"><b>B</b>`+
            `</button>`+
            `<button style="width: 5ex; text-align: center; padding: 1px 3px;" onclick="document.execCommand( 'underline',false,null);"><u>U</u>`+
            `</button>`+
            `</fieldset>`
  }
}
