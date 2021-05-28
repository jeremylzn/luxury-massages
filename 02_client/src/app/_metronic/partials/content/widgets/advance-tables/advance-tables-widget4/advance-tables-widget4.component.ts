import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from 'src/app/_metronic/core/models/service.model';
import { ItemServiceService } from 'src/app/_metronic/core/services/item-service.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';  

@Component({
  selector: 'app-advance-tables-widget4',
  templateUrl: './advance-tables-widget4.component.html',
})
export class AdvanceTablesWidget4Component implements OnInit {
  constructor(private itemServiceService: ItemServiceService, private cd: ChangeDetectorRef) {}
  public allServices:Observable<Service[]>;
  public newPhoto;
  
  ngOnInit(): void {
    this.allServices = this.itemServiceService.service; // subscribe to entire collection
    this.itemServiceService.getAllServices();
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
      },
      {
        title: 'תמונה',
        input: 'file'
      }
    ];
    Swal.mixin({
      input: 'text',
      confirmButtonText: 'Next &rarr;',
      showCancelButton: true,
      progressSteps: ['1', '2', '3', '4', '5']
    }).queue(steps).then((result) => {
      if (result.value) {
        const answers = {name:result.value[0], description:result.value[1], price:result.value[2], minutes:result.value[3]}
        this.itemServiceService.putService(id, answers).subscribe((res:any)=>{
          if (result.value[4]){
            this.newPhoto = <File>result.value[4];
            let fd = new FormData();
            fd.append('newServicePicture', this.newPhoto, this.newPhoto.name);
            this.itemServiceService.addServiceImage(fd, res._id, this.newPhoto.name).subscribe((res)=>{
              this.allServices = this.itemServiceService.service; // subscribe to entire collection
              this.itemServiceService.getAllServices();
              Swal.fire({
                title: 'מעודכן',
                confirmButtonText: 'סגור'
              })
            })
          }  else {
            Swal.fire({
              title: 'מעודכן',
              confirmButtonText: 'סגור'
            })
            this.allServices = this.itemServiceService.service; // subscribe to entire collection
            this.itemServiceService.getAllServices();
          }
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
      },
      {
        title: 'תמונה',
        input: 'file'
      }
    ];
    Swal.mixin({
      confirmButtonText: 'Next &rarr;',
      inputValidator: (value) => {
        return !value && 'חסר נתון'
      },
      showCancelButton: true,
      progressSteps: ['1', '2', '3', '4', '5']
    }).queue(steps).then((result) => {
      if (result.value) {
        console.log(result.value)
        const answers = {name:result.value[0], description:result.value[1], price:result.value[2], minutes:result.value[3]}
        this.itemServiceService.addService(answers).subscribe((res:any)=>{
          this.newPhoto = <File>result.value[4];
          let fd = new FormData();
          fd.append('newServicePicture', this.newPhoto, this.newPhoto.name);
          this.itemServiceService.addServiceImage(fd, res._id, this.newPhoto.name).subscribe((res)=>{
            this.allServices = this.itemServiceService.service; // subscribe to entire collection
            this.itemServiceService.getAllServices();
          })
        })
        
      }
    })
  }
  
}
