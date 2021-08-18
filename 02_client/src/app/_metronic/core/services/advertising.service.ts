import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Advertising } from '../models/advertising.model';
import { Article } from '../models/article.model';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';


const ROOT_URL = environment.apiUrl;



@Injectable({
  providedIn: 'root'
})
export class AdvertisingService {

  adsListStore:Advertising[] = [];
  adsListChanged = new BehaviorSubject<Advertising[]>([]);
  readonly adsList = this.adsListChanged.asObservable();

  articlesStore:Article[] = [];
  articlesChanged = new BehaviorSubject<Article[]>([]);
  readonly articles = this.articlesChanged.asObservable();

  articlesActifStore:Article[] = [];
  articlesActifChanged = new BehaviorSubject<Article[]>([]);
  readonly articlesActif = this.articlesActifChanged.asObservable();c

  adsIdsStore:string[] = [];
  adsIdsChanged = new BehaviorSubject<string[]>([]);
  readonly adsIds = this.adsIdsChanged.asObservable();

  currentArticleReadMoreStore:Article;
  currentArticleReadMoreChanged = new BehaviorSubject<Article>(null);
  readonly currentArticleReadMore = this.currentArticleReadMoreChanged.asObservable();


  constructor(private http: HttpClient, private sanitizer: DomSanitizer, private router:Router) { }


  public getAdsIds(){
    return this.http.get(ROOT_URL +`ids/ads`).subscribe((id:string[]) => 
    {
      this.adsIdsStore = id;
        this.adsIdsChanged.next(this.adsIdsStore);
    });
  }

  public getAdsImage(id): Observable<SafeResourceUrl> {
    return this.http
      .get(ROOT_URL + `ads/${id}`, { responseType: 'blob' })
      .pipe(
        map(x => {
          const urlToBlob = window.URL.createObjectURL(x) // get a URL for the blob
          return this.sanitizer.bypassSecurityTrustResourceUrl(urlToBlob); // tell Anuglar to trust this value
        }),
      );
  }

  public updateAdsImage(image:any, id:string){
    return this.http.post(ROOT_URL + `update/ads/${id}`, image)
  }

  public addAdsImage(image:any, nameSociety:string, nameFile:string, url:string){
    return this.http.post(ROOT_URL + `add/ads/${nameSociety}/${nameFile}/${encodeURIComponent(url)}`, image)
  }

  public getAdsList(){
    return this.http.get<Advertising[]>(ROOT_URL + 'ads').subscribe(
      ads => { this.adsListStore = ads;
        this.adsListChanged.next(this.adsListStore);
      });
  }

  public putActifAds(id, actif){
    return this.http.put(ROOT_URL + `actif/ads/${id}`, actif)
  }

  public removeAds(id){
    return this.http.delete(ROOT_URL + `ads/${id}`)
  }

  public addArticle(item){
    return this.http.post(ROOT_URL + `admin/article`, item)
  }

  public addArticleImage(image:any, id:string, nameFile:string){
    return this.http.post(ROOT_URL + `admin/article/${id}/${nameFile}`, image)
  }

  public getAllArticle(){
    return this.http.get(ROOT_URL + `admin/article`).subscribe((articles:Article[]) => 
    {   this.articlesStore = articles;
        this.articlesChanged.next(this.articlesStore);
    });
  }

  public getAllArticleActif(){ 
    return this.http.get(ROOT_URL + `articles/actif`).subscribe((articles:Article[]) => 
    {
      this.articlesActifStore = articles;
        this.articlesActifChanged.next(this.articlesActifStore);
    });
  }

  public getArticleById(id){ 
    return this.http.get(ROOT_URL + `article/get/${id}`).subscribe((article:Article) => 
    {   
        this.currentArticleReadMoreStore = article;
        this.currentArticleReadMoreChanged.next(this.currentArticleReadMoreStore);
    }, (error) => {
      this.router.navigate(['/dashboard']);
    });
  }

  public updateActifArticle(id, actif){
    return this.http.put(ROOT_URL + `admin/article/actif/${id}`, {actif:actif})
  }

  public updateArticle(id, item){
    return this.http.put(ROOT_URL + `admin/article/${id}`, item)
  }

}
