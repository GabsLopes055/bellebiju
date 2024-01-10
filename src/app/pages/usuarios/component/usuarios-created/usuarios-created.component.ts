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
  selectedPermission: string = '';
  hide: boolean = true;

  constructor(private fb: FormBuilder, private dialog: MatDialog, private service: UsuariosService) {
    this.formGroup = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(1)]],
      username: ['', [Validators.required, Validators.minLength(1)]],
      password: ['', [Validators.required, Validators.minLength(1)]],
      roles: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  saveUser() {
    this.service.saveUser(this.formGroup.value).subscribe(() => {
      this.dialog.closeAll();
    })
  }

  getErrorMessage() {
    return 'Campo não pode ser vazio';
  }

  onPermissionChange() {
    this.formGroup.controls['roles'].setValue(this.selectedPermission);
  }
}
