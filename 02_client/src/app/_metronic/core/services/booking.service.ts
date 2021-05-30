import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Appointment } from '../models/appointment.model'
import { environment } from 'src/environments/environment';

const ROOT_URL = window.location.protocol + '//' + window.location.hostname + ':3000/';
// const ROOT_URL = 'http://' + window.location.hostname + ':3000/';
// const ROOT_URL = 'http://161.97.157.17:3000/';
// const ROOT_URL = 'http://localhost:3000/';
// const ROOT_URL = 'http://127.0.0.1:3000/';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;
  appointNotCompletedChanged = new BehaviorSubject<Appointment[]>([]);
  readonly notCompleted = this.appointNotCompletedChanged.asObservable();
  notCompletedStore:Appointment[] = [];
  currentNotCompletedChanged = new BehaviorSubject<Appointment[]>([]);
  readonly currentNotCompleted = this.currentNotCompletedChanged.asObservable();
  currentNotCompletedStore:Appointment[] = [];
  currentCompletedChanged = new BehaviorSubject<Appointment[]>([]);
  readonly currentCompleted = this.currentCompletedChanged.asObservable();
  currentCompletedStore:Appointment[] = [];




  constructor(private http: HttpClient) { }


  addAppoitment(item){
    console.log(item)
    return this.http.post<any>(ROOT_URL + 'booking', item);
  }

  addWorkerToAppointment(appointmentId, worker){
    return this.http.put(ROOT_URL + `admin/booking/${appointmentId}`, worker)
  }

  getAppointmentByCustomerID(customerID){
    return this.http.get(ROOT_URL + `tkn/booking/${customerID}`)
  }

  getAppointmentByWorkerID(workerID){
    var header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${JSON.parse(localStorage.getItem(this.authLocalStorageToken)).accessToken}`)
    }
    return this.http.get(ROOT_URL + `worker/booking/${workerID}`, header)
  }

  getNotCompletedAppoitment(){
    return this.http.get<Appointment[]>(ROOT_URL + 'admin/active/booking').subscribe(
      booking => { this.notCompletedStore = booking;
        this.appointNotCompletedChanged.next(this.notCompletedStore);});
  }

  getAppointmentByWorkerIDNotCompleted(workerID){
    return this.http.get<Appointment[]>(ROOT_URL + `worker/booking/notcompleted/${workerID}`).subscribe(
      booking => { this.currentNotCompletedStore = booking;
        this.currentNotCompletedChanged.next(this.currentNotCompletedStore);}
      );
  }

  getAppointmentByWorkerIDCompleted(workerID){
    return this.http.get<Appointment[]>(ROOT_URL + `worker/booking/completed/${workerID}`).subscribe(
      booking => { this.currentCompletedStore = booking;
        this.currentCompletedChanged.next(this.currentCompletedStore);}
      );
  }

  
  public payment(price, name, telephone, email, nametherapy) {
    const formData = {
      'pageCode': 'ed828b5b2e08',
      'userId': '7434be4be4c601cd',
      'sum': price,
      'successUrl': 'https://luxury-massages.com/dashboard/payement=true',
      'cancelUrl': 'https://luxury-massages.com/dashboard/therapy',
      'description': nametherapy,
      'pageField[fullName]': name,
      'pageField[phone]': '0' + telephone,
      'pageField[email]': email,
      'saveCardToken': '1',
      'chargeType': '1',
      'product_data[0][price]': price,
      'product_data[0][item_description]': nametherapy
    }
    return this.http.post(ROOT_URL + 'payment/booking', formData)
  }

}
