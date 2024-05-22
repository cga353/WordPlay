import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  email: string | undefined;
  password: string | undefined;
  confirmPassword: string | undefined;

  constructor() {}

  register() {
    console.log(this.email);
    console.log(this.password);
  }
}
