import { venda } from './../../../../shared/models/venda';
import { Component } from '@angular/core';
import { VendasService } from '../../service/vendas.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteVendaComponent } from '../delete-venda/delete-venda.component';
import { EditVendaComponent } from '../edit-venda/edit-venda.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-accordion-vendas',
  templateUrl: './accordion-vendas.component.html',
  styleUrls: ['./accordion-vendas.component.scss'],
})
export class AccordionVendasComponent {
  columnsTable: string[] = [
    'produto',
    'preco',
    'quantidade',
    'total',
    'pagamento',
    'editar',
    'deletar',
  ];
  dataSource = new MatTableDataSource<venda[]>;
  vendasData!: venda[];

  panelOpenState: boolean = false;

  constructor(private service: VendasService, private dialog: MatDialog) {
    this.vendas();
  }

  deleteVenda(venda: venda) {
    this.dialog.open(DeleteVendaComponent, {
      width: '40%',
      height: 'auto',
      data: {
        venda: venda,
      },
    });
  }
  editVenda(venda: venda) {
    this.dialog.open(EditVendaComponent, {
      width: '40%',
      height: 'auto',
      data: {
        venda: venda,
      },
    });
  }

  modal = this.dialog.afterAllClosed.subscribe(() => {
    this.vendas();
  });

  vendas() {
    this.service
      .listAllVendas()
      .subscribe((response) => (this.dataSource = response));
  }

  pesquisar(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue.valueOf())
    this.dataSource.filter = filterValue.valueOf().trim().toLowerCase();
}
}
