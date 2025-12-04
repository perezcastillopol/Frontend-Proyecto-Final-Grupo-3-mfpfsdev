import {Injectable} from '@angular/core';
import {IUserProfile} from '../../interfaces/user.interfaces';
import {HttpServices} from './http.services';
import { ApiUser } from '../../interfaces/user.interface';


@Injectable({
  providedIn: 'root'
})
export class UserService extends HttpServices {
  private base = '/users';

  private getUserIdFromToken(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload?.id?.toString() ?? null;
    } catch {
      return null;
    }
  }

  private apiToUi(user: ApiUser): IUserProfile {
    return {
      id: String(user.id),
      nombre: user.name,
      apellidos: '', // si decides almacenarlo en el futuro
      mail: user.email,
      foto: user.photo_url,
      descripcion: user.bio,
      intereses: Array.isArray(user.interests)
        ? user.interests
        : (typeof user.interests === 'string' ? user.interests.split(',').map(s => s.trim()).filter(Boolean) : []),

      telefono: user.phone,
      fecha_nacimiento: user.birthDate,
      ubicacion: user.location,
      estilo_viaje: user.travelStyle,
      valoracion_promedio: user.rating,
    };
  }

  private uiToApi(user: IUserProfile): ApiUser {
    return {
      id: user.id,
      name: user.nombre,
      email: user.mail,
      photo_url: user.foto,
      bio: user.descripcion,
      interests: user.intereses ?? [],
      birthDate: user.fecha_nacimiento,
      phone: user.telefono,
      location: user.ubicacion,
      travelStyle: user.estilo_viaje,
      rating: user.valoracion_promedio,
    };
  }

  async getMyProfile(): Promise<IUserProfile> {
    const id = this.getUserIdFromToken();
    if (!id) throw new Error('No hay token o ID de usuario.');
    const apiUser = await this.get<ApiUser>(`${this.base}/${id}`);
    return this.apiToUi(apiUser);
  }

  async updateMyProfile(profile: IUserProfile): Promise<IUserProfile> {
    const id = this.getUserIdFromToken();
    if (!id) throw new Error('No hay token o ID de usuario.');
    const payload = this.uiToApi(profile);
    const apiUser = await this.put<ApiUser>(`${this.base}/${id}`, payload);
    return this.apiToUi(apiUser);
  }

  async createUser(user: IUserProfile): Promise<IUserProfile> {
    const payload = this.uiToApi(user);
    const apiUser = await this.post<ApiUser>(this.base, payload); 
    return this.apiToUi(apiUser);
  }
}

  
  
