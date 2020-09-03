import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewIncidentComponent } from './review-incident.component';

describe('ReviewIncidentComponent', () => {
  let component: ReviewIncidentComponent;
  let fixture: ComponentFixture<ReviewIncidentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewIncidentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewIncidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
