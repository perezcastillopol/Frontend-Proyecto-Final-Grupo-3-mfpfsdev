import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe, DatePipe, CurrencyPipe } from '@angular/common';
import { TripsService, Trip } from '../../core/services/trips.services';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-trip-detail',
  standalone: true,
  imports: [AsyncPipe, DatePipe, CurrencyPipe],
  templateUrl: './trip-detail.component.html'
})
export class TripDetailComponent {
  private route = inject(ActivatedRoute);
  private trips = inject(TripsService);
  trip$ = this.trips.getById(this.route.snapshot.paramMap.get('id') || '').pipe(map(t => t));
}