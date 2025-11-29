import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe, CurrencyPipe, TitleCasePipe } from '@angular/common';
import { TripsService, Trip } from '../../core/services/trips.services';

@Component({
  selector: 'app-trip-detail',
  standalone: true,
  imports: [DatePipe, CurrencyPipe, TitleCasePipe],
  templateUrl: './trip-detail.component.html',
  styleUrl: './trip-detail.component.css'
})
export class TripDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private tripsService = inject(TripsService);
  private tripId = Number(this.route.snapshot.paramMap.get('id'));
  trip: Trip | null = null;

  async ngOnInit() {
    const apiTrip = await this.tripsService.getTripById(this.tripId);
    this.trip = {
      ...apiTrip,
      imageUrl: `https://picsum.photos/seed/trip${apiTrip.tripId}/1200/600`,
      currentPeople: 0,
      maxPeople: apiTrip.max_participants ?? 10
    };
  }

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
