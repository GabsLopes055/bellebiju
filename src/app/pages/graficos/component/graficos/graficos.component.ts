import { format } from 'date-fns';
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

  gerarGraficoPizza: any;
  gerarGraficoTotalVendas: any;
  chartBar: any;
  chartPizza: any;
  isLoading: boolean = false;
  isCard: boolean = false;
  imagem: boolean = true;
  valoresGraficoBarras: number[] = [];
  valoresGraficoPizza: number[] = [];

  constructor(
    private service: GraficosServiceService,
    private dialog: MatDialog
  ) {
    this.criarGraficoAoAbrirPagina();
    console.log(this.valoresGraficoBarras);
    this.pesquisarPorData(true);
  }

  pesquisarPorData(chamarFuncao: boolean) {
    if (chamarFuncao == false) {
      const dialogRef = this.dialog.open(ModelPesquisarPorDataComponent, {
        width: '40%',
        height: 'auto',
      });
      dialogRef.afterClosed().subscribe((response) => {
        if (response) {
          this.isLoading = true;

          // Recriar o gráfico de pizza com os novos dados
          if (this.chartPizza && this.chartBar) {
            this.chartPizza.destroy();
            this.chartBar.destroy();
          }

          setTimeout(() => {
            this.valoresGraficoBarras =
              this.service.getDadosGraficosTotalVendas();
            this.valoresGraficoPizza = this.service.getDadosGraficosPizza();
            this.createChartPizza(this.service.getDadosGraficosPizza());
            this.createChartBar(this.service.getDadosGraficosTotalVendas());
            this.imagem = false;
          }, 2000);
        }
      });
    } else {
      alert;
      setTimeout(() => {
        this.valoresGraficoBarras = this.service.getDadosGraficosTotalVendas();
        this.valoresGraficoPizza = this.service.getDadosGraficosPizza();
        this.createChartPizza(this.service.getDadosGraficosPizza());
        this.createChartBar(this.service.getDadosGraficosTotalVendas());
        this.imagem = false;
      }, 2000);
    }
  }

  criarGraficoAoAbrirPagina() {
    let dataInicio = format(new Date(), 'yyyy-MM-dd');
    let dataFim = format(new Date(), 'yyyy-MM-dd');

    this.service
      .gerarGraficoPizza(dataInicio, dataFim)
      .subscribe((response) => {
        this.service.setDadosGraficoPizza(response);
      });

    this.service
      .gerarGraficoTotalVendas(dataInicio, dataFim)
      .subscribe((response) => {
        this.service.setDadosGraficoTotalVendas(response);
      });
  }

  createChartBar(data: any): void {
    this.isLoading = false;

    this.isCard = true;

    this.gerarGraficoTotalVendas =
      this.graficoBar.nativeElement.getContext('2d');

    this.chartBar = new Chart(this.gerarGraficoTotalVendas, {
      type: 'bar',
      data: {
        labels: ['Dinheiro', 'PIX', 'Débito', 'Crédito'],
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
        labels: ['Dinheiro', 'PIX', 'Débito', 'Crédito'],
        datasets: [
          {
            data: [data[0], data[1], data[2], data[3]],
            backgroundColor: ['#138182', '#770d7c', '#7f5410', '#822b0e'],
          },
        ],
      },
    });
  }
}
