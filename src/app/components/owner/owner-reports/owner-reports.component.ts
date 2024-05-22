import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApartmentOwnerService } from 'src/app/services/apartment-owner.service';
import { Announcement } from 'src/app/shared/Announcement';
import { Report } from 'src/app/shared/Report';
import { Property } from 'src/app/shared/Property';

@Component({
  selector: 'app-owner-reports',
  templateUrl: './owner-reports.component.html',
  styleUrls: ['./owner-reports.component.css']
})
export class OwnerReportsComponent implements OnInit {
  property?: Property; // `property` can be undefined
  announcements: Announcement[] = [
    new Announcement(2, "Brak ciepłej wody w dniu XX.XX", "Lorem ipsum dolor"),
    // other announcements
  ];
  reports: Report[] = [
    new Report(3, "Awaria ogrzewania", "opened"),
    // other reports
  ];
  isPopupVisible = false;

  constructor(
    private apartmentOwnerService: ApartmentOwnerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const propertyId = +this.route.snapshot.params['id']; // or use paramMap with observable if ID can change without component destruction
    this.apartmentOwnerService.getOwnerPropertyById(propertyId).subscribe({
      next: (data) => {
        this.property = data;
      },
      error: (error) => console.error('Error fetching property:', error)
    });
  }

  togglePopup() {
    this.isPopupVisible = !this.isPopupVisible;
  }

  updateBackgroundColor(event: Event) {
    const target = event.target as HTMLSelectElement;
    const selectedOption = target.options[target.selectedIndex];
    target.style.backgroundColor = selectedOption.style.backgroundColor;
  }
}
