import { Component, Input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IUser } from '../../../interfaces/user.interfaces';

@Component({
  selector: 'app-profile-info-card',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe],
  templateUrl: './profile-info-card.component.html',
  styleUrls: ['./profile-info-card.component.css'],
})
export class ProfileInfoCardComponent {
  @Input() user!: IUser;
  @Input() isEditing: boolean = false;
}
