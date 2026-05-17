import { Component, NgZone, ChangeDetectorRef, ViewChild, ElementRef, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CadastroService, TipoUsuario, CadastroRequest } from '../../services/cadastroService';
import { OnInit } from '@angular/core';


@Component({
  selector: 'app-cadastro',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css',
})
export class Cadastro  implements OnInit {
  foto: string | ArrayBuffer | null = null;
  email = '';
  confirmarEmail = '';
  senha = '';
  confirmarSenha = '';
  dataNascimento = '';
  cpf = '';
  tipoUsuario = '';
  telefone = '';
  rawTelefone = '';
  nome = '';
  mensagemErro = '';

  @ViewChild('telefoneInput') telefoneInput!: ElementRef<HTMLInputElement>;
  @ViewChild('erroMassage') erroMassage!: ElementRef<HTMLDivElement>;

  // Mensagens de erro
  erroEmail = '';
  erroSenha = '';


  tiposUsuario: TipoUsuario[] = [];

  
  constructor(
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    private cadastroService: CadastroService

  ) {}


  ngOnInit() {
    this.cadastroService.tiposUsuario().subscribe({
      next: (tipos) => {
        this.tiposUsuario = tipos;
        this.cdr.detectChanges(); // Atualiza a view com os tipos de usuário
      },
      error: (err) => {
        console.error('Erro ao carregar tipos de usuário:', err);
      }
    });
  }



  onKeyPressTelefone(event: KeyboardEvent) {
    const char = String.fromCharCode(event.which ? event.which : event.keyCode);
    if (!/[0-9]/.test(char)) {
      event.preventDefault();
    }
  }

  formatTelefone(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, ''); // Only digits
    this.rawTelefone = value;

    if (value.length > 11) {
      value = value.substring(0, 11);
    }

    let formatted = '';
    if (value.length >= 2) {
      formatted = `(${value.substring(0, 2)}`;
    }
    if (value.length > 2) {
      formatted += `) ${value.substring(2, 7)}`;
    }
    if (value.length > 7) {
      formatted += `-${value.substring(7, 11)}`;
    }

    // Set formatted value
    this.telefone = formatted;

    // Cursor position
    const cursorPos = Math.min(formatted.length, input.selectionStart || 0) + (formatted.length - value.length);
    setTimeout(() => {
      input.setSelectionRange(cursorPos, cursorPos);
    }, 0);
  }

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

  mostarErro(mensagem: string) {
    this.mensagemErro = mensagem;
    this.cdr.detectChanges();
    this.erroMassage.nativeElement.style.display = 'block';
    setTimeout(() => {
      this.erroMassage.nativeElement.style.display = 'none';
    }, 3000);
  }

  onSubmit() {

    // Limpa erros anteriores
    this.erroEmail = '';
    this.erroSenha = '';

    // Validação de e-mails
    if (this.email !== this.confirmarEmail) {
      this.erroEmail = 'Os e-mails não coincidem';
      return;
    }

    // Validação de senhas
    if (this.senha !== this.confirmarSenha) {
      this.erroSenha = 'As senhas não coincidem';
      return;
    }

    // Se não houver erros, prossegue com o cadastro
      const cadastroRequest: CadastroRequest = {
        email: this.email,
        senha: this.senha,
        dataNascimento: new Date(this.dataNascimento),
        cpf: this.cpf,
        tipoUsuario: this.tipoUsuario,
        fotoBase64: typeof this.foto === 'string' ? this.foto : '',
        telefone: this.rawTelefone,
        nome: this.nome
      };

    this.cadastroService.cadastrar(cadastroRequest).subscribe({
      next: (response) => {
        console.log('Cadastro successful:', response);
      },
      error: (error) => {
        if(error.status === 409 ){
          this.mostarErro('CPF ou e-mail já cadastrado. Por favor, verifique seus dados.');
        }else{
          this.mostarErro('Falha no cadastro. Por favor, tente novamente.');

        }
        console.error('Cadastro failed:');
      }
    });
  }

  formatarCpf(event: any): void {
  let valor = event.target.value;

  // Remove tudo que não for número
  valor = valor.replace(/\D/g, '');

  // Limita a 11 números
  valor = valor.substring(0, 11);

  // Coloca os pontos e traço
  valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
  valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
  valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

  this.cpf = valor;
}
}
