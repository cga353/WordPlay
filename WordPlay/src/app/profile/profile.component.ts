import { Component } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { BarChartComponent } from '../bar-chart/bar-chart.component';
import { PieChartComponent } from '../pie-chart/pie-chart.component';
import { LineChartComponent } from '../line-chart/line-chart.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NavBarComponent, BarChartComponent, PieChartComponent, LineChartComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

}
