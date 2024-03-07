import { Component, ElementRef, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.scss'],
})
export class GraficosComponent {
  @ViewChild('grafico', { static: true }) graficoCanvas!: ElementRef;

  constructor() {}

  ngOnInit(): void {
    this.createChart();
  }

  createChart(): void {
    const ctx = this.graficoCanvas.nativeElement.getContext('2d');
    if (ctx) {
      new Chart(ctx, {
        type: 'bar',
        options: {
          indexAxis: 'y',
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
              backgroundColor: '#770d7c',
            },
          ],
        },
      });
    } else {
      console.error('Failed to get canvas context');
    }
  }
}
