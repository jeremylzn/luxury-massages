import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { LayoutService } from '../../../../../_metronic/core';
import { environment } from 'src/environments/environment';

function getCurrentURL(location) {
  return location.split(/[?#]/)[0];
}

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss'],
})
export class HeaderMenuComponent implements OnInit {
  ulCSSClasses: string;
  rootArrowEnabled: boolean;
  location: Location;
  headerMenuDesktopToggle: string;
  role: number;
  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;


  constructor(private layout: LayoutService, private loc: Location) {
    this.location = this.loc;
  }

  ngOnInit(): void {
    if (localStorage.getItem(this.authLocalStorageToken))
      this.role = JSON.parse(localStorage.getItem(this.authLocalStorageToken)).user.role
    this.ulCSSClasses = this.layout.getStringCSSClasses('header_menu_nav');
    this.rootArrowEnabled = this.layout.getProp('header.menu.self.rootArrow');
    this.headerMenuDesktopToggle = this.layout.getProp('header.menu.desktop.toggle');
  }

  getMenuItemActive(url) {
    return this.checkIsActive(url) ? 'menu-item-active' : '';
  }

  checkIsActive(url) {
    const location = this.location.path();
    const current = getCurrentURL(location);
    if (!current || !url) {
      return false;
    }

    if (current === url) {
      return true;
    }

    if (current.indexOf(url) > -1) {
      return true;
    }

    return false;
  }
}
