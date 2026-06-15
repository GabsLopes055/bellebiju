import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { categoria } from 'src/app/shared/models/categoria';
import { CategoriasService } from 'src/app/pages/categorias/service/categorias.service';
import { ProdutoService } from '../../service/produto.service';

@Component({
  selector: 'app-create-produto',
  templateUrl: './create-produto.component.html',
  styleUrls: ['./create-produto.component.scss'],
})
export class CreateProdutoComponent implements OnInit {

  formGroup!: FormGroup;
  isLoading = false;
  categorias: categoria[] = [];

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private service: ProdutoService,
    private categoriasService: CategoriasService,
  ) {
    this.formGroup = this.fb.group({
      nomeProduto:        ['', [Validators.required, Validators.minLength(2)]],
      precoProduto:       [null, [Validators.required, Validators.min(0.01)]],
      quantidadeEstoque:  [0, [Validators.required, Validators.min(0)]],
      estoqueMinimo:      [5, [Validators.required, Validators.min(0)]],
      idCategoria:        [null],
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

  save() {
    if (this.formGroup.invalid) return;
    this.isLoading = true;
    const payload = {
      ...this.formGroup.value,
      idCategoria: this.formGroup.value.idCategoria || null,
    };
    this.service.createProduto(payload).subscribe({
      next: () => {
        this.isLoading = false;
        this.dialog.closeAll();
      },
      error: () => { this.isLoading = false; },
    });
  }
}
