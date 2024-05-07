import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { MenuComponent } from './menu.component'; 

@NgModule({
  declarations: [
    MenuComponent,
  ],
  exports: [
    MenuComponent,
  ],
  imports: [
    CommonModule, // Add CommonModule here
  ]
})
export class MenuModule { }