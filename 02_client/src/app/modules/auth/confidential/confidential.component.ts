import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/_metronic/core/services/users.service';

@Component({
  selector: 'app-confidential',
  templateUrl: './confidential.component.html',
  styleUrls: ['./confidential.component.scss']
})
export class ConfidentialComponent implements OnInit {
  pdfSource;
  constructor(private usersService:UsersService) { }

  ngOnInit(): void {
    this.usersService.getPdfConfidential().subscribe((res)=>{
      console.log(res)
      this.pdfSource = res
    })
  }

}
