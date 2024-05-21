import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApartmentService } from 'src/app/services/apartment.service';
import { Property } from '../../shared/Property';

@Component({
  selector: 'app-market-search',
  templateUrl: './market-search.component.html',
  styleUrls: ['./market-search.component.css']
})
export class MarketSearchComponent implements OnInit {
  properties: Property[] = [];

  constructor(private apartmentService: ApartmentService) {}

  ngOnInit() {
    this.loadProperties({});
  }
  
  loadProperties(filters: any) {
    this.apartmentService.getApartments(filters).subscribe(
      response => {
        this.properties = response.content.map(item => new Property(
          item.id,
          item.name,
          item.streetName || '', // Assuming street is directly returned
          item.buildingNo || '',
          item.description,
          Number(item.rentAmount),
          Number(item.utilityCost),
          Number(item.deposit),
          item.livingRooms,
          item.photos, // directly passing the photos array
          item.address  // passing the complete address if available
        ));
      },
      error => console.error('Error fetching properties:', error)
    );
  }
  
}
