import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModelPesquisarPorDataComponent } from '../model-pesquisar-por-data/model-pesquisar-por-data.component';

@Component({
  selector: 'app-list-vendas',
  templateUrl: './list-vendas.component.html',
  styleUrls: ['./list-vendas.component.scss'],
})
export class ListVendasComponent {

  constructor(
    private dialog: MatDialog
  ){}

  pesquisarPorData() {
    this.dialog.open(ModelPesquisarPorDataComponent, {
      width: '100%',
      height: 'auto'
    })
  }
}
