import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlinesFilterComponent } from './airlines-filter.component';

describe('AirlinesFilterComponent', () => {
  let component: AirlinesFilterComponent;
  let fixture: ComponentFixture<AirlinesFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirlinesFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlinesFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
