import { Component, inject, OnInit } from '@angular/core';
import { TripCardComponent } from '../../shared/trip-card/trip-card.component';
import { SearchBannerComponent, SearchFilters } from '../../shared/search-banner/search-banner.component';
import { Trip, TripsService } from '../../core/services/trips.services';

@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [SearchBannerComponent, TripCardComponent],
  templateUrl: './explore.component.html',
  styleUrl: './explore.component.css'
})
export class ExploreComponent implements OnInit {
  searchParams: any = {};
  private tripsService = inject(TripsService);

  allTrips: Trip[] = [];
  filteredTrips: Trip[] = [];
  private currentFilters: SearchFilters = {
    query: '',
    category: '',
    status: '',
    startDate: '',
    endDate: '',
  };

  private categoryToModality: Record<string, number> = {
    Aventura: 1,
    Naturaleza: 2,
    Ciudad: 3,
    Playa: 4,
  };

  ngOnInit() {
    this.tripsService.getTrips().then(trips => {
      this.allTrips = trips.map(trip => ({
        ...trip,
        imageUrl: trip.imageUrl, 
        currentPeople: trip.currentPeople ?? 0,
        maxPeople: trip.maxPeople ?? trip.max_participants ?? 0
      }));
      this.applyFilters(this.currentFilters);
    });
  }

  onSearch(filters: SearchFilters) {
    this.currentFilters = filters;
    this.applyFilters(filters);
  }

  private applyFilters(filters: SearchFilters) {
    const query = filters.query?.trim().toLowerCase() || '';
    const modalityId = filters.category ? this.categoryToModality[filters.category] : undefined;
    const status = filters.status?.toLowerCase() || '';
    const startDate = filters.startDate ? new Date(filters.startDate) : null;
    const endDate = filters.endDate ? new Date(filters.endDate) : null;

    this.filteredTrips = this.allTrips.filter(trip => {
      const title = trip.title?.toLowerCase() || '';
      const location = (trip.location || (trip as any).destination)?.toLowerCase() || '';

      if (query && !title.includes(query) && !location.includes(query)) {
        return false;
      }

      if (modalityId && trip.modality_trip_id !== modalityId) {
        return false;
      }

      if (status && (trip.status?.toLowerCase() || '') !== status) {
        return false;
      }

      if (startDate) {
        const tripStart = new Date(trip.start_date);
        if (isNaN(tripStart.getTime()) || tripStart < startDate) {
          return false;
        }
      }

      if (endDate) {
        const tripEnd = trip.end_date ? new Date(trip.end_date) : new Date(trip.start_date);
        if (isNaN(tripEnd.getTime()) || tripEnd > endDate) {
          return false;
        }
      }

      return true;
    });
  }
}
