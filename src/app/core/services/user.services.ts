import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserProfile } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getUserById(userId: string | number): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.baseUrl}/users/${userId}`);
  }

  updateUser(user: UserProfile): Observable<any> {
    return this.http.put(`${this.baseUrl}/users/${user.id_usuario}`, user);
  }
}
