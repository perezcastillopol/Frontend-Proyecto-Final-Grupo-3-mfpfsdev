import { Component, Input } from '@angular/core';
import { UserProfile } from '../../../interfaces/user.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile-info-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile-info-card.component.html',
  styleUrl: './profile-info-card.component.css',
})
export class ProfileInfoCardComponent {
  @Input() user!: UserProfile
  @Input() isEditing: boolean = false;
}
