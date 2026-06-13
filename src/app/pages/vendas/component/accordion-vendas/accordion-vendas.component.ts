import { Component, Input, OnDestroy, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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
export class AccordionVendasComponent implements AfterViewInit, OnDestroy {
  @Input() showToolbar = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  columnsTable = ['produto', 'preco', 'quantidade', 'total', 'pagamento', 'data', 'acoes'];
  dataSource = new MatTableDataSource<venda>([]);
  isLoading = true;
  filtroData: DateRangeResult | null = null;

  readonly PAGAMENTO: Record<string, { label: string; cor: string; icone: string }> = {
    DINHEIRO: { label: 'Dinheiro', cor: '#138182', icone: 'payments' },
    PIX:      { label: 'PIX',      cor: '#770d7c', icone: 'pix' },
    DEBITO:   { label: 'Débito',   cor: '#7f5410', icone: 'credit_card' },
    CREDITO:  { label: 'Crédito',  cor: '#822b0e', icone: 'credit_score' },
  };

  private dialogCloseSub = this.dialog.afterAllClosed.subscribe(() => this.carregarVendas());

  constructor(private service: VendasService, private dialog: MatDialog) {
    this.carregarVendas();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item, prop) => {
      if (prop === 'data') return new Date(item.createAt).getTime();
      return (item as any)[prop] ?? '';
    };
  }

  carregarVendas() {
    this.isLoading = true;
    const obs = this.filtroData
      ? this.service.pesquisarPorVenda(this.filtroData.dataInicio, this.filtroData.dataFim)
      : this.service.listAllVendas();

    obs.subscribe({
      next: (data) => {
        this.dataSource.data = data ?? [];
        this.isLoading = false;
      },
      error: () => { this.isLoading = false; },
    });
  }

  applyFilter(event: Event) {
    this.dataSource.filter = (event.target as HTMLInputElement).value.trim().toLowerCase();
    if (this.dataSource.paginator) this.dataSource.paginator.firstPage();
  }

  getPagamento(key: string) {
    return this.PAGAMENTO[key] ?? { label: key, cor: '#666', icone: 'payment' };
  }

  adicionarVenda() {
    this.dialog.open(CreateVendaComponent, { width: '460px', maxWidth: '95vw' });
  }

  editVenda(v: venda) {
    this.dialog.open(EditVendaComponent, {
      width: '460px', maxWidth: '95vw', data: { venda: v },
    });
  }

  deleteVenda(v: venda) {
    this.dialog.open(DeleteVendaComponent, {
      width: '380px', maxWidth: '95vw', data: { venda: v },
    });
  }

  pesquisarPorData() {
    this.dialog.open(ModelPesquisarPorDataComponent, {
      width: '420px', maxWidth: '95vw',
    }).afterClosed().subscribe((result: DateRangeResult | null) => {
      if (!result) return;
      this.filtroData = result;
      this.carregarVendas();
    });
  }

  limparFiltro() {
    this.filtroData = null;
    this.carregarVendas();
  }

  ngOnDestroy() {
    this.dialogCloseSub.unsubscribe();
  }
}
