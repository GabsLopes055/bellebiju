import { group } from '@angular/animations';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  formGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.formGroup = formBuilder.group({
      usuario: ['', Validators.required],
      senha: ['', Validators.required]
    })
  }

}
