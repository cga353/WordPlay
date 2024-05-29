import { Component, OnInit, OnDestroy } from '@angular/core';
import { Chart, ChartType } from 'chart.js/auto';
import { WordService } from '../services/word.service';
import { Attempt } from '../interfaces/attempt';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [],
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit, OnDestroy {

  public chart: Chart | undefined;
  private userId: number = 2; // Cambia esto al ID del usuario que quieras usar

  constructor(private wordService: WordService, private router: Router) { }

  ngOnInit(): void {
    this.wordService.getTop5WordsByUserId(this.userId).subscribe((attempts: Attempt[]) => {
      const wordIds = attempts.map((attempt: Attempt) => attempt.wordId);
      const data = attempts.map((attempt: Attempt) => attempt.nVeces);

      this.wordService.getWordsByIds(wordIds).subscribe((words: any[]) => {
        const labels = words.map((word: any) => word.name);

        this.createChart(labels, data);
      });
    });
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  createChart(labels: string[], data: number[]): void {
    if (this.chart) {
      this.chart.destroy();
    }

    const chartData = {
      labels: labels,
      datasets: [{
        axis: 'y',
        label: 'Veces Usadas',
        data: data,
        fill: false,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)'
        ],
        borderWidth: 1
      }]
    };

    this.chart = new Chart("bar-chart", {
      type: 'bar' as ChartType,
      data: chartData,
      options: {
        indexAxis: 'y',
        scales: {
          y: {
            beginAtZero: true
          },
          x: {
            type: 'linear',
            ticks: {
              stepSize: 1,
              precision: 0
            }
          }
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                var label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                label += context.formattedValue;
                return label;
              }
            }
          }
        }
      }
    });
  }
}
