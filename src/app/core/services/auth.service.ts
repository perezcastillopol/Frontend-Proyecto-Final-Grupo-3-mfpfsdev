import {Injectable} from '@angular/core';
import {HttpServices} from './http.services';
import {IUser} from '../../interfaces/user.interfaces';

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
export class AuthService extends HttpServices {

  private url = '/auth';

  async login(credentials: LoginRequest) {
    const response = await this.post<LoginResponse>(`${this.url}/login`, credentials);
    localStorage.setItem('token', response.token);
    localStorage.setItem('userId', response.user?.id);
    return response;
  }

  async register(user: IUser): Promise<IUser> {
    return await this.post<IUser>(`${this.url}/register`, user);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    try {
      return localStorage.getItem('token');
    } catch {
      return null;
    }
  }

  getUserId(): string | null {
    try {
      return localStorage.getItem('userId')
    } catch {
      return null;
    }
  }
}
