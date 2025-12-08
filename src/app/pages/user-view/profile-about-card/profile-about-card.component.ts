import { Component, Input } from '@angular/core';
import { IUserProfile } from '../../../interfaces/user.interfaces';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile-about-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile-about-card.component.html',
  styleUrls: ['./profile-about-card.component.css'],
})
export class ProfileAboutCardComponent {
  @Input() user!: IUserProfile;
  @Input() isEditing: boolean = false;

  añadirInteres(txt: string) {
    if (!txt.trim()) return;
    if (!this.user.intereses) this.user.intereses = [];
    const nuevo = txt.trim();
    if (!this.user.intereses.includes(nuevo)) {
      this.user.intereses.push(nuevo);
    }
  }

  agregar(valor: string, input: HTMLInputElement) {
    this.añadirInteres(valor);
    input.value = '';
  }
}
