import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { VendasService } from '../../service/vendas.service';

@Component({
  selector: 'app-create-venda',
  templateUrl: './create-venda.component.html',
  styleUrls: ['./create-venda.component.scss'],
})
export class CreateVendaComponent {
  formGroup: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private service: VendasService,
    private dialogRef: MatDialogRef<CreateVendaComponent>,
  ) {
    this.formGroup = this.fb.group({
      nomeProduto: ['', [Validators.required, Validators.minLength(3)]],
      preco:       [null, [Validators.required, Validators.min(0.01)]],
      quantidade:  [null, [Validators.required, Validators.min(1)]],
      total:       [{ value: null, disabled: true }],
      formaPagamento: ['', Validators.required],
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

  salvarVenda() {
    if (this.formGroup.invalid) return;
    this.isLoading = true;
    const payload = this.formGroup.getRawValue();

    this.service.createNewVenda(payload).subscribe({
      next: () => {
        this.service.showMessage('Venda cadastrada com sucesso!', 'success');
        this.dialogRef.close(true);
      },
      error: () => { this.isLoading = false; },
    });
  }
}
