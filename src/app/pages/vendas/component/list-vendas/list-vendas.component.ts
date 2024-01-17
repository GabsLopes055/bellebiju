import { PermissionUser } from 'src/app/shared/userLogged/permissionUser.service';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModelPesquisarPorDataComponent } from '../model-pesquisar-por-data/model-pesquisar-por-data.component';

@Component({
  selector: 'app-list-vendas',
  templateUrl: './list-vendas.component.html',
  styleUrls: ['./list-vendas.component.scss'],
})
export class ListVendasComponent {

  permissionPesquisar!: boolean

  constructor(
    private dialog: MatDialog,
    private permission: PermissionUser
  ){
    if(this.permission.hasPermission("ADMIN")) this.permissionPesquisar = true
  }

  pesquisarPorData() {
    this.dialog.open(ModelPesquisarPorDataComponent, {
      width: '100%',
      height: 'auto'
    })
  }
}
