import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  userName: string = "";
  email: string = "";
  password: string = "";
  confirmPassword: string = "";
  isFormValid: boolean = false;

  constructor(private userService: UserService, private router: Router, private toastr: ToastrService) {}

  ngOnInit() {
    this.isFormValid = this.checkFormValidity();
  }

  checkFormValidity(): boolean {
    const isFilled = !!this.userName && !!this.email && !!this.password && !!this.confirmPassword;
    const passwordsMatch = this.password === this.confirmPassword;

    if (!passwordsMatch) {
      console.error('Username and password are required');
      this.toastr.error('Las contraseñas no coinciden', 'Error de registro', {
        positionClass: 'toast-bottom-right'
      });
    }

    this.isFormValid = isFilled && passwordsMatch;
    return this.isFormValid;
  }
  
  
  register() {
    if (!this.checkFormValidity()) {
      console.error('Username and password are required');
      return;
    }

    const user = {
      name: "",
      userName: this.userName, // Ensure consistent naming
      email: this.email,
      password: this.password
    };

    this.userService.register(user).subscribe(
      (data) => {
        // this.toastr.success('User registered successfully', 'Success');
        console.log('User registered successfully', data);
        this.router.navigate(['/login']); 
      },
      (error) => {
        // this.toastr.error('Error registering user', 'Error');
        this.toastr.error('Las credenciales no coinciden', 'Error de inicio de sesión', {
          positionClass: 'toast-bottom-right'
        });
        console.error('Error registering user', error);
      }
    );
  }
}
