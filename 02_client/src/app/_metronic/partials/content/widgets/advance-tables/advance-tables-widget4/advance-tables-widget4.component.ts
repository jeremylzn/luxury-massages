import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Service } from 'src/app/_metronic/core/models/service.model';
import { ItemServiceService } from 'src/app/_metronic/core/services/item-service.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';  

@Component({
  selector: 'app-advance-tables-widget4',
  templateUrl: './advance-tables-widget4.component.html',
})
export class AdvanceTablesWidget4Component implements OnInit {
  constructor(private itemServiceService: ItemServiceService, private cd: ChangeDetectorRef) {}
  allServices:Service[] = []
  ngOnInit(): void {
    this.itemServiceService.getAllServices().subscribe((res:Service[]) => {
      this.allServices = res
      this.refresh()
    })
  }

  refresh() {
    this.cd.detectChanges();
  }

  onChangeActif(value, id){
    this.itemServiceService.putActifOrNot(id, {actif:value.target.checked}).subscribe((res)=>{})
  }

  onClickEdit(service, id){
    var steps = [
      {
        title: 'שם טיפול',
        input: 'text',
        inputValue: service.name  
      },
      {
        title: 'הסבר טיפול',
        input: 'textarea',
        inputValue: service.description
      },
      {
        title: '(₪) מחיר טיפול',
        input: 'number',
        inputValue: service.price
      },
      {
        title: '(דק) זמן טיפול',
        input: 'number',
        inputValue: service.minutes
      }
    ];
    Swal.mixin({
      input: 'text',
      confirmButtonText: 'Next &rarr;',
      showCancelButton: true,
      progressSteps: ['1', '2', '3', '4']
    }).queue(steps).then((result) => {
      if (result.value) {
        const answers = {name:result.value[0], description:result.value[1], price:result.value[2], minutes:result.value[3]}
        this.itemServiceService.putService(id, answers).subscribe((res)=>{
          Swal.fire({
            title: 'מעודכן',
            confirmButtonText: 'סגור'
          })
          this.itemServiceService.getAllServices().subscribe((res:Service[]) => {
            this.allServices = res
            this.refresh()
          })
        })
        
      }
    })
  }


  onClickCreate(){
    var steps = [
      {
        title: 'שם טיפול',
        input: 'text' 
      },
      {
        title: 'הסבר טיפול',
        input: 'textarea'
      },
      {
        title: '(₪) מחיר טיפול',
        input: 'number'
      },
      {
        title: '(דק) זמן טיפול',
        input: 'number'
      }
    ];
    Swal.mixin({
      confirmButtonText: 'Next &rarr;',
      inputValidator: (value) => {
        return !value && 'חסר נתון'
      },
      showCancelButton: true,
      progressSteps: ['1', '2', '3', '4']
    }).queue(steps).then((result) => {
      if (result.value) {
        console.log(result.value)
        const answers = {name:result.value[0], description:result.value[1], price:result.value[2], minutes:result.value[3]}
        this.itemServiceService.addService(answers).subscribe((res)=>{
          this.itemServiceService.getAllServices().subscribe((res:Service[]) => {
            this.allServices = res
            console.log(this.allServices)
            this.refresh()
          })
        })
        
      }
    })
  }
  
}
