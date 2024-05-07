import { Component } from '@angular/core';
import { Announcement } from 'src/app/shared/Announcement';
import { Report } from 'src/app/shared/Report';
import { Property } from 'src/app/shared/Property';
@Component({
  selector: 'app-owner-reports',
  templateUrl: './owner-reports.component.html',
  styleUrls: ['./owner-reports.component.css']
})
export class OwnerReportsComponent {
  property = new Property("Mieszkanie 60m2", "Spokojna", "9", "desc", 1000, 1000, 2000);
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

  updateBackgroundColor(event: Event) {
    const target = event.target as HTMLSelectElement;
    const selectedOption = target.options[target.selectedIndex];
    target.style.backgroundColor = selectedOption.style.backgroundColor;
  }
}
