import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { PropertyDetail } from 'src/app/interfaces/property-detail';
import { ApartmentTenantService } from 'src/app/services/apartment-tenant.service';
import { Bill } from 'src/app/shared/Bill';
import { BillsServiceService } from 'src/app/services/bills-service.service';

@Component({
  selector: 'app-renter-hello',
  templateUrl: './renter-hello.component.html',
  styleUrls: ['./renter-hello.component.css']
})
export class RenterHelloComponent {
  constructor(private router: Router,
    private apartmentTenantService: ApartmentTenantService,
    private billsService: BillsServiceService, 
    private msgService: MessageService) {}

    bills: Bill[] = [];
    property: PropertyDetail = {};

    ngOnInit(): void {
      this.apartmentTenantService.getRenterProperty().subscribe(
        (data: PropertyDetail) => {
          this.property = data;
          if (this.property.id !== undefined) {
            this.billsService.getBills(this.property.id).subscribe(
              (billsData: Bill[]) => {
                this.bills = billsData;
                console.log(this.bills);
              },
              (error) => {
                console.error('Error fetching payment data:', error);
              }
            );
          } else {
            console.error('Property ID is undefined');
          }
        },
        (error) => {
          console.error('Error fetching property data:', error);
        }
      );
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
}
