import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-banner',
  standalone: true,
  template: `
    <section class="banner">
      <input placeholder="Origen">
      <input placeholder="Destino">
      <input type="date">
      <button (click)="search.emit()">Buscar</button>
    </section>
  `,
  styles: [`
    .banner{display:grid;grid-template-columns:1fr 1fr 1fr auto;gap:8px;padding:12px;background:#f7f7f7;border-radius:12px;margin:12px 0}
  `]
})
export class SearchBannerComponent {
  @Output() search = new EventEmitter<void>();
}