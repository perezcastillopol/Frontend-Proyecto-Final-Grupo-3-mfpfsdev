import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ExploreComponent } from './pages/explore/explore.component';
import { MyTripsComponent } from './pages/my-trips/my-trips.component';
import { UserViewComponent } from './pages/user-view/user-view.component';
import { LoginComponent } from './pages/login/login.component';
import { TripCreateComponent } from './pages/trip-create/trip-create.component';
import { TripDetailComponent } from './pages/trip-detail/trip-detail.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Inicio' },
  { path: 'explorar', component: ExploreComponent, title: 'Explorar viajes' },
  { path: 'mis-viajes', component: MyTripsComponent, title: 'Mis viajes' },
  { path: 'perfil/:username', component: UserViewComponent, title: 'Perfil' },
  { path: 'login', component: LoginComponent, title: 'Entrar' },
  { path: 'crear', component: TripCreateComponent, title: 'Crear viaje' },
  { path: 'viaje/:id', component: TripDetailComponent, title: 'Detalle del viaje' },
  //Crear ruta para crear registro de usuario
  { path: '**', redirectTo: '' }
];
