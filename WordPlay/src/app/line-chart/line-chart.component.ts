import { Component, OnInit } from '@angular/core';
import { Chart, ChartType, registerables } from 'chart.js';
import { WordService } from '../services/word.service';
import { Guess } from '../interfaces/guess';  // Cambia `Attempt` a `Guess` si es necesario
import { Router } from '@angular/router';

// Registrar los componentes de Chart.js
Chart.register(...registerables);

@Component({
  selector: 'app-line-chart',
  standalone: true,
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  public chart: Chart | undefined;
  private userId: number = 2; // Cambia esto al ID del usuario que quieras usar

  constructor(private wordService: WordService, private router: Router) { }

  ngOnInit(): void {
    this.wordService.getSuccessfulGuessesByUserId(this.userId).subscribe((data: Guess[]) => {
      // Filtra las adivinanzas correctas
      const victoriesData = data.filter((guess: Guess) => guess.isGuessed);
      // Mapea los intentos y victorias
      const values = victoriesData.map((guess: Guess) => guess.nAttempt);

      const chartData = {
        labels: [1, 2, 3, 4, 5], // Números de intentos
        datasets: [{
          label: 'Victorias por Intento',
          data: values, // Número de victorias
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      };

      // Crear el gráfico
      this.chart = new Chart("line-chart", {
        type: 'line' as ChartType,
        data: chartData,
        options: {
          indexAxis: 'x',
          scales: {
            x: {
              beginAtZero: true
            },
            y: {
              type: 'linear',
              ticks: {
                stepSize: 1,
                precision: 0
              }
            }
          }
        },
      });
    });
  }
}
