// renter-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RenterComponent } from './renter.component';
import { RenterAnnouncementsComponent } from './renter-announcements/renter-announcements.component';
import { RenterApartmentComponent } from './renter-apartment/renter-apartment.component';
import { RenterReportsComponent } from './renter-reports/renter-reports.component';
import { RenterAccountComponent } from './renter-account/renter-account.component';
import { RenterHelloComponent } from './renter-hello/renter-hello.component';
import { RenterApartmentManagementComponent } from './renter-apartment-management/renter-apartment-management.component';

const routes: Routes = [
    {
        path: '',
        component: RenterComponent,
        children: [
            { path: 'renter-announcements', component: RenterAnnouncementsComponent },
            { path: 'renter-apartment', component: RenterApartmentComponent },
            { path: 'renter-reports', component: RenterReportsComponent },
            { path: 'renter-account', component: RenterAccountComponent },
            { path: 'renter-hello', component: RenterHelloComponent },
            { path: 'renter-apartment-management/:id', component: RenterApartmentManagementComponent },
            { path: '', redirectTo: 'renter-hello', pathMatch: 'full' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RenterRoutingModule { }
