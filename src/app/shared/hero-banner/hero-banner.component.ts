import { Component, EventEmitter, Output, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalityService } from '../../core/services/modality.service';
import { IModality } from '../../interfaces/modality.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero-banner',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './hero-banner.component.html',
  styleUrls: ['./hero-banner.component.css'],
})
export class HeroBannerComponent implements OnInit {
  @Output() search = new EventEmitter<any>();

  searchForm: FormGroup;
  modalities: IModality[] = [];
  private modalityService = inject(ModalityService);

  constructor(private fb: FormBuilder, private router: Router) {
    this.searchForm = this.fb.group({
      destination: [''],
      experience: [''],
      startDate: [''],
      endDate: [''],
    });
  }

  ngOnInit() {
    this.modalityService.getAllModalities().then(modalities => {
      this.modalities = modalities;
    });
  }

  onSearch(): void {
    const formValue = this.searchForm.value;
    const queryParams: any = {};

    if (formValue.destination) queryParams.destination = formValue.destination;
    if (formValue.experience) queryParams.experience = formValue.experience;
    if (formValue.startDate) queryParams.startDate = formValue.startDate;
    if (formValue.endDate) queryParams.endDate = formValue.endDate;

    this.router.navigate(['/explorar'], { queryParams });
  }

  onCreateTrip(): void {
    this.router.navigateByUrl("/crear");
  }
}
