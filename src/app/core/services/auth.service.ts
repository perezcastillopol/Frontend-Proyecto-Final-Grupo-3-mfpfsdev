import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user?: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Cambiar cuando backend esté listo
  private readonly apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  /**
   * Realiza login contra el backend y guarda el token en localStorage
   */
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await lastValueFrom(
      this.http.post<LoginResponse>(`${this.apiUrl}/users/login`, credentials)
    );
    localStorage.setItem('token', response.token);
    return response;
  }

  /**
   * Elimina el token y cierra sesión
   */
  logout() {
    localStorage.removeItem('token');
  }

  /**
   * Comprueba si hay token guardado
   */
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  /**
   * Devuelve el token guardado
   */
  getToken(): string | null {
  return localStorage.getItem('token');
}

  getUserId(): string | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload?.id?.toString() ?? null;
    } catch {
      return null;
    }
  } 
}
