import { Component, OnInit, OnDestroy } from '@angular/core';
import { Chart, ChartType } from 'chart.js/auto';
import { WordService } from '../services/word.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [],
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit, OnDestroy {

  public chart: Chart | undefined;
  private userId: number = 2; // Cambia esto al ID del usuario que quieras usar

  constructor(private wordService: WordService, private router: Router) { }

  ngOnInit(): void {
    this.wordService.getGuessStatistics(this.userId).subscribe(data => {
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
    });
  }
}
