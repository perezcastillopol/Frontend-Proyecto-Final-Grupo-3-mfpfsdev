import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TripsService, Trip } from '../../core/services/trips.services';
import { TripCardComponent } from '../../shared/trip-card/trip-card.component';

@Component({
  selector: 'app-my-trips',
  standalone: true,
  imports: [TripCardComponent, RouterLink],
  templateUrl: './my-trips.component.html',
  styleUrl: './my-trips.component.css'
})
export class MyTripsComponent {
  private tripsSrv = inject(TripsService);

  createdTrips: Trip[] = [];
  participatingTrips: Trip[] = [];
  selectedTab: 'created' | 'participating' = 'created';

  async ngOnInit() {
    const userId = this.tripsSrv.me();
    const trips = await this.tripsSrv.list();
    this.createdTrips = trips.filter((t) => t.creatorId === userId);
    this.participatingTrips = trips.filter((t) => t.creatorId !== userId);
  }

  get tripsToShow(): Trip[] {
    return this.selectedTab === 'created' ? this.createdTrips : this.participatingTrips;
  }

  switchTab(tab: 'created' | 'participating') {
    this.selectedTab = tab;
  }

  get emptyTitle(): string {
    return this.selectedTab === 'created'
      ? 'Aún no has creado ningún viaje'
      : 'Todavía no participas en ningún viaje';
  }

  get emptySubtitle(): string {
    return this.selectedTab === 'created'
      ? 'Crea tu primer viaje y empieza a conectar con otros viajeros.'
      : 'Explora viajes y únete a nuevas aventuras con otros viajeros.';
  }

  get ctaLabel(): string {
    return this.selectedTab === 'created' ? 'Crear mi primer viaje' : 'Explorar viajes';
  }

  get ctaLink(): string {
    return this.selectedTab === 'created' ? '/crear' : '/explorar';
  }
}
