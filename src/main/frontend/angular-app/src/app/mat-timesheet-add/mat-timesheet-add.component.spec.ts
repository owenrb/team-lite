import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatTimesheetAddComponent } from './mat-timesheet-add.component';

describe('MatTimesheetAddComponent', () => {
  let component: MatTimesheetAddComponent;
  let fixture: ComponentFixture<MatTimesheetAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatTimesheetAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatTimesheetAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
