import { group } from '@angular/animations';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../service/login.service';
import { login } from 'src/app/shared/models/login';
import { EMPTY, Observable, catchError, map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  loadLogin:boolean = true
  hide: boolean = true;
  formGroup!: FormGroup;

  constructor(
    formBuilder: FormBuilder,
    private service: LoginService,
    private router: Router

  ) {
    this.formGroup = formBuilder.group({
      username: ['teste', [Validators.required, Validators.minLength(1)]],
      password: ['123', [Validators.required, Validators.minLength(1)]],
    });
    this.loadLogin = false
  }

  getErrorMessage() {
    return 'Campo não pode ser vazio';
  }

  logar() {
    this.service.isAuthentication(this.formGroup.value).subscribe((response) => {
      this.router.navigate(['dashboard'])
    })
  }
}
