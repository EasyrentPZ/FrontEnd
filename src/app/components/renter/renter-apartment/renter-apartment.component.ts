// In renter-apartment.component.ts
import { Component, OnInit } from '@angular/core';
import { ApartmentTenantService } from '../../../services/apartment-tenant.service';
import { Router } from '@angular/router';
import { Property } from 'src/app/shared/Property';
import { Owner } from 'src/app/shared/Owner';
import { Announcement } from 'src/app/shared/Announcement';
import { Report } from 'src/app/shared/Report';

@Component({
  selector: 'app-renter-apartment',
  templateUrl: './renter-apartment.component.html',
  styleUrls: ['./renter-apartment.component.css']
})
export class RenterApartmentComponent implements OnInit {
  property = new Property(1, "Mieszkanie 60m2", "Spokojna", "9", "desc", 1000, 1000, 2000);
  owner = new Owner("Paweł", "Kowalski", "999222111", "pawelk@gmail.com", "https://static2.strzelce360.pl/data/wysiwig/wqtv1fum7knmhdb.jpg")
  apartment: any = null;

  announcements = [
    new Announcement(2, "Brak ciepłej wody w dniu XX.XX", "Lorem ipsum dolor"),
    new Announcement(2, "Brak ciepłej wody w dniu XX.XX", "Lorem ipsum dolor"),
    new Announcement(2, "Brak ciepłej wody w dniu XX.XX", "Lorem ipsum dolor"),
    new Announcement(2, "Brak ciepłej wody w dniu XX.XX", "Lorem ipsum dolor")
  ];

  reports = [
    new Report(3, "Awaria ogrzewania", "opened"),
    new Report(3, "Awaria ogrzewania", "opened"),
    new Report(3, "Awaria ogrzewania", "opened"),
    new Report(3, "Awaria ogrzewania", "opened")
  ];

  isPopupVisible = false;
  isPhonePopupVisible = false;
  isEmailPopupVisible = false;

  togglePopup() {
    this.isPopupVisible = !this.isPopupVisible;
  }

  togglePhonePopup() {
    this.isPhonePopupVisible = !this.isPhonePopupVisible;
  }

  toggleEmailPopup() {
    this.isEmailPopupVisible = !this.isEmailPopupVisible;
  }


  updateBackgroundColor(event: Event) {
    const target = event.target as HTMLSelectElement;
    const selectedOption = target.options[target.selectedIndex];
    target.style.backgroundColor = selectedOption.style.backgroundColor;
  }
  constructor(
    private apartmentTenantService: ApartmentTenantService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.apartmentTenantService.getApartments().subscribe((data: any) => {
      this.apartment = data;
    });
  }
  redirectToApartmentDetails(apartmentId: number): void {
    // Assuming the route to the apartment details page is '/apartment-details/:id'
    this.router.navigate(['/tenant/tenant-apartment-management', apartmentId]);
  }
}
