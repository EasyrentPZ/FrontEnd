import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnnouncementsService } from 'src/app/services/announcements.service';
import { ApartmentOwnerService } from 'src/app/services/apartment-owner.service';
import { ReportsService } from 'src/app/services/reports.service'; // Make sure this service is correctly implemented
import { Announcement } from 'src/app/shared/Announcement';
import { Report } from 'src/app/shared/Report';
import { Property } from 'src/app/shared/Property';

@Component({
  selector: 'app-owner-reports',
  templateUrl: './owner-reports.component.html',
  styleUrls: ['./owner-reports.component.css']
})
export class OwnerReportsComponent implements OnInit {
  property?: Property;
  announcements: Announcement[] = [];
  reports: Report[] = [];
  isPopupVisible = false;
  newAnnouncement = new Announcement();

  constructor(
    private apartmentOwnerService: ApartmentOwnerService,
    private announcementsService: AnnouncementsService,
    private reportsService: ReportsService,  // Inject the ReportsService
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const propertyId = +this.route.snapshot.params['id'];
    if (propertyId) {
      this.apartmentOwnerService.getOwnerPropertyById(propertyId).subscribe({
        next: data => {
          this.property = data;
          this.loadAnnouncements(propertyId);
          this.loadReports(propertyId);
        },
        error: error => console.error('Error fetching property:', error)
      });
    } else {
      console.error('Property ID is not available');
    }
  }

  loadAnnouncements(propertyId: number) {
    this.announcementsService.getPropertyAnnouncements(propertyId).subscribe({
      next: data => this.announcements = data,
      error: error => console.error('Error fetching announcements:', error)
    });
  }

  loadReports(propertyId: number) {
    this.reportsService.getReportsByPropertyId(propertyId).subscribe({
      next: data => this.reports = data,
      error: error => console.error('Error fetching reports:', error)
    });
  }

  submitAnnouncement() {
    if (this.property) {
      this.announcementsService.addAnnouncement(this.property.id, this.newAnnouncement).subscribe({
        next: announcement => {
          this.announcements.push(announcement);
          this.togglePopup();  // Hide the popup after submission
        },
        error: error => console.error('Failed to add announcement:', error)
      });
    } else {
      console.error('No property loaded');
    }
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
