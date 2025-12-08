export interface ITrip {
  tripId: number;
  creatorId: number;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  cost_per_person: number;
  min_participants: number;
  max_participants: number;
  location: string;
  transport: string;
  itinerary: string;
  status: string;
  created_at: string;
  updated_at: string;
  modality_trip_id: number;
  num_participants?: number;
  photo_url?: string;
}
