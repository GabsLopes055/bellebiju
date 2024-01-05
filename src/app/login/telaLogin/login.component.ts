import { group } from '@angular/animations';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  hide: boolean = true
  formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder, private message: MatSnackBar) {
    this.formGroup = formBuilder.group({
      usuario: ['', [Validators.required, Validators.minLength(1)]],
      senha: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  getErrorMessage() {
    return 'Campo não pode ser vazio';
  }

  logar() {
    console.log(this.formGroup.value)
    this.message.open('Em Desenvolvimento', '', {
      duration: 4000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: 'warning',
    });
  }
}
