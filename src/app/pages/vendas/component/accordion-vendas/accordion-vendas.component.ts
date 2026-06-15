import { Component, Input, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { venda } from 'src/app/shared/models/venda';
import { DateRangeResult, ModelPesquisarPorDataComponent } from '../model-pesquisar-por-data/model-pesquisar-por-data.component';
import { CreateVendaComponent } from '../create-venda/create-venda.component';
import { DeleteVendaComponent } from '../delete-venda/delete-venda.component';
import { EditVendaComponent } from '../edit-venda/edit-venda.component';
import { VendasService } from '../../service/vendas.service';

@Component({
  selector: 'app-accordion-vendas',
  templateUrl: './accordion-vendas.component.html',
  styleUrls: ['./accordion-vendas.component.scss'],
})
export class AccordionVendasComponent implements OnDestroy {
  @Input() showToolbar = false;

  // ─── Dados ───────────────────────────────────────────────────────────────
  allVendas: venda[]       = [];
  displayedVendas: venda[] = [];
  isLoading                = true;
  filtroData: DateRangeResult | null = null;

  // ─── Estado da tabela ────────────────────────────────────────────────────
  filterText   = '';
  sortField    = '';
  sortDir: 'asc' | 'desc' = 'asc';
  page         = 1;
  pageSize     = 10;
  totalFiltered = 0;

  readonly PAGAMENTO: Record<string, { label: string; cor: string; icone: string }> = {
    DINHEIRO: { label: 'Dinheiro', cor: '#0f8182', icone: 'payments'      },
    PIX:      { label: 'PIX',      cor: '#770d7c', icone: 'pix'           },
    DEBITO:   { label: 'Débito',   cor: '#7f5410', icone: 'credit_card'   },
    CREDITO:  { label: 'Crédito',  cor: '#822b0e', icone: 'credit_score'  },
  };

  private dialogCloseSub = this.dialog.afterAllClosed.subscribe(() => this.carregarVendas());

  constructor(private service: VendasService, private dialog: MatDialog) {
    this.carregarVendas();
  }

  // ─── Carga de dados ──────────────────────────────────────────────────────
  carregarVendas() {
    this.isLoading = true;
    const obs = this.filtroData
      ? this.service.pesquisarPorVenda(this.filtroData.dataInicio, this.filtroData.dataFim)
      : this.service.listAllVendas();

    obs.subscribe({
      next: (data) => {
        this.allVendas = data ?? [];
        this.page = 1;
        this.updateDisplay();
        this.isLoading = false;
      },
      error: () => { this.isLoading = false; },
    });
  }

  // ─── Filtro + Ordenação + Paginação ──────────────────────────────────────
  private updateDisplay() {
    let result = this.filterText.trim()
      ? this.allVendas.filter(v =>
          v.nomeProduto.toLowerCase().includes(this.filterText.toLowerCase()))
      : [...this.allVendas];

    if (this.sortField) {
      result.sort((a, b) => {
        const va: any = this.sortField === 'data'
          ? new Date(a.createAt).getTime()
          : (a as any)[this.sortField] ?? '';
        const vb: any = this.sortField === 'data'
          ? new Date(b.createAt).getTime()
          : (b as any)[this.sortField] ?? '';
        if (va < vb) return this.sortDir === 'asc' ? -1 : 1;
        if (va > vb) return this.sortDir === 'asc' ? 1 : -1;
        return 0;
      });
    }

    this.totalFiltered = result.length;
    const start = (this.page - 1) * this.pageSize;
    this.displayedVendas = result.slice(start, start + this.pageSize);
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

  // ─── Getters computados ──────────────────────────────────────────────────
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

  getPagamento(key: string) {
    return this.PAGAMENTO[key] ?? { label: key, cor: '#6b7280', icone: 'payment' };
  }

  // ─── Dialogs ─────────────────────────────────────────────────────────────
  adicionarVenda() {
    this.dialog.open(CreateVendaComponent, { width: '460px', maxWidth: '95vw' });
  }

  editVenda(v: venda) {
    this.dialog.open(EditVendaComponent, { width: '460px', maxWidth: '95vw', data: { venda: v } });
  }

  deleteVenda(v: venda) {
    this.dialog.open(DeleteVendaComponent, { width: '380px', maxWidth: '95vw', data: { venda: v } });
  }

  pesquisarPorData() {
    this.dialog.open(ModelPesquisarPorDataComponent, { width: '420px', maxWidth: '95vw' })
      .afterClosed()
      .subscribe((result: DateRangeResult | null) => {
        if (!result) return;
        this.filtroData = result;
        this.carregarVendas();
      });
  }

  limparFiltro() {
    this.filtroData = null;
    this.carregarVendas();
  }

  ngOnDestroy() { this.dialogCloseSub.unsubscribe(); }
}
