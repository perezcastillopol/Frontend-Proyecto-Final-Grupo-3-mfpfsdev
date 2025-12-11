import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TripRequestService } from '../../core/services/trip-request.service';
import { ITripRequest } from '../../interfaces/trip-request.interface';
import { TripsService, Trip } from '../../core/services/trips.services';

@Component({
  selector: 'app-trip-invitation-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-invitation-history.html',
  styleUrl: './trip-invitation-history.css',
})
export class TripInvitationHistory implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private requestService = inject(TripRequestService);
  private tripsService = inject(TripsService);

  tripId!: number;
  trip: Trip | null = null;
  requests: ITripRequest[] = [];
  filteredRequests: ITripRequest[] = [];
  isLoading = true;
  selectedFilter: 'all' | 'pending' | 'accepted' | 'rejected' = 'all';

  async ngOnInit() {
    this.tripId = Number(this.route.snapshot.paramMap.get('id'));

    try {
      this.trip = await this.tripsService.getTripById(this.tripId);
      await this.loadRequests();
    } catch (error) {
      console.error('Error loading trip:', error);
      this.router.navigate(['/trips']);
    } finally {
      this.isLoading = false;
    }
  }

  async loadRequests() {
    try {
      this.requests = await this.requestService.getRequestHistory(this.tripId);
      this.applyFilter();
    } catch (error) {
      console.error('Error loading request history:', error);
      this.requests = [];
      this.filteredRequests = [];
    }
  }

  applyFilter() {
    if (this.selectedFilter === 'all') {
      this.filteredRequests = this.requests;
    } else {
      this.filteredRequests = this.requests.filter(
        (req: ITripRequest) => req.status === this.selectedFilter
      );
    }
  }

  setFilter(filter: 'all' | 'pending' | 'accepted' | 'rejected') {
    this.selectedFilter = filter;
    this.applyFilter();
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'pending':
        return 'bg-warning text-dark';
      case 'accepted':
        return 'bg-success';
      case 'rejected':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'pending':
        return 'Pendiente';
      case 'accepted':
        return 'Aceptada';
      case 'rejected':
        return 'Rechazada';
      default:
        return status;
    }
  }

  goBack() {
    this.router.navigate(['/trips', this.tripId]);
  }

  getRequestCount(status: 'all' | 'pending' | 'accepted' | 'rejected'): number {
    if (status === 'all') return this.requests.length;
    return this.requests.filter((req: ITripRequest) => req.status === status).length;
  }
}
