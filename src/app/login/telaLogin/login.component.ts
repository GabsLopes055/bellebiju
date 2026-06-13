import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  formGroup: FormGroup;
  hide = true;
  isLoading = false;
  currentYear = new Date().getFullYear();

  constructor(
    fb: FormBuilder,
    private service: LoginService,
    private router: Router,
  ) {
    this.formGroup = fb.group({
      username: ['', [Validators.required, Validators.minLength(1)]],
      password: ['', [Validators.required, Validators.minLength(1)]],
    });

    this.formGroup.get('username')?.valueChanges.subscribe((value: string) => {
      if (value && value !== value.toLowerCase()) {
        this.formGroup.get('username')?.setValue(value.toLowerCase(), { emitEvent: false });
      }
    });
  }

  logar() {
    if (this.formGroup.invalid) return;
    this.isLoading = true;
    this.service.isAuthentication(this.formGroup.value).subscribe({
      next: () => this.router.navigate(['dashboard']),
      complete: () => { this.isLoading = false; },
    });
  }
}
