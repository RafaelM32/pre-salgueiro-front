import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LoginService, LoginRequest } from '../../services/loginService';

@Component({
  selector: 'app-feed-principal',
  imports: [FormsModule, RouterLink],
  templateUrl: './feed-principal.html',
  styleUrl: './feed-principal.css',
})
export class FeedPrincipal {


  teste = 'Rafael';
}
