import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Gallery } from '../models/gallery.model';

const ROOT_URL = window.location.protocol + '//' + window.location.hostname + ':3000/';


@Injectable({
  providedIn: 'root'
})
export class GalleryService {


  galleryStore:Gallery[] = [];
  galleryChanged = new BehaviorSubject<Gallery[]>([]);
  readonly gallery = this.galleryChanged.asObservable();

  galleryActifStore:Gallery[] = [];
  galleryActifChanged = new BehaviorSubject<Gallery[]>([]);
  readonly galleryActif = this.galleryActifChanged.asObservable();

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

  public addGallery(item){
    return this.http.post(ROOT_URL + `admin/gallery`, item)
  }

  public addGalleryImage(image:any, id:string, nameFile:string){
    return this.http.post(ROOT_URL + `admin/gallery/${id}/${nameFile}`, image)
  }

  public getAllGallery(){
    return this.http.get(ROOT_URL + `admin/gallery`).subscribe((articles:Gallery[]) => 
    {   this.galleryStore = articles;
        this.galleryChanged.next(this.galleryStore);
    });
  }

  public updateActifGallery(id, actif){
    return this.http.put(ROOT_URL + `admin/gallery/actif/${id}`, {actif:actif})
  }

  public getAllGalleryActif(){ 
    return this.http.get(ROOT_URL + `admin/gallery/actif`).subscribe((gallery:Gallery[]) => 
    {
      this.galleryActifStore = gallery;
        this.galleryActifChanged.next(this.galleryActifStore);
    });
  }

}
