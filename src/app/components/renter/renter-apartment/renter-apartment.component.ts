// In renter-apartment.component.ts
import { Component, OnInit } from '@angular/core';
import { ApartmentTenantService } from '../../../services/apartment-tenant.service';
import { Router } from '@angular/router';
import { Property } from 'src/app/shared/Property';
import { Owner } from 'src/app/shared/Owner';
import { Announcement } from 'src/app/shared/Announcement';
import { Report } from 'src/app/shared/Report';
import { AnnouncementsService } from 'src/app/services/announcements.service';
import { ReportsService } from 'src/app/services/reports.service';

@Component({
  selector: 'app-renter-apartment',
  templateUrl: './renter-apartment.component.html',
  styleUrls: ['./renter-apartment.component.css']
})
export class RenterApartmentComponent implements OnInit {
  owner: any = null;
  property: any = null;
  loading = true;
  reportDescription: string = '';

  announcements: Announcement[] = [
  ];

  reports: Report[] = [
  ];

  ngOnInit(): void {
    this.apartmentTenantService.getRenterProperty().subscribe((data: any) => {
      this.property = data;
      if (data.owner) {
        this.owner = new Owner(this.property.owner.name, this.property.owner.lastname, this.property.owner.phoneNumber, this.property.owner.username, "https://static2.strzelce360.pl/data/wysiwig/wqtv1fum7knmhdb.jpg");
      } else {
        this.owner = new Owner("Paweł", "Kowalski", "999222111", "pawelk@gmail.com", "https://static2.strzelce360.pl/data/wysiwig/wqtv1fum7knmhdb.jpg");
      }
      this.announcementService.getPropertyAnnouncements(this.property.id).subscribe((data: any) =>{
        this.announcements = data;
      });
      this.reportsService.getReportsByPropertyId(this.property.id).subscribe((data: any) =>{
        this.reports = data;
      });
      this.loading = false;
    });
  }

  isPopupVisible = false;
  isPhonePopupVisible = false;
  isEmailPopupVisible = false;

  togglePopup() {
    this.isPopupVisible = !this.isPopupVisible;
  }

  addReport() {
    console.log("ppp");
    const newReport = new Report(
      null, // ID will be assigned by the server
      this.reportDescription, // Description from the form
      null, // Status initially null
      "New Report", // Title (can be adjusted based on your requirement)
      null, // Notifier name initially null
      null, // Notifier last name initially null
      null // Date initially null
    );

    this.reportsService.addReport(this.property.id, newReport).subscribe((data: Report) => {
      this.reportDescription = '';
      this.togglePopup();
      window.location.reload();
    });
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
    private router: Router,
    private announcementService: AnnouncementsService,
    private reportsService :ReportsService
  ) {}
  
  redirectToApartmentDetails(apartmentId: number): void {
    // Assuming the route to the apartment details page is '/apartment-details/:id'
    this.router.navigate(['/tenant/tenant-apartment-management', apartmentId]);
  }
}
