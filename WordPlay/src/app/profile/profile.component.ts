import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { BarChartComponent } from '../bar-chart/bar-chart.component';
import { PieChartComponent } from '../pie-chart/pie-chart.component';
import { LineChartComponent } from '../line-chart/line-chart.component';
import { UserService } from '../services/user.service';
import { User } from '../interfaces/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, NavBarComponent, BarChartComponent, PieChartComponent, LineChartComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User | undefined;
  editMode: boolean = false;
  editedUser: User | undefined;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    const userId = 2; // Cambia esto al ID del usuario que quieras usar
    this.userService.getUserById(userId).subscribe((data: User) => {
      this.user = data;
      this.editedUser = { ...data }; // Inicializa editedUser con una copia de los datos del usuario
    });
  }

  enableEditMode(): void {
    this.editMode = true;
  }

  saveChanges(): void {
    if (this.editedUser && this.user) {
      this.userService.updateUser(this.user.id, this.editedUser).subscribe((updatedUser: User) => {
        this.user = updatedUser;
        this.editMode = false;
      });
    }
  }

  navigateToWordList(source: string): void {
    this.router.navigate(['/word-list'], { queryParams: { source } });
  }
}
