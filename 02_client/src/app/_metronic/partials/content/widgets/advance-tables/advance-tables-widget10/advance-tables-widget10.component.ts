import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemServiceService } from 'src/app/_metronic/core/services/item-service.service';

@Component({
  selector: 'app-advance-tables-widget10',
  templateUrl: './advance-tables-widget10.component.html',
  styleUrls: ['./advance-tables-widget10.component.scss']
})
export class AdvanceTablesWidget10Component implements OnInit {
  public allReviews:Observable<any[]>;

  constructor(private itemServiceService:ItemServiceService) { }

  ngOnInit(): void {
    this.allReviews = this.itemServiceService.review; // subscribe to entire collection
    this.itemServiceService.getAllReviewsAdmin();
  }

  onChangeActif(value, id){
    this.itemServiceService.putActifReview({actif:value}, id).subscribe((res)=>{
      console.log(res)
    })
  }
}
