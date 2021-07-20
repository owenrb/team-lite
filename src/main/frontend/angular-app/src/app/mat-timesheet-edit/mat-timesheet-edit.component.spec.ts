import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatTimesheetEditComponent } from './mat-timesheet-edit.component';

describe('MatTimesheetEditComponent', () => {
  let component: MatTimesheetEditComponent;
  let fixture: ComponentFixture<MatTimesheetEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatTimesheetEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatTimesheetEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
