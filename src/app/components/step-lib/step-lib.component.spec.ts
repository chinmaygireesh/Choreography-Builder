import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepLibComponent } from './step-lib.component';

describe('StepLibComponent', () => {
  let component: StepLibComponent;
  let fixture: ComponentFixture<StepLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepLibComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
