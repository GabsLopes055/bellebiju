import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { user } from 'src/app/shared/models/user';
import { FormsModule } from '@angular/forms';
import { UsuariosService } from '../../service/usuarios.service';

@Component({
  selector: 'app-usuarios-edit',
  templateUrl: './usuarios-edit.component.html',
  styleUrls: ['./usuarios-edit.component.scss'],
})
export class UsuariosEditComponent {
  formGroup!: FormGroup;

  allRoles: string[] = ['ADMIN', 'USER'];
  selectedPermission: string = '';

  constructor(
    private fb: FormBuilder,
    private service: UsuariosService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private user: { user: user }
  ) {
    // console.log(this.permissions)
    this.formGroup = this.fb.group({
      nome: [user.user.nome, [Validators.required, Validators.minLength(1)]],
      username: [
        user.user.username,
        [Validators.required, Validators.minLength(1)],
      ],
      roles: [user.user.roles, [Validators.required, Validators.minLength(1)]],
    });
    this.selectedPermission = user.user.roles
  }

  getErrorMessage() {
    return 'Campo não pode ser vazio';
  }

  onPermissionChange() {
    this.formGroup.controls['roles'].setValue(this.selectedPermission);
  }

  updateUser() {
    this.service.updateUser(this.formGroup.value, this.user.user.idUser).subscribe(() => {
      this.dialog.closeAll();
    })
  }

  deletarUser() {
    this.service.deleteUser(this.user.user.idUser).subscribe()
    this.service.showMessage('Usuario Excluido', 'success');
    this.dialog.closeAll();
  }
}

