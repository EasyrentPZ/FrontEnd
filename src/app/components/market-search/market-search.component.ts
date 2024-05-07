import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Property } from 'src/app/shared/Property';

@Component({
  selector: 'app-market-search',
  templateUrl: './market-search.component.html',
  styleUrls: ['./market-search.component.css']
})
export class MarketSearchComponent {
  properties = [
    new Property("Mieszkanie 60m2", "Spokojna", "9", "desc", 1000, 1000, 2000),
    new Property("Mieszkanie 20m2", "Zielona", "1/11", "desc", 1400, 1200, 200),
    new Property("Mieszkanie 20m2", "Zielona", "1/11", "desc", 1400, 1200, 200),
    new Property("Mieszkanie 20m2", "Zielona", "1/11", "desc", 1400, 1200, 200),
    new Property("Mieszkanie 20m2", "Zielona", "1/11", "desc", 1400, 1200, 200),
    new Property("Mieszkanie 20m2", "Zielona", "1/11", "desc", 1400, 1200, 200),
    new Property("Mieszkanie 100m2", "Spokojna", "9", "desc", 9000, 1000, 2000)
  ];

  constructor(private router: Router) { }
  
  redirectToLogin() {
    this.router.navigate(['/login']);
  }
  returnHome() {
    this.router.navigate(['/home']);
  }
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    const offset = 80;
  
    if (element) {
      const elementTop = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementTop - offset, behavior: 'smooth' });
    }
  }
  
}


