import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email = ''; pass = '';
  constructor(private router: Router) {}
  login() {
    localStorage.setItem('username', this.email.split('@')[0] || 'u123'); // stub
    this.router.navigateByUrl('/mis-viajes');
  }
}