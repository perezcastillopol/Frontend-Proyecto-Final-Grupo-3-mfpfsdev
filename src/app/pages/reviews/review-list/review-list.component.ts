import {Component, inject, Input, OnInit} from '@angular/core';
import {ReviewResponse} from '../../../interfaces/reviewResponse.interfaces';
import {BehaviorSubject} from 'rxjs';
import {ReviewService} from '../../../core/services/review.services';
import {ReviewItemComponent} from '../review-item/review-item.component';

@Component({
  selector: 'app-review-list',
  standalone: true,
  imports: [
    ReviewItemComponent
  ],
  templateUrl: './review-list.component.html',
  styleUrl: './review-list.component.css',
})
export class ReviewListComponent implements OnInit {
  @Input() tripId!: number;
  reviews: ReviewResponse[] = [];
  loading = false;
  error: string | null = null;

  // permite disparar refresh desde el padre si se expone ViewChild
  private refresh$ = new BehaviorSubject<void>(void 0);

  private reviewService = inject(ReviewService);

  constructor() {}

  ngOnInit() {
    this.load();
  }

  async load() {
    if (!this.tripId) return;
    this.loading = true;
    this.error = null;
    try {
      const rows = await this.reviewService.listByTrip(this.tripId);
      this.reviews = rows || [];
    } catch (err: any) {
      console.error('Error carganado reviews', err);
      this.error = err?.message || err?.error?.message || 'Error al cargar valoraciones';
      this.reviews = [];
    } finally {
      this.loading = false;
    }
  }

  // función pública que el padre puede invocar vía ViewChild
  async refresh() {
    await this.load();
  }
}
