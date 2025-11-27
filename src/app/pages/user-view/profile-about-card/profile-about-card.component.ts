import { Component, Input } from '@angular/core';
import { UserProfile } from '../../../interfaces/user.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile-about-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile-about-card.component.html',
  styleUrl: './profile-about-card.component.css',
})
export class ProfileAboutCardComponent {
  @Input() user!: UserProfile;
  @Input() isEditing: boolean = false;

  añadirInteres(txt: string) {
    if (!txt.trim()) return;
    if (!this.user.intereses) this.user.intereses = [];
    this.user.intereses.push(txt.trim());
  }

  agregar(valor: string, input: HTMLInputElement) {
    this.añadirInteres(valor);
    input.value = '';
  }
}

