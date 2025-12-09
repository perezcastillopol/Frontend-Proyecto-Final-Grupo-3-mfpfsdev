import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IUser } from '../../../interfaces/user.interfaces';

@Component({
  selector: 'app-profile-about-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile-about-card.component.html',
  styleUrls: ['./profile-about-card.component.css'],
})
export class ProfileAboutCardComponent {
  @Input() user!: IUser;
  @Input() isEditing: boolean = false;

  añadirInteres(txt: string) {
    if (!txt.trim()) return;
    if (!this.user.interests) this.user.interests = [];
    const nuevo = txt.trim();

    // ✅ Como interests es un array de objetos { id: number },
    // podemos simular IDs incrementales para nuevos intereses
    const existe = this.user.interests.some(i => i.id.toString() === nuevo);
    if (!existe) {
      this.user.interests.push({ id: Date.now() }); // id único temporal
    }
  }

  agregar(valor: string, input: HTMLInputElement) {
    this.añadirInteres(valor);
    input.value = '';
  }
}
