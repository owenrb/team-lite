import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatTimeComponent } from './mat-time.component';

describe('MatTimeComponent', () => {
  let component: MatTimeComponent;
  let fixture: ComponentFixture<MatTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatTimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
