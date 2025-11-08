import { Injectable, signal } from '@angular/core';
import { of } from 'rxjs';

export interface Trip {
  id: string;
  title: string;
  location: string;
  startDate: string;
  creatorId: string;
  price: number;
}

@Injectable({ providedIn: 'root' })
export class TripsService {
  private userId = 'u123';                 // stub de usuario actual
  me = signal(this.userId);

  private trips: Trip[] = [
    { id: '1', title: 'Pirineos en 4 días', location: 'Huesca', startDate: '2025-12-10', creatorId: 'u123', price: 250 },
    { id: '2', title: 'Escapada a Lisboa', location: 'Lisboa', startDate: '2025-11-25', creatorId: 'u777', price: 180 },
    { id: '3', title: 'Costa Brava', location: 'Girona', startDate: '2026-03-15', creatorId: 'u123', price: 120 },
  ];

  list() { return of(this.trips); }

  myTrips() { return of(this.trips.filter(t => t.creatorId === this.userId)); }

  getById(id: string) { return of(this.trips.find(t => t.id === id) || null); }
}