import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TripInvitationService } from '../../core/services/trip-invitation.service';
import { ITripInvitation } from '../../interfaces/trip-invitation.interface';
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
  private invitationService = inject(TripInvitationService);
  private tripsService = inject(TripsService);

  tripId!: number;
  trip: Trip | null = null;
  invitations: ITripInvitation[] = [];
  pendingInvitations: ITripInvitation[] = [];
  isLoading = true;
  processingInvitationId: number | null = null;

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
      this.invitations = await this.invitationService.getInvitations(this.tripId);
      this.pendingInvitations = this.invitations.filter(inv => inv.status === 'pending');
    } catch (error) {
      console.error('Error loading invitations:', error);
      this.invitations = [];
      this.pendingInvitations = [];
    }
  }

  async acceptInvitation(invitation: ITripInvitation) {
    if (this.processingInvitationId) return;

    this.processingInvitationId = invitation.id;
    try {
      await this.invitationService.respondToInvitation(
        this.tripId,
        invitation.id,
        'accepted'
      );
      await this.loadInvitations();
    } catch (error) {
      console.error('Error accepting invitation:', error);
      alert('Failed to accept invitation. Please try again.');
    } finally {
      this.processingInvitationId = null;
    }
  }

  async rejectInvitation(invitation: ITripInvitation) {
    if (this.processingInvitationId) return;

    this.processingInvitationId = invitation.id;
    try {
      await this.invitationService.respondToInvitation(
        this.tripId,
        invitation.id,
        'rejected'
      );
      await this.loadInvitations();
    } catch (error) {
      console.error('Error rejecting invitation:', error);
      alert('Failed to reject invitation. Please try again.');
    } finally {
      this.processingInvitationId = null;
    }
  }

  goBack() {
    this.router.navigate(['/trips', this.tripId]);
  }

  viewHistory() {
    this.router.navigate(['/trips', this.tripId, 'invitations', 'history']);
  }
}
