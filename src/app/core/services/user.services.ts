import {Injectable} from '@angular/core';
import {IUserProfile} from '../../interfaces/user.component';
import {HttpServices} from './http.services';


@Injectable({
  providedIn: 'root'
})
export class UserService extends HttpServices {

  private url = '/users';

  getMyProfile(): Promise<IUserProfile> {
    return this.get(`${this.url}/users/me`);
  }

  updateMyProfile(profile: IUserProfile): Promise<IUserProfile> {
    return this.put(`${this.url}/users/me`, profile);
  }
}
