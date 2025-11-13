import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SearchBannerComponent } from '../../shared/search-banner/search-banner.component';

@Component({
  selector: 'app-home',
  imports: [RouterLink, SearchBannerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  goExplore() {}
}