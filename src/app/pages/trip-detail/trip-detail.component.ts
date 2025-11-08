import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe, DatePipe, CurrencyPipe } from '@angular/common';
import { TripsService, Trip } from '../../core/services/trips.services';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-trip-detail',
  standalone: true,
  imports: [AsyncPipe, DatePipe, CurrencyPipe],
  template: `
    @if (trip$ | async; as trip) {
      <h2>{{ trip.title }}</h2>
      <p>{{ trip.location }} · {{ trip.startDate | date }}</p>
      <p>Precio aprox: {{ trip.price | currency:'EUR' }}</p>
    } @else {
      <p>Viaje no encontrado.</p>
    }
  `
})
export class TripDetailComponent {
  private route = inject(ActivatedRoute);
  private trips = inject(TripsService);
  trip$ = this.trips.getById(this.route.snapshot.paramMap.get('id') || '').pipe(map(t => t));
}