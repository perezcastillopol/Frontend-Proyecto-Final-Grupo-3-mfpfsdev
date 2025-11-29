import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ITrip } from '../../interfaces/trip.interface';

type TripCardTrip = Partial<ITrip> & {
  imageUrl?: string;
  country?: string;
  destination?: string;
  currentPeople?: number;
  maxPeople?: number;
  price?: number;
  startDate?: string;
  endDate?: string;
  costPerPerson?: number;
};

@Component({
  selector: 'app-trip-card',
  standalone: true,
  templateUrl: './trip-card.component.html',
  styleUrl: './trip-card.component.css'
})
export class TripCardComponent {
  private router = inject(Router);

  @Input() trip: TripCardTrip | null = null;

  @Input() imageUrl: string = '';
  @Input() title: string = '';
  @Input() location: string = '';
  @Input() country: string = '';
  @Input() currentPeople: number = 0;
  @Input() max_participants: number = 0;
  @Input() start_date: string = '';
  @Input() startDate: string = '';
  @Input() end_date: string = '';
  @Input() cost_per_person: number = 0;

  get detailLink(): string[] | null {
    const id = this.trip?.tripId ?? (this.trip as any)?.id;
    return id ? ['/viaje', id] : null;
  }

  goDetail() {
    const link = this.detailLink;
    if (link) {
      this.router.navigate(link);
    }
  }
}
