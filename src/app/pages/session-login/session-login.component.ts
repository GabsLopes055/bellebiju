import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-session-login',
  templateUrl: './session-login.component.html',
  styleUrls: ['./session-login.component.scss']
})
export class SessionLoginComponent {

  constructor(
    private router: Router,
    private dialog: MatDialog
  ) {}

  redirectLogin(): void {
    this.dialog.closeAll()
    this.router.navigate(['/login']);
  }

}
