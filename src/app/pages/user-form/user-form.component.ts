import { Component, inject, Input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../core/services/user.services';
import { Router } from '@angular/router';
import { IUserProfile } from '../../interfaces/user.interfaces';

@Component({
  selector: 'app-usuario-form',
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent {
  userForm: FormGroup;
  srv = inject(UserService);
  router = inject(Router);
  constructor() {
    this.userForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      bio: new FormControl('', [
        Validators.required,
        Validators.minLength(50),
      ]),
      interests: new FormControl('', [
        Validators.required,
        Validators.minLength(50),
      ]),
      birthDate: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.minLength(9),
      ]),
      password_hash: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      location: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/),
      ]),
      photo_url: new FormControl('', [
        Validators.required,
        Validators.pattern(/^https?:\/\//),
      ]),
    });
  }

  async getDataForm() {
    try {      
        console.log (this.userForm.value);
        const resp = await this.srv.createUser(this.userForm.value);
        if (resp) {
          this.router.navigate(['/home']);          
        }      
    } catch (msg) {
      console.log(msg);
    }
  }
  async ngOnInit() {
  }

  checkForm(errorName: string, campoName: string): boolean | undefined {
    return (
      this.userForm.get(campoName)?.hasError(errorName) &&
      this.userForm.get(campoName)?.touched
    );
  }
}
