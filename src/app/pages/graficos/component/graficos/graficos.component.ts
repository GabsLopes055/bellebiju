import { Component, ElementRef, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.scss'],
})
export class GraficosComponent {
  @ViewChild('graficoBar', { static: true }) graficoBar!: ElementRef;
  @ViewChild('graficopizza', { static: true }) graficopizza!: ElementRef;

  labels: any[] = [];

  constructor() {}

  ngOnInit(): void {
    this.createChartBar();
    this.creatChartPizza();
    alert('PAGINA EM DESENVOLVIMENTO')
  }

  createChartBar(): void {

    const graficoBar = this.graficoBar.nativeElement.getContext('2d');

    var cores = [];

    for (var i = 0; i < 7; i++) {
        cores.push(this.gerar_cor_hexadecimal());
    }

    if (graficoBar) {
      new Chart(graficoBar, {
        type: 'bar',
        options: {
          indexAxis: 'x',
        },
        data: {
          labels: [
            'Segunda',
            'Terça',
            'Quarta',
            'Quinta',
            'Sexta',
            'Sábado',
            'Domingo',
          ],
          datasets: [
            {
              data: [65, 59, 80, 81, 56, 55, 40],
              backgroundColor: '#AAB7B8',
              borderWidth: 1,
            },
          ],
        },
      });
    } else {
      console.error('Failed to get canvas context');
    }
  }

  creatChartPizza() {
    const graficoPizza = this.graficopizza.nativeElement.getContext('2d');

    if (graficoPizza) {
      new Chart(graficoPizza, {
        type: 'doughnut',
        data: {
          labels: ['Dinheiro', 'Cartão de Crédito', 'Cartão de Débito', 'PIX'],
          datasets: [
            {
              data: [289, 211, 229, 172],
              backgroundColor: ['#AAB7B8', '#AAB7B8', '#AAB7B8', '#AAB7B8'],
              borderWidth: 4,
            },
          ],
        },
      });
    }
  }

  gerar_cor_hexadecimal(curto = false): any {

    const max_hex = curto ? 0xfff : 0xffffff;

    return (
      '#' +
      parseInt((Math.random() * max_hex).toString(), 16)
        .toString(16)
        .padStart(curto ? 3 : 6, '0')
    );
}
}
