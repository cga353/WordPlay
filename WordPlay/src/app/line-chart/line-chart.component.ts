import { Component, OnInit } from '@angular/core';
import { Chart, ChartType, registerables } from 'chart.js';
import { WordService } from '../services/word.service';
import { Guess } from '../interfaces/guess';  // Cambia `Attempt` a `Guess` si es necesario
import { Router } from '@angular/router';
import { User } from '../interfaces/user';

// Registrar los componentes de Chart.js
Chart.register(...registerables);

@Component({
  selector: 'app-line-chart',
  standalone: true,
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {
  user: User | undefined;

  public chart: Chart | undefined;

  constructor(private wordService: WordService, private router: Router) { }

  ngOnInit(): void {
    const storedUserJSON = localStorage.getItem('user');
    this.user = JSON.parse(storedUserJSON? storedUserJSON : '{}') as User;

    this.wordService.getSuccessfulGuessesByUserId(this.user.id).subscribe((data: Guess[]) => {
      // Filtra las adivinanzas correctas
      const victoriesData = data.filter((guess: Guess) => guess.isGuessed);
      // Mapea los intentos y victorias
      const values = victoriesData.map((guess: Guess) => guess.nAttempt);

      const chartData = {
        labels: [1, 2, 3, 4, 5, 6], // Números de intentos
        datasets: [{
          label: 'Victorias por Intento',
          data: values, // Número de victorias
          fill: false,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgb(75, 192, 192)',
          borderWidth: 1
        }]
      };

      // Crear el gráfico
      this.chart = new Chart("line-chart", {
        type: 'bar' as ChartType, // Cambia 'line' a 'bar'
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
          },
          plugins: {
            title: {
              display: true,
              text: 'Victorias por Intento',
              font: {
                size: 20
              }
            },
          }
        },
      });
    });
  }
}
