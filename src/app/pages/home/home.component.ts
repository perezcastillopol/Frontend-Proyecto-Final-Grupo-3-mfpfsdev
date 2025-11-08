import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SearchBannerComponent } from '../../shared/search-banner/search-banner.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, SearchBannerComponent],
  template: `
    <section class="container">
      <h1>Encuentra tu próximo viaje</h1>
      <app-search-banner (search)="goExplore()"></app-search-banner>
      <a routerLink="/explorar">Explorar viajes</a>
    </section>
  `
})
export class HomeComponent {
  goExplore() {}
}