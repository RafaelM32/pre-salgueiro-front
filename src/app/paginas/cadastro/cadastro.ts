import { Component, NgZone, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css',
})
export class Cadastro {
  foto: string | ArrayBuffer | null = null;
  email = '';
  confirmarEmail = '';
  senha = '';
  confirmarSenha = '';
  dataNascimento = '';
  cpf = '';
  faculdade = '';

  // Mensagens de erro
  erroEmail = '';
  erroSenha = '';

  constructor(
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef
  ) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.ngZone.run(() => {
          this.foto = null; // Reset primeiro
          this.cdr.detectChanges(); // Força detecção de mudanças
          this.foto = reader.result; // Depois atribui o novo valor
          this.cdr.detectChanges(); // Força novamente
          input.value = '';
        });
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    // Limpa erros anteriores
    this.erroEmail = '';
    this.erroSenha = '';

    // Validação de e-mails
    if (this.email !== this.confirmarEmail) {
      this.erroEmail = 'Os e-mails não coincidem';
    }

    // Validação de senhas
    if (this.senha !== this.confirmarSenha) {
      this.erroSenha = 'As senhas não coincidem';
    }

    // Se não houver erros, prossegue com o cadastro
    if (!this.erroEmail && !this.erroSenha) {
      console.log('Cadastro attempt:', {
        foto: this.foto,
        email: this.email,
        confirmarEmail: this.confirmarEmail,
        senha: this.senha,
        confirmarSenha: this.confirmarSenha,
        dataNascimento: this.dataNascimento,
        cpf: this.cpf,
        faculdade: this.faculdade
      });
    }
  }
}
