import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string | undefined;
  password: string | undefined;
  userName: string | undefined;

  constructor(private userService: UserService, private router: Router) { 
    console.log('LoginComponent constructor');
  }

  login() {
    if (!this.userName || !this.password) {
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
          // Manejar el error aquí, por ejemplo, mostrar un mensaje de error al usuario
        }
      );
  }


}
