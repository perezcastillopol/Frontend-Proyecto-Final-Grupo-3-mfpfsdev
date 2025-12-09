import { Injectable } from '@angular/core';
import { HttpServices } from './http.services';
import { IUser } from '../../interfaces/user.interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService extends HttpServices {
  private readonly base = '/users';

  constructor() {
    super();
  }

  /**
   * Crea un nuevo usuario en el sistema.
   */
  async createUser(user: IUser): Promise<IUser> {
    return await this.post<IUser>(`${this.base}`, user);
  }

  /**
   * Obtiene el perfil del usuario logeado usando el ID del token.
   */
  async getMyProfile(): Promise<IUser> {
    const id = this.auth.getUserId();
    if (!id) throw new Error('No hay token o ID de usuario.');
    return await this.get<IUser>(`${this.base}/${id}`);
  }

  /**
   * Actualiza el perfil del usuario logeado.
   */
  async updateMyProfile(profile: IUser): Promise<IUser> {
    const id = this.auth.getUserId();
    if (!id) throw new Error('No hay token o ID de usuario.');
    return await this.put<IUser>(`${this.base}/${id}`, profile);
  }

  /**
   * Elimina el usuario logeado (opcional).
   */
  async deleteMyProfile(): Promise<void> {
    const id = this.auth.getUserId();
    if (!id) throw new Error('No hay token o ID de usuario.');
    await this.delete<void>(`${this.base}/${id}`);
  }
}
