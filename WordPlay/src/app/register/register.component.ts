import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  name: string | undefined;
  userName: string | undefined;
  email: string | undefined;
  password: string | undefined;
  confirmPassword: string | undefined;

  constructor(private userService: UserService, private router: Router) {}

  register() {
    if (this.password !== this.confirmPassword) {
      // this.toastr.error('Passwords do not match!', 'Error');
      return;
    }

    const user = {
      name: this.name,
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
        console.error('Error registering user', error);
      }
    );
  }
}
