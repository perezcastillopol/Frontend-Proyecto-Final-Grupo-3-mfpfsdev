import { Component, Input } from '@angular/core';
import { IUserProfile } from '../../../interfaces/user.interfaces';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile-main-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile-main-card.component.html',
  styleUrls: ['./profile-main-card.component.css'],
})
export class ProfileMainCardComponent {
  @Input() user!: IUserProfile;
  @Input() isEditing: boolean = false;

  actualizarFoto(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input?.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => { this.user.foto = reader.result as string; };
    reader.readAsDataURL(file);
  }

  get fullName(): string {
    const nombre = this.user?.nombre ?? '';
    const apellidos = this.user?.apellidos ?? '';
    return `${nombre} ${apellidos}`.trim();
  }
}
