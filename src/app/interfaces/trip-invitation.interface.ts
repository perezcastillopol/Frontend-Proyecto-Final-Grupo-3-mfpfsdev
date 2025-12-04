export interface ITripInvitation {
    id: number;
    trip_id: number;
    user_id: number;
    status: 'pending' | 'accepted' | 'rejected';
    note: string | null;
    requested_at: string;
    responded_at: string | null;
    responder_id: number | null;
}

export interface ICreateInvitationRequest {
    userId: number;
    note?: string;
}

export interface IRespondToInvitationRequest {
    status: 'accepted' | 'rejected';
    responderId: number;
}
