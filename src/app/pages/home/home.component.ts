import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HeroBannerComponent } from '../../shared/hero-banner/hero-banner.component';
import { TripCardComponent } from '../../shared/trip-card/trip-card.component';
import { Trip, TripsService } from '../../core/services/trips.services';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroBannerComponent, TripCardComponent ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  tripService = inject(TripsService);
  trips: Trip[] = [];

  constructor(private router: Router) {}

  async ngOnInit() {
    await this.loadTrips();
  }

  async loadTrips() {
    const apiTrips = await this.tripService.getTrips();
    this.trips = apiTrips.slice(0, 3).map(trip => ({
      ...trip,
      imageUrl: `https://picsum.photos/seed/trip${trip.tripId}/600/400`,
      currentPeople: 0,
      maxPeople: trip.max_participants ?? 10
    }));
  }

  onSearch(searchData: any) {
    console.log('Search data:', searchData);
    this.router.navigateByUrl('/explorar');
  }
}
