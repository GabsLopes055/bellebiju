import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { user } from 'src/app/shared/models/user';
import { UsuariosService } from '../../service/usuarios.service';

@Component({
  selector: 'app-usuarios-edit',
  templateUrl: './usuarios-edit.component.html',
  styleUrls: ['./usuarios-edit.component.scss'],
})
export class UsuariosEditComponent {
  formGroup!: FormGroup;
  allRoles: string[] = ['ADMIN', 'USER'];
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private service: UsuariosService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private data: { user: user }
  ) {
    this.formGroup = this.fb.group({
      nome: [data.user.nome, [Validators.required, Validators.minLength(3)]],
      username: [data.user.username, [Validators.required, Validators.minLength(3)]],
      roles: [data.user.roles, Validators.required],
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

  updateUser() {
    if (this.formGroup.invalid) return;
    this.isLoading = true;
    this.service.updateUser(this.formGroup.value, this.data.user.idUser).subscribe({
      next: () => {
        this.isLoading = false;
        this.dialog.closeAll();
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  deletarUser() {
    this.isLoading = true;
    this.service.deleteUser(this.data.user.idUser).subscribe({
      next: () => {
        this.isLoading = false;
        this.dialog.closeAll();
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }
}

