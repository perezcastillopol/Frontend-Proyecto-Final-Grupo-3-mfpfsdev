import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

// Cambiar cuando backend esté listo
  private readonly apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await lastValueFrom(
      this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, credentials)
    );
    // Guardar token en el navegador
    localStorage.setItem('token', response.token);
    return response;
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
