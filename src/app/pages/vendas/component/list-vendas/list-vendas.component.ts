import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModelPesquisarPorDataComponent } from '../model-pesquisar-por-data/model-pesquisar-por-data.component';
import { VendasService } from '../../service/vendas.service';

@Component({
  selector: 'app-list-vendas',
  templateUrl: './list-vendas.component.html',
  styleUrls: ['./list-vendas.component.scss'],
})
export class ListVendasComponent {

  constructor(
    private dialog: MatDialog,
    private service: VendasService
    ) {}

  pesquisarPorData() {
    this.dialog.open(ModelPesquisarPorDataComponent, {
      width: '100%',
      height: 'auto',
    });
  }

  modal = this.dialog.afterAllClosed.subscribe((response) => {
    console.log(this.service.getData())
  })
}
