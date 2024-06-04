import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApartmentOwnerService } from 'src/app/services/apartment-owner.service';
import { Property } from 'src/app/shared/Property';
import { Bill } from 'src/app/shared/Bill';
import { ApartmentService } from 'src/app/services/apartment.service';
import { BillsServiceService } from 'src/app/services/bills-service.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-owner-bills',
  templateUrl: './owner-bills.component.html',
  styleUrls: ['./owner-bills.component.css']
})
export class OwnerBillsComponent implements OnInit {
  property?: Property;  // `property` can be undefined initially
  bills: any[] = [];
  billTitle = '';
  invoiceNumber = '';
  amount: number = 0;
  invoice = '';
  selectedFile: File | null = null;
  

  constructor(
    private apartmentOwnerService: ApartmentOwnerService,
    private billsService: BillsServiceService,
    private apartmentService :ApartmentService,
    private msgService: MessageService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const propertyId = +this.route.snapshot.params['id']; // Fetching ID from route
    this.apartmentOwnerService.getOwnerPropertyById(propertyId).subscribe({
      next: (data) => {
        this.property = data;
      },
      error: (error) => console.error('Error fetching property:', error)
    });
    this.billsService.getBills(propertyId).subscribe(
      (data) => {
        this.bills = data;
        console.log(this.bills)
      },
      (error) => {
        console.error('Error fetching payment data:', error);
      }
    );
  }


  addBill() {
    if (this.selectedFile && this.property) {
      const formData = new FormData();
      const d = new Date();
      const dateString = d.toJSON().substring(0, 10);
      formData.append("issueDate", dateString);
      formData.append("title", this.billTitle);
      formData.append("invoiceNumber", this.invoiceNumber);
      formData.append("amount", this.amount.toString());
      formData.append("invoice", this.selectedFile, this.invoice);
      console.log(formData)
      this.billsService.addPayment(formData, this.property?.id).subscribe(
        response => {
          // Handle success
          this.msgService.add({ severity: 'success', summary: 'Sukces', detail: 'Rachunek dodany pomyślnie!' });
          window.location.reload();
        },
        error => {
          // Handle error
          this.msgService.add({ severity: 'error', summary: 'Błąd', detail: 'Wystąpił błąd podczas dodawania rachunku' });
        }
      );;
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  downloadPdf(id: number) {
    this.billsService.getBillPdf(id).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `bill_${id}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, error => {
      console.error('Error downloading the PDF:', error);
    });
  }

  loadBills(propertyId: number) {
    // Placeholder for bills fetching logic
    // This method should fetch bills related to the property ID and populate the `bills` array
    // Example:
    // this.billsService.getBillsForProperty(propertyId).subscribe(data => this.bills = data);
  }
}
