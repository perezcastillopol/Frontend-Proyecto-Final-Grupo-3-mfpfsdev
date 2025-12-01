import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TripsService } from '../../core/services/trips.services';
import { ITrip } from '../../interfaces/trip.interface';

@Component({
  selector: 'app-trip-create',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './trip-create.component.html',
  styleUrl: './trip-create.component.css'
})
export class TripCreateComponent {
  tripForm: FormGroup;
  tripService = inject(TripsService);
  trip!: ITrip;
  router = inject(Router);

  modalities = [
    { id: 1, name: 'Aventura' },
    { id: 2, name: 'Naturaleza' },
    { id: 3, name: 'Ciudad' },
    { id: 4, name: 'Playa' }
  ];

  constructor() {
    this.tripForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(3)]),
      description: new FormControl('', [Validators.required, Validators.minLength(10)]),
      destination: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required]),
      costPerPerson: new FormControl('', [Validators.required, Validators.min(0)]),
      minParticipants: new FormControl('', [Validators.required, Validators.min(1)]),
      transport: new FormControl('', [Validators.required]),
      itinerary: new FormControl(''),
      modalityId: new FormControl('', [Validators.required])
    });
  }
  checkControl(controlName: string, errorName: string):boolean | undefined{
    return this.tripForm.get(controlName)?.hasError(errorName) && this.tripForm.get(controlName)?.touched;
  }

  async onSubmit() {
    if (!this.tripForm.valid) {
      // Mark all fields as touched to show validation errors
      Object.keys(this.tripForm.controls).forEach(key => {
        this.tripForm.get(key)?.markAsTouched();
      });
      return;
    }

    const formValue = this.tripForm.value;

    // Transform form data to match backend API structure (camelCase → snake_case)
    const tripData = {
      title: formValue.title,
      description: formValue.description,
      location: formValue.destination,                      // destination → location
      start_date: formValue.startDate,                      // startDate → start_date
      end_date: formValue.endDate,                          // endDate → end_date
      cost_per_person: Number(formValue.costPerPerson),     // costPerPerson → cost_per_person (as number)
      min_participants: Number(formValue.minParticipants),  // minParticipants → min_participants (as number)
      max_participants: Number(formValue.minParticipants) * 2, // Default: 2x min participants
      transport: formValue.transport,
      itinerary: formValue.itinerary || '',
      modality_trip_id: Number(formValue.modalityId),       // modalityId → modality_trip_id (as number)
      creator_id: 1,                                         // Stub - would come from auth
      status: 'published'                                     // Status must match ENUM value
    };

    try {
      await this.tripService.createTrip(tripData);
      this.router.navigateByUrl('/mis-viajes');
    } catch (error) {
      console.error('Error creating trip:', error);
      alert('Error al crear el viaje. Por favor, inténtalo de nuevo.');
    }
  }

  onCancel(): void {
    this.router.navigateByUrl('/');
  }
}