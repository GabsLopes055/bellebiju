import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { produto } from 'src/app/shared/models/produto.model';
import { ProdutoService } from '../../service/produto.service';

@Component({
  selector: 'app-ajustar-estoque',
  templateUrl: './ajustar-estoque.component.html',
  styleUrls: ['./ajustar-estoque.component.scss'],
})
export class AjustarEstoqueComponent {

  formGroup!: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private service: ProdutoService,
    @Inject(MAT_DIALOG_DATA) public data: { produto: produto },
  ) {
    this.formGroup = this.fb.group({
      quantidade: [null, [Validators.required, Validators.min(-9999), Validators.max(9999)]],
    });
  }

  get novoEstoque(): number {
    const qtd = Number(this.formGroup.get('quantidade')?.value ?? 0);
    return (this.data.produto.quantidadeEstoque ?? 0) + qtd;
  }

  get operacao(): 'entrada' | 'saida' | null {
    const v = this.formGroup.get('quantidade')?.value;
    if (v === null || v === '') return null;
    return Number(v) >= 0 ? 'entrada' : 'saida';
  }

  ajustar() {
    if (this.formGroup.invalid) return;
    this.isLoading = true;
    this.service.ajustarEstoque(
      this.data.produto.idProduto,
      Number(this.formGroup.value.quantidade)
    ).subscribe({
      next: () => {
        this.isLoading = false;
        this.dialog.closeAll();
      },
      error: () => { this.isLoading = false; },
    });
  }
}
