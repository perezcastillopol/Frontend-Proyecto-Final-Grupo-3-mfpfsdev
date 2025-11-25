import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TripCardComponent } from '../../shared/trip-card/trip-card.component';
import { SearchBannerComponent } from '../../shared/search-banner/search-banner.component';

@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [SearchBannerComponent, TripCardComponent],
  templateUrl: './explore.component.html',
  styleUrl: './explore.component.css'
})
export class ExploreComponent implements OnInit {
  searchParams: any = {};

  trips = [
    {
      id: 1,
      title: 'Pirineos en 4 días',
      country: 'España',
      currentPeople: 1,
      maxPeople: 8,
      startDate: '2025-12-10',
      endDate: '2025-12-14',
      price: 250,
      imageUrl: 'https://picsum.photos/seed/trip1/600/400'
    },
    {
      id: 2,
      title: 'Escapada a Lisboa',
      country: 'Portugal',
      currentPeople: 2,
      maxPeople: 10,
      startDate: '2025-11-25',
      endDate: '2025-11-28',
      price: 180,
      imageUrl: 'https://picsum.photos/seed/trip2/600/400'
    },
    {
      id: 3,
      title: 'Costa Brava',
      country: 'España',
      currentPeople: 3,
      maxPeople: 6,
      startDate: '2026-03-15',
      endDate: '2026-03-18',
      price: 120,
      imageUrl: 'https://picsum.photos/seed/trip3/600/400'
    },
    {
    id: 4,
      title: 'Costa Brava',
      country: 'España',
      currentPeople: 3,
      maxPeople: 6,
      startDate: '2026-03-15',
      endDate: '2026-03-18',
      price: 120,
      imageUrl: 'https://picsum.photos/seed/trip3/600/400'
    }
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.searchParams = params;
      console.log('Search parameters from home:', this.searchParams);
      // Here you would filter trips based on searchParams
      // For now, just logging the parameters
    });
  }

  reload() {
    // En esta versión mock, simplemente no hacemos nada
    console.log('Search ejecutado — usando datos mock.');
  }
}