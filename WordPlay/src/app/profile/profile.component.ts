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
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, NavBarComponent, BarChartComponent, PieChartComponent, LineChartComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User = { id: 0, email: '', userName: '', password: '' };
  editMode: boolean = false;
  editedUser: User = { id: 0, email: '', userName: '', password: '' };
  editedPassword: boolean = false;
  newPassword: string = "";
  confirmPassword: string = "";
  noData: boolean = false;
  isFormValidUser: boolean = true;
  isFormValidPass: boolean = false;
  showPassword1: boolean = false;
  showPassword2: boolean = false;
  showPassword3: boolean = false;

  constructor(private userService: UserService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    // Obtener información del usuario del localStorage
    const storedUserJSON = localStorage.getItem('user');
    this.user = JSON.parse(storedUserJSON ? storedUserJSON : '{}') as User;
    this.editedUser = this.user;
  }

  checkFormValidityPass(): void {
    this.isFormValidPass = !!this.newPassword && !!this.editedUser.password && !!this.confirmPassword;
  }

  checkFormValidityUser(): void {
    this.isFormValidUser = !!this.editedUser.userName.trim() && !!this.editedUser.email.trim();
  }

  handleNoData(event: boolean): void {
    this.noData = event;
  }

  enableEditMode(): void {
    this.editMode = !this.editMode;
    if (this.editMode) {
      this.checkFormValidityUser();
    }
  }

  enableEditPassword(): void {
    this.editedPassword = !this.editedPassword;
  }

  togglePasswordVisibility1() {
    this.showPassword1 = !this.showPassword1;
  }

  togglePasswordVisibility2() {
    this.showPassword2 = !this.showPassword2;
  }

  togglePasswordVisibility3() {
    this.showPassword3 = !this.showPassword3;
  }

  saveChanges(): void {
    if (!this.isFormValidUser) {
      return;
    }

    if (this.editedUser && this.user) {
      this.userService.updateUser(this.user.id, this.editedUser).subscribe(
        (updatedUser: User) => {
          localStorage.setItem('user', JSON.stringify(updatedUser));
          this.user = updatedUser;
          this.editMode = false;
        },
        (error: any) => {
          if (error.status === 400) {
            if (error.error === "Username already exists") {
              this.toastr.error("Nombre de usuario en uso", '', {
                positionClass: 'toast-bottom-left',
                timeOut: 2000
              });
            } else if (error.error === "Email already exists") {
              this.toastr.error("Correo electrónico en uso", '', {
                positionClass: 'toast-bottom-left',
                timeOut: 2000
              });
            } else {
              this.toastr.error("Actualización erroónea", '', {
                positionClass: 'toast-bottom-left',
                timeOut: 2000
              });
            }
          }
        }
      );
    }
  }

  showErrorNotification(message: string) {
    // Limpiar cualquier notificación activa
    this.toastr.clear();

    // Mostrar una nueva notificación de error
    this.toastr.error(message, '', {
      positionClass: 'toast-top-left',
      timeOut: 2000
    });
  }

  showSuccessNotification(message: string) {
    // Limpiar cualquier notificación activa
    this.toastr.clear();

    // Mostrar una nueva notificación de éxito
    this.toastr.success(message, '', {
      positionClass: 'toast-bottom-center',
      timeOut: 2000
    });
  }

  changePassword() {
    if (!this.isFormValidPass) {
      return;
    }

    if (this.editedUser.password !== this.user.password) {
      this.showErrorNotification('La contraseña actual no coincide');
      return;
    }

    if (this.newPassword === this.editedUser.password) {
      this.showErrorNotification('La nueva contraseña no puede ser igual a la anterior');
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.showErrorNotification('Las nuevas contraseñas no coinciden');
      return;
    }

    this.user.password = this.newPassword;
    this.userService.updateUser(this.user.id, this.user).subscribe((updatedUser: User) => {
      this.user = updatedUser;
      this.editedPassword = false;
      this.showSuccessNotification('Contraseña actualizada correctamente');
    });
  }

  logOut(): void {
    this.toastr.success('Sesión cerrada', '', {
      positionClass: 'toast-bottom-left',
      timeOut: 2000 // 2 segundos
    });

    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  navigateToWordList(source: string): void {
    this.router.navigate(['/word-list'], { queryParams: { source } });
  }
}
