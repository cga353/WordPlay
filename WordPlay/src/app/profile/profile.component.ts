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
  editedUser: User = { id: 0, name: '', email: '', userName: '', password: '', thumbnail: ''};
  editedPassword: boolean = false;
  newPassword: string ="";
  confirmPassword: string ="";
  noData: boolean = false;
  
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    const storedUserJSON = localStorage.getItem('user');
    this.user = JSON.parse(storedUserJSON? storedUserJSON : '{}') as User;

    this.userService.getUserById(this.user.id).subscribe((data: User) => {
      this.user = data;
      this.editedUser = { ...data }; // Inicializa editedUser con una copia de los datos del usuario
    });
  }

  handleNoData(event: boolean): void {
    this.noData = event;
  }

  enableEditMode(): void {
    this.editMode = !this.editMode;
  }

  enableEditPassword(): void {
    this.editedPassword = !this.editedPassword;
  }

  saveChanges(): void {
    if (this.editedUser && this.user) {
      this.userService.updateUser(this.user.id, this.editedUser).subscribe((updatedUser: User) => {
        localStorage.setItem('user', JSON.stringify(updatedUser));
        this.user = updatedUser;
        this.editMode = false;
      });
    }
  }

  changePassword(){

    if(this.newPassword === this.confirmPassword){
      if(this.user){
        this.user.password = this.newPassword;
        console.log('User:', this.user);
        this.userService.updateUser(this.user.id, this.user).subscribe((updatedUser: User) => {
          this.user = updatedUser;
          this.editedPassword = false;
        });
      }
    }
  }

  logOut(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  navigateToWordList(source: string): void {
    this.router.navigate(['/word-list'], { queryParams: { source } });
  }
}
