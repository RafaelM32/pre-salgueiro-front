import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/loginService';
import { LoginRequest } from '../../interfaces/loginRequest';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})


export class Login {

  private loginService = inject(LoginService);
  private router = inject(Router);

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
        
        // Armazena o token após login bem-sucedido
        if (response.status === 200 && response.body) {
          this.loginService.setAuthToken(response.body);
          // Redireciona para feed-principal após login bem-sucedido
          this.router.navigate(['/feed-principal']);
        }
      },
      error: (error) => {
        console.error('Login failed:', error);
      }
     });
  }


}
