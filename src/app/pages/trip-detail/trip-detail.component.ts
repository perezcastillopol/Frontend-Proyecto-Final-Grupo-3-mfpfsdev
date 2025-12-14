import {Component, inject, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TripsService, Trip } from '../../core/services/trips.services';
import {ReviewListComponent} from '../reviews/review-list/review-list.component';
import {ReviewFormComponent} from '../reviews/review-form/review-form.component';
import { TripRequestService } from '../../core/services/trip-request.service';
import { ITripRequest } from '../../interfaces/trip-request.interface';
import {TripParticipant} from '../../interfaces/trip-participant.interface';
import {ParticipantsService} from '../../core/services/participants.service';
import { ForumComponent } from '../../shared/forum/forum.component';

@Component({
  selector: 'app-trip-detail',
  standalone: true,
  imports: [DatePipe, CurrencyPipe, ReviewFormComponent, ReviewListComponent, FormsModule, ForumComponent, RouterLink],
  templateUrl: './trip-detail.component.html',
  styleUrl: './trip-detail.component.css'
})
export class TripDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private tripsService = inject(TripsService);
  private requestService  = inject(TripRequestService);
  private tripId = Number(this.route.snapshot.paramMap.get('id'));
  private participantService = inject(ParticipantsService);

  trip: Trip | null = null;
  isOwner = false;
  userRequest: ITripRequest | null = null;
  isRequestingToJoin = false;
  requestNote = '';
  currentUserId: number | null = null;
  participants: TripParticipant[] = [];
  isRequestingInvitation = false;
  invitationNote = '';
  isParticipant = false;


  @ViewChild('reviewList') reviewList!: ReviewListComponent;
  @ViewChild('reviewForm') reviewForm!: ReviewFormComponent;

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
      this.currentUserId = currentUserId;
      this.isOwner = this.trip.creatorId === currentUserId;

      // Load accepted participants to show in review form
      await this.loadParticipants();

      // Check if user has already requested invitation
      if (!this.isOwner) {
        this.userRequest = await this.requestService.getUserRequestStatus(this.tripId, currentUserId);
      }

      // Check if user is participant
      const participantResponse = await this.participantService.isParticipants(this.tripId, currentUserId);
      this.isParticipant = participantResponse.is_participant;
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

  async onReviewCreated() {
    try {
      if (this.reviewList) await this.reviewList.refresh();
    } catch (err) {
      console.error('Error refrescando lista de reviews', err);
    }
  }

  /**
   * Navigate to manage requests page (owner only)
   */
  manageRequests() {
    if (this.isOwner) {
      this.router.navigate(['/viaje', this.tripId, 'invitations']);
    }
  }

  /**
   * Navigate to request history page
   */
  viewRequestHistory() {
    this.router.navigate(['/viaje', this.tripId, 'invitations', 'history']);
  }

  /**
   * Request to join the trip
   */
  async requestToJoin() {
    if (this.isRequestingToJoin || this.userRequest) return;

    this.isRequestingToJoin = true;
    try {
      this.userRequest = await this.requestService.createRequest(
        this.tripId,
        this.requestNote || undefined
      );
      alert('Request to join sent successfully!');
      this.requestNote = '';
    } catch (error) {
      console.error('Error requesting to join:', error);
      alert('Failed to send request. Please try again.');
    } finally {
      this.isRequestingToJoin = false;
    }
  }

  /**
   * Get button text based on request status
   */
  getRequestButtonText(): string {
    if (!this.userRequest) return 'Request to Join';

    switch (this.userRequest.status) {
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
   * Check if user can request to join
   */
  canRequestToJoin(): boolean {
    return !this.isOwner && !this.userRequest;
  }

  private async loadParticipants() {
    try {
      const list = await this.participantService.getParticipants(this.tripId);
      this.participants = list;
    } catch (error) {
      console.error('Error loading participants', error);
      this.participants = [];
    }
  }
  canReview(): boolean {
    if (!this.currentUserId) return false;
    return this.participants.some(participant => participant.id === this.currentUserId);
  }
}
