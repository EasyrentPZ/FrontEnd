// renter.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RenterRoutingModule } from './renter-routing.module';
import { RenterComponent } from './renter.component';
import { RenterApartmentComponent } from './renter-apartment/renter-apartment.component';
import { RenterReportsComponent } from './renter-reports/renter-reports.component';
import { RenterHelloComponent } from './renter-hello/renter-hello.component';
import { RenterApartmentManagementComponent } from './renter-apartment-management/renter-apartment-management.component';
import { MenuModule } from '../menu/menu.module';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        RenterComponent,
        RenterApartmentComponent,
        RenterReportsComponent,
        RenterHelloComponent,
        RenterApartmentManagementComponent
        
    ],
    imports: [
        CommonModule,
        FormsModule,
        RenterRoutingModule,
        MenuModule
    ]
})
export class RenterModule { }
