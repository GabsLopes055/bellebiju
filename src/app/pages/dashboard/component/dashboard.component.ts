import { Component } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {


  date = new Date();
  opened: boolean = false

  constructor(
    private router: Router
  ){}

  usuarios(){
    this.router.navigate(['dashboard/usuarios'])
  }


}
