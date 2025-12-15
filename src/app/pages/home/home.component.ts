import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HeroBannerComponent } from '../../shared/hero-banner/hero-banner.component';
import { TripCardComponent } from '../../shared/trip-card/trip-card.component';
import { Trip, TripsService } from '../../core/services/trips.services';
import { TripEnrichmentService } from '../../core/services/trip-enrichment.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroBannerComponent, TripCardComponent ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  tripService = inject(TripsService);
  enrichmentService = inject(TripEnrichmentService);
  trips: Trip[] = [];

  constructor(private router: Router) {}

  async ngOnInit() {
    await this.loadTrips();
  }

  async loadTrips() {
    const apiTrips = await this.tripService.getTrips();
    const tripsWithBasicData = apiTrips.slice(0, 4).map(trip => ({
      ...trip,
      imageUrl: trip.imageUrl,
      currentPeople: trip.currentPeople ?? 0,
      maxPeople: trip.maxPeople ?? trip.max_participants ?? 0
    }));

    // Enrich trips with accurate participant counts
    this.trips = await this.enrichmentService.enrichTripsWithParticipantCounts(tripsWithBasicData);
  }

  onSearch(searchData: any) {
    console.log('Search data:', searchData);
    this.router.navigateByUrl('/explorar');
  }
}
