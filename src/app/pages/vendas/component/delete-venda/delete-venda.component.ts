import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { venda } from 'src/app/shared/models/venda';
import { VendasService } from '../../service/vendas.service';

@Component({
  selector: 'app-delete-venda',
  templateUrl: './delete-venda.component.html',
  styleUrls: ['./delete-venda.component.scss'],
})
export class DeleteVendaComponent {
  venda: venda;
  isLoading = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: { venda: venda },
    private service: VendasService,
    private dialogRef: MatDialogRef<DeleteVendaComponent>,
  ) {
    this.venda = data.venda;
  }

  confirmarExclusao() {
    this.isLoading = true;
    this.service.deleteVenda(this.venda).subscribe({
      next: () => {
        this.service.showMessage('Venda excluída!', 'success');
        this.dialogRef.close(true);
      },
      error: () => { this.isLoading = false; },
    });
  }
}
