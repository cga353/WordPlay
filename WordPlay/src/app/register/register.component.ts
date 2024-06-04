import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterModule, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent  {
  userName: string = "";
  email: string = "";
  password: string = "";
  confirmPassword: string = "";
  isFormValid: boolean = false;
  showPassword1: boolean = false;
  showPassword2: boolean = false;
  botonPulsado: boolean = false;

  constructor(private userService: UserService, private router: Router, private toastr: ToastrService) { }

  checkFormValidity(): boolean {
    const isFilled = !!this.userName && !!this.email && !!this.password && !!this.confirmPassword;

    return isFilled;
  }

  pulsarBoton() {
    this.botonPulsado = true;
  }

  togglePasswordVisibility1() {
    this.showPassword1 = !this.showPassword1;
  }
  togglePasswordVisibility2() {
    this.showPassword2 = !this.showPassword2;
  }

  register() {
    if (!this.checkFormValidity()) {
      return;
    }

    const passwordsMatch = this.password === this.confirmPassword;
    if (!passwordsMatch) {
      console.error('Las contraseñas no coinciden');
      this.toastr.error('Las contraseñas no coinciden', '', {
        positionClass: 'toast-bottom-left',
        timeOut: 3000
      });
      return
    }

    const user = {
      userName: this.userName,
      email: this.email,
      password: this.password
    };

    this.userService.register(user).subscribe(
      (data) => {
        this.toastr.success('Registro exitoso', '', {
          positionClass: 'toast-bottom-left',
          timeOut: 1000
        });
        this.router.navigate(['/login']);
      },
      (error) => {
        if (error.status === 409) {
          if (error.error === "UserName already exists") {
            this.toastr.error('Nombre de usuario en uso', '', {
              positionClass: 'toast-bottom-left',
              timeOut: 3000
            });
          } else if (error.error === "Email already exists") {
            this.toastr.error('Correo electrónico en uso', '', {
              positionClass: 'toast-bottom-left',
              timeOut: 3000
            });
          } else {
            this.toastr.error('Compruebe formato del email', '', {
              positionClass: 'toast-bottom-left',
              timeOut: 3000
            });
          }
        } else {
          this.toastr.error('Compruebe formato del email', '', {
            positionClass: 'toast-bottom-left',
            timeOut: 3000
          });
        }
        console.error('Error al registrar', error);
      }
    );
  }
}