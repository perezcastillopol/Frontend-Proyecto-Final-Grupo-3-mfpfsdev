export interface ReviewBodyRequest {
  trip_id: number;
  reviewee_id: number;
  rating: number;
  comment?: string | null;
}
