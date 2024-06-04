import { Component, OnInit, OnDestroy } from '@angular/core';
import { Chart, ChartType } from 'chart.js/auto';
import { WordService } from '../services/word.service';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit, OnDestroy {
  user: User | undefined;
  public chart: Chart | undefined;

  constructor(private wordService: WordService, private router: Router) { }

  ngOnInit(): void {
    const storedUserJSON = localStorage.getItem('user');
    this.user = JSON.parse(storedUserJSON? storedUserJSON : '{}') as User;

    this.wordService.getGuessStatistics(this.user.id).subscribe(data => {
      const labels = Object.keys(data);
      const values = Object.values(data);

      const chartData = {
        labels: labels.map(label => label.toString()), // Asegurarse de que las etiquetas son cadenas
        datasets: [{
          label: 'Estadísticas de Adivinanzas',
          data: values.map(value => Number(value)), // Asegurarse de que los valores son números
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
          ],
          borderWidth: 2
        }]
      };

      this.createChart(chartData);
    });
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  createChart(data: any): void {
    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart("pie-chart", {
      type: 'pie' as ChartType,
      data: data,
      options: {
        plugins: {
          legend: {
            display: true,
            position: 'top', // Posición de la leyenda en la parte inferior
            align: 'center', // Alineación horizontal de la leyenda
            labels: {
              boxWidth: 20, // Ancho del cuadro de color de la leyenda
              padding: 10, // Espaciado alrededor de los cuadros de leyenda
            }
          },
          title: {
            display: true,
            text: 'Palabras Adivinadas', // Título principal del gráfico
            font: {
              size: 20
            }
          }
        }
      }
    });
  }
}
