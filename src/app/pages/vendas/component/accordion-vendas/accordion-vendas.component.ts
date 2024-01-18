import { Component } from '@angular/core';
import { venda } from 'src/app/shared/models/venda';
import { VendasService } from '../../service/vendas.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteVendaComponent } from '../delete-venda/delete-venda.component';
import { EditVendaComponent } from '../edit-venda/edit-venda.component';
import { PermissionUser } from 'src/app/shared/userLogged/permissionUser.service';

@Component({
  selector: 'app-accordion-vendas',
  templateUrl: './accordion-vendas.component.html',
  styleUrls: ['./accordion-vendas.component.scss'],
})
export class AccordionVendasComponent {
  permission!: boolean;
  dataSource!: venda[];
  panelOpenState: boolean = false;

  constructor(
    private service: VendasService,
    private dialog: MatDialog,
    private permissionUser: PermissionUser
  ) {
    this.service
      .listAllVendas()
      .subscribe((response) => (this.dataSource = response));
      this.permission = this.permissionUser.hasPermission("ADMIN")
  }

  deleteVenda(idVenda: string) {
    this.dialog.open(DeleteVendaComponent, {
      width: '90%',
      height: 'auto',
      data: {
        idvenda: idVenda,
      },
    });
  }
  editVenda(venda: venda) {
    this.dialog.open(EditVendaComponent, {
      width: '90%',
      height: 'auto',
      data: {
        idvenda: venda,
      },
    });
  }
}
