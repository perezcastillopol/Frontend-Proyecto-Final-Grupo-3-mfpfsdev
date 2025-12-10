import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TripInvitationService } from '../../core/services/trip-invitation.service';
import { ITripInvitation } from '../../interfaces/trip-invitation.interface';
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
  private invitationService = inject(TripInvitationService);
  private tripsService = inject(TripsService);

  tripId!: number;
  trip: Trip | null = null;
  invitations: ITripInvitation[] = [];
  filteredInvitations: ITripInvitation[] = [];
  isLoading = true;
  selectedFilter: 'all' | 'pending' | 'accepted' | 'rejected' = 'all';

  async ngOnInit() {
    this.tripId = Number(this.route.snapshot.paramMap.get('id'));

    try {
      this.trip = await this.tripsService.getTripById(this.tripId);
      await this.loadInvitations();
    } catch (error) {
      console.error('Error loading trip:', error);
      this.router.navigate(['/trips']);
    } finally {
      this.isLoading = false;
    }
  }

  async loadInvitations() {
    try {
      this.invitations = await this.invitationService.getInvitationHistory(this.tripId);
      this.applyFilter();
    } catch (error) {
      console.error('Error loading invitation history:', error);
      this.invitations = [];
      this.filteredInvitations = [];
    }
  }

  applyFilter() {
    if (this.selectedFilter === 'all') {
      this.filteredInvitations = this.invitations;
    } else {
      this.filteredInvitations = this.invitations.filter(
        inv => inv.status === this.selectedFilter
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

  getInvitationCount(status: 'all' | 'pending' | 'accepted' | 'rejected'): number {
    if (status === 'all') return this.invitations.length;
    return this.invitations.filter(inv => inv.status === status).length;
  }
}
