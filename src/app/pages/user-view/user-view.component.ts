import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserProfile } from '../../interfaces/user.interface';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProfileMainCardComponent } from './components/profile-main-card/profile-main-card.component';
import { ProfileAboutCardComponent } from './components/profile-about-card/profile-about-card.component';
import { ProfilePersonalInfoCardComponent } from './components/profile-personal-info-card/profile-personal-info-card.component';
import { IUserProfile } from '../../interfaces/user.interfaces';
import { UserService } from '../../core/services/user.services';
import { ProfileAboutCardComponent } from './profile-about-card/profile-about-card.component';
import { ProfileInfoCardComponent } from './profile-info-card/profile-info-card.component';
import { ProfileMainCardComponent } from './profile-main-card/profile-main-card.component';

@Component({
  selector: 'app-user-view',
  standalone: true,
  imports: [
    CommonModule, ProfileAboutCardComponent, ProfileInfoCardComponent, ProfileMainCardComponent],
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent {

  user!: UserProfile;
  isLoaded = false;
  isEditing = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
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

  guardarCambios() {
    console.log("GUARDANDO...", this.user);

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
