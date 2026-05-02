import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LoginService, LoginRequest } from '../../services/loginService';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  constructor(private loginService: LoginService) {}

  email = '';
  senha = '';

  onSubmit() {
    const credentials: LoginRequest = {
      username: this.email,
      password: this.senha 
    };
     this.loginService.login(credentials).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        console.log('Status:', response.status);
        console.log('Body:', response.body);
      },
      error: (error) => {
        console.error('Login failed:', error);
      }
     });
  }
}
