import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  password: string = "";
  userName: string = "";
  isFormValid: boolean = false;
  showPassword: boolean = false;

  constructor(private userService: UserService, private router: Router, private toastr: ToastrService) {
  }

  ngOnInit() {
    this.isFormValid = this.checkFormValidity();
  }

  checkFormValidity(): boolean {
    return !!this.userName && !!this.password;
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  login() {
    if (!this.checkFormValidity()) {
      console.error('Username and password are required');
      return;
    }

    this.userService.validateUser(this.userName, this.password)
      .subscribe(
        user => {
          if(user === null){
            this.toastr.error('Las credenciales no coinciden', 'Error de inicio de sesión', {
              positionClass: 'toast-bottom-right'
            });
            console.error('Error:', 'Las credenciales no coinciden'); //TODO arreglar esto
            return;
          }

          localStorage.setItem('user', JSON.stringify(user));
          this.router.navigate(['/home']);
        },
        error => {
          console.error('Error:', error);
          this.toastr.error('Las credenciales no coinciden', 'Error de inicio de sesión', {
            positionClass: 'toast-bottom-right'
          });
        }
      );
  }



}
