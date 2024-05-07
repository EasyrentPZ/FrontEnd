import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  @Input() menuType: 'tenant' | 'owner' | 'unregistered' = 'unregistered';

  handleMenuItemClicked(link: string) {
    // Handle menu item clicks internally
    console.log('Menu item clicked:', link);
    // You can perform navigation or other actions here based on the clicked link
  }

  get menuItems(): MenuItem[] {
    switch (this.menuType) {
      case 'tenant':
        return [
          { label: 'Rachunki', link: '/tenant/tenant-bills' },
          { label: 'Mieszkanie', link: '/tenant/tenant-property' },
          { label: 'Wyloguj', link: '/logout' }
        ];
      case 'owner':
        return [
          { label: 'Rachunki', link: '/owner/owner-bills' },
          { label: 'Moje mieszkania', link: '/owner/owner-properties' },
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