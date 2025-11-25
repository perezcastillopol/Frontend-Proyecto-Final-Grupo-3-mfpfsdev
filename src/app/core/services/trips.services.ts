import { Injectable, signal } from '@angular/core';
import { of } from 'rxjs';
import { Trip as TripModel } from '../../interfaces/trip.interface';

export type Trip = TripModel;

@Injectable({ providedIn: 'root' })
export class TripsService {
  private userId = 1; // stub de usuario actual
  me = signal<number>(this.userId);

  private trips: Trip[] = [
    {
      tripId: 1,
      creatorId: 1,
      title: 'Escapada de senderismo a los Picos de Europa',
      description: 'Ruta de 3 días por los Picos de Europa con alojamiento en casas rurales y excursiones guiadas.',
      destination: 'Picos de Europa',
      startDate: '2025-06-14',
      endDate: '2025-06-17',
      costPerPerson: 180.0,
      minParticipants: 4,
      accommodation: 'Casa rural',
      transport: 'Coche compartido',
      itinerary: 'Día 1: Cangas de Onís · Día 2: Lagos de Covadonga · Día 3: Ruta del Cares',
      status: 'abierto',
      createdAt: '2025-04-25 18:23:00',
      modalityId: 2
    }
  ];

  list() { return of(this.trips); }

  myTrips() { return of(this.trips.filter(t => t.creatorId === this.userId)); }

  getById(id: number | string) {
    const numericId = typeof id === 'string' ? Number(id) : id;
    return of(this.trips.find(t => t.tripId === numericId) || null);
  }
}
