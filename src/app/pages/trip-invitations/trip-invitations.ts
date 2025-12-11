import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TripRequestService } from '../../core/services/trip-request.service';
import { ITripRequest } from '../../interfaces/trip-request.interface';
import { TripsService, Trip } from '../../core/services/trips.services';

@Component({
  selector: 'app-trip-invitations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-invitations.html',
  styleUrl: './trip-invitations.css',
})
export class TripInvitations implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private requestService = inject(TripRequestService);
  private tripsService = inject(TripsService);

  tripId!: number;
  trip: Trip | null = null;
  requests: ITripRequest[] = [];
  pendingRequests: ITripRequest[] = [];
  isLoading = true;
  processingRequestId: number | null = null;

  async ngOnInit() {
    this.tripId = Number(this.route.snapshot.paramMap.get('id'));

    // Verify user is the owner
    const currentUserId = this.tripsService.me();
    try {
      this.trip = await this.tripsService.getTripById(this.tripId);

      if (this.trip.creatorId !== currentUserId) {
        // User is not the owner, redirect to trip detail
        this.router.navigate(['/trips', this.tripId]);
        return;
      }

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
      this.requests = await this.requestService.getRequests(this.tripId);
      this.pendingRequests = this.requests.filter((req: ITripRequest) => req.status === 'pending');
    } catch (error) {
      console.error('Error loading requests:', error);
      this.requests = [];
      this.pendingRequests = [];
    }
  }

  async acceptRequest(request: ITripRequest) {
    if (this.processingRequestId) return;

    this.processingRequestId = request.id;
    try {
      await this.requestService.respondToRequest(
        this.tripId,
        request.id,
        'accepted'
      );
      await this.loadRequests();
    } catch (error) {
      console.error('Error accepting request:', error);
      alert('Failed to accept request. Please try again.');
    } finally {
      this.processingRequestId = null;
    }
  }

  async rejectRequest(request: ITripRequest) {
    if (this.processingRequestId) return;

    this.processingRequestId = request.id;
    try {
      await this.requestService.respondToRequest(
        this.tripId,
        request.id,
        'rejected'
      );
      await this.loadRequests();
    } catch (error) {
      console.error('Error rejecting request:', error);
      alert('Failed to reject request. Please try again.');
    } finally {
      this.processingRequestId = null;
    }
  }

  goBack() {
    this.router.navigate(['/trips', this.tripId]);
  }

  viewHistory() {
    this.router.navigate(['/trips', this.tripId, 'invitations', 'history']);
  }
}
