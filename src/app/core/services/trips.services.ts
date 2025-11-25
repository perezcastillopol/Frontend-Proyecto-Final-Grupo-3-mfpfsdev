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
      description:
        'Ruta de 3 días por los Picos de Europa con alojamiento en casas rurales y excursiones guiadas.',
      destination: 'Picos de Europa',
      startDate: '2025-06-14',
      endDate: '2025-06-17',
      costPerPerson: 180.0,
      minParticipants: 4,
      accommodation: 'Casa rural',
      transport: 'Coche compartido',
      itinerary:
        'Día 1: Cangas de Onís · Día 2: Lagos de Covadonga · Día 3: Ruta del Cares',
      status: 'abierto',
      createdAt: '2025-04-25 18:23:00',
      modalityId: 2,
      imageUrl: 'https://picsum.photos/seed/picos/600/400',
      currentPeople: 6,
      maxPeople: 10,
    },
    {
      tripId: 2,
      creatorId: 2,
      title: 'City break en Lisboa',
      description:
        'Fin de semana largo explorando los miradouros, pastelerías y el barrio de Alfama.',
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
      maxPeople: 8,
    },
    {
      tripId: 3,
      creatorId: 3,
      title: 'Surf y volcán en Lanzarote',
      description:
        'Clases de surf en Famara y excursión al Parque Nacional de Timanfaya.',
      destination: 'Lanzarote',
      startDate: '2025-07-10',
      endDate: '2025-07-14',
      costPerPerson: 320.0,
      minParticipants: 3,
      accommodation: 'Apartamentos cerca de la playa',
      transport: 'Vuelo + coche de alquiler',
      itinerary:
        'Día 1: Llegada y puesta de sol · Día 2-3: Surf en Famara · Día 4: Timanfaya',
      status: 'cerrado',
      createdAt: '2025-05-02 09:30:00',
      modalityId: 4,
      imageUrl: 'https://picsum.photos/seed/lanzarote/600/400',
      currentPeople: 5,
      maxPeople: 12,
    },
    {
      tripId: 4,
      creatorId: 4,
      title: 'Aventura en los Pirineos Catalanes',
      description:
        'Escapada de 4 días con senderismo, barranquismo y spa de montaña.',
      destination: 'Pirineos Catalanes',
      startDate: '2025-08-12',
      endDate: '2025-08-15',
      costPerPerson: 260.0,
      minParticipants: 5,
      accommodation: 'Refugio de montaña',
      transport: 'Furgoneta compartida',
      itinerary:
        'Día 1: Vall de Núria · Día 2: Barranquismo · Día 3: Pic del Segre · Día 4: Spa',
      status: 'abierto',
      createdAt: '2025-05-05 11:10:00',
      modalityId: 2,
      imageUrl: 'https://picsum.photos/seed/pirineos/600/400',
      currentPeople: 3,
      maxPeople: 12,
    },
    {
      tripId: 5,
      creatorId: 1,
      title: 'Escapada gastronómica a La Rioja',
      description:
        'Cata de vinos, visita a bodegas y ruta gastronómica por Logroño.',
      destination: 'La Rioja',
      startDate: '2025-10-03',
      endDate: '2025-10-05',
      costPerPerson: 190.0,
      minParticipants: 4,
      accommodation: 'Hotel rural',
      transport: 'Coche compartido',
      itinerary: 'Día 1: Logroño · Día 2: Bodegas · Día 3: Ruta gastronómica',
      status: 'abierto',
      createdAt: '2025-05-10 12:45:00',
      modalityId: 1,
      imageUrl: 'https://picsum.photos/seed/rioja/600/400',
      currentPeople: 7,
      maxPeople: 10,
    },
    {
      tripId: 6,
      creatorId: 5,
      title: 'Fin de semana de esquí en Sierra Nevada',
      description: 'Curso de iniciación al esquí y actividades de nieve.',
      destination: 'Sierra Nevada',
      startDate: '2025-12-19',
      endDate: '2025-12-21',
      costPerPerson: 250.0,
      minParticipants: 6,
      accommodation: 'Hotel pie de pista',
      transport: 'Autobús privado',
      itinerary:
        'Día 1: Clase de esquí · Día 2: Pistas libres · Día 3: Raquetas de nieve',
      status: 'abierto',
      createdAt: '2025-05-15 08:20:00',
      modalityId: 5,
      imageUrl: 'https://picsum.photos/seed/sierranevada/600/400',
      currentPeople: 2,
      maxPeople: 20,
    },
    {
      tripId: 7,
      creatorId: 2,
      title: 'Exploración de cuevas en Cantabria',
      description:
        'Visita guiada a la cueva El Soplao y senderismo por el valle del Nansa.',
      destination: 'Cantabria',
      startDate: '2025-09-06',
      endDate: '2025-09-08',
      costPerPerson: 170.0,
      minParticipants: 4,
      accommodation: 'Casa rural',
      transport: 'Coche compartido',
      itinerary:
        'Día 1: El Soplao · Día 2: Valle del Nansa · Día 3: Mirador del Pozo Tremeo',
      status: 'abierto',
      createdAt: '2025-05-18 14:50:00',
      modalityId: 3,
      imageUrl: 'https://picsum.photos/seed/cantabria/600/400',
      currentPeople: 5,
      maxPeople: 9,
    },
    {
      tripId: 8,
      creatorId: 4,
      title: 'Ruta en bicicleta por la Vía Verde de Ojos Negros',
      description:
        'Recorrido de cicloturismo de dos días por la vía verde más larga de España.',
      destination: 'Ojos Negros',
      startDate: '2025-09-20',
      endDate: '2025-09-22',
      costPerPerson: 140.0,
      minParticipants: 3,
      accommodation: 'Albergue rural',
      transport: 'Bicicleta + tren',
      itinerary: 'Día 1: Teruel → Albentosa · Día 2: Albentosa → Sagunto',
      status: 'abierto',
      createdAt: '2025-05-20 10:00:00',
      modalityId: 2,
      imageUrl: 'https://picsum.photos/seed/vv_ojosnegros/600/400',
      currentPeople: 3,
      maxPeople: 15,
    },
    {
      tripId: 9,
      creatorId: 6,
      title: 'Inmersión cultural en Marrakech',
      description:
        'Explora mercados, palacios y el desierto de Agafay en 4 días.',
      destination: 'Marrakech',
      startDate: '2025-11-10',
      endDate: '2025-11-13',
      costPerPerson: 450.0,
      minParticipants: 5,
      accommodation: 'Riad tradicional',
      transport: 'Avión',
      itinerary:
        'Día 1: Medina · Día 2: Palacio Bahía · Día 3: Desierto de Agafay · Día 4: Zoco',
      status: 'abierto',
      createdAt: '2025-05-21 09:00:00',
      modalityId: 4,
      imageUrl: 'https://picsum.photos/seed/marrakech/600/400',
      currentPeople: 8,
      maxPeople: 12,
    },
    {
      tripId: 10,
      creatorId: 7,
      title: 'Kayak y snorkel en la Costa Brava',
      description: 'Explora calas, cuevas marinas y aguas cristalinas.',
      destination: 'Costa Brava',
      startDate: '2025-07-22',
      endDate: '2025-07-24',
      costPerPerson: 160.0,
      minParticipants: 4,
      accommodation: 'Camping',
      transport: 'Coche compartido',
      itinerary:
        'Día 1: Cala Montgó · Día 2: Kayak Illes Medes · Día 3: Snorkel en Aigua Blava',
      status: 'abierto',
      createdAt: '2025-05-22 17:35:00',
      modalityId: 2,
      imageUrl: 'https://picsum.photos/seed/costabrava/600/400',
      currentPeople: 4,
      maxPeople: 10,
    },
  ];

  list() {
    return of(this.trips);
  }

  myTrips() {
    return of(this.trips.filter((t) => t.creatorId === this.userId));
  }

  getById(id: number | string) {
    const numericId = typeof id === 'string' ? Number(id) : id;
    return of(this.trips.find((t) => t.tripId === numericId) || null);
  }
}
