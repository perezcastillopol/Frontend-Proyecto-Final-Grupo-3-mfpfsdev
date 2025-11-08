// src/app/app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home.component').then(c => c.HomeComponent), title: 'Inicio' },

  { path: 'explorar', loadComponent: () => import('./pages/explore/explore.component').then(c => c.ExploreComponent), title: 'Explorar viajes' },

  { path: 'mis-viajes',
    loadComponent: () => import('./pages/my-trips/my-trips.component').then(c => c.MyTripsComponent),
    title: 'Mis viajes'
  },

  { path: 'perfil/:username',
    loadComponent: () => import('./pages/user-view/user-view.component').then(c => c.UserViewComponent),
    title: 'Perfil'
  },

  { path: 'login', loadComponent: () => import('./pages/login/login.component').then(c => c.LoginComponent), title: 'Entrar' },

  { path: 'crear',
    loadComponent: () => import('./pages/trip-create/trip-create.component').then(c => c.TripCreateComponent),
    title: 'Crear viaje'
  },

  { path: 'viaje/:id',
    loadComponent: () => import('./pages/trip-detail/trip-detail.component').then(c => c.TripDetailComponent),
    title: 'Detalle del viaje'
  },

  { path: '**', redirectTo: '' }
];