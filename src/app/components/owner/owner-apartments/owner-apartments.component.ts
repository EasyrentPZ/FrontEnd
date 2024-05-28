import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Ensure Router is imported
import { ApartmentOwnerService } from 'src/app/services/apartment-owner.service';
import { Property } from 'src/app/shared/Property'; // Ensure this path is correct

@Component({
  selector: 'app-owner-apartments',
  templateUrl: './owner-apartments.component.html',
  styleUrls: ['./owner-apartments.component.css']
})
export class OwnerApartmentsComponent implements OnInit {

  properties: Property[] = [];

  constructor(
    private apartmentOwnerService: ApartmentOwnerService,
    private router: Router  // Inject Router here
  ) {}

  ngOnInit(): void {
    this.loadOwnerProperties();
  }

  loadOwnerProperties(): void {
    this.apartmentOwnerService.getOwnerProperties().subscribe(
      response => {
        this.properties = response.content; // Adjust according to your API response structure
      },
      error => {
        console.error('Error fetching properties:', error);
      }
    );
  }

  // Navigation methods
  editApartment(id: number) {
    this.router.navigate([`/owner/owner-apartment-management/${id}`]);
  }

  viewBills(id: number) {
    this.router.navigate([`/owner/owner-bills/${id}`]);
  }

  viewReports(id: number) {
    this.router.navigate([`/owner/owner-reports/${id}`]);
  }

  addApartment() {
      this.router.navigate([`owner/owner-apartment-add`])
    }
}
