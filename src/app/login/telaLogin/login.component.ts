import { group } from '@angular/animations';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  hide: boolean = true
  formGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private message: MatSnackBar,
    private service: LoginService) {
    this.formGroup = formBuilder.group({
      usuario: ['', [Validators.required, Validators.minLength(1)]],
      senha: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  getErrorMessage() {
    return 'Campo não pode ser vazio';
  }

  logar() {
    this.service.listAllUsers().subscribe(response => {
      console.log(response)
    })
  }
}
