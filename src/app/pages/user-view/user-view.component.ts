import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IUserProfile } from '../../interfaces/user.interfaces';
import { UserService } from '../../core/services/user.services';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { ProfileAboutCardComponent } from './profile-about-card/profile-about-card.component';
import { ProfileInfoCardComponent } from './profile-info-card/profile-info-card.component';
import { ProfileMainCardComponent } from './profile-main-card/profile-main-card.component';

@Component({
  selector: 'app-user-view',
  standalone: true,
  imports: [CommonModule, ProfileAboutCardComponent, ProfileInfoCardComponent, ProfileMainCardComponent],
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent {
  user: IUserProfile = {
    id: '',
    nombre: '',
    apellidos: '',
    mail: '',
    foto: '',
    descripcion: '',
    intereses: [],
    telefono: '',
    fecha_nacimiento: '',
    ubicacion: '',
    estilo_viaje: '',
    valoracion_promedio: 0
  };

  isEditing = false;
  isLoaded = false;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
  this.isLoaded = false;

  if (!this.authService.isLoggedIn()) {
    // No redirige, simplemente muestra un perfil vacío o modo visitante
    console.warn('Usuario no autenticado. Mostrando perfil vacío.');
    this.isLoaded = true;
    return;
  }

  try {
    const profile = await this.userService.getMyProfile();
    this.user = { ...profile };
  } catch (error) {
    console.error('Error cargando perfil:', error);
  } finally {
    this.isLoaded = true;
  }
}

  editarPerfil(): void {
    this.isEditing = true;
  }

  async guardarCambios(): Promise<void> {
    try {
      const saved = await this.userService.updateMyProfile(this.user);
      this.user = { ...saved };
      this.isEditing = false;
    } catch (error) {
      console.error('Error guardando cambios:', error);
    }
  }
}
