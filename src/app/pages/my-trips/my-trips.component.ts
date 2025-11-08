import { Component, inject } from '@angular/core';
import { TripsService, Trip } from '../../core/services/trips.services';
import { TripCardComponent } from '../../shared/trip-card/trip-card.component';

@Component({
  selector: 'app-my-trips',
  standalone: true,
  imports: [TripCardComponent],
  template: `
    <h2>Mis viajes</h2>
    <div class="grid">
      @for (t of trips; track t.id) {
        <app-trip-card [trip]="t" />
      }
    </div>
  `,
  styles: [`.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:12px}`]
})
export class MyTripsComponent {
  private tripsSrv = inject(TripsService);
  trips: Trip[] = [];
  ngOnInit() { this.tripsSrv.myTrips().subscribe(d => this.trips = d); }
}