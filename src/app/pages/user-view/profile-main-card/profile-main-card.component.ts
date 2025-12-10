import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IUser } from '../../../interfaces/user.interfaces';

@Component({
  selector: 'app-profile-main-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile-main-card.component.html',
  styleUrls: ['./profile-main-card.component.css'],
})
export class ProfileMainCardComponent {
  @Input() user!: IUser;
  @Input() isEditing: boolean = false;

  actualizarFoto(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input?.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.user.photo_url = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  get fullName(): string {
    const nombre = this.user?.name ?? '';
    const apellidos = this.user?.last_name ?? '';
    return `${nombre} ${apellidos}`.trim();
  }
}
