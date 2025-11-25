import { Component, Input } from '@angular/core';
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
  @Input() trip: TripCardTrip | null = null;

  @Input() imageUrl: string = '';
  @Input() title: string = '';
  @Input() country: string = '';
  @Input() currentPeople: number = 0;
  @Input() maxPeople: number = 0;
  @Input() startDate: string = '';
  @Input() endDate: string = '';
  @Input() price: number = 0;
}
