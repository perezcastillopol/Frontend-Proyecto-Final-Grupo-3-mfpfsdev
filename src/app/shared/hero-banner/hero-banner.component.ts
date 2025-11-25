import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero-banner',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './hero-banner.component.html',
  styleUrl: './hero-banner.component.css',
})
export class HeroBannerComponent {
  @Output() search = new EventEmitter<any>();

  searchForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.searchForm = this.fb.group({
      destination: [''],
      experience: [''],
      startDate: [''],
      endDate: [''],
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
    this.router.navigateByUrl('/crear-viaje');
  }
}
