import { Injectable } from '@angular/core';
import { HttpServices } from './http.services';
import { ITripRequest, ICreateTripRequestRequest, IRespondToTripRequestRequest } from '../../interfaces/trip-request.interface';

@Injectable({ providedIn: 'root' })
export class TripRequestService extends HttpServices {

    /**
     * Request to join a trip
     * POST /api/trip-requests/:tripId
     */
    async createRequest(tripId: number, note?: string): Promise<ITripRequest> {
        const body: ICreateTripRequestRequest = {
            note: note || undefined
        };
        return this.post(`/trip-requests/${tripId}`, body);
    }

    /**
     * Get all requests for a specific trip
     * GET /api/trip-requests/:tripId
     */
    async getRequests(tripId: number): Promise<ITripRequest[]> {
        return this.get(`/trip-requests/${tripId}`);
    }

    /**
     * Get pending requests for a specific trip
     */
    async getPendingRequests(tripId: number): Promise<ITripRequest[]> {
        const requests = await this.getRequests(tripId);
        return requests.filter(req => req.status === 'pending');
    }

    /**
     * Accept or reject a trip request
     * PUT /api/trip-requests/:tripId/:requestId
     */
    async respondToRequest(
        tripId: number,
        requestId: number,
        status: 'accepted' | 'rejected'
    ): Promise<ITripRequest> {
        const body: IRespondToTripRequestRequest = {
            status
        };
        return this.put(`/trip-requests/${tripId}/${requestId}`, body);
    }

    /**
     * Get request history for a trip
     * GET /api/trip-requests/:tripId/history
     */
    async getRequestHistory(tripId: number): Promise<ITripRequest[]> {
        return this.get(`/trip-requests/${tripId}/history`);
    }

    /**
     * Check if the current user has already requested to join a trip
     */
    async getUserRequestStatus(tripId: number, userId: number): Promise<ITripRequest | null> {
        try {
            const requests = await this.getRequests(tripId);
            const userRequest = requests.find(req => req.user_id === userId);
            return userRequest || null;
        } catch (error) {
            return null;
        }
    }

    /**
     * Check if user has a pending or accepted request for a trip
     */
    async hasPendingOrAcceptedRequest(tripId: number, userId: number): Promise<boolean> {
        const request = await this.getUserRequestStatus(tripId, userId);
        return request?.status === 'pending' || request?.status === 'accepted';
    }

    /**
     * Get accepted requests for a trip with full user details
     * GET /api/trip-requests/:tripId/accepted
     */
    async getAcceptedRequests(tripId: number): Promise<ITripRequest[]> {
        return this.get(`/trip-requests/${tripId}/accepted`);
    }
}
