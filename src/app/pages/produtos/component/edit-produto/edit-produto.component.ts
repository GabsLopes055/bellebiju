import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { categoria } from 'src/app/shared/models/categoria';
import { produto } from 'src/app/shared/models/produto.model';
import { CategoriasService } from 'src/app/pages/categorias/service/categorias.service';
import { ProdutoService } from '../../service/produto.service';

@Component({
  selector: 'app-edit-produto',
  templateUrl: './edit-produto.component.html',
  styleUrls: ['./edit-produto.component.scss'],
})
export class EditProdutoComponent implements OnInit {

  formGroup!: FormGroup;
  isLoading = false;
  confirmDelete = false;
  categorias: categoria[] = [];

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private service: ProdutoService,
    private categoriasService: CategoriasService,
    @Inject(MAT_DIALOG_DATA) public data: { produto: produto },
  ) {
    const p = data.produto;
    this.formGroup = this.fb.group({
      nomeProduto:       [p.nomeProduto, [Validators.required, Validators.minLength(2)]],
      precoProduto:      [p.precoProduto, [Validators.required, Validators.min(0.01)]],
      quantidadeEstoque: [p.quantidadeEstoque, [Validators.required, Validators.min(0)]],
      estoqueMinimo:     [p.estoqueMinimo, [Validators.required, Validators.min(0)]],
      idCategoria:       [p.categoria?.idCategoria ?? null],
    });
  }

  ngOnInit() {
    this.categoriasService.listAll().subscribe({
      next: (data) => { this.categorias = data ?? []; },
    });
  }

  getError(field: string): string {
    const ctrl = this.formGroup.get(field);
    if (ctrl?.hasError('required')) return 'Campo obrigatório';
    if (ctrl?.hasError('minlength')) return `Mínimo ${ctrl.getError('minlength').requiredLength} caracteres`;
    if (ctrl?.hasError('min')) return 'Valor deve ser maior que zero';
    return '';
  }

  update() {
    if (this.formGroup.invalid) return;
    this.isLoading = true;
    const payload = {
      ...this.formGroup.value,
      idCategoria: this.formGroup.value.idCategoria || null,
    };
    this.service.updateProduto(this.data.produto.idProduto, payload).subscribe({
      next: () => {
        this.isLoading = false;
        this.dialog.closeAll();
      },
      error: () => { this.isLoading = false; },
    });
  }

  delete() {
    this.isLoading = true;
    this.service.deleteProduto(this.data.produto.idProduto).subscribe({
      next: () => {
        this.isLoading = false;
        this.dialog.closeAll();
      },
      error: () => { this.isLoading = false; },
    });
  }
}
