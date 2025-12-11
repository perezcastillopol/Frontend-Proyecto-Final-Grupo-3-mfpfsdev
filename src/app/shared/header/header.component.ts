import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  authService = inject(AuthService);
  private router = inject(Router);
  showLogoutToast = false;
  showLogoutModal = false;

  openLogoutModal() {
    this.showLogoutModal = true;
  }

  closeLogoutModal() {
    this.showLogoutModal = false;
  }

  confirmLogout() {
    this.showLogoutModal = false;
    this.authService.logout();
    this.showLogoutToast = true;
    
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 1500);
    
    setTimeout(() => {
      this.showLogoutToast = false;
    }, 3000);
  }
}