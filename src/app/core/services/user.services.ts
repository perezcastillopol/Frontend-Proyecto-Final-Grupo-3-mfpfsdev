import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {IUserProfile} from '../../interfaces/user.component';
import {HttpServices} from './http.services';


@Injectable({
  providedIn: 'root'
})
export class UserService extends HttpServices {

  private url = '/users';

  getMyProfile(): Observable<IUserProfile> {
    return this.get(`${this.url}/users/me`);
  }

  updateMyProfile(profile: IUserProfile): Observable<IUserProfile> {
    return this.put(`${this.url}/users/me`, profile);
  }
}
