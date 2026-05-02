import {Injectable, inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';



export interface CadastroRequest {
  email: string;
  senha: string;
  dataNascimento: Date;
  cpf: string;
  tipoUsuario: string;
  fotoBase64: string;
  telefone: string;
  nome: string; 
}

export interface TipoUsuario {
  id: number;
  nome: string;
}

@Injectable({
  providedIn: 'root'
})
export class CadastroService {
  private http= inject(HttpClient);
  private API_URL = environment.API_URL + '/api';

  tiposUsuario(): Observable<TipoUsuario[]> {
    return this.http.get<TipoUsuario[]>(`${this.API_URL}/usuarios/tipos`);
  }

  cadastrar(request: CadastroRequest): Observable<boolean> {
    const formData = new FormData();
    formData.append('email', request.email);
    formData.append('senha', request.senha);
    formData.append('dataNascimento', request.dataNascimento.toISOString());
    formData.append('cpf', request.cpf);
    formData.append('tipoUsuario', request.tipoUsuario);
    formData.append('fotoBase64', request.fotoBase64);
    formData.append('telefone', request.telefone);
    formData.append('nome', request.nome);
    return this.http.post<boolean>(`${this.API_URL}/cadastro`, formData);
  }
}