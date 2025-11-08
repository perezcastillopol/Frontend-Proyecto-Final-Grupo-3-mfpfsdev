import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  template: `
    <h2>Entrar</h2>
    <form (ngSubmit)="login()">
      <input [(ngModel)]="email" name="email" placeholder="Email">
      <input [(ngModel)]="pass"  name="pass"  placeholder="Password" type="password">
      <button>Acceder</button>
    </form>
  `
})
export class LoginComponent {
  email = ''; pass = '';
  constructor(private router: Router) {}
  login() {
    localStorage.setItem('username', this.email.split('@')[0] || 'u123'); // stub
    this.router.navigateByUrl('/mis-viajes');
  }
}