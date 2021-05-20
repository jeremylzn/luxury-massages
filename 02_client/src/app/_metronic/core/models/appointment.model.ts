import { customerDetails } from './customerDetails.model';
import { serviceDetails } from './serviceDetails.model';
import { workerDetails } from './workerDetails.model';


export class Appointment {
    _id?:string;
    note: string;
    completed: boolean;
    approved: boolean;
    price:number
    createdAt: string;
    date: string;
    dateStr: string;
    timeStr: string;
    customerDetails: customerDetails;
    serviceDetails: serviceDetails[];
    workerDetails: workerDetails;
    customerID:string;
  }