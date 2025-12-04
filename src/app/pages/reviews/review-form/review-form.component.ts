import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ReviewService} from '../../../core/services/review.services';
import {AuthService} from '../../../core/services/auth.service';
import {ReviewBodyRequest} from '../../../interfaces/reviewBodyRequest.interfaces';

@Component({
  selector: 'app-review-form',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './review-form.component.html',
  styleUrl: './review-form.component.css',
})
export class ReviewFormComponent {
  @Input() tripId!: number;
  @Output() created = new EventEmitter<void>();

  form = new FormGroup({
    reviewee_id: new FormControl<number | null>(null, { nonNullable: false, validators: [Validators.required] }),
    rating: new FormControl<number>(5, { nonNullable: true, validators: [Validators.required, Validators.min(1), Validators.max(5)] }),
    comment: new FormControl<string | null>(null)
  });

  submitting = false;
  error: string | null = null;

  private reviewService = inject(ReviewService);
  private authService = inject(AuthService);

  constructor() {}

  async submit() {
    if (!this.tripId || this.form.invalid) return;
    this.submitting = true;
    this.error = null;

    const body: ReviewBodyRequest = {
      trip_id: this.tripId,
      reviewee_id: Number(this.form.value.reviewee_id),
      rating: Number(this.form.value.rating),
      comment: this.form.value.comment || null
    }

    try {
      await this.reviewService.create(body);
      this.form.reset({ rating: 5, reviewee_id: null, comment: null });
      this.created.emit();
    } catch (err: any) {
      console.error('Error creando review', err);
      this.error = err?.error?.message || err?.message || 'Error al crear valoración';
    } finally {
      this.submitting = false;
    }
  }
}
