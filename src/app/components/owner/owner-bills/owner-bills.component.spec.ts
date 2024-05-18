import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerBillsComponent } from './owner-bills.component';

describe('OwnerBillsComponent', () => {
  let component: OwnerBillsComponent;
  let fixture: ComponentFixture<OwnerBillsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OwnerBillsComponent]
    });
    fixture = TestBed.createComponent(OwnerBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
