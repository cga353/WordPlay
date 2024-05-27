import { Component, OnInit } from '@angular/core';
import { Chart, ChartType } from 'chart.js/auto';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.css'
})
export class PieChartComponent implements OnInit {

  // Atributo que almacena los datos del chart
  public chart: Chart | undefined;

  ngOnInit(): void {
    // datos
    const data = {
      labels: ['Adiviadas', 'No adivinadas'],
      datasets: [{
        label: 'Palabras',
        data: [300, 50],
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

    // Creamos la gráfica
    this.chart = new Chart("pie-chart", {
      type: 'pie' as ChartType, // tipo de la gráfica 
      data: data, // datos 
    });
  }

}
