import { Routes } from '@angular/router';
import { Login } from './paginas/login/login';
import { Cadastro } from './paginas/cadastro/cadastro';
import { EsqueceuSenha } from './paginas/esqueceu-senha/esqueceu-senha';
import { FeedPrincipal } from './paginas/feed-principal/feed-principal';
import { authGuard } from './guards/authGuard';

export const routes: Routes = [
  {
    path: '',
    component: Login
  },
  {
    path: 'cadastro',
    component: Cadastro
  },
  {
    path: 'esqueceu-senha',
    component: EsqueceuSenha
  },
  {
    path: 'feed-principal',
    component: FeedPrincipal,
    canActivate: [authGuard]
  }
];
