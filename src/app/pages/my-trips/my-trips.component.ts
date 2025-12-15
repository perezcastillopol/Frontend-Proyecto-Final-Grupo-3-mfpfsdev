import { Component, effect, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TripsService, Trip } from '../../core/services/trips.services';
import { TripCardComponent } from '../../shared/trip-card/trip-card.component';
import { ParticipantsService } from '../../core/services/participants.service';
import { TripEnrichmentService } from '../../core/services/trip-enrichment.service';

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
  private enrichmentService = inject(TripEnrichmentService);

  createdTrips: Trip[] = [];
  participatingTrips: Trip[] = [];
  selectedTab: 'created' | 'participating' = 'created';
  readonly pageSize = 8;
  currentPage = 1;

  constructor() {
    effect(() => {
      const userId = this.tripsSrv.me();
      void this.loadTrips(userId);
    });
  }

  private async loadTrips(userId: number) {
    if (!userId) {
      this.createdTrips = [];
      this.participatingTrips = [];
      this.goToPage(1);
      return;
    }

    const trips = await this.tripsSrv.list();
    const createdTripsBasic = trips.filter((t) => t.creatorId === userId);

    // Filter participating trips: check if user is actually a participant
    const participatingPromises = trips
      .filter((t) => t.creatorId !== userId)
      .map(async (trip) => {
        try {
          const result = await this.participantsSrv.isParticipants(trip.tripId, userId);
          return result.is_participant ? trip : null;
        } catch (error) {
          console.error(`Error checking participation for trip ${trip.tripId}:`, error);
          return null;
        }
      });

    const participatingResults = await Promise.all(participatingPromises);
    const participatingTripsBasic = participatingResults.filter((t): t is Trip => t !== null);

    // Enrich both lists with accurate participant counts
    this.createdTrips = await this.enrichmentService.enrichTripsWithParticipantCounts(createdTripsBasic);
    this.participatingTrips = await this.enrichmentService.enrichTripsWithParticipantCounts(participatingTripsBasic);
    this.goToPage(1);
  }

  get tripsToShow(): Trip[] {
    return this.selectedTab === 'created' ? this.createdTrips : this.participatingTrips;
  }

  get totalPages(): number {
    return Math.ceil(this.tripsToShow.length / this.pageSize);
  }

  get pagedTripsToShow(): Trip[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.tripsToShow.slice(startIndex, startIndex + this.pageSize);
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

  goToPage(page: number) {
    if (this.totalPages === 0) {
      this.currentPage = 1;
      return;
    }

    this.currentPage = Math.min(Math.max(page, 1), this.totalPages);
  }

  switchTab(tab: 'created' | 'participating') {
    this.selectedTab = tab;
    this.goToPage(1);
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
