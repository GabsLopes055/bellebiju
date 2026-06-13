import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Chart from 'chart.js/auto';
import { DateRangeResult, ModelPesquisarPorDataComponent } from 'src/app/pages/vendas/component/model-pesquisar-por-data/model-pesquisar-por-data.component';
import { GraficosServiceService } from '../../service/graficos-service.service';

interface PagamentoInfo {
  label: string;
  valor: number;
  quantidade: number;
  cor: string;
  icone: string;
  percentual: number;
}

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.scss'],
})
export class GraficosComponent implements OnDestroy {
  @ViewChild('graficoBar', { static: false }) graficoBar!: ElementRef<HTMLCanvasElement>;
  @ViewChild('graficopizza', { static: false }) graficopizza!: ElementRef<HTMLCanvasElement>;

  isLoading = false;
  hasData = false;
  periodo: DateRangeResult | null = null;

  totalVendido = 0;
  totalTransacoes = 0;
  ticketMedio = 0;
  metodoPrincipal = '';
  pagamentos: PagamentoInfo[] = [];

  private chartBar: Chart | null = null;
  private chartPizza: Chart | null = null;

  private readonly LABELS = ['Dinheiro', 'PIX', 'Débito', 'Crédito'];
  private readonly CORES = ['#138182', '#770d7c', '#7f5410', '#822b0e'];
  private readonly ICONES = ['payments', 'pix', 'credit_card', 'credit_score'];

  constructor(
    private service: GraficosServiceService,
    private dialog: MatDialog,
  ) {}

  pesquisarPorData() {
    const dialogRef = this.dialog.open(ModelPesquisarPorDataComponent, {
      width: '420px',
      maxWidth: '95vw',
    });

    dialogRef.afterClosed().subscribe((result: DateRangeResult | null) => {
      if (!result) return;

      this.periodo = result;
      this.isLoading = true;
      this.hasData = false;

      this.chartBar?.destroy(); this.chartBar = null;
      this.chartPizza?.destroy(); this.chartPizza = null;

      let barData: number[] | null = null;
      let pizzaData: number[] | null = null;

      const tryRender = () => {
        if (barData === null || pizzaData === null) return;
        this.isLoading = false;
        this.processarDados(barData, pizzaData);
        this.hasData = true;
        setTimeout(() => {
          this.renderBarChart(barData!);
          this.renderDoughnutChart(pizzaData!);
        }, 0);
      };

      this.service.gerarGraficoTotalVendas(result.dataInicio, result.dataFim).subscribe({
        next: (data) => { barData = this.extractValues(data); tryRender(); },
        error: () => { this.isLoading = false; },
      });

      this.service.gerarGraficoPizza(result.dataInicio, result.dataFim).subscribe({
        next: (data) => { pizzaData = this.extractValues(data); tryRender(); },
        error: () => { this.isLoading = false; },
      });
    });
  }

  private extractValues(data: any): number[] {
    if (Array.isArray(data)) return data.map(Number);
    if (data && typeof data === 'object') {
      return [
        Number(data.dinheiro ?? data[0] ?? 0),
        Number(data.pix ?? data[1] ?? 0),
        Number(data.debito ?? data[2] ?? 0),
        Number(data.credito ?? data[3] ?? 0),
      ];
    }
    return [0, 0, 0, 0];
  }

  private processarDados(barData: number[], pizzaData: number[]) {
    this.totalVendido = barData.reduce((a, b) => a + b, 0);
    this.totalTransacoes = pizzaData.reduce((a, b) => a + b, 0);
    this.ticketMedio = this.totalTransacoes > 0 ? this.totalVendido / this.totalTransacoes : 0;

    const maxIdx = barData.indexOf(Math.max(...barData));
    this.metodoPrincipal = this.LABELS[maxIdx] ?? '—';

    this.pagamentos = this.LABELS.map((label, i) => ({
      label,
      valor: barData[i] ?? 0,
      quantidade: pizzaData[i] ?? 0,
      cor: this.CORES[i],
      icone: this.ICONES[i],
      percentual: this.totalVendido > 0 ? ((barData[i] ?? 0) / this.totalVendido) * 100 : 0,
    }));
  }

  private renderBarChart(data: number[]) {
    const ctx = this.graficoBar.nativeElement.getContext('2d')!;

    const gradients = this.CORES.map(cor => {
      const g = ctx.createLinearGradient(0, 0, 0, 300);
      g.addColorStop(0, cor);
      g.addColorStop(1, cor + '55');
      return g;
    });

    this.chartBar = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.LABELS,
        datasets: [{
          label: 'Valor Vendido',
          data,
          backgroundColor: gradients,
          borderColor: this.CORES,
          borderWidth: 0,
          borderRadius: 8,
          borderSkipped: false,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 700 },
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (item) => ` ${this.formatCurrency(item.parsed.y)}`,
            },
          },
        },
        scales: {
          x: {
            grid: { display: false },
            border: { display: false },
            ticks: { font: { size: 13, weight: 600 } },
          },
          y: {
            beginAtZero: true,
            grid: { color: 'rgba(0,0,0,0.05)' },
            border: { display: false },
            ticks: {
              callback: (val) => this.formatCurrencyCompact(Number(val)),
            },
          },
        },
      },
    });
  }

  private renderDoughnutChart(data: number[]) {
    const total = this.totalTransacoes;

    const centerLabelPlugin = {
      id: 'centerLabel',
      beforeDraw: (chart: Chart) => {
        const { ctx, chartArea } = chart;
        if (!chartArea) return;
        const cx = chartArea.left + chartArea.width / 2;
        const cy = chartArea.top + chartArea.height / 2;
        ctx.save();
        ctx.font = 'bold 26px sans-serif';
        ctx.fillStyle = '#1a1a1a';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(String(total), cx, cy - 12);
        ctx.font = '13px sans-serif';
        ctx.fillStyle = '#999';
        ctx.fillText('transações', cx, cy + 14);
        ctx.restore();
      },
    };

    const ctx = this.graficopizza.nativeElement.getContext('2d')!;
    this.chartPizza = new Chart(ctx, {
      type: 'doughnut',
      plugins: [centerLabelPlugin],
      data: {
        labels: this.LABELS,
        datasets: [{
          data,
          backgroundColor: this.CORES,
          borderColor: '#fff',
          borderWidth: 3,
          hoverOffset: 10,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '65%',
        animation: { duration: 700 },
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 14,
              usePointStyle: true,
              pointStyleWidth: 10,
              font: { size: 12 },
            },
          },
          tooltip: {
            callbacks: {
              label: (item: any) => {
                const pct = total > 0 ? ((item.parsed / total) * 100).toFixed(1) : '0.0';
                return ` ${item.label}: ${item.parsed} (${pct}%)`;
              },
            },
          },
        },
      } as any,
    });
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  }

  private formatCurrencyCompact(value: number): string {
    if (value >= 1000) return `R$${(value / 1000).toFixed(0)}k`;
    return `R$${value.toFixed(0)}`;
  }

  ngOnDestroy() {
    this.chartBar?.destroy();
    this.chartPizza?.destroy();
  }
}
