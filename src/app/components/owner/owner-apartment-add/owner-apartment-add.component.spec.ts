import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerApartmentAddComponent } from './owner-apartment-add.component';

describe('OwnerApartmentAddComponent', () => {
  let component: OwnerApartmentAddComponent;
  let fixture: ComponentFixture<OwnerApartmentAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OwnerApartmentAddComponent]
    });
    fixture = TestBed.createComponent(OwnerApartmentAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
