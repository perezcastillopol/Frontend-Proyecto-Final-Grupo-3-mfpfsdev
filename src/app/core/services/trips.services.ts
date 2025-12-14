import {Injectable, computed, inject} from '@angular/core';
import {ITrip as TripModel} from '../../interfaces/trip.interface';
import {HttpServices} from './http.services';
import { AuthService } from './auth.service';

export type Trip = TripModel & {
  imageUrl?: string;
  currentPeople?: number;
  maxPeople?: number;
  modality_name?: string;
};

@Injectable({ providedIn: 'root' })

export class TripsService extends HttpServices {
  private auth = inject(AuthService);
  me = computed<number>(() => this.auth.userId());
  private url = '/trips';

  private mapTrip(api: any): Trip {
    const photoUrl = api.photo_url || api.imageUrl;
    const modalityName = api.modality_name || api.modalityName;
    return {
      tripId: Number(api.id),
      creatorId: Number(api.creator_id),
      title: api.title,
      description: api.description,
      start_date: api.start_date,
      end_date: api.end_date,
      cost_per_person: api.cost_per_person,
      min_participants: api.min_participants,
      max_participants: api.max_participants,
      location: api.location,
      transport: api.transport,
      itinerary: api.itinerary,
      status: api.status,
      created_at: api.created_at,
      updated_at: api.updated_at,
      modality_trip_id: Number(api.modality_trip_id),
      modality_name: modalityName,
      num_participants: api.num_participants,
      photo_url: photoUrl,
      imageUrl: photoUrl || `https://picsum.photos/seed/trip${api.id}/600/400`,
      currentPeople: api.current_people ?? api.num_participants ?? 0,
      maxPeople: api.maxPeople ?? api.max_participants ?? 0,
    };
  }

  async getTrips(): Promise<Trip[]> {
    const list = await this.get<Trip[]>(this.url);
  return list.map((t) => this.mapTrip(t));
  }

  async list(): Promise<Trip[]> {
    const list = await this.get<Trip[]>(this.url);
  return list.map((t) => this.mapTrip(t));
  }

  async myTrips(): Promise<Trip[]> {
    const userId = this.me();
    const trips = await this.list();
    return trips.filter((t) => t.creatorId === userId);
  }

  async getTripById(id: number): Promise<Trip> {
    const trip = await this.get(`${this.url}/${id}`);
    return this.mapTrip(trip);
  }

  async createTrip(tripData: Partial<TripModel>): Promise<Trip> {
    const trip = await this.post(this.url, tripData);
    return this.mapTrip(trip);
  }
}
