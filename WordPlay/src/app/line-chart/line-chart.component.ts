import { Component, OnInit } from '@angular/core';
import { Chart, ChartType } from 'chart.js/auto';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.css'
})
export class LineChartComponent implements OnInit{

  public chart: Chart | undefined;

  ngOnInit(): void {
    // datos
    const data = {
      labels: [1, 2, 3, 4, 5],
      datasets: [{
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    };
    // Creamos la gráfica
    this.chart = new Chart("line-chart", {
      type: 'line' as ChartType, // tipo de la gráfica 
      data: data // datos 
    });
  }

}
