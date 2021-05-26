import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { customerDetails } from 'src/app/_metronic/core/models/customerDetails.model';
import { UsersService } from 'src/app/_metronic/core/services/users.service';

@Component({
  selector: 'app-advance-tables-widget7',
  templateUrl: './advance-tables-widget7.component.html',
})
export class AdvanceTablesWidget7Component {
  currentTab = 'Day';
  public allUsers:Observable<customerDetails[]>;
  public currentName:Observable<string>;


  constructor(private usersService:UsersService) {}

  ngOnInit(): void {
    this.allUsers = this.usersService.userFromDist; // subscribe to entire collection
    this.currentName = this.usersService.nameCurrentDistributor;
  }
  
}
