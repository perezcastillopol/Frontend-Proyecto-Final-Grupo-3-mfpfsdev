import {Injectable, signal} from '@angular/core';
import {ITrip as TripModel} from '../../interfaces/trip.interface';
import {HttpServices} from './http.services';

export type Trip = TripModel & {
  imageUrl?: string;
  currentPeople?: number;
  maxPeople?: number;
};

@Injectable({ providedIn: 'root' })

export class TripsService extends HttpServices {
  private userId = 1; // stub de usuario actual. Cambiar cuando hagamos conexión con el front.
  me = signal<number>(this.userId);
  private url = '/trips';

  private mapTrip(api: any): Trip {
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
      imageUrl: api.imageUrl || `https://picsum.photos/seed/trip${api.id}/600/400`,
      currentPeople: api.current_people ?? 0,
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
