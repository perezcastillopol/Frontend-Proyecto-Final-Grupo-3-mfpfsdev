import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProfileMainCardComponent } from './components/profile-main-card/profile-main-card.component';
import { ProfileAboutCardComponent } from './components/profile-about-card/profile-about-card.component';
import { ProfilePersonalInfoCardComponent } from './components/profile-personal-info-card/profile-personal-info-card.component';
import { UserProfile } from '../../interfaces/user.component';
import { UserService } from '../../core/services/user.services';

@Component({
  selector: 'app-user-view',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProfileMainCardComponent,
    ProfileAboutCardComponent,
    ProfilePersonalInfoCardComponent
  ],
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {

  profileForm!: FormGroup;
  profileData!: UserProfile;
  isEditing = false;
  isLoading = true;

  constructor(
    private userService: UserService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.userService.getMyProfile().subscribe({
      next: (profile) => {
        this.profileData = profile;
        this.buildForm(profile);
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  private buildForm(profile: UserProfile): void {
    this.profileForm = this.fb.group({
      fullName: [profile.fullName],
      username: [profile.username],
      rating: [profile.rating],
      bio: [profile.bio],
      interests: [profile.interests],
      phone: [profile.phone],
      birthDate: [profile.birthDate],
      location: [profile.location],
      travelStyle: [profile.travelStyle]
    });
  }

  onEdit(): void {
    this.isEditing = true;
  }

  onCancel(): void {
    this.isEditing = false;
    this.buildForm(this.profileData); // deshacer cambios
  }

  onSave(): void {
    if (!this.profileForm.valid) return;

    const updatedProfile: UserProfile = {
      ...this.profileData,
      ...this.profileForm.value
    };

    this.userService.updateMyProfile(updatedProfile).subscribe({
      next: (savedProfile) => {
        this.profileData = savedProfile;
        this.isEditing = false;
        this.buildForm(savedProfile);
      }
    });
  }
}
