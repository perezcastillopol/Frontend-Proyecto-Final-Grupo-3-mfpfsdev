import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Trip } from '../../interfaces/trip.interface';

type TripCardTrip = Partial<Trip> & {
  imageUrl?: string;
  country?: string;
  location?: string;
  currentPeople?: number;
  maxPeople?: number;
  price?: number;
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
  @Input() country: string = '';
  @Input() currentPeople: number = 0;
  @Input() maxPeople: number = 0;
  @Input() startDate: string = '';
  @Input() endDate: string = '';
  @Input() price: number = 0;

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
