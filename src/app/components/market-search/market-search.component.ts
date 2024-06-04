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
  allProperties: Property[] = [];
  properties: Property[] = [];
  filters: any = {
    priceFrom: null,
    priceTo: null,
    areaFrom: null,
    areaTo: null,
  };
  sortOrder: string = 'price-ASC';  // Default sorting order

  constructor(private apartmentService: ApartmentService) {}

  ngOnInit() {
    this.loadProperties({});
  }

  loadProperties(filters: any) {
    this.apartmentService.getApartments(filters).subscribe(
      response => {
        this.allProperties = response.content.map(item => new Property(
          item.id,
          item.name,
          item.streetName || '',
          item.area || '',
          item.description,
          Number(item.rentAmount),
          Number(item.utilityCost),
          Number(item.deposit),
          item.livingRooms,
          item.photos,
          item.address
        ));
        this.applyFilters(); // Apply initial filters if any
        this.applySorting(); // Apply default sorting
      },
      error => console.error('Error fetching properties:', error)
    );
  }

  applyFilters() {
    this.properties = this.allProperties.filter(property => {
      return (!this.filters.priceFrom || property.rentAmount >= this.filters.priceFrom) &&
             (!this.filters.priceTo || property.rentAmount <= this.filters.priceTo) &&
             (!this.filters.areaFrom || property.area >= this.filters.areaFrom) &&
             (!this.filters.areaTo || property.area <= this.filters.areaTo);
    });
    this.applySorting(); // Reapply sorting whenever filters change
  }

  applySorting() {
    if (this.sortOrder === 'price-ASC') {
      this.properties.sort((a, b) => a.rentAmount - b.rentAmount);
    } else if (this.sortOrder === 'price-DESC') {
      this.properties.sort((a, b) => b.rentAmount - a.rentAmount);
    }
  }
}
