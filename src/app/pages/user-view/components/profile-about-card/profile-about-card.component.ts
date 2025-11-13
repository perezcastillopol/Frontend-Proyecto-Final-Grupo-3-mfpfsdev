import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile-about-card',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile-about-card.component.html',
  styleUrls: ['./profile-about-card.component.css']
})
export class ProfileAboutCardComponent {
  @Input() form!: FormGroup;
  @Input() isEditing = false;

  get bioControl(): FormControl {
    return this.form.get('bio') as FormControl;
  }

  get interests(): string[] {
    return (this.form.get('interests')?.value as string[]) || [];
  }
}
