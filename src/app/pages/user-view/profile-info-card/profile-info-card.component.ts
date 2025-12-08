import { Component, Input } from '@angular/core';
import { IUserProfile } from '../../../interfaces/user.interfaces';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile-info-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile-info-card.component.html',
  styleUrls: ['./profile-info-card.component.css'],
})
export class ProfileInfoCardComponent {
  @Input() user!: IUserProfile;
  @Input() isEditing: boolean = false;
}
