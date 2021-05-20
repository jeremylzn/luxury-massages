import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../../../core';

@Component({
  selector: 'app-dashboard-wrapper',
  templateUrl: './dashboard-wrapper.component.html',
})
export class DashboardWrapperComponent implements OnInit {
  // demo: string;
  currentRole:number;
  constructor(private layout: LayoutService) {}

  ngOnInit(): void {
    // this.demo = this.layout.getProp('demo');
    this.currentRole = this.layout.getCurrentRole();
    console.log(this.currentRole)

  }
}
