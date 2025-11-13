import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile-main-card',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile-main-card.component.html',
  styleUrls: ['./profile-main-card.component.css']
})
export class ProfileMainCardComponent {
  @Input() form!: FormGroup;
  @Input() isEditing = false;

  get fullNameControl(): FormControl {
    return this.form.get('fullName') as FormControl;
  }

  get usernameControl(): FormControl {
    return this.form.get('username') as FormControl;
  }

  get rating(): number {
    return this.form.get('rating')?.value ?? 0;
  }
}


