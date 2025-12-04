import { Component, inject, Input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormsModule,
} from '@angular/forms';
import { UserService } from '../../core/services/user.services';
import { ModalityService} from '../../core/services/modality.service';
import { Router } from '@angular/router';
import { IModality } from '../../interfaces/modality.interface';
import { TagsComponent } from '../../shared/tags/tags.component';

@Component({
  selector: 'app-usuario-form',
  imports: [ReactiveFormsModule, FormsModule, TagsComponent],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent {
  userForm: FormGroup;
  modalities: IModality[] = [];
  selectedModalities: string[] = [];
  interests: any[] = [];
  
  srv = inject(UserService);
  srvModalities = inject(ModalityService)
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
      modality: new FormControl('', []),
    });
  }

  async getDataForm() {
    try {        
        const resp = await this.srv.createUser({...this.userForm.value, interests:JSON.stringify(this.interests)});
        if (resp) {
          this.router.navigate(['/home']);          
        }      
    } catch (msg) {
      console.log(msg);
    }
  }
  async ngOnInit() {
    this.modalities = await this.srvModalities.getAllModalities();
    this.userForm.get('modality')?.valueChanges.subscribe((value) => {
      if (value && !this.selectedModalities.includes(value)) {
        this.addTag(value);
        this.userForm.get('modality')?.reset('', { emitEvent: false });
      }
    });
  }

  addTag(modality: string): void {
    if (modality && !this.selectedModalities.includes(modality)) {
      this.selectedModalities.push(modality);
      const mod = this.modalities.find(m => m.name === modality);
      if (mod) {
        this.interests.push({
          id: mod.id,
          name: mod.name,          
        });
      }     
    }
  }

  removeTag(index: number): void {
    this.selectedModalities.splice(index, 1);
    this.interests.splice(index, 1);
    console.log('JSON actualizado:', JSON.stringify(this.interests, null, 2));
  }

  getModalities(): IModality[] {
    return this.modalities;
  }

  checkForm(errorName: string, campoName: string): boolean | undefined {
    return (
      this.userForm.get(campoName)?.hasError(errorName) &&
      this.userForm.get(campoName)?.touched
    );
  }
}
