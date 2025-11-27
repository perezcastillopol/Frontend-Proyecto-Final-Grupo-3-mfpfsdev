import { Component, Input } from '@angular/core';
import { UserProfile } from '../../../interfaces/user.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile-main-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile-main-card.component.html',
  styleUrl: './profile-main-card.component.css',
})
export class ProfileMainCardComponent {
  @Input() user!: UserProfile;
  @Input() isEditing: boolean = false;

  actualizarFoto(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => { this.user.foto = reader.result as string; };
    reader.readAsDataURL(file);
  }

  get fullName() {
    return `${this.user.nombre} ${this.user.apellidos}`;
  }
}
