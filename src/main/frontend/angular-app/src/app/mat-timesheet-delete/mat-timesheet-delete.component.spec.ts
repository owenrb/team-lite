import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatTimesheetDeleteComponent } from './mat-timesheet-delete.component';

describe('MatTimesheetDeleteComponent', () => {
  let component: MatTimesheetDeleteComponent;
  let fixture: ComponentFixture<MatTimesheetDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatTimesheetDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatTimesheetDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
