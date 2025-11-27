import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserProfile } from '../../interfaces/user.interface';
import { CommonModule } from '@angular/common';

// Importamos tus 3 tarjetas

import { UserService } from '../../core/services/user.services';
import { ProfileAboutCardComponent } from './profile-about-card/profile-about-card.component';
import { ProfileInfoCardComponent } from './profile-info-card/profile-info-card.component';
import { ProfileMainCardComponent } from './profile-main-card/profile-main-card.component';

@Component({
  selector: 'app-user-view',
  standalone: true,
  imports: [
    CommonModule, ProfileAboutCardComponent, ProfileInfoCardComponent, ProfileMainCardComponent],
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent {

  user!: UserProfile;
  isLoaded = false;
  isEditing = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id');

    this.userService.getUserById(userId!).subscribe({
      next: (data) => {
        this.user = {
          ...data,
          intereses: ["Senderismo", "Fotografía"],
          fecha_nacimiento: "1995-04-20",
          ubicacion: "Madrid",
          estilo_viaje: "Aventura"
        };
        this.isLoaded = true;
      },
      error: () => this.isLoaded = true
    });
  }

  editarPerfil() {
    this.isEditing = true;
  }

  guardarCambios() {
    console.log("GUARDANDO...", this.user);

    this.userService.updateUser(this.user).subscribe({
      next: () => {
        console.log("Usuario actualizado");
        this.isEditing = false;
      },
      error: (err) => console.error("ERROR:", err)
    });
  }
}
