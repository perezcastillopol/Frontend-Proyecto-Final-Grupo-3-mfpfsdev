import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trip-create',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './trip-create.component.html',
  styleUrl: './trip-create.component.css'
})
export class TripCreateComponent {
  tripForm: FormGroup;

  modalities = [
    { id: 1, name: 'Aventura' },
    { id: 2, name: 'Naturaleza' },
    { id: 3, name: 'Ciudad' },
    { id: 4, name: 'Playa' },
    { id: 5, name: 'Deportes de invierno' }
  ];

  constructor(private fb: FormBuilder, private router: Router) {
    this.tripForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      destination: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      costPerPerson: ['', [Validators.required, Validators.min(0)]],
      minParticipants: ['', [Validators.required, Validators.min(1)]],
      accommodation: ['', Validators.required],
      transport: ['', Validators.required],
      itinerary: [''],
      modalityId: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.tripForm.valid) {
      const tripData = {
        ...this.tripForm.value,
        creatorId: 1, // stub - would come from auth service
        status: 'abierto',
        createdAt: new Date().toISOString()
      };

      console.log('Trip created:', tripData);
      alert('¡Viaje creado con éxito! (Esto es una simulación)');
      this.router.navigateByUrl('/mis-viajes');
    } else {
      alert('Por favor, completa todos los campos requeridos');
    }
  }

  onCancel(): void {
    this.router.navigateByUrl('/');
  }
}