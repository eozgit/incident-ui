import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewIncidentComponent } from './view-incident.component';

describe('ViewIncidentComponent', () => {
  let component: ViewIncidentComponent;
  let fixture: ComponentFixture<ViewIncidentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewIncidentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewIncidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
