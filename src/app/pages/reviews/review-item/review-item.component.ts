import {Component, Input} from '@angular/core';
import {ReviewResponse} from '../../../interfaces/reviewResponse.interfaces';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-review-item',
  standalone: true,
  imports: [
    DatePipe
  ],
  templateUrl: './review-item.component.html',
  styleUrl: './review-item.component.css',
})
export class ReviewItemComponent {
  @Input({ required: true }) review!: ReviewResponse;
}
