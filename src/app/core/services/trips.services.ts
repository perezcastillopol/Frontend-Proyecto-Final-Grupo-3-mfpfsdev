import {Injectable, signal} from '@angular/core';
import {lastValueFrom, map, Observable} from 'rxjs';
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

  getTrips(): Promise<Trip[]> {
    return lastValueFrom(
      this.get(this.url).pipe(map((list: any[]) => list.map((t) => this.mapTrip(t))))
    );
  }

  list(): Observable<Trip[]> {
    return this.get(this.url).pipe(map((list: any[]) => list.map((t) => this.mapTrip(t))));
  }

  myTrips(): Observable<Trip[]> {
    const userId = this.me();
    return this.list().pipe(map((trips) => trips.filter((t) => t.creatorId === userId)));
  }

  getTripById(id: number): Promise<Trip> {
    return lastValueFrom(
      this.get(`${this.url}/${id}`).pipe(map((trip) => this.mapTrip(trip)))
    );
  }

  createTrip(tripData: Partial<TripModel>): Promise<Trip> | undefined {
    return lastValueFrom(this.post(this.url, tripData)).then((trip) => this.mapTrip(trip));
  }
}
