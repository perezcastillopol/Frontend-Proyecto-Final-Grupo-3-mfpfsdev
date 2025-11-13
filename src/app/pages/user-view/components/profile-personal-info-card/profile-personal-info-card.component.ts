import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile-personal-info-card',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile-personal-info-card.component.html',
  styleUrls: ['./profile-personal-info-card.component.css']
})
export class ProfilePersonalInfoCardComponent {
  @Input() form!: FormGroup;
  @Input() isEditing = false;

  get phoneControl(): FormControl {
    return this.form.get('phone') as FormControl;
  }

  get birthDateControl(): FormControl {
    return this.form.get('birthDate') as FormControl;
  }

  get locationControl(): FormControl {
    return this.form.get('location') as FormControl;
  }

  get travelStyleControl(): FormControl {
    return this.form.get('travelStyle') as FormControl;
  }
}
