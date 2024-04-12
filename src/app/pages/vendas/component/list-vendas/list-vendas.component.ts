import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModelPesquisarPorDataComponent } from '../model-pesquisar-por-data/model-pesquisar-por-data.component';
import { VendasService } from '../../service/vendas.service';
import { CreateVendaComponent } from '../create-venda/create-venda.component';

@Component({
  selector: 'app-list-vendas',
  templateUrl: './list-vendas.component.html',
  styleUrls: ['./list-vendas.component.scss'],
})
export class ListVendasComponent {

  isLoading: boolean = true;

  constructor(private dialog: MatDialog, private service: VendasService) {
    this.isLoading = false
  }

  adicionarVenda() {
    this.dialog.open(CreateVendaComponent, {
      width: "40%",
      height: "auto"
    })
  }

  pesquisarPorData() {
    this.dialog.open(ModelPesquisarPorDataComponent, {
      width: '100%',
      height: 'auto',
    });
  }
}
