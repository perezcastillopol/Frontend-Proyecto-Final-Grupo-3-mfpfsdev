export interface ReviewResponse {
  id?: number;
  trip_id?: number;
  reviewer_id?: number;
  reviewee_id: number;
  rating: number;
  comment?: string;
  created_at?: string;
  reviewer_name?: string;
  reviewer_photo?: string;
}
