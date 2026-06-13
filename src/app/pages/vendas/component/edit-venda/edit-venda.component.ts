import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { venda } from 'src/app/shared/models/venda';
import { VendasService } from '../../service/vendas.service';

@Component({
  selector: 'app-edit-venda',
  templateUrl: './edit-venda.component.html',
  styleUrls: ['./edit-venda.component.scss'],
})
export class EditVendaComponent {
  formGroup: FormGroup;
  isLoading = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { venda: venda },
    private fb: FormBuilder,
    private service: VendasService,
    private dialogRef: MatDialogRef<EditVendaComponent>,
  ) {
    const v = this.data.venda;
    this.formGroup = this.fb.group({
      nomeProduto:    [v.nomeProduto,    [Validators.required, Validators.minLength(3)]],
      preco:          [v.preco,          [Validators.required, Validators.min(0.01)]],
      quantidade:     [v.quantidade,     [Validators.required, Validators.min(1)]],
      total:          [{ value: v.total, disabled: true }],
      formaPagamento: [v.formaPagamento, Validators.required],
    });

    this.formGroup.controls['preco'].valueChanges.subscribe(() => this.calcularTotal());
    this.formGroup.controls['quantidade'].valueChanges.subscribe(() => this.calcularTotal());
  }

  private calcularTotal() {
    const preco = parseFloat(this.formGroup.controls['preco'].value) || 0;
    const qtd   = parseFloat(this.formGroup.controls['quantidade'].value) || 0;
    this.formGroup.controls['total'].setValue(
      preco * qtd > 0 ? preco * qtd : null,
      { emitEvent: false },
    );
  }

  salvarEdicao() {
    if (this.formGroup.invalid) return;
    this.isLoading = true;
    const payload = this.formGroup.getRawValue();

    this.service.editarVenda(this.data.venda.id, payload).subscribe({
      next: () => {
        this.service.showMessage('Venda atualizada!', 'warning');
        this.dialogRef.close(true);
      },
      error: () => { this.isLoading = false; },
    });
  }
}
