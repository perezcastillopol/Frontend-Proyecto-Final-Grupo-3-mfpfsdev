import { Component, inject } from '@angular/core';
import { TripsService, Trip } from '../../core/services/trips.services';
import { TripCardComponent } from '../../shared/trip-card/trip-card.component';

@Component({
  selector: 'app-my-trips',
  standalone: true,
  imports: [TripCardComponent],
  templateUrl: './my-trips.component.html',
  styleUrl: './my-trips.component.css'
})
export class MyTripsComponent {
  private tripsSrv = inject(TripsService);
  trips: Trip[] = [];
  ngOnInit() { this.tripsSrv.myTrips().subscribe(d => this.trips = d); }
}