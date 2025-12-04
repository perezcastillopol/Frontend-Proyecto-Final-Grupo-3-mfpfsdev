import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, CurrencyPipe, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TripsService, Trip } from '../../core/services/trips.services';
import { TripInvitationService } from '../../core/services/trip-invitation.service';
import { ITripInvitation } from '../../interfaces/trip-invitation.interface';

@Component({
  selector: 'app-trip-detail',
  standalone: true,
  imports: [DatePipe, CurrencyPipe, TitleCasePipe, FormsModule],
  templateUrl: './trip-detail.component.html',
  styleUrl: './trip-detail.component.css'
})
export class TripDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private tripsService = inject(TripsService);
  private invitationService = inject(TripInvitationService);
  private tripId = Number(this.route.snapshot.paramMap.get('id'));

  trip: Trip | null = null;
  isOwner = false;
  userInvitation: ITripInvitation | null = null;
  isRequestingInvitation = false;
  invitationNote = '';

  async ngOnInit() {
    try {
      const apiTrip = await this.tripsService.getTripById(this.tripId);
      this.trip = {
        ...apiTrip,
        imageUrl: apiTrip.imageUrl || `https://picsum.photos/seed/trip${apiTrip.tripId}/1200/600`,
        currentPeople: apiTrip.currentPeople ?? 0,
        maxPeople: apiTrip.maxPeople ?? apiTrip.max_participants ?? 10
      };

      // Check if current user is the owner
      const currentUserId = this.tripsService.me();
      this.isOwner = this.trip.creatorId === currentUserId;

      // Check if user has already requested invitation
      if (!this.isOwner) {
        this.userInvitation = await this.invitationService.getUserInvitationStatus(this.tripId, currentUserId);
      }
    } catch (error) {
      this.trip = null;
    }
  }

  modalityMap: Record<number, string> = {
    1: 'Aventura',
    2: 'Naturaleza',
    3: 'Ciudad',
    4: 'Playa',
  };

  defaultImage = 'https://picsum.photos/seed/trip-detail/1200/600';

  backgroundImage(trip: Trip | null): string {
    const image = (trip as any)?.imageUrl || this.defaultImage;
    return `linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.45) 60%), url('${image}')`;
  }

  /**
   * Navigate to manage invitations page (owner only)
   */
  manageInvitations() {
    if (this.isOwner) {
      this.router.navigate(['/trips', this.tripId, 'invitations']);
    }
  }

  /**
   * Navigate to invitation history page
   */
  viewInvitationHistory() {
    this.router.navigate(['/trips', this.tripId, 'invitations', 'history']);
  }

  /**
   * Request to join the trip
   */
  async requestToJoin() {
    if (this.isRequestingInvitation || this.userInvitation) return;

    this.isRequestingInvitation = true;
    try {
      const currentUserId = this.tripsService.me();
      this.userInvitation = await this.invitationService.requestInvitation(
        this.tripId,
        this.invitationNote || undefined
      );
      alert('Invitation request sent successfully!');
      this.invitationNote = '';
    } catch (error) {
      console.error('Error requesting invitation:', error);
      alert('Failed to send invitation request. Please try again.');
    } finally {
      this.isRequestingInvitation = false;
    }
  }

  /**
   * Get button text based on invitation status
   */
  getInvitationButtonText(): string {
    if (!this.userInvitation) return 'Request to Join';

    switch (this.userInvitation.status) {
      case 'pending':
        return 'Request Pending';
      case 'accepted':
        return 'Request Accepted';
      case 'rejected':
        return 'Request Rejected';
      default:
        return 'Request to Join';
    }
  }

  /**
   * Check if user can request invitation
   */
  canRequestInvitation(): boolean {
    return !this.isOwner && !this.userInvitation;
  }
}
