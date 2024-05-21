import { UsuariosEditComponent } from './../usuarios-edit/usuarios-edit.component';
import { Component } from '@angular/core';
import { UsuariosService } from '../../service/usuarios.service';
import { Observable, pipe } from 'rxjs';
import { user } from 'src/app/shared/models/user';
import { MatDialog } from '@angular/material/dialog';
import { UsuariosCreatedComponent } from '../usuarios-created/usuarios-created.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent {
  users!: user[];
  headersTable: string[] = [
    'idUser',
    'nome',
    'username',
    'createdAt',
    'roles',
    'editar',
    'deletar',
  ];
  isLoading: boolean = true;

  constructor(private service: UsuariosService, private dialog: MatDialog) {
    this.listAllUsers();
  }

  listAllUsers() {
    this.service.listAllUsers().subscribe((response) => {
      (this.users = response), (this.isLoading = false);
    });
  }

  closedDialog = this.dialog.afterAllClosed.subscribe(() => {
    this.listAllUsers();
  });

  createNewUser() {
    this.dialog.open(UsuariosCreatedComponent, {
      width: '40%',
      height: 'auto',
    });
  }

  editarUsuario(element: user) {
    this.dialog.open(UsuariosEditComponent, {
      width: '40%',
      height: 'auto',
      data: {
        user: element,
      },
    });
  }

  deleteVenda(element: user) {}
}
