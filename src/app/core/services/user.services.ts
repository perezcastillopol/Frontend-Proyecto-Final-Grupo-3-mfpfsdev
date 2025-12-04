import {Injectable} from '@angular/core';
import {Observable, lastValueFrom} from 'rxjs';
import {IUserProfile} from '../../interfaces/user.interfaces';
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

  createUser(user: IUserProfile): Promise<IUserProfile> {
    return lastValueFrom(this.post(this.url, user));
  }
  
}