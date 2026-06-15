import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { produto } from 'src/app/shared/models/produto.model';
import { ProdutoService } from '../../service/produto.service';
import { CreateProdutoComponent } from '../../component/create-produto/create-produto.component';
import { EditProdutoComponent } from '../../component/edit-produto/edit-produto.component';
import { AjustarEstoqueComponent } from '../../component/ajustar-estoque/ajustar-estoque.component';

@Component({
  selector: 'app-listar-produtos',
  templateUrl: './listar-produtos.component.html',
  styleUrls: ['./listar-produtos.component.scss'],
})
export class ListarProdutosComponent implements OnInit, OnDestroy {

  allProdutos: produto[]       = [];
  displayedProdutos: produto[] = [];
  isLoading                    = true;

  filterText  = '';
  sortField   = '';
  sortDir: 'asc' | 'desc' = 'asc';
  page        = 1;
  pageSize    = 10;
  totalFiltered = 0;

  private dialogSub!: Subscription;

  constructor(
    private service: ProdutoService,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.dialogSub = this.dialog.afterAllClosed.subscribe(() => this.listAllProducts());
    this.listAllProducts();
  }

  listAllProducts() {
    this.isLoading = true;
    this.service.listAllProducts().subscribe({
      next: (data) => {
        this.allProdutos = data ?? [];
        this.page = 1;
        this.updateDisplay();
        this.isLoading = false;
      },
      error: () => { this.isLoading = false; },
    });
  }

  updateDisplay() {
    const term = this.filterText.trim().toLowerCase();
    let result = term
      ? this.allProdutos.filter(p =>
          p.nomeProduto.toLowerCase().includes(term) ||
          (p.categoria?.nomeCategoria ?? '').toLowerCase().includes(term)
        )
      : [...this.allProdutos];

    if (this.sortField) {
      result.sort((a, b) => {
        const va: any = (a as any)[this.sortField] ?? '';
        const vb: any = (b as any)[this.sortField] ?? '';
        if (va < vb) return this.sortDir === 'asc' ? -1 : 1;
        if (va > vb) return this.sortDir === 'asc' ? 1 : -1;
        return 0;
      });
    }

    this.totalFiltered = result.length;
    const start = (this.page - 1) * this.pageSize;
    this.displayedProdutos = result.slice(start, start + this.pageSize);
  }

  applyFilter(event: Event) {
    this.filterText = (event.target as HTMLInputElement).value;
    this.page = 1;
    this.updateDisplay();
  }

  sortBy(field: string) {
    this.sortDir = this.sortField === field && this.sortDir === 'asc' ? 'desc' : 'asc';
    this.sortField = field;
    this.updateDisplay();
  }

  getSortIcon(field: string): string {
    if (this.sortField !== field) return 'unfold_more';
    return this.sortDir === 'asc' ? 'arrow_upward' : 'arrow_downward';
  }

  goToPage(p: number) {
    if (p < 1 || p > this.totalPages) return;
    this.page = p;
    this.updateDisplay();
  }

  onPageSizeChange(event: Event) {
    this.pageSize = +(event.target as HTMLSelectElement).value;
    this.page = 1;
    this.updateDisplay();
  }

  openCreate() {
    this.dialog.open(CreateProdutoComponent, { width: '480px', maxWidth: '95vw' });
  }

  openEdit(p: produto) {
    this.dialog.open(EditProdutoComponent, {
      width: '480px',
      maxWidth: '95vw',
      data: { produto: p },
    });
  }

  openAjustarEstoque(p: produto) {
    this.dialog.open(AjustarEstoqueComponent, {
      width: '420px',
      maxWidth: '95vw',
      data: { produto: p },
    });
  }

  isEstoqueBaixo(p: produto): boolean {
    return p.quantidadeEstoque <= p.estoqueMinimo;
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.totalFiltered / this.pageSize));
  }

  get pageNumbers(): number[] {
    const pages: number[] = [];
    for (let i = Math.max(1, this.page - 2); i <= Math.min(this.totalPages, this.page + 2); i++) {
      pages.push(i);
    }
    return pages;
  }

  get paginationInfo(): string {
    if (this.totalFiltered === 0) return 'Nenhum registro';
    const start = (this.page - 1) * this.pageSize + 1;
    const end   = Math.min(this.page * this.pageSize, this.totalFiltered);
    return `${start}–${end} de ${this.totalFiltered}`;
  }

  ngOnDestroy() {
    this.dialogSub?.unsubscribe();
  }
}
