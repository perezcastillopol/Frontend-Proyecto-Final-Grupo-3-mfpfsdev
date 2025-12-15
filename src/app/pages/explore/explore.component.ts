import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { TripCardComponent } from '../../shared/trip-card/trip-card.component';
import { SearchBannerComponent, SearchFilters } from '../../shared/search-banner/search-banner.component';
import { Trip, TripsService } from '../../core/services/trips.services';
import { ModalityService } from '../../core/services/modality.service';
import { IModality } from '../../interfaces/modality.interface';
import { TripEnrichmentService } from '../../core/services/trip-enrichment.service';

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
	  private modalityService = inject(ModalityService);
	  private route = inject(ActivatedRoute);
	  private enrichmentService = inject(TripEnrichmentService);

	  allTrips: Trip[] = [];
	  filteredTrips: Trip[] = [];
	  modalities: IModality[] = [];
	  readonly pageSize = 8;
	  currentPage = 1;
	  private currentFilters: SearchFilters = {
	    query: '',
	    category: '',
	    status: '',
	    startDate: '',
    endDate: '',
  };

  private categoryToModality: Record<string, number> = {};

  async ngOnInit() {
    // Load modalities first
    const modalities = await this.modalityService.getAllModalities();
    this.modalities = modalities;

    // Build the categoryToModality mapping dynamically
    this.categoryToModality = modalities.reduce((acc, modality) => {
      acc[modality.name] = modality.id;
      return acc;
    }, {} as Record<string, number>);

    // Read query params from URL using firstValueFrom
    const params = await firstValueFrom(this.route.queryParams);
    const filters: SearchFilters = {
      query: params['destination'] || '',
      category: this.mapExperienceToCategory(params['experience']) || '',
      status: '',
      startDate: params['startDate'] || '',
      endDate: params['endDate'] || '',
    };
    this.currentFilters = filters;

    // Load trips
    const trips = await this.tripsService.getTrips();
    const tripsWithBasicData = trips.map(trip => ({
      ...trip,
      imageUrl: trip.imageUrl,
      currentPeople: trip.currentPeople ?? 0,
      maxPeople: trip.maxPeople ?? trip.max_participants ?? 0
    }));

    // Enrich trips with accurate participant counts
    this.allTrips = await this.enrichmentService.enrichTripsWithParticipantCounts(tripsWithBasicData);
    this.applyFilters(this.currentFilters);
  }

	  onSearch(filters: SearchFilters) {
	    this.currentFilters = filters;
	    this.applyFilters(filters);
	  }

	  get totalPages(): number {
	    return Math.ceil(this.filteredTrips.length / this.pageSize);
	  }

	  get pagedTrips(): Trip[] {
	    const startIndex = (this.currentPage - 1) * this.pageSize;
	    return this.filteredTrips.slice(startIndex, startIndex + this.pageSize);
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

	  private mapExperienceToCategory(experience: string | undefined): string {
	    if (!experience) return '';

    const experienceLower = experience.toLowerCase().trim();

    // Find matching modality by name (case-insensitive)
    const matchingModality = this.modalities.find(
      modality => modality.name.toLowerCase() === experienceLower
    );

    return matchingModality ? matchingModality.name : '';
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

	    this.goToPage(1);
	  }
	}
