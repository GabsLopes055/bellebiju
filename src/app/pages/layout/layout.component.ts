import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login/service/login.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  opened: boolean = false;

  constructor(
    private router: Router,
    private service: LoginService
  ) {
  }

  logout() {
    this.service.isLogout();
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
