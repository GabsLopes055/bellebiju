import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { VendasService } from '../../service/vendas.service';
import { venda } from 'src/app/shared/models/venda';

@Component({
  selector: 'app-delete-venda',
  templateUrl: './delete-venda.component.html',
  styleUrls: ['./delete-venda.component.scss'],
})
export class DeleteVendaComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) private venda: { venda: venda },
    private service: VendasService,
    private dialog: MatDialog
  ) {}

  deleteVenda() {
    this.service.deleteVenda(this.venda.venda).subscribe((response) => {});
    this.dialog.closeAll();
    this.service.showMessage('Venda Excluída !', 'success');
  }
}
