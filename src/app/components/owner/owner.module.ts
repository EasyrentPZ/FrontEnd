// owner.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwnerRoutingModule } from './owner-routing.module';
import { OwnerComponent } from './owner.component';
import { OwnerAnnouncementsComponent } from './owner-announcements/owner-announcements.component';
import { OwnerApartmentsComponent } from './owner-apartments/owner-apartments.component';
import { OwnerHelloComponent } from './owner-hello/owner-hello.component';
import { OwnerReportsComponent } from './owner-reports/owner-reports.component';
import { OwnerBillsComponent } from './owner-bills/owner-bills.component';
import { OwnerAccountComponent } from './owner-account/owner-account.component';
import { OwnerApartmentManagementComponent } from './owner-apartment-management/owner-apartment-management.component';
import { OwnerApartmentAddComponent } from './owner-apartment-add/owner-apartment-add.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; 
import { MenuModule } from '../menu/menu.module';


@NgModule({
  declarations: [
    OwnerComponent,
    OwnerAnnouncementsComponent,
    OwnerApartmentsComponent,
    OwnerHelloComponent,
    OwnerReportsComponent,
    OwnerAccountComponent,
    OwnerApartmentManagementComponent,
    OwnerApartmentAddComponent,
    OwnerBillsComponent
  ],
  imports: [
    CommonModule,
    OwnerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MenuModule
  ]
})
export class OwnerModule { }
