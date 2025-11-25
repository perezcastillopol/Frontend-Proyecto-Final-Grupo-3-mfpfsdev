import { Injectable, signal } from '@angular/core';
import { of } from 'rxjs';
import { Trip as TripModel } from '../../interfaces/trip.interface';

export type Trip = TripModel & {
  imageUrl?: string;
  currentPeople?: number;
  maxPeople?: number;
};

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
      modalityId: 2,
      imageUrl: 'https://picsum.photos/seed/picos/600/400',
      currentPeople: 6,
      maxPeople: 10
    },
    {
      tripId: 2,
      creatorId: 2,
      title: 'City break en Lisboa',
      description: 'Fin de semana largo explorando los miradouros, pastelerías y el barrio de Alfama.',
      destination: 'Lisboa',
      startDate: '2025-11-25',
      endDate: '2025-11-28',
      costPerPerson: 220.0,
      minParticipants: 2,
      accommodation: 'Hotel céntrico',
      transport: 'Avión + metro',
      itinerary: 'Día 1: Baixa y Chiado · Día 2: Belém · Día 3: Sintra',
      status: 'abierto',
      createdAt: '2025-04-28 10:00:00',
      modalityId: 3,
      imageUrl: 'https://picsum.photos/seed/lisboa/600/400',
      currentPeople: 4,
      maxPeople: 8
    },
    {
      tripId: 3,
      creatorId: 3,
      title: 'Surf y volcán en Lanzarote',
      description: 'Clases de surf en Famara y excursión al Parque Nacional de Timanfaya.',
      destination: 'Lanzarote',
      startDate: '2025-07-10',
      endDate: '2025-07-14',
      costPerPerson: 320.0,
      minParticipants: 3,
      accommodation: 'Apartamentos cerca de la playa',
      transport: 'Vuelo + coche de alquiler',
      itinerary: 'Día 1: Llegada y puesta de sol · Día 2-3: Surf en Famara · Día 4: Timanfaya',
      status: 'cerrado',
      createdAt: '2025-05-02 09:30:00',
      modalityId: 4,
      imageUrl: 'https://picsum.photos/seed/lanzarote/600/400',
      currentPeople: 5,
      maxPeople: 12
    }
  ];

  list() { return of(this.trips); }

  myTrips() { return of(this.trips.filter(t => t.creatorId === this.userId)); }

  getById(id: number | string) {
    const numericId = typeof id === 'string' ? Number(id) : id;
    return of(this.trips.find(t => t.tripId === numericId) || null);
  }
}
