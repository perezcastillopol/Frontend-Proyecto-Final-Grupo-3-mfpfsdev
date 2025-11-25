import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeroBannerComponent } from '../../shared/hero-banner/hero-banner.component';
import { TripCardComponent } from '../../shared/trip-card/trip-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroBannerComponent, TripCardComponent ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private router: Router) {}

  onSearch(searchData: any) {
    console.log('Search data:', searchData);
    this.router.navigateByUrl('/explorar');
  }


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
    {id: 4,
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

}
