import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="header">
      <div class="brand" routerLink="/">ViajaJuntos</div>
      <nav>
        <a routerLink="/"            routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">Inicio</a>
        <a routerLink="/explorar"    routerLinkActive="active">Explorar</a>
        <a routerLink="/mis-viajes"  routerLinkActive="active">Mis viajes</a>
        <a routerLink="/crear"       routerLinkActive="active">Crear viaje</a>
        <a routerLink="/login"       routerLinkActive="active">Login</a>
      </nav>
    </header>
  `,
  styles: [`
    .header{display:flex;align-items:center;justify-content:space-between;padding:12px 20px;border-bottom:1px solid #eee}
    .brand{font-weight:700;cursor:pointer}
    nav a{margin-left:16px;text-decoration:none}
    .active{text-decoration:underline}
  `]
})
export class HeaderComponent {}