import { Component } from '@angular/core';
import { venda } from 'src/app/shared/models/venda';
import { VendasService } from '../../service/vendas.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteVendaComponent } from '../delete-venda/delete-venda.component';
import { EditVendaComponent } from '../edit-venda/edit-venda.component';

@Component({
  selector: 'app-accordion-vendas',
  templateUrl: './accordion-vendas.component.html',
  styleUrls: ['./accordion-vendas.component.scss'],
})
export class AccordionVendasComponent {
  dataSource!: venda[];
  panelOpenState: boolean = false;

  constructor(private service: VendasService, private dialog: MatDialog) {
    this.service
      .listAllVendas()
      .subscribe((response) => (this.dataSource = response));
  }

  deleteVenda(venda: venda) {
    this.dialog.open(DeleteVendaComponent, {
      width: '90%',
      height: 'auto',
      data: {
        venda: venda,
      },
    });
  }
  editVenda(venda: venda) {
    this.dialog.open(EditVendaComponent, {
      width: '90%',
      height: 'auto',
      data: {
        venda: venda,
      },
    });
  }

  modal = this.dialog.afterAllClosed.subscribe(() => {
    this.service
      .listAllVendas()
      .subscribe((response) => (this.dataSource = response));
  });
}
