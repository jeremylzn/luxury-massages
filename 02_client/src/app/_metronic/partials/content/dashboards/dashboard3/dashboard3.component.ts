import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LayoutService } from '../../../../core';
import { ItemServiceService } from '../../../../core/services/item-service.service';


@Component({
  selector: 'app-dashboard3',
  templateUrl: './dashboard3.component.html',
})
export class Dashboard3Component implements OnInit {
  allData:any = []
  isList: boolean = false;
  constructor(private itemServiceService:ItemServiceService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void { 
    console.log('HERE')
    this.itemServiceService.getAllServicesActif().subscribe((res) => {
      this.allData = res
      this.isList = true;
      this.refresh()
    })
  }

  refresh() {
    this.cd.detectChanges();
  }
  
}
