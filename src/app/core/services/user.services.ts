import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserProfile } from '../../interfaces/user.component';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  // Cambia esta URL por la de tu API real
  private baseUrl = 'https://nuestra-api.com/api';

  constructor(private http: HttpClient) {}

  getMyProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.baseUrl}/users/me`);
  }

  updateMyProfile(profile: UserProfile): Observable<UserProfile> {
    return this.http.put<UserProfile>(`${this.baseUrl}/users/me`, profile);
  }
}
