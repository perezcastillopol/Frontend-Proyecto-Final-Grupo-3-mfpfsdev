import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IUserProfile } from '../../interfaces/user.interfaces';
import { UserService } from '../../core/services/user.services';
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
  user!: IUserProfile;
  isLoaded = false;
  isEditing = false;

  constructor(private userService: UserService) {}

  async ngOnInit(): Promise<void> {
    this.isLoaded = false;
    try {
      const profile = await this.userService.getMyProfile();
      this.user = { ...profile };
      this.isLoaded = true;
    } catch (error) {
      console.error('Error cargando perfil:', error);
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
