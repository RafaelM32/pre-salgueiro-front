import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';


export interface LoginRequest {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private http = inject(HttpClient);
  private API_URL = environment.API_URL + '/api';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(
      this.checkAuthStatus()
    );
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor() {
    // Verifica se há token armazenado ao inicializar
    this.isAuthenticatedSubject.next(this.checkAuthStatus());
  }


  /**
   * Verifica o status de autenticação no localStorage
   */
  private checkAuthStatus(): boolean {
    return !!localStorage.getItem('authToken');
  }

  /**
   * Verifica se o usuário está autenticado
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }



  login(credentials: LoginRequest): Observable<any> {
    const body = new HttpParams()
      .set('username', credentials.username)
      .set('password', credentials.password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post(`${this.API_URL}/auth/login`, body.toString(), {
      headers,
      responseType: 'text',
      observe: 'response'
    });
  }

  /**
   * Armazena o token após login bem-sucedido
   */
  setAuthToken(token: string): void {
    localStorage.setItem('authToken', token);
    this.isAuthenticatedSubject.next(true);
  }

  /**
   * Obtém o token armazenado
   */
  getAuthToken(): string | null {
    return localStorage.getItem('authToken');
  }

    /**
   * Realiza logout e limpa o token
   */
  logout(): void {
    localStorage.removeItem('authToken');
    this.isAuthenticatedSubject.next(false);
  }
}