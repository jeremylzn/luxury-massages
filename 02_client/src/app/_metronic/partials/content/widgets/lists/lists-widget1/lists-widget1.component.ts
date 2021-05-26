import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/_metronic/core/services/users.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-lists-widget1',
  templateUrl: './lists-widget1.component.html',
})
export class ListsWidget1Component implements OnInit {
  public distributors = []
  constructor(private usersService:UsersService, private cd: ChangeDetectorRef) {}
  
  ngOnInit(): void {
    this.usersService.getAllDistributor().subscribe((res:any[])=>{
      this.distributors = res
      console.log(this.distributors)
      if (this.distributors.length)
        this.saveCurrentUsers(this.distributors[0].usersList, this.distributors[0].name)
      this.refresh()
    })
  }


  refresh() {
    this.cd.detectChanges();
  }

  saveCurrentUsers(users, name){
    // console.log(users)
    this.usersService.usersFromDistributor(users, name)
    // console.log(this.usersService.userFromDist)
  }
}
