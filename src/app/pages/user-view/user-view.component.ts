import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../core/services/user.services';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { ProfileAboutCardComponent } from './profile-about-card/profile-about-card.component';
import { ProfileInfoCardComponent } from './profile-info-card/profile-info-card.component';
import { ProfileMainCardComponent } from './profile-main-card/profile-main-card.component';
import { IUser } from '../../interfaces/user.interfaces';

@Component({
  selector: 'app-user-view',
  standalone: true,
  imports: [
    CommonModule,
    ProfileAboutCardComponent,
    ProfileInfoCardComponent,
    ProfileMainCardComponent
  ],
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent {
  user: IUser = {
    id: '',
    name: '',
    last_name: '',
    email: '',
    photo_url: '',
    bio: '',
    interests: [],
    phone: '',
    birthDate: '',
    location: '',
    nickname: '',
    average_rating: 0,
    created_at: ''
  };

  isEditing = false;
  isLoaded = false;
  showDeleteConfirm = false; // ✅ estado para modal

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.isLoaded = false;

    try {
      if (this.authService.isLoggedIn()) {
        const profile = await this.userService.getMyProfile();
        this.user = { ...profile };
      } else {
        // Usuario demo
        this.user = {
          id: 'demo-1',
          name: 'Demo',
          last_name: 'TripBud',
          email: 'demo@tripbud.com',
          photo_url:
            'https://media.istockphoto.com/id/1200677760/es/foto/retrato-de-apuesto-joven-sonriente-con-los-brazos-cruzados.jpg?s=612x612&w=0&k=20&c=RhKR8pxX3y_YVe5CjrRnTcNFEGDryD2FVOcUT_w3m4w=',
          bio: 'Este es un perfil de prueba para visualizar la página de usuario.',
          interests: [{ id: 1 }, { id: 2 }, { id: 3 }],
          phone: '000-000-000',
          birthDate: '1990-01-01',
          location: 'Málaga, España',
          nickname: 'Mochilero',
          average_rating: 4.5,
          created_at: '2020-01-01'
        };
      }
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

  cancelarEdicion(): void {
    this.isEditing = false;
    this.ngOnInit();
  }

  abrirModalEliminar(): void {
    this.showDeleteConfirm = true;
  }

  cerrarModalEliminar(): void {
    this.showDeleteConfirm = false;
  }

  async confirmarEliminar(): Promise<void> {
    try {
      await this.userService.deleteMyProfile();
      console.log('Usuario eliminado correctamente');
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Error eliminando usuario:', error);
    } finally {
      this.showDeleteConfirm = false;
    }
  }
}
