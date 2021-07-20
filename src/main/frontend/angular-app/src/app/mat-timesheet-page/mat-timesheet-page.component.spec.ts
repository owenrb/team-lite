import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatTimesheetPageComponent } from './mat-timesheet-page.component';

describe('MatTimesheetPageComponent', () => {
  let component: MatTimesheetPageComponent;
  let fixture: ComponentFixture<MatTimesheetPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatTimesheetPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatTimesheetPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
