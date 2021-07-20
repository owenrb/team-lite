import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatTimesheetComponent } from './mat-timesheet.component';

describe('MatTimesheetComponent', () => {
  let component: MatTimesheetComponent;
  let fixture: ComponentFixture<MatTimesheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatTimesheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatTimesheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
