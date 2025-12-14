import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TripsService } from '../../core/services/trips.services';
import { ITrip } from '../../interfaces/trip.interface';
import { ModalityService } from '../../core/services/modality.service';
import { IModality } from '../../interfaces/modality.interface';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-trip-create',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './trip-create.component.html',
  styleUrl: './trip-create.component.css'
})
export class TripCreateComponent implements OnInit {
  tripForm: FormGroup;
  tripService = inject(TripsService);
  private authService = inject(AuthService);
  private modalityService = inject(ModalityService);
  trip!: ITrip;
  router = inject(Router);

  modalities: IModality[] = [];
  private userId: number | null = null;

  constructor() {
    this.tripForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(3)]),
      description: new FormControl('', [Validators.required, Validators.minLength(10)]),
      destination: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required]),
      costPerPerson: new FormControl('', [Validators.required, Validators.min(0)]),
      minParticipants: new FormControl('', [Validators.required, Validators.min(1)]),
      maxParticipants: new FormControl('', [
        Validators.required,
        Validators.min(1),
        this.maxParticipantsValidator
      ]),
      transport: new FormControl('', [Validators.required]),
      photoUrl: new FormControl('', [
        Validators.pattern(/^(https?:\/\/).+/i),
      ]),
      itinerary: new FormControl(''),
      modalityId: new FormControl('', [Validators.required])
    });

    this.tripForm.get('minParticipants')?.valueChanges.subscribe(() => {
      this.tripForm.get('maxParticipants')?.updateValueAndValidity();
    });
  }

  async ngOnInit(): Promise<void> {
    const storedUserId = this.authService.getUserId();
    this.userId = storedUserId ? Number(storedUserId) : null;

    try {
      this.modalities = await this.modalityService.getAllModalities();
    } catch (error) {
      console.error('Error loading modalities:', error);
    }
  }
  checkControl(controlName: string, errorName: string):boolean | undefined{
    return this.tripForm.get(controlName)?.hasError(errorName) && this.tripForm.get(controlName)?.touched;
  }

  maxParticipantsValidator = (control: AbstractControl): ValidationErrors | null => {
    const parent = control.parent;
    if (!parent) {
      return null;
    }

    const rawMax = control.value;
    const rawMin = parent.get('minParticipants')?.value;

    if (rawMax === null || rawMax === '' || rawMin === null || rawMin === '') {
      return null;
    }

    const maxValue = Number(rawMax);
    const minValue = Number(rawMin);

    if (isNaN(maxValue) || isNaN(minValue)) {
      return null;
    }

    return maxValue < minValue ? { lessThanMin: true } : null;
  };

  async onSubmit() {
    if (!this.userId) {
      alert('Debes iniciar sesión para crear un viaje.');
      this.router.navigate(['/login']);
      return;
    }

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
      max_participants: Number(formValue.maxParticipants),  // maxParticipants → max_participants (as number)
      transport: formValue.transport,
      itinerary: formValue.itinerary || '',
      photo_url: (formValue.photoUrl || '').trim() || undefined, // optional image URL
      num_participants: 0,                                    // start with 0 inscritos
      modality_trip_id: Number(formValue.modalityId),       // modalityId → modality_trip_id (as number)
      creator_id: this.userId,                               // from logged user
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
