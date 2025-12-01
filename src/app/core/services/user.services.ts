import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUserProfile } from '../../interfaces/user.component';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  // Cambia esta URL por la de tu API real
  private baseUrl = 'https://nuestra-api.com/api';

  constructor(private http: HttpClient) {}

  getMyProfile(): Observable<IUserProfile> {
    return this.http.get<IUserProfile>(`${this.baseUrl}/users/me`);
  }

  updateMyProfile(profile: IUserProfile): Observable<IUserProfile> {
    return this.http.put<IUserProfile>(`${this.baseUrl}/users/me`, profile);
  }
}
