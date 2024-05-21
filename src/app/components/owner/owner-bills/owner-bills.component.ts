import { Component } from '@angular/core';
import { Property } from 'src/app/shared/Property';
import { Bill } from 'src/app/shared/Bill';

@Component({
  selector: 'app-owner-bills',
  templateUrl: './owner-bills.component.html',
  styleUrls: ['./owner-bills.component.css']
})
export class OwnerBillsComponent {
  property = new Property("Mieszkanie 60m2", "Spokojna", "9", "desc", 1000, 1000, 2000);
  bills = [
    new Bill(1, "Kwiecień 2024", "AXOYUNDS3124", 4000),
    new Bill(1, "Kwiecień 2024", "AXOYUNDS3124", 4000),
    new Bill(1, "Kwiecień 2024", "AXOYUNDS3124", 4000)
  ];
}
