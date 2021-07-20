import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatTimesheetCloneComponent } from './mat-timesheet-clone.component';

describe('MatTimesheetCloneComponent', () => {
  let component: MatTimesheetCloneComponent;
  let fixture: ComponentFixture<MatTimesheetCloneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatTimesheetCloneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatTimesheetCloneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
