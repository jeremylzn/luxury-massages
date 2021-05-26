import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Service } from '../models/service.model'

const ROOT_URL = window.location.protocol + '//' + window.location.hostname + ':3000/';


@Injectable({
  providedIn: 'root'
})
export class ItemServiceService {

  constructor(private http: HttpClient) { }
  serviceChanged = new Subject<Service[]>();
  allserviceChanged = new Subject<Service[]>();

  serviceActifStore:Service[] = [];
  serviceActifChanged = new BehaviorSubject<Service[]>([]);
  readonly serviceActif = this.serviceActifChanged.asObservable();

  actifLength = 0

  getAllServicesActif(){
    return this.http.get(ROOT_URL + 'services/actif').subscribe((services:Service[]) => 
    { 
      this.actifLength = services.length;
      this.serviceActifStore = services;
        this.serviceActifChanged.next(this.serviceActifStore);
    });
  }

  getAllServices(){
    return this.http.get(ROOT_URL + 'admin/services').pipe(
      tap((res:Service[]) => {
        // for(var key in res) this.orderService.menu[key]=res[key];
        this.allserviceChanged.next(res);
      })
    );
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

}
