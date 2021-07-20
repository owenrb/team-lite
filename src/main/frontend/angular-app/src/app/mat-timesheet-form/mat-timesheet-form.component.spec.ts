import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatTimesheetFormComponent } from './mat-timesheet-form.component';

describe('MatTimesheetFormComponent', () => {
  let component: MatTimesheetFormComponent;
  let fixture: ComponentFixture<MatTimesheetFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatTimesheetFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatTimesheetFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
