import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApartmentOwnerService } from 'src/app/services/apartment-owner.service';
import { Property } from 'src/app/shared/Property';
import { Bill } from 'src/app/shared/Bill';

@Component({
  selector: 'app-owner-bills',
  templateUrl: './owner-bills.component.html',
  styleUrls: ['./owner-bills.component.css']
})
export class OwnerBillsComponent implements OnInit {
  property?: Property;  // `property` can be undefined initially
  bills: Bill[] = [];

  constructor(
    private apartmentOwnerService: ApartmentOwnerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const propertyId = +this.route.snapshot.params['id']; // Fetching ID from route
    this.apartmentOwnerService.getOwnerPropertyById(propertyId).subscribe({
      next: (data) => {
        this.property = data;
        this.loadBills(data.id);  // Assuming you have a method to fetch bills by property ID
      },
      error: (error) => console.error('Error fetching property:', error)
    });
  }

  loadBills(propertyId: number) {
    // Placeholder for bills fetching logic
    // This method should fetch bills related to the property ID and populate the `bills` array
    // Example:
    // this.billsService.getBillsForProperty(propertyId).subscribe(data => this.bills = data);
  }
}
