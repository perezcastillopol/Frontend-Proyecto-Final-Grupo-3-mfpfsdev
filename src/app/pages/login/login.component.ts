import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  loginForm!: FormGroup;
  loading = false;
  errorMsg = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.errorMsg = 'Completa los campos correctamente.';
      return;
    }

    this.errorMsg = '';
    this.loading = true;

    const { email, password } = this.loginForm.value;

    try {
      await this.authService.login({ email, password });
      this.loading = false;
      this.router.navigate(['/explorar']);
    } catch (err: any) {
      console.error('Error en login:', err);

      if (err.status === 401) {
        this.errorMsg = 'Correo o contraseña incorrectos.';
      } else {
        this.errorMsg = 'No se ha podido iniciar sesión. Inténtalo más tarde.';
      }

      this.loading = false;
    }
  }
}