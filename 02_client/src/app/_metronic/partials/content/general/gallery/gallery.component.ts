import { Component, OnInit } from '@angular/core';
import { Gallery } from 'src/app/_metronic/core/models/gallery.model';
import { GalleryService } from 'src/app/_metronic/core/services/gallery.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  public gallery:Observable<Gallery[]>;
  public pattern = 'https://luxury-massages.com/gallery/'
  constructor(private galleryService:GalleryService) { }

  ngOnInit(): void {
    this.gallery = this.galleryService.galleryActif; // subscribe to entire collection
    this.galleryService.getAllGalleryActif();
  }

}
