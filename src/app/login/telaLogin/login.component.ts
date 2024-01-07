import { group } from '@angular/animations';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../service/login.service';
import { login } from 'src/app/shared/models/login';
import { EMPTY, Observable, catchError, map } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  hide: boolean = true;
  formGroup!: FormGroup;

  constructor(
    formBuilder: FormBuilder,
    private message: MatSnackBar,
    private service: LoginService
  ) {
    this.formGroup = formBuilder.group({
      username: ['teste', [Validators.required, Validators.minLength(1)]],
      password: ['123', [Validators.required, Validators.minLength(1)]],
    });
  }

  getErrorMessage() {
    return 'Campo não pode ser vazio';
  }

  logar() {
    this.service.isAuthentication(this.formGroup.value).subscribe((response) => {
      this.service.showMessage("Usuario encontrado", "success")
    })
  }
}
