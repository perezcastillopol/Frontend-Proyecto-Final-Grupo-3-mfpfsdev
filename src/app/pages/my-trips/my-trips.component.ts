import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TripsService, Trip } from '../../core/services/trips.services';
import { ParticipantsService } from '../../core/services/participants.service';
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
  private participantsSrv = inject(ParticipantsService);

  createdTrips: Trip[] = [];
  participatingTrips: Trip[] = [];
  selectedTab: 'created' | 'participating' = 'created';

  async ngOnInit() {
    const userId = this.tripsSrv.me();
    const trips = await this.tripsSrv.list();

    // Filter trips created by the user
    this.createdTrips = trips.filter((t) => t.creatorId === userId);

    // Get trips where the user is a participant (but not the creator)
    await this.loadParticipatingTrips(trips, userId);
  }

  private async loadParticipatingTrips(allTrips: Trip[], userId: number) {
    // Check each trip to see if the user is a participant
    const participantChecks = await Promise.all(
      allTrips
        .filter((t) => t.creatorId !== userId) // Exclude trips created by user
        .map(async (trip) => {
          try {
            const result = await this.participantsSrv.isParticipants(trip.tripId, userId);
            return result.is_participant ? trip : null;
          } catch (error) {
            console.error(`Error checking participation for trip ${trip.tripId}:`, error);
            return null;
          }
        })
    );

    // Filter out null values and assign to participatingTrips
    this.participatingTrips = participantChecks.filter((trip): trip is Trip => trip !== null);
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
