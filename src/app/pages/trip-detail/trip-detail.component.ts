import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe, DatePipe, CurrencyPipe, TitleCasePipe } from '@angular/common';
import { TripsService, Trip } from '../../core/services/trips.services';

@Component({
  selector: 'app-trip-detail',
  standalone: true,
  imports: [AsyncPipe, DatePipe, CurrencyPipe, TitleCasePipe],
  templateUrl: './trip-detail.component.html',
  styleUrl: './trip-detail.component.css'
})
export class TripDetailComponent {
  private route = inject(ActivatedRoute);
  private trips = inject(TripsService);
  private tripId = Number(this.route.snapshot.paramMap.get('id'));
  trip$ = this.trips.getById(this.tripId);

  modalityMap: Record<number, string> = {
    1: 'Aventura',
    2: 'Naturaleza',
    3: 'Ciudad',
    4: 'Playa',
  };

  defaultImage = 'https://picsum.photos/seed/trip-detail/1200/600';

  backgroundImage(trip: Trip | null): string {
    const image = (trip as any)?.imageUrl || this.defaultImage;
    return `linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.45) 60%), url('${image}')`;
  }
}
