import {Injectable} from '@angular/core';
import {HttpServices} from './http.services';

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
export class AuthService extends HttpServices {

  private url = '/auth';

  async login(credentials: LoginRequest) {
    const response = await this.post(`${this.url}/login`, credentials);
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
