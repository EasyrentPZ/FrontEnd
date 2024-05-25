// owner-apartment-Add.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistrationForm } from 'src/app/interfaces/registration-form';
import { ApartmentService } from 'src/app/services/apartment.service';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { Property } from 'src/app/shared/Property';
import { Renter } from 'src/app/shared/Renter';
import { PropertyAddRequestDto } from 'src/app/interfaces/property-add-request-dto';

@Component({
  selector: 'app-owner-apartment-add',
  templateUrl: './owner-apartment-add.component.html',
  styleUrls: ['./owner-apartment-add.component.css']
})
export class OwnerApartmentAddComponent implements OnInit {
  apartmentId!: number;
  apartmentDetails: any = {};
  newTenantDetails: any = {}; // Nowy lokator
  newRentContractDetails: any = {}; // Nowa umowa
  rentContracts: any = {};
  tenants: any = {};

  selectedContractId: number = -1;
  addingNewContract: boolean = false;
  updateApartmentDiv: boolean = false;
  showRentContract: number = -1;

  cityNames: string[] = [];
  selectedCity: string = '';

  property: PropertyAddRequestDto = {
    address: '',
    area: 0,
    description: '',
    pets: false,
    city: '',
    rentAmount: 0,
    utilityCost: 0,
    deposit: 0,
    streetName: '',
    livingRooms: 0,
    features: new Set<string>(),
    images: []
  };

  

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apartmentService: ApartmentService,
    private authService: AuthService,
    private msgService: MessageService,
    private location: Location
  ) { }


  availableTags: string[] = [];

  ngOnInit(): void {
    this.apartmentService.getFeatureNames().subscribe(
      (data: string[]) => this.availableTags = data,
      (error) => console.error(error)
    );
    this.apartmentService.getCityNames('Polska').subscribe(
      cityNames => this.cityNames = cityNames,
      error => console.error('Error fetching city names:', error)
    );
  }
  
  
  renters =[
    new Renter(1, "Michał", "932323223")
  ]

  isPopupVisible = false;
  isPhonePopupVisible = false;
  phoneNumber="";
  togglePopup() {
    this.isPopupVisible = !this.isPopupVisible;
  }

  togglePhonePopup(number : string) {
    this.phoneNumber = number;
    this.isPhonePopupVisible = !this.isPhonePopupVisible;
    console.log(this.isPhonePopupVisible)
  }



  reloadPage(): void {
    this.location.go(this.location.path());
  }

  photos: string[] = [];
  selectedFile: File | null = null;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.addPhoto();
    }
  }

  triggerFileInput(): void {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }

  addPhoto(): void {
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          this.photos.push(reader.result as string);
          this.selectedImages.push(this.selectedFile as File);
          this.selectedFile = null;
        }
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  removePhoto(index: number): void {
    this.photos.splice(index, 1);
  }

  value: number = 4;

  decrement() {
    if (!isNaN(this.property.livingRooms)) {
      this.property.livingRooms--;
    }
  }

  increment() {
    if (!isNaN(this.property.livingRooms)) {
      this.property.livingRooms++;
    }
  }

  showTagList = false;
  selectedTags: string[] = [];

  toggleTagList() {
    this.showTagList = !this.showTagList;
  }

  addTag(tag: string) {
    if (!this.selectedTags.includes(tag)) {
      this.selectedTags.push(tag);
    }
    this.showTagList = false;  // Hide the tag list after selecting a tag
  }

  selectedImages: File[] = [];

  // New method to handle adding selected images
  addSelectedImages(images: File[]): void {
    this.selectedImages = images;
  }

  // Updated saveProperty method
  saveProperty(): void {
    console.log(this.property);
    const propertyData: PropertyAddRequestDto = {
      // Gather data from form fields
      address: this.property.address,
      area: this.property.area,
      description: this.property.description,
      pets: this.property.pets,
      city: this.selectedCity,
      rentAmount: this.property.rentAmount,
      utilityCost: this.property.utilityCost,
      deposit: this.property.deposit,
      streetName: this.property.streetName,
      livingRooms: this.property.livingRooms,
      features: new Set(this.selectedTags),
      images: this.selectedImages // Pass selected images
    };

    // Call the service method to add property
    this.apartmentService.addProperty(propertyData).subscribe(
      response => {
        // Handle success
        this.msgService.add({ severity: 'success', summary: 'Sukces', detail: 'Mieszkanie dodane pomyślnie' });
        this.router.navigate(['/owner/owner-apartments']);
      },
      error => {
        // Handle error
        this.msgService.add({ severity: 'error', summary: 'Błąd', detail: 'Wystąpił błąd podczas dodawania mieszkania' });
      }
    );
  }
}
