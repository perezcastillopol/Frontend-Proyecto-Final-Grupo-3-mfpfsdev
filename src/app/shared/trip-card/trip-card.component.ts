import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { Trip } from '../../core/services/trips.services';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [RouterLink, DatePipe, CurrencyPipe],
  template: `
    <article class="card">
      <h3>{{ trip.title }}</h3>
      <p>{{ trip.location }} · {{ trip.startDate | date }}</p>
      <p>~ {{ trip.price | currency:'EUR':'symbol':'1.0-0' }}</p>
      <a [routerLink]="['/viaje', trip.id]">Ver detalle</a>
    </article>
  `,
  styles: [`
    .card{border:1px solid #eee;border-radius:12px;padding:12px}
    .card h3{margin:0 0 4px}
  `]
})
export class TripCardComponent {
  @Input({ required: true }) trip!: Trip;
}