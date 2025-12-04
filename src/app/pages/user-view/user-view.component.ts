import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProfileMainCardComponent } from './components/profile-main-card/profile-main-card.component';
import { ProfileAboutCardComponent } from './components/profile-about-card/profile-about-card.component';
import { ProfilePersonalInfoCardComponent } from './components/profile-personal-info-card/profile-personal-info-card.component';
import { IUserProfile } from '../../interfaces/user.interfaces';
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
  profileData!: IUserProfile;
  isEditing = false;
  isLoading = true;

  constructor(
    private userService: UserService,
    private fb: FormBuilder
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      const profile = await this.userService.getMyProfile();
      this.profileData = profile;
      this.buildForm(profile);
      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
    }
  }

  private buildForm(profile: IUserProfile): void {
    this.profileForm = this.fb.group({
      name: [profile.name],
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

  async onSave(): Promise<void> {
    if (!this.profileForm.valid) return;

    const updatedProfile: IUserProfile = {
      ...this.profileData,
      ...this.profileForm.value
    };

    try {
      const savedProfile = await this.userService.updateMyProfile(updatedProfile);
      this.profileData = savedProfile;
      this.isEditing = false;
      this.buildForm(savedProfile);
    } catch (error) {
      // Handle error if needed
      console.error('Error updating profile:', error);
    }
  }
}
