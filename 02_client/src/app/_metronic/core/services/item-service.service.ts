import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Service } from '../models/service.model'

const ROOT_URL = window.location.protocol + '//' + window.location.hostname + ':3000/';
// const ROOT_URL = 'http://161.97.157.17:3000/';
// const ROOT_URL = 'http://localhost:3000/';
// const ROOT_URL = 'http://127.0.0.1:3000/';
// const ROOT_URL = 'http://' + window.location.hostname + ':3000/';


@Injectable({
  providedIn: 'root'
})
export class ItemServiceService {

  constructor(private http: HttpClient) { }
  serviceChanged = new Subject<Service[]>();
  allserviceChanged = new Subject<Service[]>();



  getAllServicesActif(){
    return this.http.get(ROOT_URL + 'services/actif').pipe(
      tap((res:Service[]) => {
        // for(var key in res) this.orderService.menu[key]=res[key];
        this.serviceChanged.next(res);
      })
    );
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
