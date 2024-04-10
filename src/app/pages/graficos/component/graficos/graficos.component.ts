// import { ModelPesquisarPorDataComponent } from 'src/app/pages/vendas/component/model-pesquisar-por-data/model-pesquisar-por-data.component';
import { Component, ElementRef, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
// import { GraficosServiceService } from '../../service/graficos-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ModelPesquisarPorDataComponent } from 'src/app/pages/vendas/component/model-pesquisar-por-data/model-pesquisar-por-data.component';
import { GraficosServiceService } from '../../service/graficos-service.service';

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.scss'],
})
export class GraficosComponent {
  @ViewChild('graficoBar', { static: true }) graficoBar!: ElementRef;
  @ViewChild('graficopizza', { static: true }) graficopizza!: ElementRef;

  labels: any[] = [];
  gerarGraficoPizza: any;
  gerarGraficoTotalVendas: any;
  chartBar: any;
  chartPizza: any;
  loadGrafico: boolean = false;

  constructor(
    private service: GraficosServiceService,
    private dialog: MatDialog
  ) {}

  pesquisarPorData() {
    this.dialog
      .open(ModelPesquisarPorDataComponent, {
        width: '40%',
        height: 'auto',
      })
      .afterClosed()
      .subscribe(() => {

        this.loadGrafico = true

        // Recriar o gráfico de pizza com os novos dados
        if (this.chartPizza && this.chartBar) {
          this.chartPizza.destroy();
          this.chartBar.destroy();
        }

        setTimeout(() => {
          this.loadGrafico = false;
          this.createChartPizza(this.service.getDadosGraficosPizza());
          this.createChartBar(this.service.getDadosGraficosTotalVendas());
        }, 2000);


      });
  }

  createChartBar(data: any): void {

    this.gerarGraficoTotalVendas =
      this.graficoBar.nativeElement.getContext('2d');

    this.chartBar = new Chart(this.gerarGraficoTotalVendas, {
      type: 'bar',
      data: {
        labels: [
          'Dinheiro: ' + data[0],
          'PIX: ' + data[1],
          'Cartão de Débito: ' + data[2],
          'Cartão de Crédito: ' + data[3],
        ],
        datasets: [
          {
            label: 'Valor Vendido',
            data: [data[0], data[1], data[2], data[3]],
            backgroundColor: ['#138182', '#770d7c', '#7f5410', '#822b0e'],
          },
        ],
      },
    });
  }

  createChartPizza(data: any) {

    this.gerarGraficoPizza = this.graficopizza.nativeElement.getContext('2d');

    this.chartPizza = new Chart(this.gerarGraficoPizza, {
      type: 'doughnut',
      data: {
        labels: ['Dinheiro', 'PIX', 'Cartão de Débito', 'Cartão de Crédito'],
        datasets: [
          {
            data: [data[0], data[1], data[2], data[3]],
            backgroundColor: ['#138182', '#770d7c', '#7f5410', '#822b0e'],
          },
        ],
      },
    });
  }

  gerar_cor_hexadecimal(curto = false): any {
    // const graficoBar = this.graficoBar.nativeElement.getContext('2d');

    var cores = [];

    for (var i = 0; i < 7; i++) {
      cores.push(this.gerar_cor_hexadecimal());
    }

    const max_hex = curto ? 0xfff : 0xffffff;

    return (
      '#' +
      parseInt((Math.random() * max_hex).toString(), 16)
        .toString(16)
        .padStart(curto ? 3 : 6, '0')
    );
  }
}
