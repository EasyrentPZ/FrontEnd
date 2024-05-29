// owner-apartment-management.component.ts
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
import { PropertyDetail } from 'src/app/interfaces/property-detail';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-owner-apartment-management',
  templateUrl: './owner-apartment-management.component.html',
  styleUrls: ['./owner-apartment-management.component.css']
})
export class OwnerApartmentManagementComponent implements OnInit {
  newTenantName: string = '';
  newTenantEmail: string = '';
  newTenantPassword: string = '';
  newTenantLastname: string = '';

  tenants: any = {};
  cityNames: string[] = [];
  selectedCity: string = '';

  selectedContractId: number = -1;
  addingNewContract: boolean = false;
  updateApartmentDiv: boolean = false;
  showRentContract: number = -1;
  id: number | null = null;

  photos: string[] = [];
  selectedFile: File | null = null;
  renters: Renter[] = [];
  selectedImages: File[] = [];


  property: PropertyDetail = {
    id: 0,
    owner: {
      id: 0,
      name: '',
      lastname: '',
      username: '',
      phoneNumber: null
    },
    address: '',
    area: 0,
    description: '',
    pets: false,
    features: [],
    city: {
      id: 0,
      region: {
        id: 0,
        regionName: '',
        countryInfoDto: {
          id: 0,
          countryName: ''
        }
      },
      name: ''
    },
    rentAmount: 0,
    utilityCost: 0,
    deposit: 0,
    streetName: '',
    photos: [],
    livingRooms: 0,
    contract_id: null,
    propertyStatus: 3,
    tenantsId: []
  };


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apartmentService: ApartmentService,
    private authService: AuthService,
    private msgService: MessageService,
    private location: Location,
    private userService: UserService
  ) { }


  availableTags: string[] = [];

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.id = id !== null ? Number(id) : null;
    this.apartmentService.getFeatureNames().subscribe(
      (data: string[]) => this.availableTags = data,
      (error) => console.error(error)
    );
    this.apartmentService.getCityNames('Polska').subscribe(
      cityNames => this.cityNames = cityNames,
      error => console.error('Error fetching city names:', error)
    );
    if (this.id) {
      this.apartmentService.getPropertyOwnerDetailById(this.id).subscribe(
        (data) => {
          this.property = data;
          this.photos = (this.property.photos || []).map(photo => photo.photo).filter(photo => photo !== undefined) as string[];
          this.selectedTags = (this.property.features || []).map(feature => feature.name).filter(name => name !== undefined) as string[];
          this.selectedCity = this.property.city?.name || '';
          if (this.property.tenantsId) {
            this.property.tenantsId.forEach(id => {
              this.userService.getUserById(id).subscribe(
                (data) => {
                  this.renters.push(new Renter(id, data.name, data.email));
                },
                (error) => console.error('Error fetching tenant details', error)
              );
            });

          }
        },
        (error) => console.error('Error fetching property details', error)
      );


    }

  }

  addSelectedImages(images: File[]): void {
    this.selectedImages = images;
  }



  isPopupVisible = false;
  isPhonePopupVisible = false;
  phoneNumber = "";
  togglePopup() {
    this.isPopupVisible = !this.isPopupVisible;
  }

  addTenant() {
    const tenantData = {
      email: this.newTenantEmail,
      password: this.newTenantPassword,
      name: this.newTenantName,
      lastname: this.newTenantLastname,
      propertyId: this.id || 0 // Ensure propertyId is set; use 0 as default if id is null
    };

    this.apartmentService.addTenant(tenantData)
      .subscribe(
        response => {
          // Handle success
          this.msgService.add({ severity: 'success', summary: 'Success', detail: 'Pomyślnie dodano mieszkańca!' });
          this.reloadPage();
        },
        error => {
          // Handle error
          this.msgService.add({ severity: 'error', summary: 'Error', detail: 'Nie udało się dodać mieszkańca' });
          console.error('Error adding tenant:', error);
        }
      );
  }

  updateProperty() {
    const propertyData: PropertyAddRequestDto = {
      // Gather data from form fields
      address: this.property?.address ?? '',
      area: this.property?.area ?? 0,
      description: this.property?.description ?? '',
      pets: this.property?.pets ?? false,
      city: this.selectedCity ?? '',
      rentAmount: this.property?.rentAmount ?? 0,
      utilityCost: this.property?.utilityCost ?? 0,
      deposit: this.property?.deposit ?? 0,
      streetName: this.property?.streetName ?? '',
      livingRooms: this.property?.livingRooms ?? 0,
      features: new Set(this.selectedTags),
      images: this.selectedImages ?? []
    };
    if (this.id) {
      this.apartmentService.updateProperty(this.id, propertyData).subscribe(
        response => {
          // Handle success
          this.msgService.add({ severity: 'success', summary: 'Sukces', detail: 'Mieszkanie zaktualizowane pomyślnie' });
          
        },
        error => {
          // Handle error
          this.msgService.add({ severity: 'error', summary: 'Błąd', detail: 'Wystąpił błąd podczas aktualizowania mieszkania' });
        }
      );
      if (this.property.propertyStatus) {
        this.apartmentService.updatePropertyStatus(this.id, this.property.propertyStatus).subscribe(
          response => {
            this.router.navigate(['/owner/owner-apartments']);
          },
          error => {

          }
        );
      }
    }
  }

  togglePhonePopup(number: string) {
    this.phoneNumber = number;
    this.isPhonePopupVisible = !this.isPhonePopupVisible;
    console.log(this.isPhonePopupVisible)
  }



  reloadPage(): void {
    this.location.go(this.location.path());
  }



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
    if (!isNaN(this.value)) {
      this.value--;
    }
  }

  increment() {
    if (!isNaN(this.value)) {
      this.value++;
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
}
