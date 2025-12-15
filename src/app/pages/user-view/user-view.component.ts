import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../core/services/user.services';
import { AuthService } from '../../core/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
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
  userInterests: any[] = [];
  
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
  isOwnProfile = true;
  showDeleteConfirm = false; 
  showDeletePopup = false;  

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  async ngOnInit(): Promise<void> {
    this.isLoaded = false;

    try {
      const userId = this.route.snapshot.paramMap.get('id');
      if (userId) {
        const profile = await this.userService.getUserById(userId);
        this.user = { ...profile };
        this.isEditing = false;
        this.isOwnProfile = false;
      } else if (this.authService.isLoggedIn()) {
        const profile = await this.userService.getMyProfile();
        this.user = { ...profile };
        this.isOwnProfile = true;
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

  onInterestsChanged(interests: any[]): void {
    this.userInterests = interests;
  }

  async guardarCambios(): Promise<void> {
    try {
      const args: any = {...this.user,interests: this.userInterests};
      const result = await this.userService.updateMyProfile(args);
      this.user = { ...result };
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
      this.showDeleteConfirm = false;

      this.showDeletePopup = true;

      setTimeout(() => {
        this.showDeletePopup = false;
        this.router.navigate(['/login']);
      }, 1500);

    } catch (error) {
      console.error('Error eliminando usuario:', error);
      this.showDeleteConfirm = false;
    }
  }
}
