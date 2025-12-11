import {inject, Injectable} from '@angular/core';
import { HttpServices } from './http.services';
import { IUser } from '../../interfaces/user.interfaces';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends HttpServices {
  private readonly base = '/users';
  private auth = inject(AuthService);

  /**
   * Obtiene el perfil del usuario logeado usando el ID del token.
   */
  async getMyProfile(): Promise<IUser> {
    const id = this.auth.getUserId();
    if (!id) throw new Error('No hay token o ID de usuario.');
    const user = await this.get<IUser>(`${this.base}/${id}`);  
    if (user.interests && typeof user.interests === 'string') {
      try {
        user.interests = JSON.parse(user.interests as any);
      } catch (error) {
        console.error('Error parsing interests:', error);
        user.interests = [];
      }
    }
    if (!user.interests) {
      user.interests = [];
    }
    
    return user;
  }

  /**
   * Actualiza el perfil del usuario logeado.
   */
  async updateMyProfile(profile: IUser): Promise<IUser> {
    const id = this.auth.getUserId();
    if (!id) throw new Error('No hay token o ID de usuario.');
    const user = await this.put<IUser>(`${this.base}/${id}`, profile);      
    // Si interests viene como string JSON, parsearlo
    if (user.interests && typeof user.interests === 'string') {
      try {
        user.interests = JSON.parse(user.interests as any);
      } catch (error) {
        console.error('Error parsing interests:', error);
        user.interests = [];
      }
    }
    
    // Si interests es undefined, inicializar como array vacío
    if (!user.interests) {
      user.interests = [];
    }
    
    return user;
  }

  /**
   * Elimina el usuario logeado (opcional).
   */
  async deleteMyProfile(): Promise<void> {
    const userId = this.auth.getUserId();
    console.log(userId)
    await this.delete<void>(`${this.base}/${userId}`);
  }
}
