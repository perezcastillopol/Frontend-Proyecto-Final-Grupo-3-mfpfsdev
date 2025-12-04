import {Component, inject, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe, CurrencyPipe, TitleCasePipe } from '@angular/common';
import { TripsService, Trip } from '../../core/services/trips.services';
import {ReviewListComponent} from '../reviews/review-list/review-list.component';
import {ReviewFormComponent} from '../reviews/review-form/review-form.component';

@Component({
  selector: 'app-trip-detail',
  standalone: true,
  imports: [DatePipe, CurrencyPipe, TitleCasePipe, ReviewFormComponent, ReviewListComponent],
  templateUrl: './trip-detail.component.html',
  styleUrl: './trip-detail.component.css'
})
export class TripDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private tripsService = inject(TripsService);
  private tripId = Number(this.route.snapshot.paramMap.get('id'));
  trip: Trip | null = null;

  @ViewChild('reviewList') reviewList!: ReviewListComponent;
  @ViewChild('reviewForm') reviewForm!: ReviewFormComponent;

  async ngOnInit() {
    try {
      const apiTrip = await this.tripsService.getTripById(this.tripId);
      this.trip = {
        ...apiTrip,
        imageUrl: apiTrip.imageUrl || `https://picsum.photos/seed/trip${apiTrip.tripId}/1200/600`,
        currentPeople: apiTrip.currentPeople ?? 0,
        maxPeople: apiTrip.maxPeople ?? apiTrip.max_participants ?? 10
      };
    } catch (error) {
      this.trip = null;
    }
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

  async onReviewCreated() {
    try {
      if (this.reviewList) await this.reviewList.refresh();
    } catch (err) {
      console.error('Error refrescando lista de reviews', err);
    }
  }
}
