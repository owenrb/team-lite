import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatDatefilterComponent } from './mat-datefilter.component';

describe('MatDatefilterComponent', () => {
  let component: MatDatefilterComponent;
  let fixture: ComponentFixture<MatDatefilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatDatefilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatDatefilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
