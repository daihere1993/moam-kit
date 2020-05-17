import { Component } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  public items: NbMenuItem[] = [
    {
      title: 'Home',
      link: '/home',
      icon: 'home-outline',
    },
    {
      title: 'Setting',
      link: '/setting',
      icon: 'settings-outline',
    },
  ];
}
