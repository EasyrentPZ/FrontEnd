import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';  // Import AuthService

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  @Input() menuType: 'renter' | 'owner' | 'unregistered' = 'unregistered';

  constructor(private router: Router, private authService: AuthService) {}  // Inject AuthService

  handleMenuItemClicked(link: string): void {
    console.log('Menu item clicked:', link);
    if (link === '/logout') {
      this.authService.logout();  // Call logout from AuthService
      this.router.navigate(['/login']);  // Redirect to login page after logout
    } else {
      this.router.navigate([link]);  // Normal navigation for other links
    }
  }

  get menuItems(): MenuItem[] {
    switch (this.menuType) {
      case 'renter':
        return [
          { label: 'Informacja dodatkowa', link: `/${this.menuType}/${this.menuType}-hello` },
          { label: 'Moje mieszkania', link: `/${this.menuType}/${this.menuType}-apartments` },
          { label: 'Profil', link: `/${this.menuType}/${this.menuType}-account` },
          { label: 'Wyloguj', link: '/logout' }  // Keep as a placeholder for handling in click
        ];
      case 'owner':
        return [
          { label: 'Informacja dodatkowa', link: `/${this.menuType}/${this.menuType}-hello` },
          { label: 'Moje mieszkania', link: `/${this.menuType}/${this.menuType}-apartments` },
          { label: 'Profil', link: `/${this.menuType}/${this.menuType}-account` },
          { label: 'Wyloguj', link: '/logout' }  // Keep as a placeholder for handling in click
        ];
      case 'unregistered':
        return [
          { label: 'Szukaj mieszkań', link: '/market-search' },
          { label: 'O nas', link: '/home' },
          { label: 'Logowanie', link: '/login' }
        ];
      default:
        return [];
    }
  }
}

interface MenuItem {
  label: string;
  link: string;
}
