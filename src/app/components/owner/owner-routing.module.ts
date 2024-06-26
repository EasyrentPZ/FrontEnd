// owner-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OwnerComponent } from './owner.component';
import { OwnerAnnouncementsComponent } from './owner-announcements/owner-announcements.component';
import { OwnerApartmentsComponent } from './owner-apartments/owner-apartments.component';
import { OwnerHelloComponent } from './owner-hello/owner-hello.component';
import { OwnerReportsComponent } from './owner-reports/owner-reports.component';
import { OwnerAccountComponent } from './owner-account/owner-account.component';
import { OwnerBillsComponent } from './owner-bills/owner-bills.component';
import { OwnerApartmentManagementComponent } from './owner-apartment-management/owner-apartment-management.component';
import { OwnerApartmentAddComponent } from './owner-apartment-add/owner-apartment-add.component';

const routes: Routes = [
  {
    path: '',
    component: OwnerComponent,
    children: [
      { path: 'owner-announcements', component: OwnerAnnouncementsComponent },
      { path: 'owner-apartments', component: OwnerApartmentsComponent },
      { path: 'owner-hello', component: OwnerHelloComponent },
      { path: 'owner-reports/:id', component: OwnerReportsComponent },
      { path: 'owner-account', component: OwnerAccountComponent },
      { path: 'owner-bills/:id', component: OwnerBillsComponent },
      { path: 'owner-apartment-management/:id', component: OwnerApartmentManagementComponent },
      { path: 'owner-apartment-add', component: OwnerApartmentAddComponent },

      { path: '', redirectTo: 'owner-hello', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OwnerRoutingModule { }
