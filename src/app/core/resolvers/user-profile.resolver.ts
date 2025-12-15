import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { UserService } from '../services/user.services';
import { IUser } from '../../interfaces/user.interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserProfileResolver implements Resolve<IUser> {
  constructor(private userService: UserService) {}

  /**
   * Carga el perfil del usuario antes de entrar en la ruta.
   * Si no hay token o ID, lanzará un error.
   */
  async resolve(): Promise<IUser> {
    return await this.userService.getMyProfile();
  }
}