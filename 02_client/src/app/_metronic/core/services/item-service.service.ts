import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Service } from '../models/service.model'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

const ROOT_URL = environment.apiUrl;


@Injectable({
  providedIn: 'root'
})
export class ItemServiceService {

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }
  // serviceChanged = new Subject<Service[]>();
  // allserviceChanged = new Subject<Service[]>();

  serviceActifStore:Service[] = [];
  serviceActifChanged = new BehaviorSubject<Service[]>([]);
  readonly serviceActif = this.serviceActifChanged.asObservable();

  reviewActifStore:any[] = [];
  reviewActifChanged = new BehaviorSubject<any[]>([]);
  readonly reviewActif = this.reviewActifChanged.asObservable();

  reviewStore:any[] = [];
  reviewChanged = new BehaviorSubject<any[]>([]);
  readonly review = this.reviewChanged.asObservable();

  serviceStore:Service[] = [];
  serviceChanged = new BehaviorSubject<Service[]>([]);
  readonly service = this.serviceChanged.asObservable();

  getAllServicesActif(){
    return this.http.get(ROOT_URL + 'services/actif').subscribe((services:Service[]) => 
    { 
      this.serviceActifStore = services;
      this.serviceActifChanged.next(this.serviceActifStore);
    });
  }

  getAllReviewsActif(){
    return this.http.get(ROOT_URL + 'review').subscribe((reviews:Service[]) => 
    { 
      this.reviewActifStore = reviews;
      this.reviewActifChanged.next(this.reviewActifStore);
    });
  }

  getAllReviewsAdmin(){
    return this.http.get(ROOT_URL + 'admin/review').subscribe((reviews:Service[]) => 
    { 
      console.log(reviews)
      this.reviewStore = reviews;
      this.reviewChanged.next(this.reviewStore);
    });
  }

  getAllServices(){
    return this.http.get(ROOT_URL + 'admin/services').subscribe((services:Service[]) => { 
      this.serviceStore = services;
      this.serviceChanged.next(this.serviceStore);
    });
  }

  putActifOrNot(id, actif){
    return this.http.put(ROOT_URL + `admin/services/actif/${id}`, actif)
  }

  putService(id, data){
    return this.http.put(ROOT_URL + `admin/services/${id}`, data)
  }

  addService(data){
    return this.http.post(ROOT_URL + `admin/services`, data)
  }

  addServiceImage(image:any, id:string, nameFile:string){
    return this.http.post(ROOT_URL + `admin/services/${id}/${nameFile}`, image)
  }

  public getServiceImage(id): Observable<SafeResourceUrl> {
    return this.http.get(ROOT_URL + `services/image/${id}`, { responseType: 'blob' })
      .pipe(map(x => {
          const urlToBlob = window.URL.createObjectURL(x) // get a URL for the blob
          return this.sanitizer.bypassSecurityTrustResourceUrl(urlToBlob); // tell Anuglar to trust this value
        }),
      );
  }

  addReview(data){
    return this.http.post(ROOT_URL + `review`, data)
  }

  putActifReview(item, id){
    return this.http.put(ROOT_URL + `admin/review/actif/${id}`, item)
  }

}
