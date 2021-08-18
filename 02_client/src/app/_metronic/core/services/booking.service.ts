import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Appointment } from '../models/appointment.model'
import { environment } from 'src/environments/environment';
import { CreditSms } from '../models/credit-sms.model';

const ROOT_URL = environment.apiUrl;

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

  creditSmsStore:CreditSms = {credit:'0'};
  creditSmsChanged = new BehaviorSubject<CreditSms>(null);
  readonly creditSms = this.creditSmsChanged.asObservable();



  constructor(private http: HttpClient) { }


  addAppoitment(item){
    return this.http.post<any>(ROOT_URL + 'booking', item);
  }

  addWorkerToAppointment(appointmentId, worker){
    return this.http.put(ROOT_URL + `admin/booking/${appointmentId}`, worker)
  }

  setAppointmentCompleted(appointmentId){
    return this.http.put(ROOT_URL + `booking/completed`, {id:appointmentId})
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

  public CBPayment(price, name, telephone, email, _id, address, distributor, nametherapy) {
    const formData = {'sum': price, 'description': nametherapy, 'fullname': name, 'phone': '0' + telephone, 'email': email, '_id': _id,'address': address, 'distributor': distributor}
    return this.http.post(ROOT_URL + 'payment/booking/card', formData)
  }

  public BitPayment(price, name, telephone, email, _id, address, distributor, nametherapy) {
    const formData = {'sum': price, 'description': nametherapy, 'fullname': name, 'phone': '0' + telephone, 'email': email, '_id': _id,'address': address, 'distributor': distributor}
    return this.http.post(ROOT_URL + 'payment/booking/bit', formData)
  }

  public sendSms(message, users) {
    return this.http.post(ROOT_URL + 'sms', {message:message, userDetails:users})
  }


  public getCreditSms() {
    return this.http.get<CreditSms>(ROOT_URL + `sms/credit`, { responseType: 'json' }).subscribe(
      credit => {  this.creditSmsStore = credit; this.creditSmsChanged.next(this.creditSmsStore);})
    }

  public sendSmstoNumber(message, number) {
    return this.http.post(ROOT_URL + `sms/${number}`, {message:message})
    }

}
