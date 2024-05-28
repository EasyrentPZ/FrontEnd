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

@Component({
  selector: 'app-owner-apartment-management',
  templateUrl: './owner-apartment-management.component.html',
  styleUrls: ['./owner-apartment-management.component.css']
})
export class OwnerApartmentManagementComponent implements OnInit {
  apartmentId!: number;
  apartmentDetails: any = {};
  newTenantDetails: any = {}; // Nowy lokator
  newRentContractDetails: any = {}; // Nowa umowa
  rentContracts: any = {};
  tenants: any = {};
  cityNames: string[] = [];
  selectedCity: string = '';

  selectedContractId: number = -1;
  addingNewContract: boolean = false;
  updateApartmentDiv: boolean = false;
  showRentContract: number = -1;
  

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
  
  property = new Property(1, 'Zielone', 'Wadowicka', '21/37', 'lorem ipsum', 4000, 1000, 1300, 4, [], undefined)
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

  

  // async ngOnInit(): Promise<void> {
  //   // await this.route.params.subscribe(async params => {
  //   //   this.apartmentId = params['id'];
  //   // });
  //   // await this.getApartmentDetails();
  //   // await this.getRentContracts();
  // }

  deleteApartment(): void {
  // //   this.apartmentService.deleteApartment(this.apartmentId).subscribe(
  // //     (response: any) => {
  // //       this.msgService.add({ severity: 'success', summary: 'Sukces', detail: 'Mieszkanie usunięto pomyślnie' });
  // //       this.router.navigate(['/owner/owner-apartments']);
  // //     },
  // //     (error) => {
  // //       this.msgService.add({ severity: 'error', summary: 'Błąd', detail: 'Wystąpił błąd podczas usuwania mieszkania' });
  // //     }
  // //   );
  }
  
  getApartmentDetails(): void {
  //   this.apartmentService.getApartmentDetails(this.apartmentId).subscribe(
  //     (apartmentDetails: any) => {
  //       this.apartmentDetails = apartmentDetails;
  //     },
  //     (error) => {
  //       this.msgService.add({ severity: 'error', summary: 'Error', detail: 'Wystąpił błąd podczas pobierania szczegółów mieszkania' });
  //     }
  //   );
  }

  updateApartment(): void {
  //   this.apartmentService.updateApartment(this.apartmentId, this.apartmentDetails).subscribe(
  //     (response: any) => {
  //       this.msgService.add({ severity: 'success', summary: 'Sukces', detail: 'Mieszkanie zaktualizowano pomyślnie' });
  //       this.updateApartmentDiv = false; 
  //     },
  //     (error) => {
  //       this.msgService.add({ severity: 'error', summary: 'Błąd', detail: 'Wystąpił błąd podczas aktualizacji mieszkania' });
  //     }
  //   );
  }

  updateRentContract(): void {
  //   const contractId = this.rentContracts.content[this.showRentContract].id;
  //   //TODO: NIE AKTUALIZUJE
  //   this.apartmentService.updateRentContract(this.apartmentId, contractId, this.rentContracts.content[this.showRentContract]).subscribe(
  //     (response: any) => {
  //       this.msgService.add({ severity: 'success', summary: 'Sukces', detail: 'Umowa najmu zaktualizowana pomyślnie' });
  //       //
  //     },
  //     (error) => {
  //       this.msgService.add({ severity: 'error', summary: 'Błąd', detail: 'Wystąpił błąd podczas aktualizacji umowy najmu' });
  //     }
  //   );
  }

  deleteRentContract(): void {
  //   const contractId = this.rentContracts.content[this.showRentContract].id;
  
  //   this.apartmentService.deleteRentContract(this.apartmentId, contractId).subscribe(
  //     (response: any) => {
  //       this.msgService.add({ severity: 'success', summary: 'Sukces', detail: 'Umowa najmu usunięta pomyślnie' });
  //       this.getRentContracts(); 
  //       this.showRentContract = -1; 
  //     },
  //     (error) => {
  //       this.msgService.add({ severity: 'error', summary: 'Błąd', detail: 'Wystąpił błąd podczas usuwania umowy najmu. Spróbuj najpierw usunąć lokatorów.' });
  //     }
  //   );
  }

  updateTenantDetails(tenant: any): void {
  //   const updatedTenantDetails = {
  //     name: tenant.name, // Nowe imię
  //     surname: tenant.surname, // Nowe nazwisko
  //     email: tenant.email, // Nowy email
  //     phoneNumber: tenant.phoneNumber // Nowy numer telefonu
  //   };
  
  //   this.apartmentService.updateTenantDetails(this.apartmentId, this.selectedContractId, tenant.id, updatedTenantDetails)
  //     .subscribe(
  //       (response: any) => {
  //         this.msgService.add({ severity: 'success', summary: 'Sukces', detail: 'Informacje o lokatorze zaktualizowane pomyślnie' });
  //       },
  //       (error) => {
  //         this.msgService.add({ severity: 'error', summary: 'Błąd', detail: 'Wystąpił błąd podczas aktualizacji informacji o lokatorze' });
  //       }
  //     );
  }
  
  deleteTenantDetails(rentContractId: any, tenantId: any): void {
  //   this.apartmentService.deleteTenantDetails(this.apartmentId, rentContractId, tenantId)
  //     .subscribe(
  //       (response: any) => {
  //         this.msgService.add({ severity: 'success', summary: 'Sukces', detail: 'Informacje o lokatorze usunięte pomyślnie' });
  //         this.showRentContract = -1;
  //       },
  //       (error) => {
  //         this.msgService.add({ severity: 'error', summary: 'Błąd', detail: 'Wystąpił błąd podczas usuwania informacji o lokatorze' });
  //       }
  //     );
  }

  async getRentContracts(): Promise<void> {
  //   return new Promise<void>((resolve, reject) => {
  //     this.apartmentService.getRentContracts(this.apartmentId).subscribe(
  //       (rentContracts: any) => {
  //         this.rentContracts = rentContracts;
  //         resolve();
  //       },
  //       (error) => {
  //         console.error('Błąd podczas pobierania listy umów najmu:', error);
  //         reject(error);
  //       }
  //     );
  //   });
  }

  addRentContract(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
  //     const residentUserId = localStorage.getItem('residentUserId');
  
  //     if (residentUserId) {
  //       this.newRentContractDetails.residentUserId = +residentUserId;
  
  //       this.apartmentService.addRentContract(this.apartmentId, this.newRentContractDetails).subscribe(
  //         (response: any) => {
  //           this.msgService.add({ severity: 'success', summary: 'Sukces', detail: 'Umowa najmu dodana pomyślnie' });
  //           resolve();
  //         },
  //         (error) => {
  //           this.msgService.add({ severity: 'error', summary: 'Błąd', detail: 'Wystąpił błąd podczas dodawania umowy najmu' });
  //           reject(error);
  //         }
  //       );
  //     } else {
  //       this.msgService.add({ severity: 'error', summary: 'Błąd', detail: 'Nie znaleziono residentUserId w localStorage' });
  //       reject('Brak residentUserId w localStorage');
  //     }
    });
  }
  


  getTenants(id: number): void {
  //   this.apartmentService.getTenants(this.apartmentId, id).subscribe(
  //     (tenants: any) => {
  //       this.tenants = tenants;
  //     },
  //     (error) => {
  //       console.error('Błąd podczas pobierania listy umów najmu:', error);
  //     }
  //   );
  }


  async addTenant(): Promise<void> {
  //   return new Promise<void>((resolve, reject) => {
  //     if(this.addingNewContract) {
  //       let idx = this.rentContracts.content.length - 1;
  //       if(idx < 0) idx = 0;
  //       this.selectedContractId = this.rentContracts.content[idx].id;
  //     }
  //     console.log(this.apartmentId, this.selectedContractId, this.newTenantDetails);
  //     this.apartmentService.addTenant(this.apartmentId, this.selectedContractId, this.newTenantDetails).subscribe(
  //       (response: any) => {
  //         this.msgService.add({ severity: 'success', summary: 'Sukces', detail: 'Lokator dodany pomyślnie' });
  //         resolve();
  //       },
  //       (error) => {
  //         this.msgService.add({ severity: 'error', summary: 'Błąd', detail: 'Wystąpił błąd podczas dodawania lokatora' });
  //         reject(error);
  //       }
  //     );
  //   });
  }

  registerTenant(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
  // //     const newTenantDetails: RegistrationForm = {
  // //       name: this.newTenantDetails.name,
  // //       surname: this.newTenantDetails.surname,
  // //       email: this.newTenantDetails.email,
  // //       password: 'haslo',
  // //       role: 'TENANT',
  // //     };
  
  // //     // this.authService.registerTenant(newTenantDetails).subscribe(
  // //     //   (response: any) => {
  // //     //     this.msgService.add({ severity: 'success', summary: 'Sukces', detail: 'Lokator zarejestrowany pomyślnie' });
  // //     //     resolve(response);
  // //     //   },
  // //     //   (error) => {
  // //     //     this.msgService.add({ severity: 'error', summary: 'Błąd', detail: 'Wystąpił błąd podczas rejestracji lokatora' });
  // //     //     reject(error);
  // //     //   }
  // //     // );
    });
  }
  

  async showRentContractDetails(index: number): Promise <void> {
  //   const contract = this.rentContracts.content[index];
  //   if (contract) {
  //     if (index === this.showRentContract) {
  //       this.showRentContract = -1;
  //     } else {
  //       await this.getTenants(contract.id);
  //       this.showRentContract = index;
  //     }
  //   }
  }

  showUpdateApartment(): void {
  //   this.updateApartmentDiv = !this.updateApartmentDiv;
  }

  async addNewTenant(): Promise<void> {
  //   await this.registerTenant();
  //   await this.addRentContract();
  //   await this.getRentContracts();
  //   await this.addTenant();
  //   this.newTenantDetails = {};
  //   this.addingNewContract = false;
    // await this.reloadPage();

  }
  async addNewTenantToContract(): Promise<void> {
  //   await this.registerTenant();
  //   await this.getRentContracts();
  //   await this.addTenant();
  //   this.newTenantDetails = {};
  //   this.addingNewContract = false;
  //   await this.reloadPage();

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
