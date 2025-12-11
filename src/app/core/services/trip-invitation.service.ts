import { Injectable } from '@angular/core';
import { HttpServices } from './http.services';
import { ITripInvitation, ICreateInvitationRequest, IRespondToInvitationRequest } from '../../interfaces/trip-invitation.interface';

@Injectable({ providedIn: 'root' })
export class TripInvitationService extends HttpServices {

    /**
     * Request to join a trip
     */
    async requestInvitation(tripId: number, note?: string): Promise<ITripInvitation> {
        const body: ICreateInvitationRequest = {
            userId: 1, // stub - will be replaced with actual user ID
            note: note || undefined
        };
        return this.post(`/trips/${tripId}/invitations`, body);
    }

    /**
     * Get all invitations for a specific trip (owner only)
     */
    async getInvitations(tripId: number): Promise<ITripInvitation[]> {
        return this.get(`/trips/${tripId}/invitations`);
    }

    /**
     * Get pending invitations for a specific trip
     */
    async getPendingInvitations(tripId: number): Promise<ITripInvitation[]> {
        const invitations = await this.getInvitations(tripId);
        return invitations.filter(inv => inv.status === 'pending');
    }

    /**
     * Accept or reject an invitation
     */
    async respondToInvitation(
        tripId: number,
        invitationId: number,
        status: 'accepted' | 'rejected'
    ): Promise<ITripInvitation> {
        const body: IRespondToInvitationRequest = {
            status,
            responderId: 1 // stub - will be replaced with actual user ID
        };
        return this.put(`/trips/${tripId}/invitations/${invitationId}`, body);
    }

    /**
     * Get invitation history for a trip
     */
    async getInvitationHistory(tripId: number): Promise<ITripInvitation[]> {
        return this.get(`/trips/${tripId}/invitations/history`);
    }

    /**
     * Check if a user has already requested to join a trip
     */
    async getUserInvitationStatus(tripId: number, userId: number): Promise<ITripInvitation | null> {
        try {
            const invitations = await this.getInvitations(tripId);
            const userInvitation = invitations.find(inv => inv.user_id === userId);
            return userInvitation || null;
        } catch (error) {
            return null;
        }
    }

    /**
     * Check if user has a pending invitation for a trip
     */
    async hasPendingInvitation(tripId: number, userId: number): Promise<boolean> {
        const invitation = await this.getUserInvitationStatus(tripId, userId);
        return invitation?.status === 'pending';
    }
}
