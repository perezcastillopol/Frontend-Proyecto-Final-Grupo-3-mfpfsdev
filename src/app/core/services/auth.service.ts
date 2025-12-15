import {Injectable, signal} from '@angular/core';
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

  userId = signal<number>(Number(this.getUserId() || 0) || 0);

  async login(credentials: LoginRequest) {
    const response = await this.post<LoginResponse>(`${this.url}/login`, credentials);
    localStorage.setItem('token', response.token);
    const userId = Number(response.user?.id || 0) || 0;
    if (userId) {
      localStorage.setItem('userId', String(userId));
    } else {
      localStorage.removeItem('userId');
    }
    this.userId.set(userId);
    return response;
  }

  async register(user: IUser): Promise<IUser> {
    return await this.post<IUser>(`${this.url}/register`, user);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.userId.set(0);
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
