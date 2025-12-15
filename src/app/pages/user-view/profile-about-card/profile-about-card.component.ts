import { Component, Input, Output, EventEmitter, inject, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IUser } from '../../../interfaces/user.interfaces';
import { IModality } from '../../../interfaces/modality.interface';
import { ModalityService } from '../../../core/services/modality.service';
import { TagsComponent } from '../../../shared/tags/tags.component';

@Component({
  selector: 'app-profile-about-card',
  standalone: true,
  imports: [CommonModule, FormsModule, TagsComponent],
  templateUrl: './profile-about-card.component.html',
  styleUrls: ['./profile-about-card.component.css'],
})
export class ProfileAboutCardComponent implements OnChanges {
  @Input() user!: IUser;
  @Input() isEditing: boolean = false;
  @Output() interestsChanged = new EventEmitter<any[]>();

  modalities: IModality[] = [];
  selectedModality: string = '';
  
  private modalityService = inject(ModalityService);

  constructor() {
    this.loadModalities();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['user'] && this.user) {
      this.interestsChanged.emit(this.user.interests || []);
    }
  }

  async loadModalities() {
    this.modalities = await this.modalityService.getAllModalities();
  }

  añadirInteres(txt: string) {
    if (!txt.trim()) return;
    if (!this.user.interests) this.user.interests = [];
    const nuevo = txt.trim();
    const modality = this.modalities.find(m => m.name === nuevo);
    if (!modality) return;
    const existe = this.user.interests.some(i => i.id === modality.id);
    if (!existe) {
      this.user.interests.push({ 
        id: modality.id,
        name: modality.name 
      });
    }
  }

  onModalityChange() {
    if (this.selectedModality) {
      this.añadirInteres(this.selectedModality);
      this.selectedModality = '';
      this.interestsChanged.emit(this.user.interests || []);
    }
  }

  removeTag(index: number): void {
    if (this.user.interests && this.user.interests[index]) {
      this.user.interests.splice(index, 1);
      this.interestsChanged.emit(this.user.interests || []);
    }
  }
}
