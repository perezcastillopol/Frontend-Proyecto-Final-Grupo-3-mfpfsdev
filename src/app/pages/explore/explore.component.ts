import { Component, inject } from '@angular/core';
import { TripsService, Trip } from '../../core/services/trips.services';
import { SearchBannerComponent } from '../../shared/search-banner/search-banner.component';
import { TripCardComponent } from '../../shared/trip-card/trip-card.component';

@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [SearchBannerComponent, TripCardComponent],
  template: `
    <h2>Explorar viajes</h2>
    <app-search-banner (search)="reload()"></app-search-banner>

    <div class="grid">
      @for (t of trips; track t.id) {
        <app-trip-card [trip]="t" />
      }
    </div>
  `,
  styles: [`.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:12px}`]
})
export class ExploreComponent {
  private tripsSrv = inject(TripsService);
  trips: Trip[] = [];

  ngOnInit() { this.reload(); }
  reload() { this.tripsSrv.list().subscribe(d => this.trips = d); }
}