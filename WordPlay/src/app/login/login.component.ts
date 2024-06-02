import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  email: string = "";
  password: string = "";
  userName: string = "";
  isFormValid: boolean = false;

  constructor(private userService: UserService, private router: Router, private toastr: ToastrService) {
  }

  ngOnInit() {
    this.isFormValid = this.checkFormValidity();
  }

  checkFormValidity(): boolean {
    return !!this.userName && !!this.password;
  }

  login() {
    if (!this.checkFormValidity()) {
      console.error('Username and password are required');
      return;
    }

    this.userService.validateUser(this.userName, this.password)
      .subscribe(
        user => {
          console.log('User:', user);
          // Redirigir a la página principal u otra página deseada
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
