import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/_metronic/core/services/booking.service';
import { environment } from 'src/environments/environment';
import { Subscription, Observable } from 'rxjs';
import { Appointment } from '../../../../core/models/appointment.model'
import { UsersService } from 'src/app/_metronic/core/services/users.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-worker-card',
  templateUrl: './worker-card.component.html',
  styleUrls: ['./worker-card.component.scss']
})
export class WorkerCardComponent implements OnInit {
  public currentUser;
  public newPhoto;
  public choosen:boolean=false;
  // public dataNotCompleted;
  public dataNotCompleted:Observable<Appointment[]>;
  public dataCompleted:Observable<Appointment[]>;

  public url;
  // public dataCompleted;
  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;

  constructor(private bookingService: BookingService, private cd: ChangeDetectorRef, private usersService: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem(this.authLocalStorageToken)).user
    this.usersService.getProfilePicture('URL', this.currentUser._id).subscribe(x => this.url = x)

    this.dataNotCompleted = this.bookingService.currentNotCompleted; // subscribe to entire collection
    this.bookingService.getAppointmentByWorkerIDNotCompleted(this.currentUser._id);

    this.dataCompleted = this.bookingService.currentCompleted; // subscribe to entire collection
    this.bookingService.getAppointmentByWorkerIDCompleted(this.currentUser._id);
  }

  refresh() {
    this.cd.detectChanges();
  }

  onSelectFile(event) {
    if (event.target.value){
      this.newPhoto = <File>event.target.files[0];
      let fd = new FormData();
      fd.append('newPhotoProfile', this.newPhoto, this.newPhoto.name);
      this.usersService.updateProfilePhoto(fd, this.currentUser._id).subscribe((res) => {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/dashboard/profile']);
        }); 
      })
    }
  }


}
