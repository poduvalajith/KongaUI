import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerSelectionControlComponent } from './passenger-selection-control.component';

describe('PassengerSelectionControlComponent', () => {
  let component: PassengerSelectionControlComponent;
  let fixture: ComponentFixture<PassengerSelectionControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassengerSelectionControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PassengerSelectionControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
