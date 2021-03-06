import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  public items = [
    {
      title: 'Home',
      link: '/home',
      icon: 'home-outline',
    },
    {
      title: 'Auto Commit',
      link: '/auto-commit',
      icon: 'cloud-upload-outline',
    },
    {
      title: 'Setting',
      link: '/setting',
      icon: 'settings-outline',
    },
  ];
}
