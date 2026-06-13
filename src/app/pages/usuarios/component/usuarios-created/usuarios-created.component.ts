import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UsuariosService } from '../../service/usuarios.service';

@Component({
  selector: 'app-usuarios-created',
  templateUrl: './usuarios-created.component.html',
  styleUrls: ['./usuarios-created.component.scss'],
})
export class UsuariosCreatedComponent {

  formGroup!: FormGroup;
  allRoles: string[] = ['ADMIN', 'USER'];
  hide: boolean = true;
  isLoading: boolean = false;

  constructor(private fb: FormBuilder, private dialog: MatDialog, private service: UsuariosService) {
    this.formGroup = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      roles: ['', Validators.required],
    });
  }

  saveUser() {
    if (this.formGroup.invalid) return;
    this.isLoading = true;
    this.service.saveUser(this.formGroup.value).subscribe({
      next: () => {
        this.isLoading = false;
        this.dialog.closeAll();
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  getErrorMessage(field: string): string {
    const control = this.formGroup.get(field);
    if (control?.hasError('required')) return 'Campo obrigatório';
    if (control?.hasError('minlength')) {
      const min = control.getError('minlength').requiredLength;
      return `Mínimo ${min} caracteres`;
    }
    return '';
  }
}
