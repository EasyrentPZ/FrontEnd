import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menuType: 'renter' | 'owner' | 'unregistered' = 'unregistered';

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    const userIdString = localStorage.getItem("user_id");
    if (!userIdString) {
      this.menuType = 'unregistered';
      return;
    }

    const userId: number = parseInt(userIdString, 10);
    this.userService.getUserRoles(userId).subscribe(
      roles => {
        if (roles.includes('TENANT')) {
          this.menuType = 'renter';
        } else if (roles.includes('OWNER')) {
          this.menuType = 'owner';
        } else {
          this.menuType = 'unregistered';
        }
      },
      error => {
        console.error('Error fetching user roles:', error);
        this.menuType = 'unregistered';
      }
    );
  }

  handleMenuItemClicked(link: string): void {
    console.log('Menu item clicked:', link);
      this.router.navigate([link]);
  }

  get menuItems(): MenuItem[] {
    switch (this.menuType) {
      case 'renter':
        return [
          { label: 'Informacja dodatkowa', link: `/${this.menuType}/${this.menuType}-hello` },
          { label: 'Moje mieszkania', link: `/${this.menuType}/${this.menuType}-apartments` },
          { label: 'Profil', link: `/${this.menuType}/${this.menuType}-account` },
          { label: 'Wyloguj', link: '/logout' }
        ];
      case 'owner':
        return [
          { label: 'Informacja dodatkowa', link: `/${this.menuType}/${this.menuType}-hello` },
          { label: 'Moje mieszkania', link: `/${this.menuType}/${this.menuType}-apartments` },
          { label: 'Profil', link: `/${this.menuType}/${this.menuType}-account` },
          { label: 'Wyloguj', link: '/logout' }
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
