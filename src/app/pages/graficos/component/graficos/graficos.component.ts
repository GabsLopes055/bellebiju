import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';
import Chart from 'chart.js/auto';
import { DateRangeResult, ModelPesquisarPorDataComponent } from 'src/app/pages/vendas/component/model-pesquisar-por-data/model-pesquisar-por-data.component';
import { GraficosServiceService } from '../../service/graficos-service.service';
import { VendasService } from 'src/app/pages/vendas/service/vendas.service';
import { ResumoResponse, ProdutoMaisVendido, ResumoPorCategoria } from 'src/app/shared/models/relatorios';

interface PagamentoInfo {
  label: string;
  valor: number;
  quantidade: number;
  cor: string;
  icone: string;
  percentual: number;
}

type Tab = 'relatorio' | 'pagamento' | 'categoria';

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.scss'],
})
export class GraficosComponent implements OnDestroy {

  // ── Tab 1 ──
  @ViewChild('graficoBar')   graficoBar!:   ElementRef<HTMLCanvasElement>;
  @ViewChild('graficoPizza') graficoPizza!: ElementRef<HTMLCanvasElement>;

  // ── Tab 2 ──
  @ViewChild('pagBar')      pagBarRef!:      ElementRef<HTMLCanvasElement>;
  @ViewChild('pagDoughnut') pagDoughnutRef!: ElementRef<HTMLCanvasElement>;

  // ── Tab 3 ──
  @ViewChild('catBar')      catBarRef!:      ElementRef<HTMLCanvasElement>;
  @ViewChild('catDetalheBar') catDetalheBarRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('catDetalhePizza') catDetalhePizzaRef!: ElementRef<HTMLCanvasElement>;

  isLoading     = false;
  isLoadingCat  = false;
  hasData       = false;
  activeTab: Tab = 'relatorio';
  periodo: DateRangeResult | null = null;

  // Tab 1
  resumo: ResumoResponse | null = null;
  topProdutos: ProdutoMaisVendido[] = [];
  produtoDestaque = '';

  // Tab 2
  pagamentos: PagamentoInfo[] = [];
  totalTransacoes = 0;
  totalVendido    = 0;
  metodoPrincipal = '';

  // Tab 3 — visão geral
  resumoCategorias: ResumoPorCategoria[] = [];
  // Tab 3 — detalhe de uma categoria
  categoriaAtiva: ResumoPorCategoria | null = null;
  resumoCategoria: ResumoResponse | null = null;
  topProdutosCategoria: ProdutoMaisVendido[] = [];

  private chartBar:          Chart | null = null;
  private chartPizza:        Chart | null = null;
  private chartPagBar:       Chart | null = null;
  private chartPagDonut:     Chart | null = null;
  private chartCatBar:       Chart | null = null;
  private chartCatDetBar:    Chart | null = null;
  private chartCatDetPizza:  Chart | null = null;

  private readonly PRODUTO_CORES = [
    '#770d7c', '#138182', '#7f5410', '#822b0e',
    '#1a6b5a', '#3a3d8c', '#a8480a', '#0a6886',
    '#5c2d8c', '#106b1a',
  ];
  private readonly PAG_KEYS   = ['DINHEIRO', 'PIX', 'DEBITO', 'CREDITO'] as const;
  private readonly PAG_LABELS = ['Dinheiro', 'PIX', 'Débito', 'Crédito'];
  private readonly PAG_CORES  = ['#138182', '#770d7c', '#7f5410', '#822b0e'];
  private readonly PAG_ICONES = ['payments', 'pix', 'credit_card', 'credit_score'];

  constructor(
    private service: GraficosServiceService,
    private vendasService: VendasService,
    private dialog: MatDialog,
  ) {}

  // ── Pesquisar ─────────────────────────────────────────────────────────────

  pesquisarPorData() {
    const dialogRef = this.dialog.open(ModelPesquisarPorDataComponent, {
      width: '420px', maxWidth: '95vw',
    });

    dialogRef.afterClosed().subscribe((result: DateRangeResult | null) => {
      if (!result) return;
      this.periodo   = result;
      this.isLoading = true;
      this.hasData   = false;
      this.categoriaAtiva = null;
      this.destroyAllCharts();

      forkJoin({
        resumo:      this.service.getResumo(result.dataInicio, result.dataFim),
        produtos:    this.service.getProdutosMaisVendidos(result.dataInicio, result.dataFim),
        vendas:      this.vendasService.pesquisarPorVenda(result.dataInicio, result.dataFim),
        categorias:  this.service.getResumoPorCategoria(result.dataInicio, result.dataFim),
      }).subscribe({
        next: ({ resumo, produtos, vendas, categorias }) => {
          // Tab 1
          this.resumo          = resumo;
          this.topProdutos     = produtos.slice(0, 10);
          this.produtoDestaque = produtos[0]?.nomeProduto ?? '—';

          // Tab 2
          const agg: Record<string, { valor: number; qtd: number }> = {
            DINHEIRO: { valor: 0, qtd: 0 }, PIX: { valor: 0, qtd: 0 },
            DEBITO:   { valor: 0, qtd: 0 }, CREDITO: { valor: 0, qtd: 0 },
          };
          vendas.forEach(v => {
            const k = v.formaPagamento;
            if (agg[k]) { agg[k].valor += v.total; agg[k].qtd++; }
          });
          this.totalTransacoes = vendas.length;
          this.totalVendido    = Object.values(agg).reduce((s, a) => s + a.valor, 0);
          this.metodoPrincipal = this.PAG_LABELS[
            this.PAG_KEYS.reduce((mi, k, i) => agg[k].valor > agg[this.PAG_KEYS[mi]].valor ? i : mi, 0)
          ];
          this.pagamentos = this.PAG_KEYS.map((k, i) => ({
            label: this.PAG_LABELS[i], valor: agg[k].valor, quantidade: agg[k].qtd,
            cor: this.PAG_CORES[i], icone: this.PAG_ICONES[i],
            percentual: this.totalVendido > 0 ? (agg[k].valor / this.totalVendido) * 100 : 0,
          }));

          // Tab 3
          this.resumoCategorias = categorias;

          this.isLoading = false;
          this.hasData   = true;
          setTimeout(() => this.renderActiveTab(), 0);
        },
        error: () => { this.isLoading = false; },
      });
    });
  }

  // ── Tabs ──────────────────────────────────────────────────────────────────

  setTab(tab: Tab) {
    if (this.activeTab === tab) return;
    this.activeTab = tab;
    if (!this.hasData) return;
    setTimeout(() => this.renderActiveTab(), 0);
  }

  private renderActiveTab() {
    if (this.activeTab === 'relatorio') {
      this.chartBar?.destroy();   this.chartBar   = null;
      this.chartPizza?.destroy(); this.chartPizza = null;
      this.renderProdutosBar();
      this.renderProdutosDoughnut();
    } else if (this.activeTab === 'pagamento') {
      this.chartPagBar?.destroy();   this.chartPagBar   = null;
      this.chartPagDonut?.destroy(); this.chartPagDonut = null;
      this.renderPagamentosBar();
      this.renderPagamentosDoughnut();
    } else {
      this.chartCatBar?.destroy(); this.chartCatBar = null;
      if (this.categoriaAtiva) {
        this.renderCatDetalheBar();
        this.renderCatDetalhePizza();
      } else {
        this.renderCatBar();
      }
    }
  }

  // ── Tab 3 — categoria ─────────────────────────────────────────────────────

  verDetalheCategoria(cat: ResumoPorCategoria) {
    this.categoriaAtiva     = cat;
    this.resumoCategoria    = null;
    this.topProdutosCategoria = [];
    this.isLoadingCat       = true;

    this.chartCatBar?.destroy();      this.chartCatBar      = null;
    this.chartCatDetBar?.destroy();   this.chartCatDetBar   = null;
    this.chartCatDetPizza?.destroy(); this.chartCatDetPizza = null;

    forkJoin({
      resumo:   this.service.getResumo(this.periodo!.dataInicio, this.periodo!.dataFim, cat.idCategoria),
      produtos: this.service.getProdutosMaisVendidos(this.periodo!.dataInicio, this.periodo!.dataFim, cat.idCategoria),
    }).subscribe({
      next: ({ resumo, produtos }) => {
        this.resumoCategoria      = resumo;
        this.topProdutosCategoria = produtos.slice(0, 10);
        this.isLoadingCat         = false;
        setTimeout(() => {
          this.renderCatDetalheBar();
          this.renderCatDetalhePizza();
        }, 0);
      },
      error: () => { this.isLoadingCat = false; },
    });
  }

  voltarParaCategorias() {
    this.categoriaAtiva = null;
    this.chartCatDetBar?.destroy();   this.chartCatDetBar   = null;
    this.chartCatDetPizza?.destroy(); this.chartCatDetPizza = null;
    setTimeout(() => this.renderCatBar(), 0);
  }

  // ── Renders — Tab 1 ───────────────────────────────────────────────────────

  private renderProdutosBar() {
    if (!this.graficoBar || this.topProdutos.length === 0) return;
    const ctx   = this.graficoBar.nativeElement.getContext('2d')!;
    const cores = this.topProdutos.map((_, i) => this.PRODUTO_CORES[i % this.PRODUTO_CORES.length]);
    this.chartBar = new Chart(ctx, {
      type: 'bar',
      data: { labels: this.topProdutos.map(p => p.nomeProduto), datasets: [{ label: 'Unidades Vendidas', data: this.topProdutos.map(p => p.quantidadeTotal), backgroundColor: cores.map(c => c + 'cc'), borderColor: cores, borderWidth: 2, borderRadius: 6, borderSkipped: false }] },
      options: { responsive: true, maintainAspectRatio: false, indexAxis: 'y', animation: { duration: 700 }, plugins: { legend: { display: false }, tooltip: { callbacks: { label: (i) => ` ${i.parsed.x} unidades` } } }, scales: { x: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' }, border: { display: false }, ticks: { font: { size: 12 } } }, y: { grid: { display: false }, border: { display: false }, ticks: { font: { size: 12, weight: 600 } } } } },
    });
  }

  private renderProdutosDoughnut() {
    if (!this.graficoPizza || this.topProdutos.length === 0) return;
    const top5 = this.topProdutos.slice(0, 5);
    const ctx  = this.graficoPizza.nativeElement.getContext('2d')!;
    const totalReceita = top5.reduce((s, p) => s + p.receitaTotal, 0);
    const cp = this.centerPlugin('centerLabel', this.formatCurrencyCompact(totalReceita), 'top 5');
    this.chartPizza = new Chart(ctx, { type: 'doughnut', plugins: [cp], data: { labels: top5.map(p => p.nomeProduto), datasets: [{ data: top5.map(p => p.receitaTotal), backgroundColor: this.PRODUTO_CORES.slice(0, 5), borderColor: '#fff', borderWidth: 3, hoverOffset: 10 }] }, options: { responsive: true, maintainAspectRatio: false, cutout: '62%', animation: { duration: 700 }, plugins: { legend: { position: 'bottom', labels: { padding: 12, usePointStyle: true, font: { size: 11 } } }, tooltip: { callbacks: { label: (i: any) => { const p = totalReceita > 0 ? ((i.parsed / totalReceita) * 100).toFixed(1) : '0.0'; return ` ${this.formatCurrency(i.parsed)} (${p}%)`; } } } } } as any });
  }

  // ── Renders — Tab 2 ───────────────────────────────────────────────────────

  private renderPagamentosBar() {
    if (!this.pagBarRef) return;
    const ctx  = this.pagBarRef.nativeElement.getContext('2d')!;
    const data = this.pagamentos.map(p => p.valor);
    const grads = this.PAG_CORES.map(cor => { const g = ctx.createLinearGradient(0, 0, 0, 300); g.addColorStop(0, cor); g.addColorStop(1, cor + '55'); return g; });
    this.chartPagBar = new Chart(ctx, { type: 'bar', data: { labels: this.PAG_LABELS, datasets: [{ label: 'Valor Vendido', data, backgroundColor: grads, borderColor: this.PAG_CORES, borderWidth: 0, borderRadius: 8, borderSkipped: false }] }, options: { responsive: true, maintainAspectRatio: false, animation: { duration: 700 }, plugins: { legend: { display: false }, tooltip: { callbacks: { label: (i) => ` ${this.formatCurrency(i.parsed.y)}` } } }, scales: { x: { grid: { display: false }, border: { display: false }, ticks: { font: { size: 13, weight: 600 } } }, y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' }, border: { display: false }, ticks: { callback: (v) => this.formatCurrencyCompact(Number(v)) } } } } });
  }

  private renderPagamentosDoughnut() {
    if (!this.pagDoughnutRef) return;
    const ctx   = this.pagDoughnutRef.nativeElement.getContext('2d')!;
    const total = this.totalTransacoes;
    const cp    = this.centerPlugin('centerLabel2', String(total), 'transações');
    this.chartPagDonut = new Chart(ctx, { type: 'doughnut', plugins: [cp], data: { labels: this.PAG_LABELS, datasets: [{ data: this.pagamentos.map(p => p.quantidade), backgroundColor: this.PAG_CORES, borderColor: '#fff', borderWidth: 3, hoverOffset: 10 }] }, options: { responsive: true, maintainAspectRatio: false, cutout: '65%', animation: { duration: 700 }, plugins: { legend: { position: 'bottom', labels: { padding: 14, usePointStyle: true, pointStyleWidth: 10, font: { size: 12 } } }, tooltip: { callbacks: { label: (i: any) => { const pct = total > 0 ? ((i.parsed / total) * 100).toFixed(1) : '0.0'; return ` ${i.label}: ${i.parsed} (${pct}%)`; } } } } } as any });
  }

  // ── Renders — Tab 3 ───────────────────────────────────────────────────────

  private renderCatBar() {
    if (!this.catBarRef || this.resumoCategorias.length === 0) return;
    const ctx   = this.catBarRef.nativeElement.getContext('2d')!;
    const cats  = this.resumoCategorias.slice(0, 10);
    const cores = cats.map((_, i) => this.PRODUTO_CORES[i % this.PRODUTO_CORES.length]);
    this.chartCatBar = new Chart(ctx, {
      type: 'bar',
      data: { labels: cats.map(c => c.nomeCategoria), datasets: [{ label: 'Receita', data: cats.map(c => c.receitaTotal), backgroundColor: cores.map(c => c + 'cc'), borderColor: cores, borderWidth: 2, borderRadius: 6, borderSkipped: false }] },
      options: { responsive: true, maintainAspectRatio: false, indexAxis: 'y', animation: { duration: 700 }, plugins: { legend: { display: false }, tooltip: { callbacks: { label: (i) => ` ${this.formatCurrency(i.parsed.x)}` } } }, scales: { x: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' }, border: { display: false }, ticks: { callback: (v) => this.formatCurrencyCompact(Number(v)) } }, y: { grid: { display: false }, border: { display: false }, ticks: { font: { size: 12, weight: 600 } } } } },
    });
  }

  private renderCatDetalheBar() {
    if (!this.catDetalheBarRef || this.topProdutosCategoria.length === 0) return;
    const ctx   = this.catDetalheBarRef.nativeElement.getContext('2d')!;
    const cores = this.topProdutosCategoria.map((_, i) => this.PRODUTO_CORES[i % this.PRODUTO_CORES.length]);
    this.chartCatDetBar = new Chart(ctx, {
      type: 'bar',
      data: { labels: this.topProdutosCategoria.map(p => p.nomeProduto), datasets: [{ label: 'Unidades', data: this.topProdutosCategoria.map(p => p.quantidadeTotal), backgroundColor: cores.map(c => c + 'cc'), borderColor: cores, borderWidth: 2, borderRadius: 6, borderSkipped: false }] },
      options: { responsive: true, maintainAspectRatio: false, indexAxis: 'y', animation: { duration: 700 }, plugins: { legend: { display: false }, tooltip: { callbacks: { label: (i) => ` ${i.parsed.x} unidades` } } }, scales: { x: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' }, border: { display: false } }, y: { grid: { display: false }, border: { display: false }, ticks: { font: { size: 12, weight: 600 } } } } },
    });
  }

  private renderCatDetalhePizza() {
    if (!this.catDetalhePizzaRef || this.topProdutosCategoria.length === 0) return;
    const top5 = this.topProdutosCategoria.slice(0, 5);
    const ctx  = this.catDetalhePizzaRef.nativeElement.getContext('2d')!;
    const totalReceita = top5.reduce((s, p) => s + p.receitaTotal, 0);
    const cp = this.centerPlugin('centerLabelCat', this.formatCurrencyCompact(totalReceita), 'receita');
    this.chartCatDetPizza = new Chart(ctx, { type: 'doughnut', plugins: [cp], data: { labels: top5.map(p => p.nomeProduto), datasets: [{ data: top5.map(p => p.receitaTotal), backgroundColor: this.PRODUTO_CORES.slice(0, 5), borderColor: '#fff', borderWidth: 3, hoverOffset: 10 }] }, options: { responsive: true, maintainAspectRatio: false, cutout: '62%', animation: { duration: 700 }, plugins: { legend: { position: 'bottom', labels: { padding: 10, usePointStyle: true, font: { size: 11 } } }, tooltip: { callbacks: { label: (i: any) => { const p = totalReceita > 0 ? ((i.parsed / totalReceita) * 100).toFixed(1) : '0.0'; return ` ${this.formatCurrency(i.parsed)} (${p}%)`; } } } } } as any });
  }

  // ── Helpers ───────────────────────────────────────────────────────────────

  private centerPlugin(id: string, line1: string, line2: string) {
    return {
      id,
      beforeDraw: (chart: Chart) => {
        const { ctx: c, chartArea } = chart;
        if (!chartArea) return;
        const cx = chartArea.left + chartArea.width / 2;
        const cy = chartArea.top  + chartArea.height / 2;
        c.save();
        c.font = 'bold 15px sans-serif'; c.fillStyle = '#1a1a1a';
        c.textAlign = 'center'; c.textBaseline = 'middle';
        c.fillText(line1, cx, cy - 10);
        c.font = '12px sans-serif'; c.fillStyle = '#888';
        c.fillText(line2, cx, cy + 12);
        c.restore();
      },
    };
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  }

  private formatCurrencyCompact(value: number): string {
    if (value >= 1000) return `R$${(value / 1000).toFixed(1)}k`;
    return `R$${value.toFixed(0)}`;
  }

  private destroyAllCharts() {
    [this.chartBar, this.chartPizza, this.chartPagBar, this.chartPagDonut,
     this.chartCatBar, this.chartCatDetBar, this.chartCatDetPizza].forEach(c => c?.destroy());
    this.chartBar = this.chartPizza = this.chartPagBar = this.chartPagDonut =
    this.chartCatBar = this.chartCatDetBar = this.chartCatDetPizza = null;
  }

  ngOnDestroy() { this.destroyAllCharts(); }
}
