import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-esqueceu-senha',
  imports: [FormsModule, RouterLink],
  templateUrl: './esqueceu-senha.html',
  styleUrl: './esqueceu-senha.css',
})
export class EsqueceuSenha {
  email = '';
  erro = '';
  sucesso = '';

  onSubmit() {
    // Limpa mensagens anteriores
    this.erro = '';
    this.sucesso = '';

    if (!this.email) {
      this.erro = 'Por favor, informe seu e-mail';
      return;
    }

    // Simulação de envio
    console.log('Recuperação de senha para:', this.email);
    this.sucesso = 'E-mail de recuperação enviado com sucesso!';
  }
}
