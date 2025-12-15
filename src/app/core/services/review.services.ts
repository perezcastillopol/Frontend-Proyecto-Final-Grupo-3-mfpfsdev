import {Injectable} from '@angular/core';
import {HttpServices} from './http.services';
import {ReviewResponse} from '../../interfaces/reviewResponse.interfaces';
import {ReviewBodyRequest} from '../../interfaces/reviewBodyRequest.interfaces';


@Injectable({
  providedIn: 'root'
})
export class ReviewService extends HttpServices {

  private url = '/reviews';

  listByTrip(tripId: number): Promise<ReviewResponse[]> {
    return this.get(`${this.url}/trip/${tripId}`);
  }

  create(body: ReviewBodyRequest): Promise<{id: number}> {
    return this.post(this.url, body);
  }

  update(reviewId: number,  body: ReviewBodyRequest): Promise<void> {
    return this.put(`${this.url}/${reviewId}`, body);
  }

  deleteReview(reviewId: number): Promise<void> {
    return this.delete(`${this.url}/${reviewId}`);
  }
}



