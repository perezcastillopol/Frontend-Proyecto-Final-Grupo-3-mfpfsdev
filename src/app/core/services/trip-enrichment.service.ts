import { Injectable, inject } from '@angular/core';
import { Trip } from './trips.services';
import { TripRequestService } from './trip-request.service';
import { UserService } from './user.services';

/**
 * Service to enrich trip data with accurate participant counts
 */
@Injectable({ providedIn: 'root' })
export class TripEnrichmentService {
  private requestService = inject(TripRequestService);
  private userService = inject(UserService);

  /**
   * Enrich a single trip with accurate participant count
   */
  async enrichTripWithParticipantCount(trip: Trip): Promise<Trip> {
    try {
      // Get accepted requests
      const acceptedRequests = await this.requestService.getAcceptedRequests(trip.tripId);

      // Check if creator is in the accepted requests
      const creatorInRequests = acceptedRequests.some(req => req.user_id === trip.creatorId);

      // Calculate participant count: accepted requests + creator (if not already counted)
      const participantCount = acceptedRequests.length + (creatorInRequests ? 0 : 1);

      return {
        ...trip,
        currentPeople: participantCount
      };
    } catch (error) {
      console.error(`Error enriching trip ${trip.tripId}:`, error);
      // Return original trip if enrichment fails
      return trip;
    }
  }

  /**
   * Enrich multiple trips with accurate participant counts
   */
  async enrichTripsWithParticipantCounts(trips: Trip[]): Promise<Trip[]> {
    // Enrich all trips in parallel for better performance
    const enrichedTripsPromises = trips.map(trip => this.enrichTripWithParticipantCount(trip));
    return Promise.all(enrichedTripsPromises);
  }
}
