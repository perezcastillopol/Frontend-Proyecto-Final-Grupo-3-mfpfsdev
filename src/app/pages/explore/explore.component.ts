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
    this.tripsService.list().subscribe(trips => {
      this.allTrips = trips;
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
      const destination = trip.destination?.toLowerCase() || '';

      if (query && !title.includes(query) && !destination.includes(query)) {
        return false;
      }

      if (modalityId && trip.modalityId !== modalityId) {
        return false;
      }

      if (status && (trip.status?.toLowerCase() || '') !== status) {
        return false;
      }

      if (startDate) {
        const tripStart = new Date(trip.startDate);
        if (isNaN(tripStart.getTime()) || tripStart < startDate) {
          return false;
        }
      }

      if (endDate) {
        const tripEnd = trip.endDate ? new Date(trip.endDate) : new Date(trip.startDate);
        if (isNaN(tripEnd.getTime()) || tripEnd > endDate) {
          return false;
        }
      }

      return true;
    });
  }
}
