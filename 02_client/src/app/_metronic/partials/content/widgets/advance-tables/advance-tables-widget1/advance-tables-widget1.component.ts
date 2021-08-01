import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Advertising } from 'src/app/_metronic/core/models/advertising.model';
import { AdvertisingService } from 'src/app/_metronic/core/services/advertising.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';  


@Component({
  selector: 'app-advance-tables-widget1',
  templateUrl: './advance-tables-widget1.component.html',
})
export class AdvanceTablesWidget1Component {
  @Input() cssClass: '';
  public adsList:Observable<Advertising[]>;
  public currentDisplayUrl;
  public newPhoto;


  constructor(private advertisingService:AdvertisingService, private cd: ChangeDetectorRef, private router: Router) { }

  ngOnInit(): void {
    this.adsList = this.advertisingService.adsList; // subscribe to entire collection
    this.advertisingService.getAdsList();
  }

  onChangeActif(value, id){
    this.advertisingService.putActifAds(id, {actif:value.target.checked}).subscribe((res)=>{
    })
  }

  displayAdsPicture(id){
    this.currentDisplayUrl = ''
    this.advertisingService.getAdsImage(id).subscribe(x => {
      this.currentDisplayUrl = x
      this.refresh()
    })
  }

  refresh() {
    this.cd.detectChanges();
  }

  onSelectFile(event, id) {
    if (event.target.value){
      this.newPhoto = <File>event.target.files[0];
      let fd = new FormData();
      fd.append('newAdsPicture', this.newPhoto, this.newPhoto.name);
      this.advertisingService.updateAdsImage(fd, id).subscribe((res) => {
        this.adsList = this.advertisingService.adsList; // subscribe to entire collection
        this.advertisingService.getAdsList();
      })
    }
  }

  onClickCreate(){
    var steps = [
      {
        title: 'שם חברה',
        input: 'text' 
      },
      {
        title: 'קישור אתר',
        input: 'text' 
      },
      {
        title: 'תמונת פרסום',
        input: 'file'
      }
    ];
    Swal.mixin({
      confirmButtonText: 'Next &rarr;',
      inputValidator: (value) => {
        return !value && 'חסר נתון'
      },
      showCancelButton: true,
      progressSteps: ['1', '2', '3']
    }).queue(steps).then((result) => {
      if (result.value) {
        this.newPhoto = <File>result.value[2];
        let fd = new FormData();
        fd.append('newAdsPicture', this.newPhoto, this.newPhoto.name);
        this.advertisingService.addAdsImage(fd, result.value[0], this.newPhoto.name, result.value[1]).subscribe((res)=>{
          this.adsList = this.advertisingService.adsList; // subscribe to entire collection
          this.advertisingService.getAdsList();
        })
      }
    })
  }

  onRemove(id){
    this.advertisingService.removeAds(id).subscribe((res) => {
      this.adsList = this.advertisingService.adsList; // subscribe to entire collection
      this.advertisingService.getAdsList();
    })
  }

}
